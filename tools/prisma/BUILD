load("@prisma//:defs.bzl", "npm_link_all_packages")
load("@prisma//tools/prisma:prisma/package_json.bzl", _bin = "bin")

npm_link_all_packages(name = "node_modules")

_bin.prisma_binary(
    name = "prisma",
    chdir = "$$BUILD_WORKING_DIRECTORY",
)
