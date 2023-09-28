import { getClashNodes } from "./surgio/utils/clash";
import { ProxyNode, ShadowsocksNode, NodeTypeEnum } from "./lib";
import { hasTag } from "./tags";
import { getQuantumultXNodes } from "./surgio/utils/quantumult";

function isShadowsocksNode(node: ProxyNode): node is ShadowsocksNode {
  return node.type === NodeTypeEnum.Shadowsocks;
}

export function getQuantumultXConfig(nodes: ProxyNode[]) {
  const _nodes = nodes.filter(
    (node) => node.enable !== false && !hasTag(node.tags, "quantumult:no"),
  );
  const proxies = getQuantumultXNodes(_nodes);
  return `
[general]

[dns]
;no-system
server=223.5.5.5
server=114.114.114.114
server=8.8.8.8
server=1.1.1.1
server=208.67.222.222:5353

[server_local]
${proxies.map(([_, row]) => row).join("\n")}

[policy]
available=fallback, ${proxies.map(([tag]) => tag).join(", ")}

[filter_local]
host-suffix, 109cafe.org, direct
host-suffix, local, direct
ip-cidr, 10.0.0.0/8, direct
ip-cidr, 127.0.0.0/8, direct
ip-cidr, 172.16.0.0/12, direct
ip-cidr, 192.168.0.0/16, direct
ip-cidr, 224.0.0.0/24, direct
ip-cidr, 17.0.0.0/8, direct
ip-cidr, 100.64.0.0/10, direct
geoip, cn, direct
final, fallback

[server_remote]
[rewrite_remote]
[filter_remote]
[rewrite_local]
[task_local]
[mitm]
`;
}

export function getClashConfig(nodes: ProxyNode[]) {
  const _nodes = nodes.filter(
    (node) => node.enable !== false && !hasTag(node.tags, "clash:no"),
  );
  const clashProxies = getClashNodes(_nodes);
  return {
    proxies: [...clashProxies],
    "proxy-groups": [
      {
        name: "auto",
        type: "fallback",
        interval: 300,
        url: "http://www.gstatic.com/generate_204",
        proxies: _nodes.map((item) => item.nodeName),
      },
    ],
    rules: [
      "DOMAIN-SUFFIX,109cafe.org,DIRECT",
      "DOMAIN-SUFFIX,local,DIRECT",
      "IP-CIDR,127.0.0.0/8,DIRECT",
      "IP-CIDR,172.16.0.0/12,DIRECT",
      "IP-CIDR,192.168.0.0/16,DIRECT",
      "IP-CIDR,10.0.0.0/8,DIRECT",
      "IP-CIDR,224.0.0.0/24,DIRECT",
      "IP-CIDR,17.0.0.0/8,DIRECT",
      "IP-CIDR,100.64.0.0/10,DIRECT",
      "GEOIP,CN,DIRECT",
      "MATCH,auto",
    ],
  };
}

export function getShadowRocketConfig(nodes: ProxyNode[]) {
  return {
    version: 1,
    remarks: "请勿共享",
    servers: nodes.filter(isShadowsocksNode).map((node) => {
      const r: any = {
        id: node.key,
        remarks: node.nodeName,
        server: node.hostname,
        server_port: node.port,
        password: node.password,
        method: node.method,
      };
      if (node.udpRelay) {
        r.mode = "tcp_and_udp";
      }
      return r;
    }),
  };
}
