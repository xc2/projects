const { execFileSync } = require("child_process");
const [, bin, ...args] = process.argv;

try {
  execFileSync(bin, args, {
    cwd: process.env.CUSTOM_ENTRYPOINT_WORKING_DIRECTORY,
    stdio: "inherit",
  });
} catch (e) {
  process.exitCode = e.status;
}
