import { ResolversEnhanceMap } from "@generated/type-graphql";
import { MiddlewareFn, UseMiddleware } from "type-graphql";

const addStatus: MiddlewareFn = async (resolver, next) => {
  const { data } = resolver.args;
  const status = "active";
  resolver.args.data = { ...data, status };
  console.log("resolver.args.data", resolver.args.data);
  return await next();
};

export const personResolversEnhanceMap: ResolversEnhanceMap = {
  Person: {
    createOnePerson: [UseMiddleware(addStatus)],
  },
};
