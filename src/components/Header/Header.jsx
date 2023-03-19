import React from 'react';
import styles from './Header.module.scss'
import {Link} from "react-router-dom";
const Header = () => {
    return (
        <div className={styles.header__wrapper}>
            <header className={styles.header}>
                <Link to={'/'} className={styles.header_link}>
                    <h2 className={styles.header_name}>
                        Video School
                    </h2>
                </Link>
            </header>
        </div>

    );
};

export default Header;