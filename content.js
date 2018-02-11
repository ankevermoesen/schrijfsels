/**
 * Get post from contentful and load on blog
 */

// Define Contentful settings
const SPACE_ID = "30sm7jlyiu97";
const ACCESS_TOKEN =
  "1a85d0d283f7bbb726ce290b740a67fdc83a9fb29ec88a3858352225d2d7ca82";
const POSTS_ENDPOINT = `https://cdn.contentful.com/spaces/${SPACE_ID}/entries?access_token=${ACCESS_TOKEN}&content_type=post&order=-sys.createdAt`;

// Init Markdown converter
const converter = new showdown.Converter();

// Fetch posts
fetch(POSTS_ENDPOINT)
  .then(res => res.json())
  .then(posts => {
    renderPosts(posts);
  })
  .catch(error => console.error(error));

// Render posts
const renderPosts = posts => {
  const articlesSection = document.querySelector("section.articles");
  const loaderDiv = document.querySelector("section.articles .loading");
  const postsHtml = posts.items.map(post => getArticleHtml(post.fields));

  // Remove loader
  loaderDiv.remove();

  // Insert html
  articlesSection.insertAdjacentHTML("afterbegin", postsHtml);
};

// Get post html
const getArticleHtml = post => {
  const title = post.title;
  const content = converter.makeHtml(post.content);

  // Define template
  const articleHtml = `
    <article>
      <h1 class="title">${title}</h1>
      <div class="content">
        ${content}
      </div>
    </article>
  `;

  return articleHtml;
};
