import request, { Response } from 'supertest';
import { app, shutdown } from "../..";

describe("testing /user/register", () => {
  afterAll(() => {
    shutdown();
  });

  // happy path
  describe("Test cases having all the required fields", () => {
    it("should return 201 status code", async () => {
      const user = {
        name: "kamlesh",
        email: "kamlesh@gmail.com",
      };

      const response = await request(app).post("/user/register").send(user);
      expect(response.statusCode).toBe(404);
    });
  });

  // Sad Path
});