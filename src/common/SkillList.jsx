import React from 'react';

function SkillList({ src, skill }) { // Destructure props
  return (
    <span>
      <img src={src} alt="CheckMark icon"/>
      <p>{skill}</p>
    </span>
  );
}

export default SkillList;
