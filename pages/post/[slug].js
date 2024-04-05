/* This file is an attribute of Next.js called "File-based routing". With this, you don't need to 
    do all the routing inside of the _app.js using react-router-DOM. With Next.js, you can put 
    your files where you want them to be structured later in the actual URL. 

    For example, pages>index.js will show as the Home (localhost:3000). 
    By creating the folder "post", when the user visits a post, the page will be localhost:3000/post.
    By creating a file inside this folder named [slug].js, the post URL will be
    localhost:3000/post/slug.

    [slug].js is a dynamic file.
*/

import React from "react";

import { getPosts, getPostDetails } from '../../services';
import { PostDetail, Categories, PostWidget, Author, Comments, CommentsForm } from "@/components";

const PostDetails = ({ post }) => {
    return (
        <div className="container mx-auto px-10 mb-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                <div className="col-span-1 lg:col-span-8">
                    <PostDetail post={post} />
                    <Author author={post.author} />
                    <CommentsForm slug={post.slug} />
                    <Comments slug={post.slug} />
                </div>
                <div className="col-span-1 lg:col-span-4">
                    <div className="relative lg:sticky top-8">
                        <PostWidget slug={post.slug} categories={post.categories.map((category) => category.slug)} />
                        <Categories />
                    </div>
                </div>
            </div>

        </div>
    )
}

export default PostDetails

// This is an asynchronous function named getStaticProps, which is a special Next.js function
// used for static generation. It fetches data at build time and passes it as props to the page.
export async function getStaticProps({ params }) {
    const data = await getPostDetails(params.slug); // // Destructuring to get the 'slug' from the params object.

    // The function returns an object with a props property.
    // This props object will be passed to the PostDetails component as props.
    // In this case, it passes 'post', which contains the fetched data.
    return {
        props : { post: data }
    }
}

// This function is specifically used in Next.js to pre-determine the paths that will be 
// statically generated.
export async function getStaticPaths() {
    const posts = await getPosts();

    // The function returns an object with a 'paths' property.
    // This 'paths' property is an array constructed by mapping over the 'posts' array.

    // Each item in 'paths' is an object with a 'params' property.
    // 'params' should mirror the dynamic [slug].js routing
    return {
        paths: posts.map(({ node: { slug }}) => ({params: { slug }})),
        fallback: false
    }
}