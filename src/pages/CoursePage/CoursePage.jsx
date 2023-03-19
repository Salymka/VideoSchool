import React, {useEffect, useRef, useState} from 'react';
import Header from "../../components/Header/Header";
import LessonsBar from "../../components/LessonsBar/LessonsBar";
import styles from "./CoursePage.module.scss";
import Hls from "hls.js";
import {useParams} from "react-router-dom";
import {getForId, getToken} from "../../api/api";
import {useLocalStorage} from "../../hooks/useLocalStorage";
import Spinner from "../../components/Spinner/Spinner";
import VideoDescription from "../../components/VideoDescription/VideoDescription";

const CoursePage = () => {
    const [course, setCourse] = useState({})
    const [order, setOrder] = useState({})
    const [token, setToken] = useLocalStorage("VideoSchoolToken")
    const videoLessonRef = useRef();
    const {id} = useParams()

    function changeLesson(orderNumber, newOrder = course) {
        if (orderNumber === 0) {
            setOrder({
                id: newOrder.id,
                link: newOrder.meta?.courseVideoPreview.link || '',
                title: newOrder.title,
                description: {
                    description: newOrder.description,
                    launchDate: newOrder.launchDate,
                    rating: newOrder.rating,
                    tags: newOrder.tags
                }
            })
            return;
        }
        const lesson = course.lessons.find(lesson => lesson.order === orderNumber)
        lesson.title = `Lesson - ${lesson.order} : ` + lesson.title
        setOrder(lesson)
    }

    useEffect(() => {
        if (token?.token) {
            getForId(id, token.token)
                .then(response => {
                    setCourse(response)
                    changeLesson(0, response)
                })
                .catch(e => console.log(e))
            return;
        }
        getToken()
            .then(token => setToken(token))
    }, [token])

    useEffect(() => {
        if (Hls.isSupported() && videoLessonRef.current) {
            const video = videoLessonRef.current;
            const hls = new Hls();
            hls.loadSource(order.link || '');
            hls.attachMedia(video);
        }
    }, [order])

    useEffect(() => {
        const callback = (event) => {
            console.log(event.code)
            if ((event.metaKey || event.ctrlKey) && event.code === 'Comma') {
                videoLessonRef.current.playbackRate = +videoLessonRef.current.playbackRate - 0.25;
            }
            if ((event.metaKey || event.ctrlKey) && event.code === 'Period') {
                videoLessonRef.current.playbackRate = +videoLessonRef.current.playbackRate + 0.25;
            }
        };
        window.addEventListener('keydown', callback);
        return () => {
            window.removeEventListener('keydown', callback);
        };
    }, []);

    return (
        <div>
            <Header/>
            {order.link
                ?
                <div className={styles.lesson__body__wrapper}>
                    <LessonsBar
                        lessons={course.lessons}
                        courseInfo={'Course Info'}
                        onClick={changeLesson}
                    />
                    <div className={styles.lesson__body_video}>
                        <label className={styles.lesson__body_title}>
                            {order.title}
                        </label>
                        <video
                            ref={videoLessonRef}
                            className={styles.lesson_video}
                            src={order?.link}
                            controls
                        />
                        <div className={styles.speed_help}>
                            You can control speed by (Ctrl + ,) and (Ctrl + .)
                        </div>
                        <hr style={{marginTop: 30}}/>
                        <div className={styles.lesson__body_description}>
                            {order.description &&
                                <VideoDescription description={order.description}/>
                            }
                        </div>
                    </div>
                </div>
                :
                <div>
                    <Spinner/>
                </div>
            }
        </div>
    );
};

export default CoursePage;