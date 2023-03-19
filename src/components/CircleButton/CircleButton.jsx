import React from 'react';
import styles from './CircleButton.module.scss'


const CircleButton = ({image, buttonText, onClick, disabled}) => {
    return (
        <button
            disabled={disabled}
            className={styles.button}
            onClick={onClick}
        >
            <img
                src={image}
                alt={buttonText}
                className={styles.button_img}
            />
        </button>
    );
};

export default CircleButton;