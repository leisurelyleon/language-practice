// pages/posts/[id].js
import { useRouter } from 'next/router';
import { getPostById } from '../../lib/posts'; // Assume a function to fetch post data

export default function Post({ post }) {
  const router = useRouter();

  if (router.isFallback) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>{post.title}</h1>
      <p>{post.content}</p>
    </div>
  );
}

export async function getStaticPaths() {
  // Assuming fetchPostIds() fetches all available post IDs
  const paths = fetchPostIds().map((id) => ({
    params: { id: id.toString() }
  }));

  return { paths, fallback: true };
}

export async function getStaticProps({ params }) {
  const post = await getPostById(params.id); // Fetch post data by ID

  return {
    props: {
      post
    }
  };
}
