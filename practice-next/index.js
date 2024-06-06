// pages/index.js
import Link from 'next/link';

export default function Home() {
  return (
    <div>
      <h1>Welcome to Next.js!</h1>
      <p>Click <Link href="/about"><a>here</a></Link> to go to the About page.</p>
    </div>
  );
}