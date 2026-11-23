import { createHash } from "node:crypto";
const windows = new Map<string, { count: number; reset: number }>();
export async function allowContact(ip: string): Promise<boolean> {
  const key =
    "bitwolf:contact:" + createHash("sha256").update(ip).digest("hex");
  const url = process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN;
  if (url && token) {
    const response = await fetch(url + "/eval", {
      method: "POST",
      headers: {
        Authorization: "Bearer " + token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify([
        "local n = redis.call('INCR', KEYS[1]); if n == 1 then redis.call('EXPIRE', KEYS[1], 600) end; return n",
        1,
        key,
      ]),
      signal: AbortSignal.timeout(5000),
      cache: "no-store",
    });
    if (!response.ok) throw new Error("Rate limit service unavailable");
    const result = await response.json();
    if (typeof result.result !== "number")
      throw new Error("Invalid rate limit response");
    return result.result <= 5;
  }
  if (process.env.NODE_ENV === "production")
    throw new Error("Production rate limiter not configured");
  const now = Date.now();
  for (const [k, v] of windows) {
    if (v.reset < now) windows.delete(k);
  }
  const entry = windows.get(key);
  if (entry && entry.reset > now) {
    entry.count++;
    return entry.count <= 5;
  }
  windows.set(key, { count: 1, reset: now + 600000 });
  return true;
}
