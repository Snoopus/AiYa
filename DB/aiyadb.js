const axios = require('axios');
//const { MongoClient } = require('mongodb');
const MongoClient = require("./data");
// const uri = "mongodb+srv://lurrah:UtPmxAVquHLUIjTr@cluster0.mueueb9.mongodb.net/"
// const client = new MongoClient(uri);

async function createProfile(client, newProf){
    const result = await client.db("Animal").collection("AIYA").insertMany(newProf);
    console.log(`new profiles created`);
    
}

async function insertPic() {
    try {
        const response = await axios.getAdapter(' https://dog.ceo/api/breeds/image/random');
        const data = response.data;
        return data;
    } catch (error) {
        console.error("Image not found.", error);
    }
}


async function main() {
    const uri = "mongodb+srv://lurrah:UtPmxAVquHLUIjTr@cluster0.mueueb9.mongodb.net/"
    const client = new MongoClient(uri);

    try {
        await client.connect();
        await createProfile(client, [
            {
                name: "Cleo",
                description: "I like cats",
                species: "Cat",
                preference: "Cats",
                picture:`${insertPic}`,
            },
            {
                name: "Liz",
                description: "I like lizards",
                species: "Lizard",
                preference: "Lizards",
                picture:`${insertPic}`,
            },
            {
                name: "Doug",
                description: "I like dogs",
                species: "Dog",
                preference: "Dogs",
                picture:`${insertPic}`,
            },
            {
                name: "Betsy",
                description: "I like cows",
                species: "Cow",
                preference: "Cows",
                picture:`${insertPic}`,
            },
            {
                name: "-",
                description: "I like cats",
                species: "Cat",
                preference: "Cat",
                picture:`${insertPic}`,
            },
            {
                name: "-",
                description: "I like cats",
                species: "Cat",
                preference: "Cat",
                picture:`${insertPic}`,
            },
            {
                name: "-",
                description: "I like cats",
                species: "Cat",
                preference: "Cat",
                picture:`${insertPic}`,
            },
            {
                name: "-",
                description: "I like cats",
                species: "Cat",
                preference: "Cat",
                picture:`${insertPic}`,
            },
            {
                name: "-",
                description: "I like cats",
                species: "Cat",
                preference: "Cat",
                picture:`${insertPic}`,
            },
            {
                name: "-",
                description: "I like cats",
                species: "Cat",
                preference: "Cat",
                picture:`${insertPic}`,
            },
            {
                name: "-",
                description: "I like cats",
                species: "Cat",
                preference: "Cat",
                picture:`${insertPic}`,
            },
            {
                name: "-",
                description: "I like cats",
                species: "Cat",
                preference: "Cat",
                picture:`${insertPic}`,
            },
            {
                name: "-",
                description: "I like cats",
                species: "Cat",
                preference: "Cat",
                picture:`${insertPic}`,
            },
            {
                name: "-",
                description: "I like cats",
                species: "Cat",
                preference: "Cat",
                picture:`${insertPic}`,
            },
            {
                name: "-",
                description: "I like cats",
                species: "Cat",
                preference: "Cat",
                picture:`${insertPic}`,
            },
        ])
        
    } catch (e) {
        console.error(e);
    }

    finally {
        await client.close();
    }
}

main().catch(console.error);