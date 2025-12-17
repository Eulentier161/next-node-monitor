export async function register() {
  if (process.env.NEXT_RUNTIME === "nodejs") {
    const requiredEnvVars = [
      "METADATA_NAME",
      "METADATA_SHORT_NAME",
      "METADATA_DESCRIPTION",
      "NODE_REPRESENTATIVE",
      "NODE_NAME",
      "NODE_LOCATION",
      "NODE_RPC_HOST",
      "NODE_RPC_PORT",
      "NODE_TCP_PORT",
      "CACHE_TIME",
      "HEADING_TEXT",
    ];

    for (const key of requiredEnvVars) {
      const value = process.env[key];
      if (typeof value !== "string" || value.length === 0) {
        console.error(`Environment variable ${key} is unset`);
        process.exit(1);
      }
    }
  }
}
