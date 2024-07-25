const BlogCard = ({ title, imageUrl, description, time }) => {
  return (
    <div style={cardStyles.card}>
      {imageUrl && <img src={imageUrl} alt={title} style={cardStyles.image} />}
      <div style={cardStyles.content}>
        <h3 style={cardStyles.title}>{title}</h3>
        <p style={cardStyles.description}>{description}</p>
        <p style={cardStyles.time}>{time}</p>
      </div>
    </div>
  );
};

const cardStyles = {
  card: {
    border: "1px solid #ccc",
    borderRadius: 8,
    marginBottom: 10,
    overflow: "hidden",
    boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
    display: "flex",
    flexDirection: "column",
    width: "100%",
    backgroundColor: "white",
  },
  image: {
    width: "100%",
    height: "auto",
  },
  content: {
    padding: 10,
  },
  title: {
    fontSize: "1.2rem",
    margin: 0,
    marginBottom: 5,
    color: "#00693E",
  },
  description: {
    fontSize: "1rem",
    margin: 0,
    marginBottom: 10,
    color: "black",
  },
  time: {
    fontSize: "0.8rem",
    color: "gray",
    textAlign: "right",
  },
};

export default BlogCard;
