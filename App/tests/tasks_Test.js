const request = require("supertest");
const app = require("../../server");

describe("Task Management API", () => {
  it("should create a new task", async () => {
    const res = await request(app).post("/tasks").send({ title: "Test Task" });
    expect(res.statusCode).toBe(201);
    expect(res.body.title).toBe("Test Task");
  });
});