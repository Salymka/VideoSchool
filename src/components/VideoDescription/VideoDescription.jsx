import React from 'react';
import styles from "./VideoDescription.module.scss";
import TagsList from "../TagsList/TagsList";

const VideoDescription = ({description}) => {
    return (
        <div>
            <div className={styles.description}>
                Description : {description.description}
            </div>
            <div className={styles.description}>
                Rating : <strong
                className={styles.red}>{description.rating}</strong> / 5
            </div>
            <div className={styles.description}>
                Data : {description.launchDate}
            </div>
            <TagsList tags={description.tags}/>
        </div>
    );
};

export default VideoDescription;