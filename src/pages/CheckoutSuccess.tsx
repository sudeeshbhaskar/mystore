import { useSearchParams, Navigate, Link } from "react-router-dom";

function CheckoutSuccess() {
  const [queryParams, setQueryParams] = useSearchParams();
  const orderState = queryParams.get("order_state");
  const checkoutId = queryParams.get("checkout_id");
  const orderCode = queryParams.get("order_code");

  if (!orderState) return <Navigate to="/" />;

  return (
    <div className="d-flex align-items-center justify-content-center ">
      <div className="text-center">
        {orderState === "created" && (
          <>
            <p className="fs-3">
              <span className="text-success">Success!</span> Order Placed.
            </p>
            <p className="">
              <span className="text-dark">Order Code</span>{" "}
              <span className="text-muted">{orderCode}</span>
            </p>
            <p className="">
              <span className="text-dark">checkout Id</span>{" "}
              <span className="text-muted">{checkoutId}</span>
            </p>
          </>
        )}
        {orderState !== "created" && (
          <p className="fs-3">
            <span className="text-danger">Opps!</span> Payment Failed.
          </p>
        )}
        <Link to="/" replace className="btn btn-dark">
          Go Home
        </Link>
      </div>
    </div>
  );
}

export default CheckoutSuccess;

// checkout_id=CKT-FJDPRRCMNDC&order_code=SG-O-XVFXQFZBNK&order_state=created
