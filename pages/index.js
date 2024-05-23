import { PostCard, Categories, PostWidget } from "@/components";
import FeaturedPosts from "@/components/FeaturedPosts";
import { getPosts } from "@/services";
import Head from "next/head";

export default function Home({posts}) {
  return (
    <div className="container mx-auto px-10 mb-8">
      <Head>
        <title>TechTavern</title>
        {/* <link rel='icon' href='/favicon.ico' /> */}
      </Head>
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        <div className="lg:col-span-8 col-span-1">
          {posts.slice().reverse().map((post) => { // Reverse posts, newer at the top
            return <PostCard post={post.node} key={post.title} />;
          })}
        </div>
        <div className="lg:col-span-4 col-span-1">
          <div className="lg:sticky relative">
            <FeaturedPosts />
            <Categories />
          </div>
        </div>
      </div>
    </div>
  )
}

/* The getStaticProps function in Next.js is used for static generation, which means it 
pre-renders a page at build time. This function gets called at build time in a Next.js application,
and its purpose is to fetch data and pass it as props to the page. It does not run on client side.*/

/*The || [] part ensures that if getPosts() returns a falsy value (like null or undefined), 
posts will be set to an empty array to avoid passing undefined or null to the component props, 
which could lead to errors. */
export async function getStaticProps() {
  const posts = (await getPosts()) || [];

  return {
    props: { posts }
  }
}
