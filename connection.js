const {MongoClient} = require('mongodb');

const connection = async ()=>{
    const client = await MongoClient.connect(
        "mongodb+srv://vinayakdige:vinayakdige123@cluster0.ryq11rv.mongodb.net/?retryWrites=true&w=majority");
const db = client.db("blog");




    return  { db };

};

module.exports = {connection};  