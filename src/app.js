import express from "express";
import bodyParser from "body-parser";
import path from "path";
import { dirname } from "path";
import { fileURLToPath } from "url";


const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const app = express();
const port = 3000;


app.set('views', path.join(__dirname, 'views'));
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const blogPosts = [];

app.get("/", (req, res) => {
  res.render("home", { blogPosts });
});
app.get("/list", (req, res) => {
  res.render("list", { blogPosts });
});

app.get("/create", (req, res) => {
  res.render("create");
});

app.post("/create", (req, res) => {
  const { title, content } = req.body;
  const newPost = { id: Date.now(), title, content };
  blogPosts.push(newPost);
  res.redirect("/list");
});

app.get("/posts/:id/edit", (req, res) => {
  const postId = parseInt(req.params.id);
  const postToEdit = blogPosts.find((post) => post.id === postId);

  if (!postToEdit) {
    res.redirect("/");
  } else {
    res.render("edit", { post: postToEdit });
  }
});

app.post("/posts/:id/edit", (req, res) => {
  const postId = parseInt(req.params.id);
  const postToEdit = blogPosts.find((post) => post.id === postId);

  if (!postToEdit) {
    res.redirect("/");
  } else {
    const { title, content } = req.body;

    postToEdit.title = title;
    postToEdit.content = content;
    res.redirect("/");
  }
});

app.get("/posts/:id/delete", (req, res) => {
  const postId = parseInt(req.params.id);
  const postIndex = blogPosts.findIndex((post) => post.id === postId);

  if (postIndex === -1) {
    res.redirect("/");
  } else {
    blogPosts.splice(postIndex, 1);
    res.redirect("/");
  }
});

app.get("/posts/:id", (req, res) => {
  const postId = parseInt(req.params.id);
  const postToView = blogPosts.find((post) => post.id === postId);

  if (!postToView) {
    res.redirect("/");
  } else {
    res.render("view", { post: postToView });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
