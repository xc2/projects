import { getClashNodes } from "./surgio/utils/clash";
import { ProxyNode, ShadowsocksNode, NodeTypeEnum } from "./lib";
import { hasTag } from "./tags";

function isShadowsocksNode(node: ProxyNode): node is ShadowsocksNode {
  return node.type === NodeTypeEnum.Shadowsocks;
}

export function getClashConfig(nodes: ProxyNode[]) {
  const _nodes = nodes.filter(
    (node) => node.enable !== false && !hasTag(node.tags, "clash:no"),
  );
  const clashProxies = getClashNodes(_nodes);
  return {
    proxy: [...clashProxies],
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
