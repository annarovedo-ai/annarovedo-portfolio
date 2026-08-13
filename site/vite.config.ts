import vinext from "vinext";
import { defineConfig } from "vite";
import hostingConfig from "./.openai/hosting.json";
import { sites } from "./build/sites-vite-plugin";

/**
 * Real D1 database for annarovedo.com, created with `wrangler d1 create`.
 *
 * The template shipped with a placeholder id, which local dev tolerates
 * (Miniflare makes its own sqlite file and ignores the id) but which fails
 * the deploy: Cloudflare checks the database actually exists in the account.
 *
 * Database ids are identifiers, not credentials, so this is fine in the repo.
 */
const D1_DATABASE_ID = "adc05aab-b901-455c-b39d-75b1440c592e";
const D1_DATABASE_NAME = "annarovedo-portfolio";

const { d1, r2 } = hostingConfig;

// macOS Seatbelt blocks FSEvents, so Codex previews need polling for HMR.
const isCodexSeatbeltSandbox = process.env.CODEX_SANDBOX === "seatbelt";

/**
 * Custom domains for the deployed Worker.
 *
 * These were originally attached through the Cloudflare dashboard, which
 * means they lived only in the remote configuration. `wrangler deploy`
 * overwrites remote config with local, so deploying without them listed here
 * silently removes both routes and takes the site off its own domain.
 * Wrangler warns about this, but the safe fix is to declare them.
 */
const routes = [
  {
    pattern: "annarovedo.com",
    zone_name: "annarovedo.com",
    custom_domain: true,
  },
  {
    pattern: "www.annarovedo.com",
    zone_name: "annarovedo.com",
    custom_domain: true,
  },
];

const localBindingConfig = {
  main: "./worker/index.ts",
  compatibility_flags: ["nodejs_compat"],
  routes,
  d1_databases: d1
    ? [
        {
          binding: d1,
          database_name: D1_DATABASE_NAME,
          database_id: D1_DATABASE_ID,
        },
      ]
    : [],
  r2_buckets: r2
    ? [
        {
          binding: r2,
          bucket_name: "site-creator-r2",
        },
      ]
    : [],
};

export default defineConfig(async () => {
  // Keep Wrangler and Miniflare state project-local. These are non-secret tool
  // settings; application environment belongs in ignored `.env*` files.
  process.env.WRANGLER_WRITE_LOGS ??= "false";
  process.env.WRANGLER_LOG_PATH ??= ".wrangler/logs";
  process.env.MINIFLARE_REGISTRY_PATH ??= ".wrangler/registry";

  // Wrangler snapshots its log path while the Cloudflare plugin is imported.
  const { cloudflare } = await import("@cloudflare/vite-plugin");

  return {
    // Vite only exposes VITE_* to client code by default. The contact form
    // uses a NEXT_PUBLIC_* name for familiarity, so allow that prefix too.
    envPrefix: ["VITE_", "NEXT_PUBLIC_"],
    server: isCodexSeatbeltSandbox
      ? { watch: { useFsEvents: false, usePolling: true } }
      : undefined,
    plugins: [
      vinext(),
      sites(),
      cloudflare({
        viteEnvironment: { name: "rsc", childEnvironments: ["ssr"] },
        config: localBindingConfig,
      }),
    ],
  };
});
