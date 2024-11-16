import Navbar from "../routes/navBar";
import RoutesComponent from "../routes/appRoutes";
import Value from "./ValueDiv/Value";
import Footer from "./FoodterDiv/Footer";

const Layout = () => {
    return (
      <>
        <Navbar />
        <RoutesComponent />
        <Value />
        <Footer />
      </>
    );
  };
  
  export default Layout;