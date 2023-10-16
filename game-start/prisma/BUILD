load("//tools/prisma:defs.bzl", "prisma_binary")

prisma_binary(
    name = "validate",
    env = {
    },
)

prisma_binary(
    name = "migrate",
    args = ["--create-only"],
    command = "migrate dev",
    env = {
    },
)

prisma_binary(
    name = "push",
    command = "db push",
    env = {
    },
)
