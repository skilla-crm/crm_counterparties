import s from "./App.module.scss";
import { Routes, Route } from "react-router-dom";
//components
import List from "./pages/List/List";
import Detail from "./pages/Detail/Detail";
import Create from "./pages/Create/Create";

const App = () => {




  return (
    <div id="scrollableDiv" className={s.root}>
      <Routes>
        <Route path="/" element={<List />} />
        <Route path="/create" element={<Create />} />
        <Route path="/detail/:id" element={<Detail />} />
      </Routes>
    </div>
  );
};

export default App;
