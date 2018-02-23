import { produceMessage } from "../kafka/producers/test-producer";

/**
 *
 * @param args keys - fields of a kafka message, values - values of this kafka message
 */
const sendMessage = async (args) => {
  // produce a message to the 'test' topic.
  const message = args;
  try {
    await produceMessage(message);
  } catch (e) {
    return "failed!";
  }
  console.log(message);
  return message;
};

export {
  sendMessage,
};
