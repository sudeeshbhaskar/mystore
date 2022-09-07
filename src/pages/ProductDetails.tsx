import { useState } from "react";
import { useParams } from "react-router-dom";
import { Row, Col, Container, Button } from "react-bootstrap";
import { ProductProps } from "../components/Product";
import {
  checkout,
  closeLoader,
  findProductById,
  openLoader,
} from "../utilities/common";
import useCurrency from "../hooks/useCurrency";
import { useStoreContext } from "../context/StoreContext";
import { toast } from "react-toastify";

function ProductDetails() {
  const { productId } = useParams();
  const {
    dispatch,
    state: { country },
  } = useStoreContext();
  const [product, setProduct] = useState(
    findProductById(productId) as ProductProps
  );
  const [memorizedPrice] = useCurrency(product.price);

  const onCheckout = () => {
    openLoader();
    checkout(product.price, country)
      .then((res) => {
        window.location.href = res.data.data.checkout_url;
      })
      .catch((err) => {
        closeLoader();
        toast.error("Something went wrong!");
        console.log(err);
      });
  };

  return (
    <Container>
      <Row className="justify-content-center  p-4 p-md-5 ">
        <Col
          xs={{ span: 12, order: 2 }}
          md={{ span: 6, order: 1 }}
          className="mt-3"
        >
          <h2>{product.title}</h2>
          <span>
            {Array(product.stars || 0)
              .fill("")
              .map((star: number, index: number) => (
                <i
                  key={index}
                  className="fa fa-star text-warning "
                  aria-hidden="true"
                />
              ))}
          </span>
          <p className="text-secondary fw-bold mt-2">{memorizedPrice}</p>
          <p className="text-dark fw-normal mt-2 ">{product.description}</p>
          <Button
            variant="dark"
            style={{ marginRight: "15px" }}
            onClick={onCheckout}
          >
            Checkout
          </Button>

          <Button
            variant="info"
            onClick={() => {
              dispatch({
                type: "ADD_TO_CART",
                payload: product,
              });
              toast.success("Product added to your cart");
            }}
          >
            Add to cart
          </Button>
        </Col>
        <Col xs={{ span: 12, order: 1 }} md={{ span: 6, order: 2 }}>
          <img
            className="img-fluid"
            width="100%"
            height="100%"
            src={`/images/${product.image}`}
            alt={product.title}
          />
        </Col>
      </Row>
    </Container>
  );
}

export default ProductDetails;
