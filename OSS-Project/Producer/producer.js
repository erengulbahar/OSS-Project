const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Kafka = require('kafkajs');
const productSchema = require('./Schema/Product');
dotenv.config();

try {
    mongoose.set("strictQuery", false);
    mongoose.connect(process.env.ATLAS_URI, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log("Connected to Mongo Successfully!");
} catch (error) {
    console.log(error);
}

const kafka = new Kafka.Kafka ({
    clientId: 'my-app',
    brokers: ['kafka:9092']
});

const producer = kafka.producer();
producer.connect();

const getLastDocument = async () => {
    try {
        return await productSchema.findOne().sort({ _id: -1 });
    } catch (error) {
        console.log(error);
    }
}

async function produceMessage(product) {
    try {
        console.log(product);
        await producer.send({
            topic: 'product',
            messages: [
                { value: JSON.stringify(product) },
            ],
        });
    } catch (error) {
        console.log(error);
    }
}

getLastDocument().then(async (lastDocument) => {
    if (!lastDocument) {
        const product = new productSchema({
            value: 0
        });
        await product.save();
        lastDocument = product;
    }
    let lastDocumentId = lastDocument._id;
    while (true) {
        const newDocuments = await productSchema.find({_id: {$gt: lastDocumentId}});
        if (newDocuments.length > 0) {
            lastDocumentId = newDocuments[newDocuments.length - 1]._id;
            newDocuments.forEach(async (newDocument) => {
                await produceMessage(newDocument);
            });
        }
        await new Promise(resolve => setTimeout(resolve, 10000));
    }
})
