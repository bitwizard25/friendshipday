import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  route("shobhana", "routes/shobhana.tsx"),
  route("lost-place", "routes/lost-place.tsx"),
  route("friendlist-removed", "routes/friendlist-removed.tsx"),
] satisfies RouteConfig;
