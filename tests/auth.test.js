const request = require("supertest");
const app = require("../src/app");
const pool = require("../src/config/database-sqlite");

jest.mock("../src/config/database-sqlite");

beforeEach(() => {
  pool.query.mockClear();
});

afterAll(() => {
  jest.clearAllMocks();
});

describe("POST /api/auth/register", () => {
  test("should register new user with valid data", async () => {
    pool.query.mockResolvedValueOnce({ rows: [] }).mockResolvedValueOnce({ rows: [{ id: 1 }] });

    const response = await request(app).post("/api/auth/register").send({
      username: "testuser",
      email: "test@example.com",
      password: "password123",
      confirmPassword: "password123",
    });

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("message");
    expect(response.body.message).toContain("registered successfully");
  });

  test("should reject registration with invalid email", async () => {
    const response = await request(app).post("/api/auth/register").send({
      username: "testuser",
      email: "invalid-email",
      password: "password123",
      confirmPassword: "password123",
    });

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("error");
  });

  test("should reject registration with short password", async () => {
    const response = await request(app).post("/api/auth/register").send({
      username: "testuser",
      email: "test@example.com",
      password: "pass",
      confirmPassword: "pass",
    });

    expect(response.status).toBe(400);
  });

  test("should reject registration when passwords do not match", async () => {
    const response = await request(app).post("/api/auth/register").send({
      username: "testuser",
      email: "test@example.com",
      password: "password123",
      confirmPassword: "different123",
    });

    expect(response.status).toBe(400);
  });
});
