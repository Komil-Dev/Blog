import { Card, CardContent, CardMedia, Typography } from "@mui/material";

const BlogCard = ({ title, imageUrl, description, time }) => {
  return (
    <Card style={{ marginBottom: "20px" }}>
      {imageUrl && <CardMedia component="img" height="140" image={imageUrl} alt={title} />}
      <CardContent>
        <Typography variant="h5" component="div">
          {title}
        </Typography>
        <Typography variant="body2" color="textSecondary">
          {description}
        </Typography>
        <Typography variant="body2" color="textSecondary">
          {new Date(time).toLocaleString()}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default BlogCard;
