import { checkPos }  from './gameAnim.js';
 
 
 
 const togglePause = (state)=>{
    console.log('togglePause')
    if(!state.pause){
        console.log('PAUSE');
        state.pause = true;
        state.active = false;
        return state;
    }

    else{
        console.log('un-PAUSE');
        state.pause = false;
        state.active = true;
        return state;
    }
}

const gameOver = (state) => {
    console.log('GAME OVER');
    state.pause = true;
    state.active = false;
    state.gameOver = true;
    return state;
  
  }


// Bonus event shows a "PERK"
const bonusCheck = (that, count) => {
    console.log("Bonus count: " + count);
    if (  (count % 3) === 0){
        that.setState( bonusEvent(that.state) );
    }

    if(count > 21 ){
        that.setState( gameOver(that.state) );
    }

}

const bonusEvent = (state) => {
    console.log("BONUS");
    state.pause = true;
    state.active = false;
    state.pathX = state.playerX;
    state.pathY = state.playerY;
    return state;

  }
  
const bonusClose = (that) => {
    that.timeBonus = 5;
    let newBonusNum;
    if(that.state.bonusNum < 3){ 
        newBonusNum = that.state.bonusNum;
        newBonusNum++;
     }
    else{
        newBonusNum = 0;
    }
    that.setState({bonusEvent: false, bonusNum : newBonusNum, pause: false}, ()=> checkPos(that) );
}
  


export { togglePause, gameOver, bonusCheck, bonusEvent, bonusClose };