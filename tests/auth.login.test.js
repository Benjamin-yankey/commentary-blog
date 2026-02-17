const request = require("supertest");
const bcrypt = require("bcryptjs");
jest.mock("../src/config/database");

const app = require("../src/app");
const pool = require("../src/config/database");

describe("POST /api/auth/login", () => {
  let passwordHash;
  
  beforeAll(async () => {
    passwordHash = await bcrypt.hash("password123", 10);
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("should login successfully with valid credentials", async () => {
    const mockUser = {
      id: 1,
      username: "testuser",
      email: "test@example.com",
      password_hash: passwordHash
    };

    pool.query.mockResolvedValueOnce({ rows: [mockUser] });

    const response = await request(app).post("/api/auth/login").send({
      email: "test@example.com",
      password: "password123"
    });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("token");
    expect(response.body.message).toBe("Login successful");
  });

  test("should fail with invalid credentials (user not found)", async () => {
    pool.query.mockResolvedValueOnce({ rows: [] });

    const response = await request(app).post("/api/auth/login").send({
      email: "nonexistent@example.com",
      password: "password123"
    });

    expect(response.status).toBe(401);
    expect(response.body.error).toBe("Invalid credentials");
  });
});
