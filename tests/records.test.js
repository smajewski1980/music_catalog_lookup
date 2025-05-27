const server = require("../server");
const request = require("supertest");

describe("POST /api/records/total", () => {
  const executeReq = async (bool = true) => {
    return await request(server)
      .post("/api/records/total")
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
