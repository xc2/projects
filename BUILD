load("@npm//:defs.bzl", "npm_link_all_packages")
load("@aspect_rules_js//npm:repositories.bzl", "npm_import")
load("@aspect_rules_js//js:defs.bzl", "js_binary", "js_test")
load("@npm//:prettier/package_json.bzl", prettier_bin = "bin")
load("@npm//:pretty-quick/package_json.bzl", pretty_quick_bin = "bin")

npm_link_all_packages(name = "node_modules")

prettier_bin.prettier_binary(
    name = "prettier",
    chdir = "$$BUILD_WORKING_DIRECTORY",
)

# gazelle:js_validate_import_statements off
