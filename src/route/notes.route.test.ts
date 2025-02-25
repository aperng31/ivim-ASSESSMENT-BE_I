import { MongoDBContainer, StartedMongoDBContainer } from '@testcontainers/mongodb';
import mongoose, { Mongoose } from 'mongoose';
import supertest from 'supertest';
import app from '../app';
import { Server } from 'http';
import { Note } from '../model/notes.model';

const PORT = 3000;

describe("Notes Route", () => {
  jest.setTimeout(60000);
  let container: StartedMongoDBContainer;
  let client: Mongoose;
  let server: Server;

  beforeAll(async () => {
    container = await new MongoDBContainer().start();
    client = await mongoose.connect(container.getConnectionString(), { directConnection: true });
    console.log('MongoDB connected successfully');
    server = app.listen(PORT, () => {
      console.log(`TEST ENVIRONMENT - Listening at http://localhost:${PORT}`);
    });
  });

  beforeEach(async () => {
    const collections = await mongoose.connection.db.collections();
    for (const collection of collections) {
      await collection.deleteMany({});
    }
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

  it("GET /notes/:id should retrieve a single note by ID", async () => {
    const note = { title: "test hello title", description: "Hello World Description" };
    const myNote = await Note.create(note);
    const res = await supertest(app).get(`/notes/${myNote._id}`);
    expect(res.status).toBe(200);
    expect(res.body.title).toBe(myNote.title);
    expect(res.body.description).toBe(myNote.description);
  });

  it("GET /notes should retrieve all notes", async () => {
    const note1 = { title: "test hello title1", description: "Hello World Description1" };
    const note2 = { title: "test hello title2", description: "Hello World Description2" };
    const note3 = { title: "test hello title3", description: "Hello World Description3" };

    await Note.insertMany([note1, note2, note3]);
    const res = await supertest(app).get('/notes');
    expect(res.status).toBe(200);
    expect(res.body.length).toEqual(3);
  });

  it("PUT /notes/:id should update a single note by ID", async () => {
    const note = { title: "test hello title", description: "Hello World Description" };
    const myNote = await Note.create(note);
    const updatedNote = { title: "UPDATED test hello title", description: "UPDATD Hello World Description" };
    const res = await supertest(app).put(`/notes/${myNote._id}`).send(updatedNote);
    expect(res.status).toBe(201);
    expect(res.body.title).toBe(updatedNote.title);
    expect(res.body.description).toBe(updatedNote.description);
  });

  it("DELETE /notes/:id should delete a single note by ID", async () => {
    const note = { title: "test hello title", description: "Hello World Description" };
    const myNote = await Note.create(note);
    const res = await supertest(app).delete(`/notes/${myNote._id}`);
    expect(res.status).toBe(200);
    expect(res.text).toBe(`Successfully deleted note with ID: ${myNote._id}`)
  })
});