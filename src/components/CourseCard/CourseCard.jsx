import React, {useEffect, useRef} from 'react';
import styles from './CourseCard.module.scss'
import Hls from 'hls.js'
import {Link} from "react-router-dom";
import TagsList from "../TagsList/TagsList";
import SkillsList from "../SkillsList/SkillsList";

const CourseCard = ({previewImage, description, title, lessonsCount, skills, rating, previewVideo, tags, id}) => {
    const videoRef = useRef()
    const previewImgRef = useRef()

    function startVideo() {
        previewImgRef.current.style.display = "none";
        videoRef.current.style.display = "block"
    }

    function stopVideo() {
        previewImgRef.current.style.display = "block";
        videoRef.current.style.display = "none"
    }

    useEffect(() => {
        if (Hls.isSupported() && videoRef.current) {
            const video = videoRef.current;
            const hls = new Hls();
            hls.loadSource(previewVideo);
            hls.attachMedia(video);
        }
    }, [])

    return (
        <div className={styles.card}>
            <img
                ref={previewImgRef}
                onMouseOver={() => previewVideo ? startVideo() : ''}
                src={previewImage}
                className={styles.card_previewImage}
                alt={"preview-image"}
            />
            <Link to={`/${id}`}>
                <video
                    ref={videoRef}
                    className={styles.card__video}
                    src={previewVideo}
                    onMouseLeave={stopVideo}
                    muted
                    autoPlay
                    loop
                />
            </Link>
            <div className={styles.card__info}>
                <Link
                    to={`/${id}`}
                    className={styles.card__info_title}
                >
                    {title}
                </Link>
                <label className={styles.card__info_description}>
                    {description}
                </label>
                <div className={styles.card__info_countLessonsAndRating}>
                    <label className={styles.card__info_lessonsCount}>
                        {`Lessons in course: `}
                        <strong className={styles.colorRed}>
                            {lessonsCount}
                        </strong>
                    </label>
                    <label className={styles.card__info_rating}>
                        {`Rating - `}
                        <strong className={styles.colorRed}>
                            {rating}
                        </strong>
                        {` / 5`}
                    </label>
                </div>
                <SkillsList skills={skills}/>
                <TagsList tags={tags}/>
            </div>
        </div>
    );
};

export default CourseCard;