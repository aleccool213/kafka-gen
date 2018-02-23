import { get } from "request-promise-native";

import { sendMessage } from "./messages";
import { getTopics } from "./topics";

// The resolvers
export const resolvers = {
  Mutation: {
    async message(obj, args, context, info) {
      console.log(args);
      const result = await sendMessage(args.input);
      return result;
    },
  },
  Query: {
    async topics(obj, args, context, info) {
      const topics = await getTopics(args);
      return topics;
    },
  },
};
