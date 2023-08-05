load("@lint//:defs.bzl", "npm_link_all_packages")
load("@lint//tools/lint:husky/package_json.bzl", husky_bin = "bin")
load("@lint//tools/lint:lint-staged/package_json.bzl", lint_staged_bin = "bin")

npm_link_all_packages(name = "node_modules")

husky_bin.husky_binary(
    name = "husky",
    chdir = "$$BUILD_WORKING_DIRECTORY",
)

lint_staged_bin.lint_staged_binary(
    name = "lint-staged",
    chdir = "$$BUILD_WORKING_DIRECTORY",
)
