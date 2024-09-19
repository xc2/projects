load("@lint//:defs.bzl", "npm_link_all_packages")
load("@lint//tools/lint:husky/package_json.bzl", husky_bin = "bin")
load("@lint//tools/lint:nano-staged/package_json.bzl", nano_staged_bin = "bin")

npm_link_all_packages(name = "node_modules")

husky_bin.husky_binary(
    name = "husky",
    chdir = "$$BUILD_WORKING_DIRECTORY",
)

nano_staged_bin.nano_staged_binary(
    name = "nano-staged",
    chdir = "$$BUILD_WORKING_DIRECTORY",
)
