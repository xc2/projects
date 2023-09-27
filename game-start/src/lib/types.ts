import { PossibleNodeConfigType, SurgioInternals } from "surgio/build/types";

export type ProxyNode = PossibleNodeConfigType & {
  tags?: string[];
  priority?: number;
};

export type ProxyCommon = Omit<PossibleNodeConfigType, keyof SurgioInternals> &
  SurgioInternals & { tags?: string[]; priority?: number };
