import BlogForm from "@/components/Blog";
import BlogCard from "@/components/BlogCard";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const IndexPage = () => {
  const [blogs, setBlogs] = useState([]);
  const [filteredBlogs, setFilteredBlogs] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await fetch("http://localhost:3000/blogs");
        if (!response.ok) {
          throw new Error("Failed to fetch blogs");
        }
        const data = await response.json();
        setBlogs(data);
        setFilteredBlogs(data);
      } catch (error) {
        console.error("Error fetching blogs:", error);
      }
    };

    fetchBlogs();
  }, []);

  const handleAddBlog = (newBlog) => {
    console.log("Adding new blog:", newBlog);
    setBlogs((prevBlogs) => [...prevBlogs, newBlog]);
    setFilteredBlogs((prevBlogs) => [...prevBlogs, newBlog]);
    setShowModal(false);
    toast.success("Blog added successfully!");
  };

  const handleOpenModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  const handleSearchChange = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);
    const filtered = blogs.filter(
      (blog) => blog.title.toLowerCase().includes(query) || blog.description.toLowerCase().includes(query)
    );
    setFilteredBlogs(filtered);
  };

  return (
    <>
      <header style={headerStyles}>
        <div style={headerContentStyles}>
          <input
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={handleSearchChange}
            style={searchInputStyles}
          />
          <button onClick={handleOpenModal} style={buttonStyles}>
            Create Blog
          </button>
        </div>
      </header>
      <div style={mainStyles}>
        <aside style={sidebarStyles.left}>Left Sidebar</aside>
        <main style={contentStyles}>
          {filteredBlogs.length === 0 && <p style={noBlogsStyles}>No blogs available</p>}
          {filteredBlogs.map((blog) => (
            <BlogCard
              key={blog.id}
              title={blog.title}
              imageUrl={blog.imageUrl}
              description={blog.description}
              time={blog.time}
            />
          ))}
          {showModal && <BlogForm onAddBlog={handleAddBlog} onClose={handleCloseModal} />}
        </main>
        <aside style={sidebarStyles.right}>Right Sidebar</aside>
      </div>
      <ToastContainer />
    </>
  );
};

const headerStyles = {
  display: "flex",
  justifyContent: "center",
  padding: "10px",
  backgroundColor: "#fff",
  position: "fixed",
  top: 0,
  width: "100%",
  zIndex: 1000,
};

const headerContentStyles = {
  display: "flex",
  alignItems: "center",
  width: "100%",
  maxWidth: 1200,
  justifyContent: "space-between",
};

const buttonStyles = {
  padding: "10px 20px",
  fontSize: "1rem",
  backgroundColor: "#fff",
  color: "#00693E",
  border: "2px solid #00693E",
  borderRadius: 5,
  cursor: "pointer",
};

const searchInputStyles = {
  padding: "10px",
  fontSize: "1rem",
  borderRadius: 5,
  border: "2px solid #00693E",
  width: "100%",
  maxWidth: 400,
  boxSizing: "border-box",
  backgroundColor: "white",
  color: "#00693E",
};

const mainStyles = {
  display: "flex",
  marginTop: "60px",
  backgroundColor: "white",
};

const sidebarStyles = {
  left: {
    width: "20%",
    backgroundColor: "#f4f4f4",
    padding: "10px",
    position: "fixed",
    height: "calc(100vh - 60px)",
    top: "60px",
    overflowY: "auto",
    color: "black",
  },
  right: {
    width: "20%",
    backgroundColor: "#f4f4f4",
    padding: "10px",
    position: "fixed",
    right: 0,
    height: "calc(100vh - 60px)",
    top: "60px",
    overflowY: "auto",
    color: "black",
  },
};

const contentStyles = {
  marginLeft: "20%",
  marginRight: "20%",
  padding: "10px",
  height: "calc(100vh - 60px)",
  overflowY: "auto",
};

const noBlogsStyles = {
  color: "#00693E",
  fontSize: "25px",
  textAlign: "center",
  marginTop: "20px",
};

export default IndexPage;
