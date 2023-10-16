load("@supabase//tools/supabase:supabase/package_json.bzl", _bin = "bin")

def supabase_binary(name, data = [], node_options = [], env = {}, chdir = None, **kwargs):
    _env = dict(**env)
    if chdir != None:
        _env.update({"CUSTOM_ENTRYPOINT_WORKING_DIRECTORY": chdir})
    _bin.supabase_binary(
        name = name,
        data = ["//tools/supabase:entrypoint"] + data,
        node_options = [
            "-e",
            "require('./$(rootpath {})')".format("//tools/supabase:entrypoint"),
        ] + node_options,
        env = _env,
        **kwargs
    )

def supabase_dev(name, command = None, args = [], data = [], **kwargs):
    if command == None:
        command = name

    supabase_binary(
        name = name,
        args = ["--workdir", native.package_name(), command] + args,
        data = ["supabase/config.toml"] + data,
        **kwargs
    )
