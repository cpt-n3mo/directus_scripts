const fs = require("fs");
const { spawn } = require("child_process");
const file = process.argv[2];
const myjson = require(`${file}`);

const newjson = {
  version: myjson.version,
  directus: myjson.directus,
  collections: [],
  fields: [],
  relations: myjson.relations,
};

const tmp = myjson;

tmp.collections.forEach((e) => {
  e.meta.group = null;
  newjson.collections.push(e);
});
tmp.fields.forEach((e) => {
  e.meta.group = null;
  newjson.fields.push(e);
});


const applySnapshot = () => {
  const noGroups = spawn("npx", [
    "directus",
    "schema",
    "apply",
    "-y",
    "./snapshotWithoutGroups.json",
  ]);
  noGroups.stdout.on("data", (data) => {
    console.log(`${data}`);
  });

  noGroups.stderr.on("data", (data) => {
    console.error(`${data}`);
  });

  noGroups.on("exit", function (code, signal) {
    if(code != 0){return}
    const withGroups = spawn("npx", ["directus", "schema", "apply",'-y', file]);

    withGroups.stdout.on("data", (data) => {
      console.log(`${data}`);
    });

    withGroups.stderr.on("data", (data) => {
      console.error(`${data}`);
    });

    withGroups.on("exit", function (code, signal) {
      console.log("exit " + code);
      fs.unlink("./snapshotWithoutGroups.json", (err) => {
        if(err){console.error(err)}
      });
    });
  });
};

fs.writeFileSync("./snapshotWithoutGroups.json", JSON.stringify(newjson));
applySnapshot()
