load("@aspect_rules_js//js:defs.bzl", "js_library")
load("@supabase//:defs.bzl", "npm_link_all_packages")
load("@supabase//tools/supabase:supabase/package_json.bzl", _bin = "bin")
load(":defs.bzl", "supabase_binary")

npm_link_all_packages(name = "node_modules")

supabase_binary(
    name = "supabase",
    chdir = "$$BUILD_WORKING_DIRECTORY",
)

js_library(
    name = "entrypoint",
    srcs = ["entrypoint.js"],
    visibility = ["//visibility:public"],
)
