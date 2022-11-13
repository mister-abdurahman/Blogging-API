const supertest = require("supertest")
const mongoose = require("mongoose")
const dotenv = require("dotenv")
dotenv.config();

const app = require("../index")

const API_TEST_URL = process.env.API_TEST_URL;


beforeAll((done) => {
    mongoose.connect(API_TEST_URL);
    mongoose.connection.on('connected', async () => {
        console.log('Connected to MongoDB successfully');
    });

    mongoose.connection.on('error', (err) => {
        console.log('Error connecting to MongoDB', err);
    })
    done()
})

afterAll((done) => {
    mongoose.connection.close(done);
})

test("Get all blogs", async () => {
    const res = await supertest(app).get("/blogs")
    expect(res.statusCode).toBe(200)
})

test("Get single blogs", async () => {
    const res = (await supertest(app).get("/blogs/637111b7b48d63a8c050ab2d"))
    expect(res.statusCode).toBe(200)
})

test("Get Published blogs", async () => {
    const res = (await supertest(app).get("/blogs/published"))
    expect(res.statusCode).toBe(200)
})
