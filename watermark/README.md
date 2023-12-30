# demo of rsbuild with bazel

## Dev

```bash
ibazel run //watermark:dev
```

## Build for pro

```bash
bazel build //watermark
```

## Sync Javascript Deps

```bash
bazel configure //watermark
```