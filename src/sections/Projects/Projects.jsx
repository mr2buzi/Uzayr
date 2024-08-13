import React from 'react';
import styles from './ProjectStyles.module.css';
import website from '../../assets/responsive-design.png';
import ProjectCard from '../../common/ProjectCard';
import cpu from '../../assets/circuit-board.png';
import sw333p from '../../assets/account.png';
import game from '../../assets/game-development.png';

function Projects() {
  return (
    <section id="projects" className={styles.container}>
        <h1 className='sectionTitle'>Projects</h1>
        <div className={styles.projectsContainer}>
        <ProjectCard
        src={sw333p}
        link='https://media.licdn.com/dms/image/C4E22AQFjHaxY8igAVQ/feedshare-shrink_800/0/1658249612969?e=1724284800&v=beta&t=Xc9JUf7v1oOTpcb2TxiU54uNONuwC-wAd5vZaplvu1U' 
        h3='SW£££P£R' 
        p='Pen-Testing Tool'/>
        
        <ProjectCard
        src={website}
        link='https://ibb.co/tC5VsQ8' 
        h3='Website' 
        p='Womens Charity Website'/>
        <ProjectCard
        src={cpu}
        link='www.google.com' 
        h3='Temperature Sensor' 
        p='NRF7002dk board utilisation'/>
        <ProjectCard
        src={game}
        link='https://ibb.co/8752j8G' 
        h3='Game' 
        p='Python Game Utiliting AI'/>
        </div> 
    </section>

    

    
  );
}

export default Projects
