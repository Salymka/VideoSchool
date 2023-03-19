import React from 'react';
import styles from "./TagsList.module.scss";

const TagsList = ({tags}) => {
    return (
        <div className={styles.tags_list}>
            <label>Tags : </label>
            {tags.map((tag, index) =>
                <label key={index}>#{tag}</label>
            )
            }
        </div>
    );
};

export default TagsList;