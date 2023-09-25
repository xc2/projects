load("@jsts//tools/jsts:tsconfig-to-swcconfig/package_json.bzl", t2s_bin = "bin")

load("@aspect_rules_ts//ts:defs.bzl", _ts_config = "ts_config", _ts_project = "ts_project")
load("@aspect_rules_swc//swc:defs.bzl", "swc")
load("@bazel_skylib//lib:partial.bzl", "partial")

def ts_config(name, src, visibility = [":__subpackages__"], **kwargs):
    swcrc_rule = "{}_swcrc".format(name);
    swcrc_file = "{}.swcrc".format(name);
    _ts_config(
        name = name,
        src = src,
        visibility = visibility,
        **kwargs,
    )
    t2s_bin.t2s(
        name = swcrc_rule,
        srcs = [src],
        args = [
            "--filename",
            "$(location {})".format(src),
        ],
        stdout = swcrc_file,
        visibility = visibility,
    )

def ts_project(tsconfig = ":tsconfig", swcrc = None, visibility = ["//visibility:public"], deps = [], **kwargs):
    if swcrc == None:
        swcrc = "{}.swcrc".format(tsconfig)

    _ts_project(
        tsconfig = tsconfig,
        transpiler = partial.make(swc, swcrc = swcrc, data = deps),
        declaration = True,
        visibility = visibility,
        deps = deps,
        **kwargs,
    )