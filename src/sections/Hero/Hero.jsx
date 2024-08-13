import React, { useEffect } from 'react';
import styles from './HeroStyles.module.css';
import heroImg from '../../assets/123.png';
import sun from '../../assets/sun.svg';
import moon from '../../assets/moon.svg';
import linkedinLight from '../../assets/linkedin-light.svg';
import twitterLight from '../../assets/twitter-light.svg';
import githubLight from '../../assets/github-light.svg';
import linkedinDark from '../../assets/linkedin-dark.svg';
import twitterDark from '../../assets/twitter-dark.svg';
import githubDark from '../../assets/github-dark.svg';
import { useTheme } from '../../common/ThemeContext';
import $ from 'jquery';

function Hero() {
    const { theme, toggleTheme } = useTheme();
    const themeIcon = theme === 'light' ? sun : moon;
    const twitterIcon = theme === 'light' ? twitterLight : twitterDark;
    const githubIcon = theme === 'light' ? githubLight : githubDark;
    const linkedinIcon = theme === 'light' ? linkedinLight : linkedinDark;

    useEffect(() => {
        $('#cv-button').on('click', function (e) {
            e.preventDefault();
            $('#cv-modal').fadeIn();
        });

        $('#cv-modal-close').on('click', function () {
            $('#cv-modal').fadeOut();
        });
    }, []);

    return (
        <section id="hero" className={styles.container}>
            <div className={styles.colorModeContainer}>
                <img className={styles.hero} src={heroImg} alt="Profile Picture of Uzayr Qureshi" />
                <img className={`${styles.colorMode} ${styles.floatAround}`} src={themeIcon} alt="Color mode icon" onClick={toggleTheme} />
            </div>
            <div className={styles.info}>
                <h1>
                    Uzayr
                    <br />
                    Qureshi
                </h1>
                <h2>Software Developer</h2>
                <span>
                    <a href='https://www.twitter.com/' target='_blank' rel="noopener noreferrer">
                        <img src={twitterIcon} alt="Twitter" />
                    </a>
                    <a href='https://www.linkedin.com/in/uzayr-qureshi-b2a8ba245/' target='_blank' rel="noopener noreferrer">
                        <img src={linkedinIcon} alt="LinkedIn" />
                    </a>
                    <a href='https://www.github.com/' target='_blank' rel="noopener noreferrer">
                        <img src={githubIcon} alt="GitHub" />
                    </a>
                </span>
                <p className={styles.description}>Passionate software developer dedicated to creating innovative solutions, solving complex problems, and continuously learning to drive technological excellence.</p>
                <a href="#" id="cv-button">
                    <button className="hover">CV</button>
                </a>
            </div>

            {/* Modal */}
            <div id="cv-modal" className={styles.modal}>
                <div className={styles.modalContent}>
                    <span id="cv-modal-close" className={styles.modalClose}>&times;</span>
                    <h2>CV Available Upon Request</h2>
                    <p>Please email <a href="mailto:uzayrwork@gmail.com">uzayrwork@gmail.com</a> to request a copy of my CV. Thanks!</p>
                </div>
            </div>
        </section>
    );
}

export default Hero;
