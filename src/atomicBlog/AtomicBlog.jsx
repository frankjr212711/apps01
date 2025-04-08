import { useEffect, useState, memo, useMemo, useCallback } from "react";

import "./AtomicBlog.css";
import { faker } from "@faker-js/faker";
import Spinner from "../Spinner";
import Message from "../Message";
import Button from '../Button'

const BASE_URL = "http://localhost:7000";

function createRandomPost() {
  return {
    title: `${faker.hacker.adjective()} ${faker.hacker.noun()}`,
    body: faker.hacker.phrase(),
  };
}

function createRandomUser() {
  return {
    userId: faker.string.uuid(),
    username: faker.internet.username(), // before version 9.1.0, use userName()
    email: faker.internet.email(),
    avatar: faker.image.avatar(),
    password: faker.internet.password(),
    birthdate: faker.date.birthdate(),
    registeredAt: faker.date.past(),
  };
}

function AtomicBlog() {
  const [posts, setPosts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [isFakeDark, setIsFakeDark] = useState(false);

  const searchedPosts =
    searchQuery.length > 0
      ? posts.filter((post) =>
          `${post.title} ${post.body}`.toLowerCase().includes(searchQuery)
        )
      : posts;

  const createPost = useCallback(async function createPost(post) {
    try {
      setLoading(true);
      const res = await fetch(`${BASE_URL}/posts`, {
        method: "POST",
        body: JSON.stringify(post),
        headers: { "Content-type": "application/json" },
      });

      const data = await res.json();
      setPosts((posts) => [...posts, data]);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  }, [])

  async function deletePost(id) {
    await fetch(`${BASE_URL}/posts/${id}`, {
      method: "DELETE",
    });
    setPosts((posts) => posts.filter((post) => post.id !== id));
  }
  function clearPosts() {
    setPosts([]);
  }

  useEffect(() => {
    async function fetchPost() {
      try {
        setLoading(true);
        const res = await fetch(`${BASE_URL}/posts`);
        const data = await res.json();

        if (!data) throw new Error("unable to fetch posts data");

        setPosts(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchPost();
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle("fake-dark-mode");
  }, [isFakeDark]);

  const archiveOptions = useMemo(() => {
    return { 
      show: false, 
      title: `Post archive in addition to ${posts.length} main posts` };
  }, [posts]);


  return (
    <div className="atomic-blog">
      <button
        className="darkModeBtn"
        onClick={() => setIsFakeDark((isDark) => !isDark)}
      >
        {isFakeDark ? "🌞" : "🌚"}
      </button>
      <Header
        posts={searchedPosts}
        clearPosts={clearPosts}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />
      <Main
        deletePost={deletePost}
        searchedPosts={searchedPosts}
        createPost={createPost}
        loading={loading}
        error={error}
      />
      <Archive
        createPost={createPost}
        loading={loading}
        clearPosts={clearPosts}
        // posts={posts}
        // deletePost={deletePost}
        // show={false}
        archiveOptions={archiveOptions}
      />
      <Footer />
    </div>
  );
}
function Header({ posts, clearPosts, searchQuery, setSearchQuery }) {
  return (
    <header className="header">
      <h4>
        <span>🪮</span>
        Atomic-Blog
      </h4>
      <Results posts={posts} />
      <div className="row">
        <SearchPost searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
        <ClearPosts clearPosts={clearPosts} />
      </div>
    </header>
  );
}
function Results({ posts }) {
  return <h6>{posts.length} post found.</h6>;
}
function SearchPost({ searchQuery, setSearchQuery }) {
  return (
    <input
      type="search"
      placeholder="search post"
      value={searchQuery}
      onChange={(e) => setSearchQuery(e.target.value)}
    />
  );
}
function ClearPosts({ clearPosts }) {
  return <Button onClick={clearPosts} type='teal'>Clear post</Button>;
}
function Main({ searchedPosts, createPost, deletePost, error, }) {
  return (
    <main>
      <AddForm createPost={createPost} />
      <List posts={searchedPosts} deletePost={deletePost} error={error} />
    </main>
  );
}
function AddForm({ createPost }) {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    if (!title && !body) return;
    createPost({
      title,
      body,
    });
    setTitle("");
    setBody("");
  }
  return (
    <form action="" onSubmit={handleSubmit} className="atomic-form">
      <div className="row">
        <input
          type="text"
          placeholder="post title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          placeholder="post body"
          value={body}
          onChange={(e) => setBody(e.target.value)}
        />
        <button>Add post</button>
      </div>
    </form>
  );
}
function List({ posts, deletePost, loading, error }) {

  if(loading) return <Spinner/>
  
  if(error) return <Message message={error}/>

  return (
    <ul className="list">
      {posts.map((post) => (
        <ListItem post={post} deletePost={deletePost} key={post.id} />
      ))}
    </ul>
  );
}
function ListItem({ post, deletePost }) {
  const { title, body, id } = post;
  return (
    <li>
      <h4>{title}</h4>
      <p>{body}</p>
      <span className="delBtn" onClick={() => deletePost(id)}>
        &times;
      </span>
    </li>
  );
}
const Archive = memo(function Archive({ show, archiveOptions, createPost, loading, clearPosts }) {
  const [posts] = useState(() =>
    Array.from({ length: 1000 }, () => createRandomPost())
  );
  const [users] = useState(() =>
    Array.from({ length: 500 }, () => createRandomUser())
  );
  const [showArchive, setShowArchive] = useState(archiveOptions.show);

  // if(loading) return <Spinner/>


  return (
    <aside className="archive">
      <div className="archive-btns">
      <Button type='primary' onClick={() => setShowArchive((show) => !show)}>
        {showArchive ? "Hide archive posts" : "Show archive posts"}
      </Button>

      {/* <Button onClick={clearPosts}>Clear archive</Button> */}
      </div>
      <h2>{archiveOptions.title}</h2>

      {showArchive && (
        <>
          <ul>
            {posts.map((post, idx) => (
              <li key={idx}>
                <h6>
                  {idx < 9 && 0}
                  {idx + 1}.
                </h6>
                <p>
                  <strong>{post.title}</strong> {post.body}
                </p>
                <button onClick={() => createPost(post)}>
                  Add as new post
                </button>
              </li>
            ))}
          </ul>

          <ul>
            {users.map((user, idx) => (
              <li key={idx}>
                <h6>
                  {idx < 9 && 0}
                  {idx + 1}.
                </h6>
                <p>
                  <strong>{user.username}</strong> {user.email}
                </p>
                <button onClick={() => createPost(user)}>
                  Add as new user
                </button>
              </li>
            ))}
          </ul>
        </>
      )}
    </aside>
  );
});

function Footer() {
  return (
    <footer>
      <span>&copy; Copyright all right reserved Atomic-Blog, {new Date().getFullYear()}</span>
    </footer>
  );
}

export default AtomicBlog;
