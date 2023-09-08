load("@pwa//:defs.bzl", "npm_link_all_packages")
load("@pwa//tools/pwa:@vite-pwa/assets-generator/package_json.bzl", generator = "bin")

npm_link_all_packages(name = "node_modules")

generator.pwa_assets_generator_binary(
    name = "gen",
    chdir = "$$BUILD_WORKING_DIRECTORY",
)
