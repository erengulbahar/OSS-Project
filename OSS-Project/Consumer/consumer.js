const Kafka = require('kafkajs');

const kafka = new Kafka.Kafka ({
    clientId: 'my-kafka',
    brokers: ['kafka:9300']
});

const consumer = kafka.consumer({ groupId: 'my-groups' });
consumer.connect();
consumer.subscribe({ topic: 'product'});

consumer.run({
    eachMessage: async ({ message }) => {
        console.log("New message is => "+message.value.toString());
    }
});
