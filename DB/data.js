//const { MongoClient, ServerApiVersion } = require('mongodb');
import { MongoClient, ServerApiVersion } from 'mongodb';
const uri = "mongodb+srv://narwhaldata:narwhaldata@narwhalindustries.visld21.mongodb.net/?retryWrites=true&w=majority";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

async function run() {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");

    // Create references to the database and collection in order to run
    // operations on them.
    const dbName = "dogscats";
    const collectionName = "matches";
    const database = client.db(dbName);
    const collection = database.collection(collectionName);

    addToPage();
    // Ensures that the client will close when you finish/error

    //await findByQuery(collection);
    //await findOneByQuery(collection);
    //await updateOne(collection);

    await client.close();
}

async function addToPage(collection){
    const res = await collection.find();
    await res.forEach(match => {
        const div_match = document.createElement("div");
        div_match.setAttribute("class", "match");

        const div_name = document.createElement("div");
        div_name.setAttribute("class", "name");

        const div_species = document.createElement("div");
        div_species.setAttribute("class", "species");

        div_match.append(div_name);
        div_match.append(div_species);
    });
}

async function findByQuery(collection){
    const findQuery = { interests: "digging" };

    try {
        const cursor = await collection.find(findQuery).sort({ name: 1 });
        await cursor.forEach(match => {
            console.log(match.name, match.interests[1]);
        });
        // add a linebreak
        //console.log();
    } catch (err) {
        console.error(`Something went wrong trying to find the documents: ${err}\n`);
    }
}

async function findOneByQuery(collection) {
    const findOneQuery = { interests: "digging" };

    try {
        const findOneResult = await collection.findOne(findOneQuery);
    if (findOneResult === null) {
        console.log("Couldn't find any matches with that interest\n");
    } else {
        console.log(`Found an animal with interest:\n${JSON.stringify(findOneResult)}\n`);
    }
    } catch (err) {
        console.error(`Something went wrong trying to find one document: ${err}\n`);
    }
}

async function updateOne(collection) {
    const findOneQuery  = { name: "max" };
    const updateDoc = { $set: { age: 9 } };

    // The following updateOptions document specifies that we want the *updated*
    // document to be returned. By default, we get the document as it was *before*
    // the update.
    const updateOptions = { returnOriginal: false };

    try {
    const updateResult = await collection.findOneAndUpdate(findOneQuery, updateDoc, updateOptions);
    console.log(`Here is the updated document:\n${JSON.stringify(updateResult)}\n`);
    } catch (err) {
        console.error(`Something went wrong trying to update one document: ${err}\n`);
    }
}

async function deleteEntry(collection) {
    const deleteQuery = { name: "" };
    try {
        const deleteResult = await collection.deleteMany(deleteQuery);
        console.log(`Deleted ${deleteResult.deletedCount} documents\n`);
    } catch (err) {
        console.error(`Something went wrong trying to delete documents: ${err}\n`);
    }
}

async function addMany(collection){
    const matches = [
        {
            name: "max",
            species: "dog",
            age: 8,
            interests: 
            [
                "playing fetch",
                "eating",
                "running",
                "waiting for my owner",
                "digging",
            ],
        },
        {
            name: "dawg",
            species: "dog",
            age: 3,
            interests:
            [
                "fetch",
                "sitting",
                "walks",
                "digging",
            ],
        }
    ];

    try {
        const insertManyResult = await collection.insertMany(matches);
        console.log(`${insertManyResult.insertedCount} documents successfully inserted.\n`);
    } catch (err) {
        console.error(`Something went wrong trying to insert the new documents: ${err}\n`);
    }
}
run().catch(console.dir);
