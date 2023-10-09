load("@supabase//tools/supabase:supabase/package_json.bzl", _bin = "bin")

_bin.supabase_binary(
    name = "shared",
    args = [
        "start",
        "--workdir",
        ".",
    ],
    data = ["config.toml"],
)
