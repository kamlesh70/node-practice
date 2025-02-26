import request, { Response } from 'supertest';
import { app } from '../..';

describe("testing /user/register", () => {
  // happy path
  describe("Test cases having all the required fields", () => {
    it("should return 201 status code", async () => {
      const user = {
        name: "kamlesh",
        email: "kamlesh@gmail.com",
      };

      const response = await request(app).post("/user/register").send(user);
      expect(response.statusCode).toBe(201);
    });
  });

  // Sad Path
})