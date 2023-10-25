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

    // const matches = [
    //     {
    //         name: "max",
    //         species: "dog",
    //         age: 8,
    //         interests: 
    //         [
    //             "playing fetch",
    //             "eating",
    //             "running",
    //             "waiting for my owner",
    //             "digging",
    //         ],
    //     },
    //     {
    //         name: "dawg",
    //         species: "dog",
    //         age: 3,
    //         interests:
    //         [
    //             "fetch",
    //             "sitting",
    //             "walks",
    //             "digging",
    //         ],
    //     }
    // ];

    // try {
    //     const insertManyResult = await collection.insertMany(matches);
    //     console.log(`${insertManyResult.insertedCount} documents successfully inserted.\n`);
    // } catch (err) {
    //     console.error(`Something went wrong trying to insert the new documents: ${err}\n`);
    // }

    // Ensures that the client will close when you finish/error

    await findByQuery(collection);

    await client.close();
}

async function findByQuery(collection){
    const findQuery = { name: "max" };

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

async function addMany(){
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
