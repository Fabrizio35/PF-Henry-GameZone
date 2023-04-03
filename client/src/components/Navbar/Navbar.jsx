import React, { useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import style from "./Navbar.module.css";
import logo from "../../Image/logo.png";
import { reloadGames, emailUserE } from "../../redux/actions";
import LoginButton from "../LoginButton/LoginButton";
import LogoutButton from "../LogoutButton/LogoutButton";
import { useAuth0 } from "@Auth0/auth0-react";
import { useDispatch, useSelector} from "react-redux";

const Navbar = () => {

    const { user, isAuthenticated } = useAuth0(); 
    const dispatch = useDispatch();
    const history = useHistory()
    useEffect(() => {
        if (isAuthenticated && user) {
          dispatch(emailUserE(user.email));
        }
    }, [dispatch, isAuthenticated, user]);
    
    const users = useSelector((state) => state.userEmail[0])
    const rolUser = users?.rol;

    function handleClick(e){
        e.preventDefault();
        dispatch(reloadGames());
        history.push('/')
    }

    return (
        <div className={style.navbarContainer}>
            <Link to="/" className={style.image}>
                <img src={logo} alt="init" width="300px" onClick={e => {handleClick(e)}} />
            </Link>
    
            {isAuthenticated && rolUser === "admin" && (
                <Link className={style.links} to="/create">
                    <ion-icon size="large" name="game-controller-outline"></ion-icon>
                </Link>
            )}
    
            {isAuthenticated && rolUser === "admin" && (
                <Link className={style.links} to="/users">
                    <ion-icon size="large" name="people-outline"></ion-icon>
                </Link>
            )}
    
            <Link className={style.links} to="/favorites">
                <ion-icon size="large" name="heart-outline"></ion-icon>
            </Link>
    
            <Link className={style.links} to="/cart">
                <ion-icon size="large" name="cart-outline"></ion-icon>
            </Link>
    
            {isAuthenticated && users && (
                <Link className={style.links2} to="/profile">
                    {users.name ? (
                        <h2 className={style.linksName}>{users.name}</h2>
                    ) : (
                        <h2 className={style.imageAlt}>{user.given_name}</h2>
                    )}
                </Link>
            )}
    
            {isAuthenticated && users && (
                <div>
                    {users.image ? (
                        <img
                            src={users.image}
                            alt="imag"
                            width="35px"
                            height="35px"
                            className={style.img}
                        />
                    ):(
                        <img
                            src={user.picture}
                            alt="imag"
                            width="35px"
                            height="35px"
                            className={style.img}
                        />
                    )}
                </div>
            )}
    
            <div>
                {isAuthenticated ? (
                    <LogoutButton className={style.links} />
                ) : (
                    <LoginButton className={style.links} />
                )}
            </div>
        </div>
    );
};

export default Navbar;