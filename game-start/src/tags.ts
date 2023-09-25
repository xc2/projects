export function hasTag(tags: string[] | undefined, tag: string) {
  return (tags || []).some((item) => item === tag);
}

export function parseTags(tags: string[] | undefined) {
  const map = new URLSearchParams();
  for (const tag of tags || []) {
    const [key, value] = tag.split(":");
    map.append(key, value);
  }
  return map;
}
