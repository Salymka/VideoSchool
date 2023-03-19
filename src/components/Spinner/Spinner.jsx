import React from 'react';
import './Spinner.module.scss'
import styles from './Spinner.module.scss'
const Spinner = () => {
    return (
        <div className={styles.spinner}>
            <div className={styles.lds_ring}>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
            </div>
        </div>
    );
};

export default Spinner;