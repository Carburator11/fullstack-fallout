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
import { animateShoot } from '../function/ballistics';
import { togglePause, bonusEvent,  bonusClose } from '../function/gameCycle.js';
import { decrTimeLeft }   from '../function/timer.js';
import { checkPos, shoot }  from '../function/gameAnim.js';
import { enemyDie } from '../function/enemyAnim';



class Playground extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            pause:    false,
            gameOver: false,
            bonusEvent: false,
            bonusNum: 0,  
            playerX:  10,
            playerY:  200,
            pathX:    100,
            pathY:    200,
            playerDir: 'IDLE',
            active:     false,
            showBlocks: false,
            cheatMode:  false,
            shot: [],
            timeLeft:  30,
            shotCount:  0,

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
        this.killCount   = 0;
        this.playerScore = 0;
        this.timeBonus   = 0;
        // Used for setting shoot animations
        this.shootStatus = {
            anEnemyHasBeenShot: false,
            indexOfEnemyShot: ''
        }
        // used for Konami code
        this.keyboardCount = 0;

        this.intervId;
    }


handleClick(e){   
    if( !this.state.pause ){
        this.setState({pathX: e.clientX, pathY: e.clientY }, () => {
            this.animate();  
        })
    }   
}

animate(){
    const refreshTime = 15 ; // ~24img/sec
    clearInterval(this.intervId); // reset preivious anims
    this.intervId = setInterval( ()=>{
        this.setState( checkPos(this.state), ()=>{
            if(!this.state.active){
                clearInterval(this.intervId);
            }
        });
    }, refreshTime);
}


componentDidMount() {
    decrTimeLeft(this);
    this.animate();  // Player will enter in the Playground
    window.addEventListener("keydown", 
        (e)=> {
            if( (e.key === " ") || (e.key === "Enter") ){          
                this.setState(shoot(this.state),  ()=>{ animateShoot( this.state , this ) } );
            }
            
            if( e.key === "e" ){
                  bonusEvent(this);
            }
            if( e.key === "p" ){
                // Cannot un-pause, if the game is over
                if(!this.state.gameOver){
                    this.setState( togglePause(this.state), ()=>{ if(!this.state.pause){ this.animate();  }  } );
                }
            }

            // Display or Hide level blocks (not used in final version)
            if(e.key === "o"){
                (this.state.showBlocks)?
                    this.setState({showBlocks: false}):
                    this.setState({showBlocks: true})
            }
            
            // Easter Egg !!^^
            const konami = ["ArrowUp", "ArrowUp", "ArrowDown", "ArrowDown", "ArrowLeft", "ArrowRight", "ArrowLeft", "ArrowRight", "b", "a" ];
            if(e.key === konami[this.keyboardCount]){
                console.log("cheatSequence:  " + this.keyboardCount + "/"+ (konami.length - 1) + " " + e.key);
                this.keyboardCount++;
                if(e.key === konami[konami.length - 1]){
                    this.setState({cheatMode: true});
                    this.state.enemies.forEach((el)=>{
                        enemyDie(this.state.enemies.indexOf(el), 0, this)});               
                        setTimeout(
                            ()=> {
                                this.setState(
                                    {cheatMode: false, enemies: []})
                                }, 1800)}
                    
                }
                else{  this.keyboardCount = 0  }
            });
}

componentWillUnmount() {
    window.removeEventListener("keydown");
    clearInterval(this.intervId);
}

render() {
      return (
        <div
            className = "playground" 
            onClick = { (e) => this.handleClick(e) }
            style={{ backgroundImage: "url(" + bg + ")" }}>

          Click to move, 'Space' to shoot  {this.props.session}       
          <Timer time= {this.state.timeLeft} />

          {(this.state.bonusEvent && !this.state.gameOver ) ?
             <Bonus
                num = {this.state.bonusNum}
                close = { () => { bonusClose(this) } }
            />:""}  

          {this.state.gameOver ? <GameOver
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
                active   = { this.state.active }
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