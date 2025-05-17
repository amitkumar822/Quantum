import Footer from "./pages/Footer";
import Header from "./pages/Header";
import { Outlet } from "react-router";

function App() {
  return (
    <>
      <Header />
      <>
        <Outlet />
      </>
      <Footer />
    </>
  );
}

export default App;
