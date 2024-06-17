import exp from "constants";
import request from "supertest";

const app = global.__APP__;

let token: string;

describe("Test Shop EndPoints", () => {
  beforeAll(async () => {
    const user = await request(app).post("/api/e-commerce/auth/signin").send({
      username: process.env.SUPER_USER_USERNAME,
      password: process.env.SUPER_USER_PASSWORD,
    });

    const cookieHeader = user.headers["set-cookie"];
    const cookies = Array.isArray(cookieHeader) ? cookieHeader : [cookieHeader];

    const jwtCookie = cookies.find((cookie) => cookie.startsWith("jwt="));

    if (!jwtCookie) {
      throw new Error("token cookie not found");
    }

    token = jwtCookie.split("=")[1];
  });

  test("Test shop items list!", async () => {
    const response = await request(app)
      .get("/api/e-commerce/store")
      .expect(200)
      .expect((res) => {
        expect(res.body.items).toBeDefined();
      });
  });

  test("Get a single shop item!", async () => {
    const response = await request(app)
      .get("/api/e-commerce/store/item/1")
      .expect(200)
      .expect((res) => {
        expect(res.body.item).toBeDefined();
      });
  });

  test("Create a new shop item!", async () => {
    const response = await request(app)
      .post("/api/e-commerce/store/item")
      .set("Cookie", `jwt=${token}`)
      .send({
        name: "Test-Item",
        description: "Test-Item-Description",
        price: 100.0,
        image:
          "https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png",
      });

    expect(response.status).toBe(201);
    expect(response.body.item).toBeDefined();
  });

  test("Update a shop item!", async () => {
    const response = await request(app)
      .put("/api/e-commerce/store/item/1")
      .set("Cookie", `jwt=${token}`)
      .send({
        name: "Motorbyke",
        description: "A bike that is a motorbike",
        price: 22
  });

  expect(response.status).toBe(200);
  expect(response.body.item).toBeDefined();
});

test("Delete a shop item!", async () => {
  const response = await request(app)
    .delete("/api/e-commerce/store/item/1")
    .set("Cookie", `jwt=${token}`)

expect(response.status).toBe(200);
expect(response.body.message).toBeDefined();
});

})
