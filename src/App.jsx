// External
import { useRef } from "react";
import { Routes, Route } from "react-router-dom";
import { ToastContainer, Slide } from "react-toastify";

// Components
import List from "./pages/List/List";
import Detail from "./pages/Detail/Detail";
import CreateCounterparty from "pages/CreateCounterparty/CreateCounterparty";
import ScrollToTopButton from "components/General/ScrollToTopBtn/ScrollToTopBtn";
import ModalManager from "components/ModalManager/ModalManager";

// Styles
import s from "./App.module.scss";
import Contract from "pages/Contract/Contract";

const App = () => {
  const scrollRef = useRef(null);
  return (
    <div id="scrollableDiv" className={s.root} ref={scrollRef}>
      <Routes>
        <Route path="/" element={<List />} />
        <Route path="/create/:id" element={<CreateCounterparty />} />
        <Route path="/create" element={<CreateCounterparty />} />
        <Route path="/details/:id" element={<Detail />} />
        <Route path="/details/contract/:id" element={<Contract />} />
        <Route path="/details/contract/create" element={<Contract />} />
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
