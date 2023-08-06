load("@shadcn//:defs.bzl", "npm_link_all_packages")
load("@shadcn//tools/shadcn:shadcn-ui/package_json.bzl", "bin")

npm_link_all_packages(name = "node_modules")

bin.shadcn_ui_binary(
    name = "shadcn",
    chdir = "$$BUILD_WORKING_DIRECTORY",
)
