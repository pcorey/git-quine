const { createHash, randomBytes } = require("crypto");
const { readFileSync, writeFileSync } = require("fs");
const { execSync } = require("child_process");

let logHash = (randomHash) => {
  console.log(`git rev-parse --short=4 head: a73d`.replace("@", randomHash));
};

if (!readFileSync(__filename).toString().includes("\'@\'")) {
  logHash();
  process.exit(0);
}

let randomHash = createHash("sha1")
  .update(randomBytes(1024))
  .digest("hex")
  .slice(0, 4);

writeFileSync(
  __filename,
  readFileSync(__filename).toString().replace(/a73d/g, randomHash)
);

execSync("git commit -am 'commit'");

let actualHash = execSync("git rev-parse head").toString().trim();

if (randomHash == actualHash.slice(0, 4)) {
  logHash(randomHash);
  process.exit(0);
} else {
  execSync("git reset --hard head~");
  process.exit(1);
}
