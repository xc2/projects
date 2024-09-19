import { NodeTypeEnum, PossibleNodeConfigType, SurgioInternals } from "surgio/build/types";

export type ProxyNode = PossibleNodeConfigType & {
  key: string;
  tags?: string[];
  priority?: number;
};

export type ProxyCommon = Omit<PossibleNodeConfigType, keyof SurgioInternals> &
  SurgioInternals & { key: string; tags?: string[]; priority?: number };

export type ShadowsocksNode = Extract<ProxyNode, { type: NodeTypeEnum.Shadowsocks }>;

export { NodeTypeEnum };
