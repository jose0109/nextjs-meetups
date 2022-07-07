import { MongoClient } from "mongodb";

// /api/new-meetup
// POST /api/new-meetup

async function handler(req, res) {
  if (req.method === "POST") {
    const data = req.body;

    //Fields expected in the request body
    // const { title, image, address, description } = data;

    const client = await MongoClient.connect(
      "mongodb+srv://martinezj:01091995@cluster0.u62hs.mongodb.net/meetups?retryWrites=true&w=majority"
    );

    const db = client.db();

    // MongoDB is noSQL db, has collections(kind of tables) with multiple documents (entries) each one
    const meetupsCollection = db.collection("meetups");

    // Built in query command, a document is an object
    // in this case we can directly insert the data object
    // hence we dont need to destructuring

    const result = await meetupsCollection.insertOne(data);
    console.log(result);

    // We can add error handling, connecting or inserting failed
    // try - catch

    client.close();

    // Sending back a response, similar to node express
    // status method to set http status code of the response we will return
    // i.e 201 to indicate something was inserted

    // We can chain a json call to prepare the json data that will be
    // added to the outgoing response

    res.status(201).json({ message: "Meetup inserted!" });

    console.log(res);
  }
}

export default handler;
