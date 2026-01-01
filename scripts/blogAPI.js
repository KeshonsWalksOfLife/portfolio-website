// This function will define the GraphQL query to get the request from 
// Hashnode to get the HTML for the blog post
async function fetchLatestPost() {
    // THE GRAPHQL request format from Hashnode Doc
   const response = await fetch('https://gql.hashnode.com', {
        method : 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            query: `query {
                publication(host: "keshondbowman.hashnode.dev") {
                    title
                    posts(first : 1) {
                            edges {
                                node {
                                    title
                                    brief
                                    slug
                                    coverImage {
                                        url
                                    }
                                    tags {
                                        name
                                        slug   
                                    }
                                    publishedAt
                                    url
                                }
                            }
                        }
                    }    
                }`
        }) 
    })

    // Process the response from the data structure
    const data = await response.json();
    const post = data.data.publication.posts.edges[0].node;

    // Update the HTML
    document.querySelector('.post-title').textContent = post.title;
    document.querySelector('.post-excerpt').textContent = post.brief;

    // Adding a "Read More" link
    const readMoreLink = document.createElement('a');
    readMoreLink.href = post.url;
    readMoreLink.textContent = 'Read Full Post →';
    readMoreLink.className = 'read-more-link';
    readMoreLink.target = '_blank';

    document.querySelector('.post-excerpt').insertAdjacentElement('afterend', readMoreLink);
}

// Calling the function when the page loads
fetchLatestPost();