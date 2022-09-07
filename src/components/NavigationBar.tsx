import { useMemo } from "react";
import { Container, Navbar, Button, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useStoreContext } from "../context/StoreContext";
import countries from "../data/country.json";

function NavigationBar() {
  const {
    dispatch,
    state: { country, cart },
  } = useStoreContext();

  const memorisedCartQty = useMemo(() => {
    return cart.reduce(
      (accumulator: number, item: any) => accumulator + item.qty,
      0
    );
  }, [cart]);

  return (
    <Navbar sticky="top" className="bg-white shadow-sm mb-3 px-2">
      <Container>
        <Navbar.Brand className="me-auto fw-bold fs-3" as={Link} to="/">
          <span className="text-info">My </span>Store
        </Navbar.Brand>

        <div style={{ marginRight: "20px" }}>
          <Form.Select
            role="button"
            value={country}
            size="sm"
            className="w-100 "
            onChange={(e) => {
              dispatch({ type: "CHANGE_COUNTRY", payload: e.target.value });
            }}
          >
            {countries.map((counrty: any) => (
              <option key={counrty.code} value={counrty.code}>
                {counrty.name}
              </option>
            ))}
          </Form.Select>
        </div>

        <Link role="button" to="/cart">
          <Button className=" rounded-circle cart-btn" variant="outline-light">
            <i className="fa fa-shopping-cart cart-icon" />
            <div className=" rounded-circle bg-info d-flex justify-content-center align-items-center badge">
              {memorisedCartQty}
            </div>
          </Button>
        </Link>
      </Container>
    </Navbar>
  );
}
export default NavigationBar;
