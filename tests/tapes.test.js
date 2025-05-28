const server = require("../server");
const request = require("supertest");

describe("POST /api/tapes/total", () => {
  const executeReq = async (bool = true) => {
    return await request(server)
      .post("/api/tapes/total")
      .send(
        bool
          ? { searchField: "artist", searchTerm: "" }
          : { searchFieldd: "", ssearchTerm: "" }
      );
  };
  test("it returns a number", async () => {
    const res = await executeReq();

    expect(res.status).toBe(200);
    expect(typeof parseInt(res.body.count)).toEqual("number");
  });
  test("it returns a 500 if theres a problem", async () => {
    const res = await executeReq(false);

    expect(res.status).toBe(500);
  });
});

describe("returns one page of results if no searchTerm", () => {
  const executeReq = async (field) => {
    return await request(server).post("/api/tapes?page=1&offset=250").send({
      searchField: field,
      searchTerm: "",
    });
  };

  it("returns 250 results for artist with no searchTerm", async () => {
    const res = await executeReq("artist");
    expect(res.status).toBe(200);
    expect(res.body.length).toBe(250);
  });

  it("returns 250 results for title with no searchTerm", async () => {
    const res = await executeReq("title");
    expect(res.status).toBe(200);
    expect(res.body.length).toBe(250);
  });

  it("returns 250 results for location with no searchTerm", async () => {
    const res = await executeReq("location");
    expect(res.status).toBe(200);
    expect(res.body.length).toBe(250);
  });
});

describe("returns results that include searchTerm", () => {
  const executeReq = async (field, term) => {
    return await request(server)
      .post("/api/tapes?page=1&offset=250")
      .send({ searchField: field, searchTerm: term });
  };

  test("returns a result containing the searchTerm", async () => {
    const res = await executeReq("artist", "The");

    expect(res.status).toEqual(200);
    expect(res.body.length).toBeGreaterThanOrEqual(1);
    expect(res.body[0].artist).toMatch(/The/);
  });

  test("returns a result containing the searchTerm", async () => {
    const res = await executeReq("title", "The");

    expect(res.status).toEqual(200);
    expect(res.body.length).toBeGreaterThanOrEqual(1);
    expect(res.body[0].title).toMatch(/The/);
  });

  test("returns a result containing the searchTerm", async () => {
    const res = await executeReq("location", "Reel");

    expect(res.status).toEqual(200);
    expect(res.body.length).toBeGreaterThanOrEqual(1);
    expect(res.body[0].location).toMatch(/Reel/);
  });
});
