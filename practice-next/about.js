// pages/about.js
import Link from 'next/link';

export default function About() {
  return (
    <div>
      <h1>About Next.js</h1>
      <p>This is the About page.</p>
      <p>Click <Link href="/"><a>here</a></Link> to go back to the Home page.</p>
    </div>
  );
}
