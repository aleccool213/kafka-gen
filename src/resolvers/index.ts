import { get } from "request-promise-native";

import { sendMessage } from "./messages";
import { getTopics } from "./topics";

// The resolvers
export const resolvers = {
  Mutation: {
    async message(obj, args) {
      const result = await sendMessage(args.input, args.topic);
      return result;
    },
  },
  Query: {
    async topics(obj, args) {
      const topics = await getTopics(args);
      return topics;
    },
  },
};
