import { togglePause, bonusEvent } from './gameCycle.js';
import { shoot } from '../function/gameAnim.js';
import { enemyDie } from './enemyAnim';


const keyboardEvents = (that) => {
  // Easter Egg !!^^ 

var count = 0;
window.addEventListener("keydown", 
    (e)=> {

        // Display or Hide level blocks
        // Note : I was too lazy to implement a proper pathfinding in this project, so blocks are hidden by default
        // Pretty sure it wasn't worth it
        if(e.key === "o"){
            (that.state.showBlocks)?
                that.setState({showBlocks: false})
                :
                that.setState({showBlocks: true})
            }

        if( (e.key === " ") || (e.key === "Enter") ){          
            shoot(that);
          }
      
        if( e.key === "e" ){
            bonusEvent(that);
        }
        if( e.key === "p" ){
            // Cannot un-pause, if the game is over
            if(!that.state.gameOver){
                togglePause(that);
            }
        }

        
        const konami = ["ArrowUp", "ArrowUp", "ArrowDown", "ArrowDown", "ArrowLeft", "ArrowRight", "ArrowLeft", "ArrowRight", "b", "a" ];
        if(e.key === konami[count]){
            console.log("cheatSequence:  " + count+ "/"+ (konami.length - 1) + " " + e.key);
            count++;
            if(e.key === konami[konami.length - 1]){
                
                that.setState({cheatMode: true});
                that.state.enemies.forEach((el)=>{
                    enemyDie(that.state.enemies.indexOf(el), 0, that)
                });               
                setTimeout(
                    ()=> {
                            that.setState(
                                {cheatMode: false, enemies: []})
                            }, 1800)}
              
            }
            else{  count = 0  }
        });
    }

    export { keyboardEvents };