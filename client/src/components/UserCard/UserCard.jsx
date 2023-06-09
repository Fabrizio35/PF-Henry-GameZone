import React from "react";
import styles from "../UserCard/UserCard.module.css";

const UserCard = ({ name, email, rol, active, id }) => {
    return (
        <div className={styles.card}>
            <div className={styles.cardInner}>
                <div className={styles.cardFront}>
                        <div className={styles.containerData}>
                            <h4 className={styles.email}>E-mail: {email}</h4>
                            <h2 className={styles.name}>{name}</h2>
                            <h3 className={styles.active}>{active}</h3>
                            <p>{id}</p>
                        </div>
                </div>
            </div>
        </div> );
};
export default UserCard;



