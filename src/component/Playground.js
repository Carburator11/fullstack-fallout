import React, { Component } from 'react';
import Path  from './game/Path.js';
import PlayerPos from './game/PlayerPos.js';
import Blocks    from './game/Blocks.js';
import NPC   from './game/NPC.js';
import Shot  from './game/Shot.js';
import Nuke  from './game/Nuke.js';
import Timer from './game/Timer.js';
import GameOver from './game/GameOver.js';
import Bonus from './game/Bonus.js';
import bg    from '../pic/game/bg1.jpg';
import { bonusClose } from '../function/gameCycle.js';
import { keyboardEvents } from '../function/keyboardEvents.js';
import { decrTimeLeft } from '../function/timer.js';
import { checkPos }  from '../function/gameAnim.js';

class Playground extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            pause:    false,
            gameOver: false,
            bonusEvent: false,
            bonusNum: 0,
            pathX:    60,
            pathY:   -50,
            playerX:  60,
            playerY:  200,
            playerDir: 'IDLE',
            isIdle:     true,
            showBlocks: false,
            cheatMode:  false,
            shot: [],
            timeLeft:  30,

            enemies: [
                // X position (css left), Y position (css top), Width, Heigth, id/key, status, spriteX, spriteY
                // this should be an object...  :/
                // These three enemies aren't counted in cowCount below
                [500, 150, 50, 50, "cow1", "alive", 0, 0],
                [500, 350, 50, 50, "cow2", "alive", 0, 0],
                [400, 400, 50, 50, "cow3", "alive", 0, 0]]
            };
        
        // Not used in the final version
        this.blocks = [
            [150, 150, 50, 80, "block1"],
            [240, 240, 40, 40, "block2"]
                      ] ;

        // Used for scores
        this.shotCount   = 0;
        this.killCount   = 0;
        this.playerScore = 0;
        
        // Used for setting shoot animations
        this.shootStatus = {
            anEnemyHasBeenShot: false,
            indexOfEnemyShot: ''
        }
    }

// Bound with arrow function in render
handleClick(e){
    if( this.state.isIdle && !this.state.pause ){
      this.setState({pathX: e.clientX, pathY: e.clientY, isIdle: false }, () => { checkPos(this) })
    }   
}

componentDidMount() {
    decrTimeLeft(this);
    keyboardEvents(this);
}


render() {
      return (
        <div className = "playground" onClick = { (e) => this.handleClick(e) } style={{ backgroundImage: "url(" + bg + ")" }}>        
          Click to move, 'Space' to shoot  {this.props.session}       
          <Timer time= {this.state.timeLeft} />

          {this.state.bonusEvent? <Bonus
            num = {this.state.bonusNum}
            close = { () => { bonusClose(this) } }
          />:""}  

          {this.state.gameOver? <GameOver
              playerScore = {this.playerScore}
              killCount   = {this.killCount}
              shotCount   = {this.shotCount}
          />:""}

          <Path 
                pathX = {this.state.pathX} 
                pathY = {this.state.pathY}
           />

          <PlayerPos
                playerX  = { this.state.playerX }
                playerY  = { this.state.playerY }
                dir   =    { this.state.playerDir }
                playerId = { this.props.session }
                isIdle   = { this.state.isIdle }
             />
          
          <Blocks blocks =       { this.state.showBlocks?this.blocks:[] } />
          <NPC    npcPosition  = { this.state.enemies } />
          <Shot   shotPosition = { this.state.shot} />
          {this.state.cheatMode? <Nuke />:""}
         
        </div>
      );
    }
  }

  export default Playground;