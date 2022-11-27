import { Route, Routes } from "react-router-dom";
import Layout from "./components/common/layout";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import Register from "./pages/Register";

function App() {
  return (
    <Routes>
      <Route path="/*" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="settings" element={<Register />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}

export default App;
