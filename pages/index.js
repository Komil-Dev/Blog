import BlogForm from "@/components/Blog";
import { useEffect, useState } from "react";

const IndexPage = () => {
  const [blogs, setBlogs] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        console.log("Fetching blogs...");
        const response = await fetch("http://localhost:3001/blogs");
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        console.log("Blogs fetched successfully:", data);
        setBlogs(data);
      } catch (error) {
        console.error("Error fetching blogs:", error);
      }
    };

    fetchBlogs();
  }, []);

  const handleAddBlog = (newBlog) => {
    setBlogs((prevBlogs) => [newBlog, ...prevBlogs]);
  };

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <div>
      <header>
        <button onClick={openModal}>Create Blog</button>
      </header>
      {isModalOpen && <BlogForm onAddBlog={handleAddBlog} onClose={closeModal} />}
      <main>
        <h1>Blogs</h1>
        <div style={{ display: "flex", flexWrap: "wrap" }}>
          {blogs.map((blog) => (
            <div
              key={blog.id}
              style={{ margin: 10, padding: 20, border: "1px solid #ccc", borderRadius: 8, maxWidth: 300 }}
            >
              <img src={blog.imageUrl} alt={blog.title} style={{ width: "100%", height: "auto", borderRadius: 4 }} />
              <h2>{blog.title}</h2>
              <p>{blog.description}</p>
              <p>
                <small>{blog.time}</small>
              </p>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default IndexPage;
