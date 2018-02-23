import faker from "faker";
import { produceMessage } from "../kafka/producers/test-producer";

const generateFakeData = (args, info) => {
  // generate fake data for required fields

  return {

  };
};

/**
 *
 * @param args keys - fields of a kafka message, values - values of this kafka message
 */
const sendMessage = async (args: object, info) => {
  // produce a message to the 'test' topic.
  const message = {
    ...args,
    ...generateFakeData(args, info),
  };

  try {
    await produceMessage(message);
  } catch (e) {
    return "failed!";
  }
  return message;
};

export {
  sendMessage,
};
