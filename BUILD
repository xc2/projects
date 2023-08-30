load("@npm//:defs.bzl", "npm_link_all_packages")
load("@npm//:prettier/package_json.bzl", prettier_bin = "bin")
load("@npm//:eslint/package_json.bzl", eslint_bin = "bin")

package(default_visibility = ["//visibility:public"])

npm_link_all_packages(name = "node_modules")

prettier_bin.prettier_binary(
    name = "prettier",
    chdir = "$$BUILD_WORKING_DIRECTORY",
)

eslint_bin.eslint_binary(
    name = "eslint",
    chdir = "$$BUILD_WORKING_DIRECTORY",
)

## gazelle:js_validate_import_statements off

# gazelle:js_resolve **/*.{svg,css} assets
