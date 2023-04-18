// Basic Blog Engine: Build a simple blog engine that allows users to create, read, update, and delete blog posts using Node.js' built-in http module and a basic templating engine.
// Basic Blog Engine: Build a simple blog engine that allows users to create, read, update, and delete blog posts using Node.js' built-in http module and a basic templating engine.

const http = require('http');
const url = require('url');
const fs = require('fs');

class BlogEngine {
  constructor() {
    this.blogPosts = [];
  }

  start(port) {
    const server = http.createServer((req, res) => {
      const parsedUrl = url.parse(req.url, true);

      if (req.method === 'GET' && parsedUrl.pathname === '/') {
        this.renderHomePage(res);
      } else if (req.method === 'POST' && parsedUrl.pathname === '/create') {
        this.handlePostCreation(req, res);
      } else if (req.method === 'GET' && parsedUrl.pathname.startsWith('/post/')) {
        this.renderBlogPostPage(parsedUrl, res);
      } else if (req.method === 'POST' && parsedUrl.pathname.startsWith('/update/')) {
        this.handlePostUpdate(parsedUrl, req, res);
      } else if (req.method === 'POST' && parsedUrl.pathname.startsWith('/delete/')) {
        this.handlePostDeletion(parsedUrl, res);
      } else {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.write('404 Not Found');
        res.end();
      }
    });

    server.listen(port, () => {
      console.log(`Server is running on http://localhost:${port}`);
    });
  }

  renderHomePage(res) {
    let postsHtml = '';
    for (let i = 0; i < this.blogPosts.length; i++) {
      postsHtml += `<li><a href="/post/${i}">${this.blogPosts[i].title}</a></li>`;
    }
    const template = `
      <html>
        <head>
          <title>Blog Engine</title>
        </head>
        <body>
          <h1>Welcome to the Blog Engine</h1>
          <h2>Blog Posts</h2>
          <ul>
            ${postsHtml}
          </ul>
          <h2>Create New Post</h2>
          <form method="post" action="/create">
            <label for="title">Title:</label>
            <input type="text" id="title" name="title">
            <br>
            <label for="content">Content:</label>
            <textarea id="content" name="content"></textarea>
            <br>
            <input type="submit" value="Create Post">
          </form>
        </body>
      </html>
    `;
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.write(template);
    res.end();
  }

  handlePostCreation(req, res) {
    let body = '';
    req.on('data', (chunk) => {
      body += chunk;
    });
    req.on('end', () => {
      const postParams = new URLSearchParams(body);
      const title = postParams.get('title');
      const content = postParams.get('content');
      this.blogPosts.push({ title, content });
      res.writeHead(302, { 'Location': '/' });
      res.end();
    });
  }

  renderBlogPostPage(parsedUrl, res) {
    const postId = parseInt(parsedUrl.pathname.substring(6));
    if (postId >= 0 && postId < this.blogPosts.length) {
      const post = this.blogPosts[postId];
      const template = `
        <html>
          <head>
            <title>${post.title}</title>
          </head>
          <body>
            <h1>${post.title}</h1>
            <p>${post.content}</p>
<h2>Edit Post</h2>
<form method="post" action="/update/${postId}">
<label for="title">Title:</label>
<input type="text" id="title" name="title" value="${post.title}">
<br>
<label for="content">Content:</label>
<textarea id="content" name="content">${post.content}</textarea>
<br>
<input type="submit" value="Update Post">
</form>
<h2>Delete Post</h2>
<form method="post" action="/delete/${postId}">
<input type="submit" value="Delete Post">
</form>
</body>
</html>
`;
      res.writeHead(200, { 'Content-Type': 'text/html' });
      res.write(template);
      res.end();
    } else {
      res.writeHead(404, { 'Content-Type': 'text/plain' });
      res.write('404 Not Found');
      res.end();
    }
  }

  handlePostUpdate(parsedUrl, req, res) {
    const postId = parseInt(parsedUrl.pathname.substring(8));
    if (postId >= 0 && postId < this.blogPosts.length) {
      let body = '';
      req.on('data', (chunk) => {
        body += chunk;
      });
      req.on('end', () => {
        const postParams = new URLSearchParams(body);
        const title = postParams.get('title');
        const content = postParams.get('content');
        this.blogPosts[postId] = { title, content };
        res.writeHead(302, { 'Location': `/post/${postId}` });
        res.end();
      });
    } else {
      res.writeHead(404, { 'Content-Type': 'text/plain' });
      res.write('404 Not Found');
      res.end();
    }
  }


  handlePostDeletion(parsedUrl, req, res) {
    const postId = parseInt(parsedUrl.pathname.substring(8));
    if (postId >= 0 && postId < this.blogPosts.length) {
      // Delete the blog post from the array
      this.blogPosts.splice(postId, 1);
      res.end();
    } else {
      res.writeHead(404, { 'Content-Type': 'text/plain' });
      res.write('404 Not Found');
      res.end();
    }
  }
}

const blogEngine = new BlogEngine();
blogEngine.start(8080);
