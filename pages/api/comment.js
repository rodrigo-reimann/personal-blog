/** *************************************************************
* Any file inside the folder pages/api is mapped to /api/* and  *
* will be treated as an API endpoint instead of a page.         *
*************************************************************** */

// This api endpoint is used to handle the logic for the CommentsForm

/* The authentication token allows clients to authenticate with your GraphQL API and perform 
authorized actions like creating comments. The use of a permanent auth token in your code allows 
any user with access to the token to post comments.  */

import { GraphQLClient, gql } from "graphql-request";

// Retrieve GraphQL API endpoint from environment variable
const graphqlAPI = process.env.NEXT_PUBLIC_GRAPHCMS_ENDPOINT;

export default async function comments(req, res) {
  const graphQLClient = new GraphQLClient(graphqlAPI, {
    headers: {
      authorization: `Bearer ${process.env.GRAPHCMS_TOKEN}`,
    },
  });

  // When a new model is added to your project, so are custom GraphQL mutations, like createComment. 
  // For more information visit: https://hygraph.com/docs/api-reference/content-api/mutations
  const query = gql `
    mutation CreateComment($name: String!, $email: String!, $comment: String!, $slug: String!) {
      createComment(data: {
        name: $name, 
        email: $email, 
        comment: $comment, 
        post: { connect: { slug: $slug }}
      }) { 
          id 
      }
    }
  `;
  try {
    // Send the GraphQL mutation request using the GraphQL client instance
    const result = await graphQLClient.request(query, req.body);
    // Send the result of the mutation as the response to the client. 200 = success
    return res.status(200).send(result);
  } catch(error) {
    console.log(error);
    return res.status(500).send(error);
  }
}
