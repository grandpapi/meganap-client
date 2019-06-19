import React from 'react';
import { Link } from 'react-router-dom';
import { BodyButton } from '../../../styles';

export default function InstructStartBuilding() {
  return (
    <section>
      <h2>Easy, right? So what are you waiting for? Sign up now and start making your dream fullstack app a reality! </h2>
      <Link to="/login"><BodyButton>Start Building!</BodyButton></Link>
    </section>
  );
}
