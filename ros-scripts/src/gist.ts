export async function getCIDRList(name: string, noAutoPrefix = false) {
  const res = await fetch(
    `https://gist.githubusercontent.com/xc2/10775fab2ad1edad0ad31e0b80774180/raw/${name}.txt`,
  );
  const content = await res.text();
  const r = content.split(/\s+/g).filter(Boolean);

  if (noAutoPrefix) return r;
  return r.map((item) => {
    return item.includes("/") ? item : `${item}/32`;
  });
}
