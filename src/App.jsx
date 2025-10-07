import s from "./App.module.scss";
import { Routes, Route } from "react-router-dom";
//components
import List from "./pages/List/List";
import Detail from "./pages/Detail/Detail";
import Create from "./pages/Create/Create";

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
        <Route path="/create" element={<Create />} />
        <Route path="/detail/:id" element={<Detail />} />
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
