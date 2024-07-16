import React from 'react';
import styles from './ProjectStyles.module.css';
import viberr from '../../assets/viberr.png';
import ProjectCard from '../../common/ProjectCard';
import freshBurger from '../../assets/fresh-burger.png'

function Projects() {
  return (
    <section id="projects" className={styles.container}>
        <h1 className='sectionTitle'>Projects</h1>
        <div className={styles.projectsContainer}>
        <ProjectCard
        src={viberr}
        link='www.google.com' 
        h3='SW£££P£R' 
        p='Pen-Testing Tool'/>
        
        <ProjectCard
        src={freshBurger}
        link='www.google.com' 
        h3='Website' 
        p='Womens Charity Website'/>
        <ProjectCard
        src={freshBurger}
        link='www.google.com' 
        h3='Website' 
        p='Womens Charity Website'/>
        <ProjectCard
        src={freshBurger}
        link='www.google.com' 
        h3='Website' 
        p='Womens Charity Website'/>
        </div> 
    </section>

    

    
  );
}

export default Projects
