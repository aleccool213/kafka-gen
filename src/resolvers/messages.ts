import faker from "faker";
import { produceMessage } from "../kafka/producer";

/**
 *
 * @param args keys - fields of a kafka message, values - values of this kafka message
 */
const sendMessage = async (message, topic) => {

  let result;
  try {
    result = await produceMessage(message, topic);
  } catch (e) {
    return "failed!";
  }
  return result;
};

export {
  sendMessage,
};
