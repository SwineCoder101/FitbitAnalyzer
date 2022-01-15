"use strict";
const { MongoClient } = require("mongodb");

async function main() {
  const uri =
    "mongodb+srv://liam:liam@cluster0.wjmsz.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

  const client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  //   client.connect((err) => {
  //     const collection = client.db("test").collection("devices");
  //     // perform actions on the collection object
  //     client.close();
  //   });

  try {
    await client.connect();
    await createMultipleListings(client, [
      { name: "Liams Flat", room: "kitchen" },
      { name: "Liams Flat", room: "lounge" },
      { name: "Liams Flat", room: "bedroom" },
    ]);
  } catch (err) {
    console.log(err);
  } finally {
    await client.close();
  }
}

main().catch(console.error);

async function listDatabases(client) {
  const databasesList = await client.db().admin().listDatabases();
  console.log("Databaes");
  databasesList.databases.forEach((db) => console.log(`- ${db.name}`));
}

async function createMultipleListings(client, newListings) {
  const result = await client
    .db("sample_airbnb")
    .collection("listingsAndReviews")
    .insertMany(newListings);

  console.log(
    `${result.insertedCount} new Listings created with the following id(s):`
  );
  console.log(`${result.insertedIds}`);
}

async function createListing(client, newListing) {
  const result = await client
    .db("sample_airbnb")
    .collection("listingsAndReviews")
    .insertOne(newListing);

  console.log(
    `New Listing created with the following id: ${result.insertedId}`
  );
}
