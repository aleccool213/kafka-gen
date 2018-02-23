import { createProducer, ProducerAPI } from "@flipp/node-kafka";

import { config } from "../../config";

let producer: ProducerAPI;

/**
 * Initializes the producer
 */
const initProducer = async () => {
  producer = createProducer(
    config.producerTopics.testTopic.name,
    require("../schemas/test.json"),
    null,
    config.kafkaProducer,
    config.schemaRegistry,
    config.kafkaPkgConfig,
  );
  await producer.connect();
};

const connectedPromise = initProducer();

/**
 * Produces a Test message 'test' topic.
 * @param {Object} message - the message to be produced.
 */
export const produceMessage = async (message: Object) => {
  await connectedPromise;
  producer.produce(message);
};

export const terminateTestProducer = async () => {
  try {
    await producer.disconnect();
  } catch (err) {
    console.log("producer terminated!");
  }
};
