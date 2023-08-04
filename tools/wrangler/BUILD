load("@wrangler//:defs.bzl", "npm_link_all_packages")
load("@wrangler//tools/wrangler:wrangler/package_json.bzl", _bin = "bin")

npm_link_all_packages(name = "node_modules")

_bin.wrangler_binary(
    name = "wrangler",
    chdir = "$$BUILD_WORKING_DIRECTORY",
)
