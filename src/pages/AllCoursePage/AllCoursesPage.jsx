import React, {useEffect, useState} from 'react';
import Header from "../../components/Header/Header";
import CourseCard from "../../components/CourseCard/CourseCard";
import {getAll, getToken} from "../../api/api";
import styles from './AllCoursesPage.module.scss'
import leftButton from '../../static/leftButton.png'
import rightButton from '../../static/rightButton.png'
import CircleButton from "../../components/CircleButton/CircleButton";
import {useLocalStorage} from "../../hooks/useLocalStorage";
import Spinner from "../../components/Spinner/Spinner";

const COURSES_ON_PAGE = 10;
const AllCoursesPage = () => {
    const [coursesList, setCoursesList] = useState([])
    const [page, setPage] = useState(1)
    const [allPages, setAllPages] = useState(1)
    const [token, setToken] = useLocalStorage('VideoSchoolToken')

    function coursesOnPAge() {
        const from = COURSES_ON_PAGE * (page - 1);
        const to = COURSES_ON_PAGE * page;
        return coursesList.slice(from, to)
    }

    useEffect(() => {
        if (token?.token) {
            getAll(token.token)
                .then(res => {
                    setCoursesList(res)
                    setAllPages(Math.ceil(res.length / COURSES_ON_PAGE))
                })
                .catch((e) => console.log(e))
            return;
        }
        getToken().then(token => setToken(token))
    }, [token])

    return (
        <div>
            <Header/>
            { coursesList.length
                ?
                <div>
                    { coursesOnPAge().map((course, index) =>
                            <div
                                key={course.id}
                                className={index % 2 ? styles.leftSlope : styles.rightSlope}>
                                <CourseCard
                                    id={course.id}
                                    title={course.title}
                                    tags={course?.tags ?? []}
                                    previewImage={course.previewImageLink + '/cover.webp' ?? ''}
                                    previewVideo={course.meta.courseVideoPreview?.link ?? ''}
                                    rating={course.rating}
                                    description={course.description}
                                    skills={course.meta.skills ?? []}
                                    lessonsCount={course.lessonsCount}
                                />
                            </div>
                        )
                    }
                </div>
                :
                <div>
                    <Spinner/>
                </div>
            }
            <div className={styles.navigation}>
                <CircleButton
                    disabled={page <= 1}
                    image={leftButton}
                    buttonText={"LastPage"}
                    onClick={() => setPage(page => page - 1)}
                />
                <CircleButton
                    disabled={page >= allPages}
                    image={rightButton}
                    buttonText={"NextPage"}
                    onClick={() => setPage(page => page + 1)}
                />
            </div>
        </div>
    );
};

export default AllCoursesPage;