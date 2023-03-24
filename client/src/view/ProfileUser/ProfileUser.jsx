import React from "react";
import { useAuth0 } from "@Auth0/auth0-react";

const ProfileUser = () => {

    const {user, isAuthenticated} = useAuth0();

    return (
        isAuthenticated && (
            <div> 
                <img src={user.picture} />
                <h2> {user.name} </h2>
                <h4>{user.email}</h4>
            </div>
        )
    )
};

export default ProfileUser;