load("@prisma//tools/prisma:prisma/package_json.bzl", _bin = "bin")

def prisma_binary(name, schema = "schema.prisma", command = None, data = [], args = [], **kwargs):
    command = command or name

    schema_args = ["--schema", schema]

    _bin.prisma_binary(
        name = name,
        chdir = "$$BUILD_WORKSPACE_DIRECTORY/{}".format(native.package_name()),
        args = [command] + schema_args + args,
        data = data,
        **kwargs
    )
