load("@drizzle//tools/drizzle:drizzle-kit/package_json.bzl", _bin = "bin")

def gendb(name, src, type = "sqlite", outdir = "migrations", data = [], orm_package = ":node_modules/drizzle-orm"):
    _bin.drizzle_kit_binary(
        name = name,
        data = [orm_package] + [src] + data,
        chdir = "$$BUILD_WORKSPACE_DIRECTORY",
        args = [
            "generate",
            "--dialect",
            type,
            "--schema",
            "$(execpath {})".format(src),
            "--out",
            "{}/{}".format(native.package_name(), outdir),
        ],
    )
