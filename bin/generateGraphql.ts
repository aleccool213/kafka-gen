/**
 * A script which generates the graphql schema
 * from an avro/kafka schema
 *
 * currently just supports kafka schemas in .json
 *
 * TODO: generate a seperate file which is held in .gitignore so users
 * dont commit it to their projects accidentally
 *
 * TODO: this is brittle af, make better
 */

const fs = require("fs");
const path = require("path");
import { typeDefs } from "../src/schema/schemas";

const firstArg = process.argv[2];

const interpretHelper = () => {
  if (firstArg === "--help" || firstArg === "-h") {
    console.warn("To use this, specify a .json avro schema!");
    return -1;
  }
  return 0;
};

if (interpretHelper() === -1) {
  return;
}

const kafkaSchema = require(`../${firstArg}`);

/**
 * Produces a graphql schema string which can be appended to
 * the root schema.
 *
 * The resulting mutation a user will perform will be of a
 * json object which could be used to validate a message.
 *
 * eg.
 *
 */

const baseMutation = `
  type Mutation {
    message(input: CustomField): CustomFieldOutput
  }
`;

/**
 * Generate a graphql type based on a kafka one.
 * @param originalType The type from the kafka schema
 */
const generateType = (originalType: string): string => {
  const typeMap = {
    long: "int",
  };

  const newType = Object.keys(typeMap).includes(originalType) ? typeMap[originalType] : originalType;

  return `${newType.charAt(0).toUpperCase() +
    newType.slice(1, newType.length)}`;
};

const generateNewCustomSchema = (input: boolean) => {
  return kafkaSchema.fields.reduce((acc, field) => {
    const customField = `
      "${field.doc}"
      ${field.name}: ${
        generateType(field.type)
      }${
        !field.default ? "!" : ""
      } ${
        input && field.default ? "= " + field.default : ""
      }
    `;

    return acc + customField;
  }, "");
};

const toWriteToFile = `
export const customDefs = \`` +
    typeDefs +
    baseMutation +
    "  input CustomField {" +
    generateNewCustomSchema(true) +
    "} \n" +
    "  type CustomFieldOutput {" +
    generateNewCustomSchema(false) +
  `}
\`;`;

const appRoot = path.resolve();

fs.writeFile(appRoot + "/src/schema/custom.ts", toWriteToFile, (err) => {
  if (err) {
    return console.log(err);
  }

  console.log("The file was saved!");
});
