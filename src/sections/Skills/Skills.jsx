import React, { useState } from 'react';
import styles from './SkillsStyles.module.css';
import checkMarkIcon from '../../assets/checkmark-dark.svg';
import SkillList from '../../common/SkillList';

function Skills() {
    const [visibleSection, setVisibleSection] = useState(null);

    const toggleSection = (section) => {
        setVisibleSection(visibleSection === section ? null : section);
    };

    return (
        <section id="skills" className={styles.container}>
            <h1 className="sectionTitle">Skills</h1>
            <hr />
            <button onClick={() => toggleSection('frontend')} className={styles.sectionButton}>Frontend Dev</button>
            <hr />
            {visibleSection === 'frontend' && (
                <div className={styles.skillList}>
                    <SkillList src={checkMarkIcon} skill="HTML" />
                    <SkillList src={checkMarkIcon} skill="CSS" />
                    <SkillList src={checkMarkIcon} skill="Javascript" />
                    <SkillList src={checkMarkIcon} skill="Bootstrap" />
                    <SkillList src={checkMarkIcon} skill="React Js" />
                    <SkillList src={checkMarkIcon} skill="Jquery" />
                </div>
            )}
            <hr />
            <button onClick={() => toggleSection('backend')} className={styles.sectionButton}>Backend Dev</button>
            <hr />
            {visibleSection === 'backend' && (
                <div className={styles.skillList}>
                    <SkillList src={checkMarkIcon} skill="PhP" />
                    <SkillList src={checkMarkIcon} skill="XAMPP" />
                    <SkillList src={checkMarkIcon} skill="SQL" />
                    <SkillList src={checkMarkIcon} skill="Google Analytics" />
                    <SkillList src={checkMarkIcon} skill="My PhP Admin " />
                </div>
            )}
            <hr />
            <button onClick={() => toggleSection('software')} className={styles.sectionButton}>Software Dev</button>
            <hr />
            {visibleSection === 'software' && (
                <div className={styles.skillList}>
                    <SkillList src={checkMarkIcon} skill="Python" />
                    <SkillList src={checkMarkIcon} skill="C Language" />
                    <SkillList src={checkMarkIcon} skill="Git" />
                    <SkillList src={checkMarkIcon} skill="Batch" />
                    <SkillList src={checkMarkIcon} skill="LDRA" />
                    <SkillList src={checkMarkIcon} skill="Google Collabs" />
                    <SkillList src={checkMarkIcon} skill="YoloV8 " />
                    <SkillList src={checkMarkIcon} skill="TensorFlow " />
                </div>
            )}
            <hr />
            <button onClick={() => toggleSection('os')} className={styles.sectionButton}>OS</button>
            <hr />
            {visibleSection === 'os' && (
                <div className={styles.skillList}>
                    <SkillList src={checkMarkIcon} skill="Kali Linux" />
                    <SkillList src={checkMarkIcon} skill="Ubuntu" />
                    <SkillList src={checkMarkIcon} skill="Parrot OS" />
                    <SkillList src={checkMarkIcon} skill="Tails" />
                </div>
            )}
            <hr />
            <button onClick={() => toggleSection('cybersecurity')} className={styles.sectionButton}>CyberSecurity</button>
            <hr />
            {visibleSection === 'cybersecurity' && (
                <div className={styles.skillList}>
                    <SkillList src={checkMarkIcon} skill="MITM" />
                    <SkillList src={checkMarkIcon} skill="SQL injection" />
                    <SkillList src={checkMarkIcon} skill="nmap " />
                    <SkillList src={checkMarkIcon} skill="Metasploit " />
                    <SkillList src={checkMarkIcon} skill="Bruteforce " />
                    <SkillList src={checkMarkIcon} skill="Hardware Hacking " />
                </div>
            )}
            <hr />
            <button onClick={() => toggleSection('hardware')} className={styles.sectionButton}>Hardware</button>
            <hr />
            {visibleSection === 'hardware' && (
                <div className={styles.skillList}>
                    <SkillList src={checkMarkIcon} skill="ESP-32 Cam" />
                    <SkillList src={checkMarkIcon} skill="STM32" />
                    <SkillList src={checkMarkIcon} skill="ESP 8266 " />
                    <SkillList src={checkMarkIcon} skill="Raspberry Pi 5 " />
                </div>
            )}
        </section>
    );
}

export default Skills;
