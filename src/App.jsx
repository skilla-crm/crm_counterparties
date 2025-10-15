import s from "./App.module.scss";
import { Routes, Route } from "react-router-dom";
//components
import List from "./pages/List/List";
import Detail from "./pages/Detail/Detail";
import CreateCounterparty from "pages/CreateCounterparty/CreateCounterparty";

import { ToastContainer, Slide } from "react-toastify";
import ScrollToTopButton from "components/General/ScrollToTopBtn/ScrollToTopBtn";
import ModalManager from "components/ModalManager/ModalManager";
import { useRef } from "react";

const App = () => {
  const scrollRef = useRef(null);
  return (
    <div id="scrollableDiv" className={s.root} ref={scrollRef}>
      <Routes>
        <Route path="/" element={<List />} />
        <Route path="/create" element={<CreateCounterparty />} />
        <Route path="/details/:id" element={<Detail />} />
      </Routes>

      <ScrollToTopButton scrollContainerRef={scrollRef} />

      <ModalManager />

      <ToastContainer
        position="top-center"
        hideProgressBar
        closeOnClick
        pauseOnHover
        transition={Slide}
        limit={1}
        stacked
      />
    </div>
  );
};

export default App;
