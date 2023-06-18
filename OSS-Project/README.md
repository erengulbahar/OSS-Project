# BLM3062-Project

This repository contains a simple Change Data Capture (CDC) application developed using Apache Kafka.

## Project Summary

This project aims to develop two applications, a producer and a consumer. The producer application queries a specified collection in MongoDB every 10 seconds to detect newly added documents since its previous run. It then produces a JSON message for each new document and publishes it to a specified Kafka topic. The consumer application consumes messages from the Kafka topic and prints them to the console.

## Technologies Used

- Node.js
- KafkaJS
- Mongoose
- ZooKeeper
- Docker

## Getting Started

To build and run the applications, follow these steps:

1. Clone this repository:

   ```bash
   git clone https://github.com/hakantekir/BLM3062-Project.git
   ```

2. Create an `.env` file in the project directory. Open the `.env` file in a text editor and add the following line:

   ```
   ATLAS_URI=<your_atlas_uri>
   ```

3. Now, you can start the application using `docker-compose`. Run the following command:

   ```bash
   docker-compose up
   ```

## License

This project is licensed under the [MIT License](LICENSE).
