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

def worker(src, platform = "browser", format = "esm", data = [], dev_data = [], dev = {}):
    _bin.wrangler_binary(
        name = "_wrangler_dev",
        chdir = native.package_name(),
        fixed_args = [
            "dev",
            "--persist-to",
            "$$BUILD_WORKSPACE_DIRECTORY/{}/.devstate".format(native.package_name()),
        ],
    )

    js_run_devserver(
        name = "dev",
        data = [
            src,
            "wrangler.toml",
        ] + data + dev_data,
        args = [
            "--ip",
            "127.0.0.1",
            "src/worker.js",
        ],
        tool = ":_wrangler_dev",
        **dev
    )

    _bin.wrangler_binary(
        name = "deploy",
        chdir = native.package_name(),
        data = [src, "wrangler.toml"],
        args = [
            "deploy",
            "src/worker.js",
        ],
        tags = ["deliverable"],
    )

    _bin.wrangler_binary(
        name = "deploy_staging",
        chdir = native.package_name(),
        data = [src, "wrangler.toml"] + data,
        args = [
            "deploy",
            "src/worker.js",
            "--env",
            "staging",
        ],
        tags = ["deliverable"],
    )
