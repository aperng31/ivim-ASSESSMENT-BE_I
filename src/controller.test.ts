import { MongoDBContainer, StartedMongoDBContainer } from '@testcontainers/mongodb';
import mongoose, { Mongoose } from 'mongoose';
import supertest from 'supertest';
import app from './app';
import { Server } from 'http';

const PORT = 3000;

describe("Notes Controller", () => {
  jest.setTimeout(60000);
  let container: StartedMongoDBContainer;
  let client: Mongoose;
  let server: Server;   // set to server type?

  beforeAll(async () => {
    container = await new MongoDBContainer().start();
    client = await mongoose.connect(container.getConnectionString(), { directConnection: true });
    server = app.listen(PORT, () => {
      console.log(`TEST ENVIRONMENT - Listening at http://localhost:${PORT}`);
    });
  });

  afterAll(async () => {
    await client.disconnect();
    await server.close();
    await container.stop();
  });

  it("POST /notes should create and return note", async () => {
      const note = { title: "test hello title", description: "Hello World Description" };
      const res = await supertest(app).post('/notes').send(note);
      expect(res.status).toBe(201);
      expect(res.body.title).toBe(note.title);
      expect(res.body.description).toBe(note.description);
  });
});