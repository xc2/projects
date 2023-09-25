load("@drizzle//:defs.bzl", "npm_link_all_packages")
load("@drizzle//tools/drizzle:drizzle-kit/package_json.bzl", _bin = "bin")

npm_link_all_packages(name = "node_modules")

_bin.drizzle_kit_binary(
    name = "drizzle",
    chdir = "$$BUILD_WORKING_DIRECTORY",
)
