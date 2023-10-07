const { MongoClient } = require('mongodb');

//use('sample_analytics');

// first, have it so that it loops through sample and displays their information
// one entry at a time
// then filter data based on "type" 
//db.getCollection('customers')

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
    } catch (e) {
        console.error(e);
    }

    finally {
        await client.close();
    }
}

main().catch(console.error);