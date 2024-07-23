import { useState } from "react";

const BlogForm = ({ onAddBlog, onClose }) => {
  const [formData, setFormData] = useState({
    title: "",
    imageUrl: "",
    description: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, "0");
    const day = String(now.getDate()).padStart(2, "0");
    const hours = String(now.getHours()).padStart(2, "0");
    const minutes = String(now.getMinutes()).padStart(2, "0");
    const currentTime = `${year}-${month}-${day} ${hours}:${minutes}`;

    const blogData = {
      ...formData,
      time: currentTime,
    };

    try {
      const response = await fetch("http://localhost:3000/blogs", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(blogData),
      });

      if (!response.ok) {
        const text = await response.text();
        throw new Error(`HTTP error! status: ${response.status}, response: ${text}`);
      }

      const data = await response.json();
      console.log("Success:", data);
      onAddBlog(data); // Update the parent component with the new blog
      onClose(); // Close the modal after submission
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div style={modalStyles.overlay}>
      <div style={modalStyles.content}>
        <h1 style={{ color: "#00693E" }}>Add a Blog</h1>
        <button onClick={onClose} style={modalStyles.closeButton}>
          ×
        </button>
        <div style={styles.formContainer}>
          <form onSubmit={handleSubmit} style={styles.form}>
            <div style={styles.imageContainer}>
              {formData.imageUrl ? (
                <img src={formData.imageUrl} alt="Image Preview" style={styles.imagePreview} />
              ) : (
                <div style={styles.emptyImage}>Image Preview</div>
              )}
            </div>
            <div style={styles.inputRow}>
              <div style={styles.inputGroupHalf}>
                <label htmlFor="title" style={styles.label}>
                  Title
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="Enter title"
                  style={styles.input}
                  required
                />
              </div>
              <div style={styles.inputGroupHalf}>
                <label htmlFor="imageUrl" style={styles.label}>
                  Image URL
                </label>
                <input
                  type="text"
                  id="imageUrl"
                  name="imageUrl"
                  value={formData.imageUrl}
                  onChange={handleChange}
                  placeholder="Enter image URL"
                  style={styles.input}
                />
              </div>
            </div>
            <div style={styles.inputGroup}>
              <label htmlFor="description" style={styles.label}>
                Description
              </label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Enter description"
                style={styles.textarea}
              />
            </div>
            <button type="submit" style={styles.button}>
              Add Blog
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

// Styles (same as in your previous code)

const modalStyles = {
  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1000,
  },
  content: {
    backgroundColor: "white",
    padding: "20px",
    borderRadius: "8px",
    width: "90%",
    maxWidth: "800px",
    position: "relative",
  },
  closeButton: {
    position: "absolute",
    top: "10px",
    right: "10px",
    backgroundColor: "transparent",
    border: "none",
    fontSize: "1.5rem",
    cursor: "pointer",
    color: "#333",
  },
};

const styles = {
  formContainer: {
    maxWidth: 800,
    margin: "auto",
    marginTop: 10,
    padding: 20,
    textAlign: "center",
    border: "1px solid #ccc",
    borderRadius: 8,
    boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
    maxHeight: "70vh",
    overflowY: "auto",
  },
  form: {
    marginBottom: 20,
  },
  imageContainer: {
    marginBottom: 10,
  },
  emptyImage: {
    width: "100%",
    height: 100,
    backgroundColor: "#f0f0f0",
    borderRadius: 4,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    color: "#aaa",
    fontSize: "1rem",
  },
  imagePreview: {
    maxWidth: "100%",
    height: "auto",
    marginBottom: 10,
    borderRadius: 4,
    maxHeight: 300,
    width: "100%",
  },
  inputRow: {
    display: "flex",
    justifyContent: "space-between",
  },
  inputGroupHalf: {
    width: "48%",
    marginBottom: 10,
    textAlign: "left",
  },
  inputGroup: {
    marginBottom: 10,
    textAlign: "left",
  },
  label: {
    display: "block",
    marginBottom: 5,
    fontWeight: "bold",
  },
  input: {
    width: "100%",
    padding: 10,
    marginBottom: 10,
    boxSizing: "border-box",
    border: "2px solid #00693E",
    borderRadius: 4,
    fontSize: "1rem",
    backgroundColor: "white",
    color: "black",
  },
  textarea: {
    width: "100%",
    padding: 10,
    marginBottom: 10,
    boxSizing: "border-box",
    border: "2px solid #00693E",
    borderRadius: 4,
    fontSize: "1rem",
    minHeight: 50,
    backgroundColor: "white",
    color: "black",
  },
  button: {
    padding: "10px 20px",
    fontSize: "1rem",
    backgroundColor: "#00693E",
    color: "white",
    border: "none",
    borderRadius: 5,
    cursor: "pointer",
  },
};

export default BlogForm;
