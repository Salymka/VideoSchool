import React from 'react';
import styles from "./SkillsList.module.scss";
import arrowImg from "../../static/arrowLeft.png";

const SkillsList = ({skills}) => {
    return (
        <React.Fragment>
            <label className={styles.card__skills}>
                Skills Needed:
            </label>
            <ul className={styles.card__skillsList}>
                {
                    skills.map(skill =>
                        <div
                            key={skill}
                            className={styles.card__skillsList_item}>
                            <img src={arrowImg} alt={"*"} className={styles.card__skillsList_pointer}/>
                            <li
                                className={styles.card__skillsList_skill}>
                                {skill}
                            </li>
                        </div>
                    )
                }
            </ul>
        </React.Fragment>

    );
};

export default SkillsList;