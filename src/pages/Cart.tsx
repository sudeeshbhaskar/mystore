import { Button } from "react-bootstrap";
import { useStoreContext } from "../context/StoreContext";

function Cart() {
  const { dispatch } = useStoreContext();
  return (
    <div className="d-flex align-items-center justify-content-center ">
      <div className="text-center">
        <p className="lead">Need to be implement</p>
        <Button
          variant="dark"
          style={{ marginRight: "15px" }}
          onClick={() => dispatch({ type: "REMOVE_CART" })}
        >
          Clear Cart
        </Button>
      </div>
    </div>
  );
}

export default Cart;
