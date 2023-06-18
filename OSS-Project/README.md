# BLM3062-Project

This repository contains a simple Change Data Capture (CDC) application developed using Apache Kafka.

## Project Summary

The goal of this project is to create two applications, namely a producer and a consumer. The producer application, set to interrogate a specified collection in MongoDB at ten-second intervals, is designed to identify documents recently added since its last operation. For each new document, it generates a JSON message and transmits it to a defined Kafka topic. On the other hand, the consumer application is tasked with receiving messages from the Kafka topic and outputting them onto the console. And I used to Node.js, KafkaJS, Mongoose for MongoDB, ZooKeeper and of course Docker!

## Getting Started

Firsly, clone this repository:

   ```bash
   git clone https://github.com/erengulbahar/OSS-Project.git
   ```

Secondly, you have to write to your special URI in "CONNECTION_URI" field:

   ```
   ATLAS_URI=<your_atlas_uri>
   ```

Finally, you can start the application using `docker-compose`. Run the following command:

   ```bash
   docker-compose up
   ```
