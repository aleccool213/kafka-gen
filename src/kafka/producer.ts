import { createProducer, ProducerAPI } from "@flipp/node-kafka";

import { config } from "../config/index";

// TODO: create a producer for every topic found in app.json

const producers = {};

/**
 * Initializes the producer
 */
const initProducer = async (topicName) => {
  producers[topicName] = createProducer(
    topicName,
    require(`./schemas/${topicName}.json`),
    null,
    config.kafkaProducer,
    config.schemaRegistry,
    config.kafkaPkgConfig,
  );
  await producers[topicName].connect();
};

const connectedPromises = config.producerTopics.forEach((topicName) => {
  initProducer(topicName);
});

/**
 * Produces a Test message 'test' topic.
 * @param {Object} message - the message to be produced.
 */
export const produceMessage = async (message: object, topic: string) => {
  await connectedPromises;
  console.log(message)
  producers[topic].produce(message);
  return message;
};

export const terminateTestProducer = async () => {
  config.producerTopics.forEach(async (topicName) => {
    await producers[topicName].disconnect();
  });
};
