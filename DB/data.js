const { MongoClient } = require('mongodb');

//use('sample_analytics');

// first, have it so that it loops through sample and displays their information
// one entry at a time
// then filter data based on "type" 
//db.getCollection('customers')
console.log("hi");

document.addEventListener("DOMContentLoaded", function (){
const loadButton = document.getElementById("load");
const container = document.getElementById("container");

load.addEventListener("click", function() {
        const newElement = document.createElement("div");
        newElement.textContent = "new animal";

    if (container.firtsChild) {
        container.removeChild(container.firstChild);
    }

        container.appendChild(newElement);
    });
});

async function findAnimals(client, {
    maximumNumberOfResults = Number.MAX_SAFE_INTEGER
} = {}) {
    const cursor = client.db("sample_analytics").collection("customers").find({}).limit(maximumNumberOfResults)

    const results = await cursor.toArray();

    if (results.length > 0) {
        console.log(`Found ${results.length} customers`);
        results.forEach((result, i) => {

            console.log();
            console.log(`${i + 1}. name: ${result.name}`);
            console.log(`   _id: ${result._id}`);
            console.log(`   email: ${result.email}`);
            console.log(`   birthdate: ${result.birthdate}`);
        });
    } else {
        console.log(`No customers`);
    }
}

async function listDatabases(client){
    databasesList = await client.db().admin().listDatabases();

    console.log("Databases:");
    databasesList.databases.forEach(db => console.log(` - ${db.name}`));
};

async function main() {
    const uri = "mongodb+srv://lurrah:UtPmxAVquHLUIjTr@cluster0.mueueb9.mongodb.net/"
    const client = new MongoClient(uri);

    try {
        await client.connect();
        await listDatabases(client);
        await findAnimals(client, {maximumNumberOfResults: 10});
    } catch (e) {
        console.error(e);
    }

    finally {
        await client.close();
    }
}

main().catch(console.error);

module.exports = { MongoClient}