import assert from "node:assert/strict";
const root = process.env.TEST_SITE_URL || "http://localhost:3000";
const home = await (await fetch(root)).text();
const paths = [
  ...new Set([...home.matchAll(/href="(\/[^"#?]*)/g)].map((m) => m[1])),
];
for (const path of paths) {
  const response = await fetch(root + path);
  assert.equal(response.status, 200, path);
}
assert.equal((await fetch(root + "/missing-page")).status, 404);
assert.equal((await fetch(root + "/sitemap.xml")).status, 200);
assert.equal((await fetch(root + "/robots.txt")).status, 200);
console.log(
  `Verified ${paths.length} internal routes, custom 404, sitemap, and robots.`,
);
const valid = {
  name: "QA Test",
  company: "",
  email: "qa@example.com",
  phone: "",
  service: "business-automation",
  budget: "",
  message: "This is a local website quality assurance test.",
  preferred: "Email",
  consent: true,
  website: "",
  requestId: crypto.randomUUID(),
};
const cases = [
  ["missing name", { ...valid, name: "" }, 400],
  ["invalid email", { ...valid, email: "invalid" }, 400],
  ["no consent", { ...valid, consent: false }, 400],
  ["short message", { ...valid, message: "Hi" }, 400],
  ["invalid service", { ...valid, service: "bogus" }, 400],
  ["honeypot", { ...valid, website: "bot" }, 400],
  ["phone required", { ...valid, preferred: "Phone" }, 400],
  ["invalid phone", { ...valid, phone: "abcdefghi" }, 400],
  ["invalid budget", { ...valid, budget: "bogus" }, 400],
  ["invalid request ID", { ...valid, requestId: "bad" }, 400],
];
for (const [name, body, status] of cases) {
  const response = await fetch(root + "/api/contact", {
    method: "POST",
    headers: { "Content-Type": "application/json", origin: root },
    body: JSON.stringify(body),
  });
  assert.equal(response.status, status, name);
}
const denied = await fetch(root + "/api/contact", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    origin: "https://example.net",
  },
  body: JSON.stringify(valid),
});
assert.equal(denied.status, 403);
const huge = await fetch(root + "/api/contact", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ ...valid, message: "x".repeat(21000) }),
});
assert.equal(huge.status, 413);
const malformed = await fetch(root + "/api/contact", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: "{",
});
assert.equal(malformed.status, 400);
const unsupported = await fetch(root + "/api/contact", {
  method: "POST",
  headers: { "Content-Type": "text/plain" },
  body: "text",
});
assert.equal(unsupported.status, 415);
console.log(
  `Verified ${cases.length + 4} enquiry validation and security cases. No email was sent.`,
);
const { allowContact } = await import("../src/lib/rate-limit.ts");
const ip = "local-qa-" + crypto.randomUUID();
for (let i = 0; i < 5; i++) assert.equal(await allowContact(ip), true);
assert.equal(await allowContact(ip), false);
assert.equal(await allowContact(ip + "-separate"), true);
console.log("Verified rate limiter threshold and client isolation.");
