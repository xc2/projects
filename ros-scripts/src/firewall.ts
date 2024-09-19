export function getFirewallListScript({
  name,
  list,
  listName,
  force,
}: {
  name: string;
  list: string[];
  listName?: string;
  force?: boolean;
}) {
  listName = listName || name;

  if (force) {
    return `/ip firewall address-list
remove [find where list="${listName}"]

${list.map((v) => `add address="${v}" list="${listName}"`).join("\n")}
`;
  }

  const comment = `${name}`;

  return `/ip firewall address-list
remove [find where comment="${comment}"]

${list.map((v) => `add address="${v}" list="${listName}" comment="${comment}"`).join("\n")}
`;
}
