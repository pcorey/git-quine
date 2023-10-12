import crypto from "crypto";
import { execSync } from "child_process";

console.log(
	crypto.createHash("sha1").update(crypto.randomBytes(40)).digest("hex")
);

console.log(execSync("git rev-parse --short HEAD").toString());
