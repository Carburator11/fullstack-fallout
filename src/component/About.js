import React, { Component } from 'react';
import about from '../pic/about.jpg';
import cv from '../cv/PVautherin_DevJS_fullstack.pdf';

  


class About extends Component {
    render() {
      return (
        <div className = "content">
        <div className= "about">
          <h1>About me & the fullstack-fallout project</h1>
          <p>Pierre, 33, from Paris area.<br/> I'm a big fan of Fallout and retro-gaming</p>
          <div className="download">
              <a href={cv} target="_blank"> > Download my CV !  </a>
          </div>

          <div className="download">
              <a href="https://www.linkedin.com/in/pierrevautherin/" target="_blank"> > Contact me on LinkedIn</a>
          </div>  



          <p>This project is based on React and React-Router (using CRA)<br/>
          It runs on a Node.js back-end, déployed on Heroku.</p>
          <div className="download">
              <a href="https://github.com/Carburator11/fullstack-fallout" target="_blank"> > Follow on GitHub</a>
          </div> 
          <img src={about} alt ="about me" title ="about me" style = {{width: 350}}/>

          <p id="disclaimer">Disclaimer: this is an educational project. <br/>
          Fallout (1997) is under Copyright from Interplay Productions, USA.<br/>
          All product names, logos, and brands are property of their respective owners.</p>

              
                

          </div>
        </div>
      );
    }
  }
  export default About;


  
 
