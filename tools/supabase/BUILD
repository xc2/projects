load("@supabase//:defs.bzl", "npm_link_all_packages")
load("@supabase//tools/supabase:supabase/package_json.bzl", _bin = "bin")

npm_link_all_packages(name = "node_modules")

a = {
    "_node_wrapper_sh": "wrapper.sh",
}

_bin.supabase_binary(
    name = "supabase",
    chdir = "$$BUILD_WORKING_DIRECTORY",
    env = {
        "JS_BINARY__NODE_WRAPPER": "wrapper.sh",
    },
)
