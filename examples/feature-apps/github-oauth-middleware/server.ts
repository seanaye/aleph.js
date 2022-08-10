import presetUno from "@unocss/preset-uno.ts";
import { serve } from "aleph/server";
import ssr from "aleph/react-ssr";
import { GithubOauth } from "./oauth.ts";
import routes from "./routes/_export.ts";

if (Deno.args.includes("--dev")) {
  // Enable react refresh
  Deno.env.set("REACT_REFRESH", "true");
}

serve({
  baseUrl: import.meta.url,
  router: {
    routes,
  },
  unocss: {
    presets: [
      presetUno(),
    ],
  },
  middlewares: [
    new GithubOauth({
      clientId: Deno.env.get("GITHUB_OAUTH_CLIENT_ID"),
      clientSecret: Deno.env.get("GITHUB_OAUTH_CLIENT_SECRET"),
    }),
  ],
  ssr,
});
