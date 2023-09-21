const {MongoClient} = require('mongodb');

const connection = async ()=>{
    const client = await MongoClient.connect(
        "mongodb+srv://vinayakdige:vinayakdige@cluster0.smbqghb.mongodb.net/?retryWrites=true&w=majority");
const db = client.db("blog");




    return  { db };

};

module.exports = {connection};  