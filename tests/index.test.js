const axios = require("axios");

function sum(a, b) {
  return a + b;
}

const BACKEND_URL = "http://localhost:3000";

describe("Authentication", () => {
  test("User is able to sign up", async () => {
    const username = "abhishek" + Math.random();
    const password = "123456";

    const response = await axios.post(`${BACKEND_URL}/api/v1/signup`, {
      username,
      password,
      type: "admin",
    });

    expect(response.statusCode).toBe(200);

    const updateResponse = await axios.post(`${BACKEND_URL}/api/v1/signup`, {
      username,
      password,
      type: "admin",
    });
    expect(response.statusCode).toBe(400);
  });

  test("Signup request fails if the username is empty", async () => {
    const username = `Abhishek-${Math.random()}`;
    const password = "123456";

    const response = await axios.post(`${BACKEND_URL}/api/v1/signup`, {
      password,
    });
    expect(response.statusCode).toBe(400);
  });

  test("Signin succeeds if the username and password are correct.", async () => {
    const username = `Abhishek-${Math.random()}`;
    const password = "123456";

    await axios.post(`${BACKEND_URL}/api/v1/signup`, {
      username,
      password,
    });

    const response = await axios.post(`${BACKEND_URL}/api/v1/signin`, {
      username,
      password,
    });

    expect(response.statusCode).toBe(200);
    expect(response.body.token).toBeDefined();
  });

  test("Signin fails if the username and password donot match", async () => {
    const username = `Abhishek-${Math.random()}`;
    const password = "123456";

    await axios.post(`${BACKEND_URL}/api/v1/signup`, {
      username,
      password,
    });
    const response = await axios.post(`${BACKEND_URL}/api/v1/signin`, {
      username: "WrongUsername",
      password,
    });

    expect(response.statusCode).toBe(403);
  });
});
