const Header = ({ onOpenModal }) => {
  return (
    <header style={styles.header}>
      <h1>My Blog</h1>
      <button onClick={onOpenModal} style={styles.button}>
        Create Blog
      </button>
    </header>
  );
};

const styles = {
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "10px 20px",
    backgroundColor: "#0070f3",
    color: "white",
  },
  button: {
    padding: "10px 20px",
    fontSize: "1rem",
    backgroundColor: "#ffffff",
    color: "#0070f3",
    border: "none",
    borderRadius: 5,
    cursor: "pointer",
  },
};

export default Header;
