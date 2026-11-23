import Link from "next/link";
export default function NotFound() {
  return (
    <section className="container error-page">
      <span>404</span>
      <h1>A little off the path.</h1>
      <p>
        The page you’re looking for may have moved, or the address may be
        incorrect.
      </p>
      <Link href="/" className="button">
        Back to Home
      </Link>
    </section>
  );
}
