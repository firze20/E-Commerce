import request from "supertest";

const app = global.__APP__;

describe("Test Shop EndPoints", () => {
 
  test("Test shop items list!", async () => {
    const response = await request(app)
      .get("/api/e-commerce/store")
      .expect(200)
      .expect((res) => {
        expect(res.body.items).toBeDefined();
      })
  });

  test("Get a single shop item!", async () => {
    const response = await request(app)
      .get("/api/e-commerce/store/item/1")
      .expect(200)
      .expect((res) => {
        expect(res.body.item).toBeDefined();
      })
  });
})