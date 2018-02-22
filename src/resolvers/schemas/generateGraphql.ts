// A script which generates the graphql schema
// from an avro/kafka schema

// currently just supports kafka schemas in .json

const firstArg = process.argv[2];

const interpretHelper = () => {
  if (firstArg === "--help" || firstArg === "-h") {
    console.log(
      "To use this, specify a .json avro schema!",
    );
    return -1;
  }
  return 0;
};

if (interpretHelper() === -1) {
  return;
}

const kafkaSchema = require(firstArg);
