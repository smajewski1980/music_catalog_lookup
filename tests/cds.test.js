const server = require("../server");
const request = require("supertest");

describe("POST /total", () => {
  const executeReq = async () => {
    return await request(server)
      .post("/api/cds/total")
      .send({ searchField: "artist", searchTerm: "" });
  };

  test("returns a good response", async () => {
    const res = await executeReq();

    expect(res.status).toEqual(200);
  });

  test("result is a number", async () => {
    const res = await executeReq();

    expect(typeof parseInt(res.body.count)).toEqual("number");
  });
});

describe("returns one page of results when searchTerm not included", () => {
  const executeReq = async (field) => {
    return await request(server)
      .post("/api/cds?page=1&offset=250")
      .send({ searchField: field, searchTerm: "" });
  };

  test("returns one page of cds by artist", async () => {
    const res = await executeReq("artist");

    expect(res.status).toEqual(200);
    expect(res.body.length).toBe(250);
  });

  test("returns one page of cds by title", async () => {
    const res = await executeReq("title");

    expect(res.status).toEqual(200);
    expect(res.body.length).toBe(250);
  });

  test("returns one page of cds by location", async () => {
    const res = await executeReq("location");

    expect(res.status).toEqual(200);
    expect(res.body.length).toBe(250);
  });
});

describe("returns results that include searchTerm", () => {
  const executeReq = async (field, term) => {
    return await request(server)
      .post("/api/cds?page=1&offset=250")
      .send({ searchField: field, searchTerm: term });
  };

  test("returns one page of cds by artist", async () => {
    const res = await executeReq("artist", "The");

    expect(res.status).toEqual(200);
    expect(res.body.length).toBeGreaterThanOrEqual(1);
  });

  test("returns one page of cds by title", async () => {
    const res = await executeReq("title", "The");

    expect(res.status).toEqual(200);
    expect(res.body.length).toBeGreaterThanOrEqual(1);
  });

  test("returns one page of cds by location", async () => {
    const res = await executeReq("location", "Jazz");

    expect(res.status).toEqual(200);
    expect(res.body.length).toBeGreaterThanOrEqual(1);
  });
});
