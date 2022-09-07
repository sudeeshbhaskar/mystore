import { Fragment } from "react";
import Product, { ProductProps } from "../components/Product";
import { useStoreContext } from "../context/StoreContext";

function Home() {
  const {
    state: { products },
  } = useStoreContext();

  return (
    <div className="product-container">
      {products.map((item: ProductProps) => (
        <Fragment key={item.id}>
          <Product {...item} />
        </Fragment>
      ))}
    </div>
  );
}

export default Home;
