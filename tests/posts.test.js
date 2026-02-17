const request = require("supertest");
jest.mock("../src/config/database");
jest.mock("jsonwebtoken");

const app = require("../src/app");
const pool = require("../src/config/database");
const jwt = require("jsonwebtoken");

beforeEach(() => {
  pool.query.mockClear();
  jwt.verify.mockReturnValue({ id: 1, username: "testuser" });
});

afterAll(() => {
  jest.clearAllMocks();
});

describe("POST /api/posts", () => {
  test("should create post with valid data and auth", async () => {
    jwt.verify.mockReturnValue({ id: 1, username: "testuser" });
    pool.query.mockResolvedValueOnce({
      rows: [{ id: 1, title: "Test Post", content: "Test content", author_id: 1 }],
    });

    const response = await request(app)
      .post("/api/posts")
      .set("Authorization", "Bearer valid-token")
      .send({
        title: "Test Post",
        content: "This is a longer test content that exceeds the fifty character minimum requirement for validation purposes.",
      });

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("message");
  });

  test("should reject post creation without auth", async () => {
    const response = await request(app).post("/api/posts").send({
      title: "Test Post",
      content: "Test content",
    });

    expect(response.status).toBe(401);
  });

  test("should reject post with missing title", async () => {
    jwt.verify.mockReturnValue({ id: 1, username: "testuser" });
    
    const response = await request(app)
      .post("/api/posts")
      .set("Authorization", "Bearer valid-token")
      .send({
        content: "Test content",
      });

    expect(response.status).toBe(400);
  });
});

describe("GET /api/posts", () => {
  test("should return all posts with pagination", async () => {
    pool.query
      .mockResolvedValueOnce({
        rows: [
          { id: 1, title: "Post 1", content: "Content 1", username: "user1" },
          { id: 2, title: "Post 2", content: "Content 2", username: "user2" },
        ],
      })
      .mockResolvedValueOnce({ rows: [{ count: 2 }] });

    const response = await request(app).get("/api/posts");

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("posts");
    expect(response.body).toHaveProperty("pagination");
  });
});

describe("GET /api/posts/:id", () => {
  test("should return single post by id", async () => {
    pool.query.mockResolvedValueOnce({
      rows: [{ id: 1, title: "Post 1", content: "Content 1", username: "user1" }],
    });

    const response = await request(app).get("/api/posts/1");

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("post");
  });

  test("should return 404 for non-existent post", async () => {
    pool.query.mockResolvedValueOnce({ rows: [] });

    const response = await request(app).get("/api/posts/999");

    expect(response.status).toBe(404);
  });
});
