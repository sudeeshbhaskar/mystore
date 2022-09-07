import { useEffect } from "react";
import { Container } from "react-bootstrap";
import Footer from "./components/Footer";
import Loader from "./components/Loader";
import NavigationBar from "./components/NavigationBar";
import { StoreProvider } from "./context/StoreContext";
import RenderRoute from "./routers/RenderRoute";
import { closeLoader } from "./utilities/common";

function App() {
  useEffect(() => {
    setTimeout(() => {
      closeLoader();
    }, 2000);
  }, []);
  return (
    <StoreProvider>
      <Loader />
      <NavigationBar />
      <Container className="main-container ">
        <RenderRoute />
      </Container>
      <Footer />
    </StoreProvider>
  );
}

export default App;
