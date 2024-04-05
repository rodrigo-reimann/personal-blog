import { request, gql } from 'graphql-request';

// Store configuration settings and sensitive information outside of the application code, in an environment variable.
// NEXT_PUBLIC_ prefix indicates that this environment variable will be embedded into the JavaScript 
// bundle and can be accessed on both server and client sides in a Next.js application.
const graphqlAPI = process.env.NEXT_PUBLIC_GRAPHCMS_ENDPOINT;

export const getPosts = async () => {
    // Build query to get posts data from Hygraph API Playground
    const query = gql `
        query MyQuery {
            postsConnection {
                edges {
                    node {
                        createdAt
                        slug
                        title
                        excerpt
                        author {
                            bio
                            name
                            id
                            photo {
                                url
                            }
                        }
                        categories {
                            name
                            slug
                        }
                        featuredImage {
                            url
                        }
                    }
                }
            }
        }      
    `;

    //  Send a request to the GraphQL API endpoint using the GetPosts query
    const result = await request(graphqlAPI, query) 

    return result.postsConnection.edges;
};

export const getPostDetails = async (slug) => {
    // Build query to get posts data from Hygraph API Playground
    const query = gql `
        query GetPostDetails($slug: String!) {
            post(where: { slug: $slug }) {
                createdAt
                slug
                title
                excerpt
                author {
                    bio
                    name
                    id
                    photo {
                        url
                    }
                }
                categories {
                    name
                    slug
                }
                featuredImage {
                    url
                }
                content {
                    raw
                }
            }
        } 
    `;

    //  Send a request to the GraphQL API endpoint using the GetPostDetails query
    const result = await request(graphqlAPI, query, { slug }) 

    return result.post;
};

export const getRecentPosts = async () => {
    const query = gql `
        query GetPostDetails() {
            posts(
                orderBy: createdAt_ASC
                last: 3
            ) {
                title
                featuredImage {
                    url
                }
                createdAt
                slug
            }
        }
    `
    // Send a request to the GraphQL API endpoint using the getRecentPosts query
    const result = await request(graphqlAPI, query);

    return result.posts;
} 

export const getSimilarPosts = async (categories, slug) => {
    // The exclamation mark ! indicates that this variable is required and cannot be null.
    // In this function: don't display the current article, but display some articles in the same category of the current article
    const query = gql `
        query GetPostDetails($slug: String!, $categories: [String!]) {
            posts(
                where: { slug_not: $slug, AND: { categories_some: { slug_in: $categories }}}
                last: 3
            ) {
                title
                featuredImage {
                    url
                }
                createdAt
                slug
            }
        }
    `

    const result = await request(graphqlAPI, query, { categories, slug });

    return result.posts;
}

export const getCategories = async () => {
    const query = gql `
        query GetCategories {
            categories {
                name
                slug
            }
        }
    `

    const result = await request(graphqlAPI, query);

    return result.categories;
}

// This function submits a comment by making a POST request to the server-side endpoint /api/comments
// It is used in the CommentsForm component
export const submitComment = async (commentObj) => {
    console.log(commentObj);
    // Use the Fetch API to make an asynchronous request to the server in /api/comments
    const result = await fetch('/api/comment', {
        // Specify the HTTP request method as POST
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        // Include the comment object as JSON data in the request body
        body: JSON.stringify(commentObj),
    });

    // Parse the JSON response from the server and return it
    return result.json();
}

export const getComments = async (slug) => {
    const query = gql `
        query GetComment($slug: String!) {
            comments(where: {post: {slug: $slug}}) {
                createdAt
                name
                comment
            }
        }

    `
    
    const result = await request (graphqlAPI, query, {slug}); // Passing an object containing the 'slug' variable

    return result.comments;
}

export const getCategoryPost = async (slug) => {
    const query = gql`
      query GetCategoryPost($slug: String!) {
        postsConnection(where: {categories_some: {slug: $slug}}) {
          edges {
            cursor
            node {
              author {
                bio
                name
                id
                photo {
                  url
                }
              }
              createdAt
              slug
              title
              excerpt
              featuredImage {
                url
              }
              categories {
                name
                slug
              }
            }
          }
        }
      }
    `;
      const result = await request(graphqlAPI, query, { slug });

      return result.postsConnection.edges;
    };

    export const getFeaturedPosts = async () => {
        const query = gql `
            query GetFeaturedPosts() {
                posts(where: {featuredPost: true}) {
                    title
                    featuredImage {
                        url
                    }
                    createdAt
                    slug
                }
            }
        `
        // Send a request to the GraphQL API endpoint using the getRecentPosts query
        const result = await request(graphqlAPI, query);
    
        return result.posts;
    } 