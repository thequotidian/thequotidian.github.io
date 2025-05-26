import { useState, useEffect } from "react";
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

import './About.css';

function About() {
    return (
      <div class="aboutContainer">
        <div class="aboutHeader">About the Blog</div>
        <div class="aboutBody">
          <p>What's this blog all about? Well, that's a work in progress (as most
          things are). Broadly, I want to be more intentional in noticing the
          things around me that bring me joy, and give me a sense of "being human" in
          this world. And this blog is a means to documenting those things.</p>
          <p>Updates to be made here once I have something snappier (or
          even better truer!) to say.</p>
        </div>
      </div>
    );
}

export default About;
