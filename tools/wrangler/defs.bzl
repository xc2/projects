load("@wrangler//tools/wrangler:wrangler/package_json.bzl", _bin = "bin")
load("@aspect_rules_esbuild//esbuild:defs.bzl", _esbuild = "esbuild")
load("@aspect_rules_js//js:defs.bzl", "js_library", "js_run_devserver", "js_test")

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

def worker(src, platform = "browser", data = [], dev_data = [], bundle = {}, dev = {}):
    _esbuild(
        name = "bundle",
        srcs = [src],
        entry_point = "{}:worker.js".format(src),
        format = "esm",
        output = "worker.js",
        target = "es2022",
        platform = platform,
        **bundle
    )
    _bin.wrangler_binary(
        name = "_wrangler_dev",
        chdir = native.package_name(),
        fixed_args = [
            "dev",
            "--persist-to",
            "$$BUILD_WORKSPACE_DIRECTORY/{}/.devstate".format(native.package_name()),
        ]
    )

    js_run_devserver(
        name = "dev",
        data = [
            ":bundle",
            "wrangler.toml"
        ] + data + dev_data,
        args = [
            "--no-bundle",
            "--ip",
            "127.0.0.1",
            "worker.js",
        ],
        tool = ":_wrangler_dev",
        **dev
    )

    _bin.wrangler_binary(
        name = "deploy",
        chdir = native.package_name(),
        data = [":bundle", "wrangler.toml"],
        args = [
            "deploy",
            "--no-bundle",
            "worker.js",
        ],
        tags = ["deliverable"],
    )

    _bin.wrangler_binary(
        name = "deploy_staging",
        chdir = native.package_name(),
        data = [":bundle", "wrangler.toml"] + data,
        args = [
            "deploy",
            "--no-bundle",
            "worker.js",
            "--env",
            "staging"
        ],
        tags = ["deliverable"],
    )
