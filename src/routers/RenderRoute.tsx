import { lazy, Suspense } from "react";
import { ErrorBoundary } from "./ErrorBoundary";
import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import PageNotFound from "../pages/404";
import Loader from "../components/Loader";
const LazyCheckoutSuccess = lazy(() => import("../pages/CheckoutSuccess"));
const LazyProductDetails = lazy(() => import("../pages/ProductDetails"));
const LazyCart = lazy(() => import("../pages/Cart"));

function RenderRoute() {
  return (
    <ErrorBoundary>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/product/:productId"
          element={
            <Suspense fallback={<Loader />}>
              <LazyProductDetails />
            </Suspense>
          }
        />
        <Route
          path="/cart"
          element={
            <Suspense fallback={<Loader />}>
              <LazyCart />
            </Suspense>
          }
        />
        <Route
          path="/checkout/success"
          element={
            <Suspense fallback={<Loader />}>
              <LazyCheckoutSuccess />
            </Suspense>
          }
        />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </ErrorBoundary>
  );
}

export default RenderRoute;
