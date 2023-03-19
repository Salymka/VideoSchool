import React from 'react';
import styles from './LessonsBar.module.scss'

const LessonsBar = ({lessons, courseInfo, onClick}) => {
    return (
        <div className={styles.bar}>
            <div
                className={styles.bar__item}
                onClick={() => onClick(0)}
            >
                {courseInfo}
            </div >
            {
                lessons.map((lesson) =>
                    <button
                        key={lesson.id}
                        className={styles.bar__item}
                        disabled={lesson.status === "locked"}
                        onClick={() => onClick(lesson.order)}
                    >
                        <div
                            className={styles.bar__item_lesson}
                        >
                            Lesson - {lesson.order}
                        </div>
                        <label className={styles.locked_alert}>
                            Locked
                        </label>
                    </button>
                )
            }
        </div>
    );
};

export default LessonsBar;