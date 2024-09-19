load("@npm//:@biomejs/biome/package_json.bzl", biome_bin = "bin")
load("@npm//:defs.bzl", "npm_link_all_packages")

package(default_visibility = ["//visibility:public"])

npm_link_all_packages(name = "node_modules")

biome_bin.biome_binary(
    name = "biome",
    chdir = "$$BUILD_WORKING_DIRECTORY",
)

# gazelle:js_resolve **/*.{svg,css} assets

# gazelle:js_ignore_imports virtual:pwa-register
