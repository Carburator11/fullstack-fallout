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
import { checkImpact } from '../function/ballistics';
import { togglePause, bonusEvent, bonusClose } from '../function/gameCycle.js';
import { decrTimeLeft }   from '../function/timer.js';
import { checkPos, shoot }  from '../function/gameAnim.js';
import { enemyShot } from '../function/enemyAnim';

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
            session:    this.props.session,
            timeLeft:   30,

            killCount:   0,
            currentKill: [],
            playerScore: 0,
            enemies: [
                {x:500, y:150, w:50, h:50, id:"cow1", status:"alive", spriteX: 0, spriteY: 0 },
                {x:500, y:350, w:50, h:50, id:"cow2", status:"alive", spriteX: 0, spriteY: 0 },
                {x:400, y:400, w:50, h:50, id:"cow3", status:"alive", spriteX: 0, spriteY: 0 }
            ],
            animQueue: [],
            animQueuePointer: 0
        };
        
        // Not used in the final version
        this.blocks = [
            [150, 150, 50, 80, "block1"],
            [240, 240, 40, 40, "block2"]
                      ] ;

        // Used for scores
        this.timeBonus   = 0;

        // used for Konami code
        this.keyboardCount = 0;
        this.refreshTime = 10 // =50img/sec
        this.intervId;
        this.readyToShot = true;
        this.rateOfFire = 300; 
        this.shotCount=   0;
    }


handleClick(e){
    if( !this.state.pause ){      
        this.setState({pathX: e.clientX, pathY: e.clientY }, () => {
            this.newAnim("move")
        })      
    }   
}



newAnim(type, targetArgument, cb){
    
    let targetParameter = (targetArgument === undefined)?"":targetArgument;

    let newAnim = {
        type: type,
        target: targetParameter
    }
    console.log("newanim : ", newAnim);
    let newAnimQueue = this.state.animQueue;
    newAnimQueue.push(newAnim);

    this.setState({ newAnimQueue }, ()=>{
        this.handleAnimQueue();
        if(cb){ cb(); }  
        
        
    });
}

handleAnimQueue(){
    let pointer = this.state.animQueuePointer;
    let action = this.state.animQueue[pointer];  
    if(action){
        console.log('handleAnimQueue - '+ action.type +' on ' + action.target, action);
        
        if(action.type === "enemyDie"){
             let intervId = setInterval(
                () => {
                    let targetToAnimate = this.state.enemies[action.target] ;       
                    this.setState( enemyShot(targetToAnimate)
                            ,()=>{
                                if(targetToAnimate.status === "dead"){
                                    let updatedArray = this.state.enemies;
                                    //updatedArray[action.target] = [];
                                    this.newAnim("spawn");
                                    this.setState({enemies: updatedArray})
                                    clearInterval(intervId);
                                    console.log("clearInterval ");
                                };
                    })
                }, 200  )
        }

        else if(action.type === "shoot"){
            let e = action.target;
            let currentShot = this.state.shot[e];
            let intervId = setInterval( ()=>{
                window.requestAnimationFrame(()=>{
                    this.setState(
        
                        /* ballistics.js */
                        checkImpact( this.state.enemies, currentShot )
                            , ()=> {
                                if(!currentShot.active) {
                                    clearInterval(intervId);
                                    console.log('shot'+e+' - out - clearInterval') 
                                }
        
                                if(currentShot.impact){
                                    let num = currentShot.enemyShot; //index of the Enemy shot
                                    let newShotArray =  this.state.shot;
                                    newShotArray[e].active = false;
                                 
                                    this.setState({ newShotArray }, ()=>{
                                        
                                        this.newAnim("enemyDie", num, ()=>{
                                            clearInterval(intervId);
                                        })
                                    });
                                }                                           
                            }
                    )
                })
            }, this.refreshTime)   
        }

        else if(action.type === "move"){
            clearInterval(this.intervId); // reset previous anims, if any
            this.intervId = setInterval( ()=>{
                window.requestAnimationFrame(()=>{
                    this.setState(
                        checkPos(this.state)
                        , ()=>{
                        if(!this.state.active){
                            clearInterval(this.intervId);
                        }
                    });
                })
            }, this.refreshTime);
        }

        pointer++;
        this.setState( {animQueuePointer: pointer }, ()=>{ this.handleAnimQueue  }  ) 
    } 
}



componentDidMount() {
    decrTimeLeft(this);
    this.newAnim("move");  // Player will enter in the Playground

    window.addEventListener("keydown", 
        (e)=> {

            /* SHOOT Function */
            if( (e.key === " ") && this.readyToShot && !this.state.pause){
                this.shotCount++;
                this.readyToShot = false;        
                this.setState(
                    shoot(this.state.shot, this.state.playerX, this.state.playerY, this.shotCount),
                    ()=>{    
                        this.newAnim("shoot", this.shotCount);
                        setTimeout(
                            ()=>{  // Delay between each shot
                                this.readyToShot = true;
                            }, this.rateOfFire
                        )
                    }
                )
            }
            
            /* BONUS Function (test) */
            if( e.key === "e" ){
                bonusEvent(this);
            }

            /* PAUSE Function */
            if( e.key === "p" ){
                if(!this.state.gameOver){
                    this.setState( togglePause(this.state), ()=>{ if(!this.state.pause){ this.animate();  }  } );
                }
            }

            // toggle BLOCKS (not used in final version)
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
                        enemyShot(this.state.enemies.indexOf(el), 0, this)});               
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