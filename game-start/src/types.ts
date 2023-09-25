import { PossibleNodeConfigType, SurgioInternals } from "surgio/build/types";
import { IRequest, RouterType, UniversalRoute } from "itty-router";

export type ProxyNode = PossibleNodeConfigType & {
  tags?: string[];
  priority?: number;
};

export type ProxyCommon = Omit<PossibleNodeConfigType, keyof SurgioInternals> &
  SurgioInternals & { tags?: string[]; priority?: number };

export type WorkerRouter = RouterType<
  UniversalRoute<IRequest & Request, [Env, ExecutionContext]>
>;
