/**
 * Cloudflare Pages Function: /feiye/api/dify/*
 * Proxies to Dify Cloud API, injecting the Feiye CI token server-side.
 */
export async function onRequest(context) {
  const { request } = context;

  if (request.method === "OPTIONS") {
    return new Response(null, {
      headers: {
        "Access-Control-Allow-Origin": "https://ci.geodriv.com",
        "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type, Authorization",
      },
    });
  }

  const url = new URL(request.url);
  url.pathname = url.pathname.replace("/feiye/api/dify", "/v1");
  url.hostname = "api.dify.ai";

  const newReq = new Request(url, request);
  newReq.headers.set("Authorization", "Bearer app-690QO6Znw2IvDYBiDRoVBvxL");
  newReq.headers.set("Host", "api.dify.ai");

  const resp = await fetch(newReq);
  const modified = new Response(resp.body, resp);
  modified.headers.set("Access-Control-Allow-Origin", "https://ci.geodriv.com");
  return modified;
}
