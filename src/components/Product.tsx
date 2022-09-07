import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import useCurrency from "../hooks/useCurrency";
export type ProductProps = {
  id: number;
  title: string;
  image: string;
  description: string;
  price: number;
  stars: number;
};

function Product({ id, title, image, price }: ProductProps) {
  const [memorizedPrice] = useCurrency(price);
  return (
    <Card
      style={{ width: "20rem", textDecoration: "none", color: "black" }}
      border="light"
      as={Link}
      to={`/product/${id}`}
    >
      <Card.Img
        variant="top"
        src={`/images/${image}`}
        height="220px"
        className="product-img"
      />
      <Card.Body className="d-flex flex-column justify-content-between">
        <Card.Title className="text-center  ">{title}</Card.Title>
        <Card.Text className="text-center text-secondary mb-3">
          {memorizedPrice}
        </Card.Text>
      </Card.Body>
    </Card>
  );
}

export default Product;
