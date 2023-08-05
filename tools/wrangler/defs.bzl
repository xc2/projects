load("@wrangler//tools/wrangler:wrangler/package_json.bzl", _bin = "bin")

def pages_deploy(src, project, name = None):
    name = name or "pages_deploy"
    _bin.wrangler_binary(
        name = name,
        data = [src],
        args = [
            "pages",
            "deploy",
            "$(location {})".format(src),
            "--no-bundle",
            "--commit-dirty",
            "--project-name",
            project,
        ],
        tags = ["deliverable"],
    )
