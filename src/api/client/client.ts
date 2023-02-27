import { getClient, Client } from "@tauri-apps/api/http";

let client: Client;

export async function singletonClient() {
  if (client) {
    return client;
  }
  client = await getClient();
  return client;
}
