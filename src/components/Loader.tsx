import { createPortal } from "react-dom";
function Loader() {
  return createPortal(
    <div className="d-flex top-most align-items-center justify-content-center vh-100 vw-100 bg-light position-absolute top-0 bottom-0 left-0 right-0 zindex-tooltip">
      <div className="spinner-grow text-info" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>,
    document.getElementById("loader") as HTMLElement
  );
}

export default Loader;
