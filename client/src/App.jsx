// import "./App.css";
// import { Route, Switch, useLocation } from "react-router-dom";
// import Home from "./view/Home/Home";
// import Detail from "./view/Detail/Detail"
// //import Login from "./view/Login/Login";
// import CreateGameForm from "./view/CreateGameForm/CreateGameForm";
// import Users from "./view/Users/Users";
// import Navbar from '../src/components/Navbar/Navbar';
// import Footer from "./components/Footer/Footer";
// import Favorites from "./view/Favorites/Favorites";
// import ShopCart from "./view/shopCart/shopCart";
// import ProfileUser from "./view/ProfileUser/ProfileUser";
// import PaymentSuccess from "./view/PaymentSuccess/PaymentSuccess";
// import PaymentFailure from "./view/PaymentFailure/PaymentFailure";
// import Error404 from "./view/Error404/Error404";
// import News from "./view/News/News";
// import Login from "./view/Login/Login";
// import UpdateData from "./view/UpdateData/UpdateData";
// import About from "./view/About/About";
// import BannedUser from "./view/BannedUser/BannedUser";

// function App() { 
//   const location = useLocation();
//   const isBannedUserPage = location.pathname === "/banneduser";


//   return (
//     <div className="App">
//       {!isBannedUserPage && <Navbar />}
//       <Switch>
//         <Route exact path="/" component={Home} />
//         <Route exact path="/game/:id" component={Detail} />
//         <Route exact path="/create" component={CreateGameForm} />                     
//         <Route exact path="/users" component={Users} />
//         <Route exact path="/update" component={UpdateData} />
//         <Route exact path="/favorites" component={Favorites} />
//         <Route exact path="/profile" component={ProfileUser} />
//         <Route exact path="/paymentsuccess" component={PaymentSuccess} />
//         <Route exact path="/cart" component={ShopCart} />
//         <Route exact path="/paymentfailure" component={PaymentFailure} />
//         <Route exact path="/login" component={Login} />
//         <Route exact path="/news" component={News} />
//         <Route exact path="/about" component={About} />
//         <Route path="*" component={Error404} />   
//         <Route exact path="/banneduser" component={BannedUser} />
//       </Switch>
//       {!isBannedUserPage && <Footer />}
//     </div>
//   );
// }

// export default App;
import "./App.css";
import { Route, Switch, useLocation } from "react-router-dom";
import Home from "./view/Home/Home";
import Detail from "./view/Detail/Detail"
//import Login from "./view/Login/Login";
import CreateGameForm from "./view/CreateGameForm/CreateGameForm";
import Users from "./view/Users/Users";
import Navbar from '../src/components/Navbar/Navbar';
import Footer from "./components/Footer/Footer";
import Favorites from "./view/Favorites/Favorites";
import ShopCart from "./view/shopCart/shopCart";
import ProfileUser from "./view/ProfileUser/ProfileUser";
import PaymentSuccess from "./view/PaymentSuccess/PaymentSuccess";
import PaymentFailure from "./view/PaymentFailure/PaymentFailure";
import Error404 from "./view/Error404/Error404";
import News from "./view/News/News";
import Login from "./view/Login/Login";
import UpdateData from "./view/UpdateData/UpdateData";
import About from "./view/About/About";
import BannedUser from "./view/BannedUser/BannedUser";

function App() {
  const location = useLocation();
  const isBannedUserPage = location.pathname === "/banneduser";

  return (
    <div className="App">
      {!isBannedUserPage && <Navbar />}
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/game/:id" component={Detail} />
        <Route exact path="/create" component={CreateGameForm} />                     
        <Route exact path="/users" component={Users} />
        <Route exact path="/update" component={UpdateData} />
        <Route exact path="/favorites" component={Favorites} />
        <Route exact path="/profile" component={ProfileUser} />
        <Route exact path="/paymentsuccess" component={PaymentSuccess} />
        <Route exact path="/cart" component={ShopCart} />
        <Route exact path="/paymentfailure" component={PaymentFailure} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/news" component={News} />
        <Route exact path="/about" component={About} />
        <Route exact path="/banneduser" component={BannedUser} />
        <Route path="*" component={Error404} />   
      </Switch>
      {!isBannedUserPage && <Footer />}
    </div>
  );
}

export default App;