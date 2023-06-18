const mongoose = require('mongoose');
const Kafka = require('kafkajs');
const productSchema = require('./Schema/Product');
dotenv.config();

try {
    mongoose.set("strictQuery", false);
    mongoose.connect("CONNECTION_URI");
} catch (error) {
    console.log(error);
}

const kafka = new Kafka.Kafka ({
    clientId: 'my-kafka',
    brokers: ['kafka:9300']
});

const producer = kafka.producer();
producer.connect();

const getDocument = async () => {
    try {
        return await productSchema.findOne().sort({ _id: -1 });
    } catch (error) {
        console.log(error);
    }
}

async function produceMessage(product) {
    try {
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

getDocument().then(async (lastDocument) => {
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
