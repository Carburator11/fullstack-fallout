import { checkPos }  from './gameAnim.js';
 
 
 
 const togglePause = (that)=>{
    console.log('togglePause')
    if(!that.state.pause){
        console.log('PAUSE');
        that.setState({
            pause: true,
            isIdle: true
        });
    }

    else{
        console.log('un-PAUSE');
        that.setState({
            pause: false, isIdle: false
        }, ()=> checkPos(that) );
    }
}

const gameOver = (that) => {
    console.log('GAME OVER');
    that.setState({
      pause: true,
      isIdle: true,
      gameOver: true
    });  
  
  }


// Bonus event shows a "PERK"
const bonusCheck = (that, count) => {
    console.log("Bonus count: " + count);
    if (  (count % 5) === 0){
        bonusEvent(that);
    }

    if(count > 21 ){
        gameOver(that);
    }

}

const bonusEvent = (that) => {
    console.log("BONUS");
    that.setState({bonusEvent: true,  pause: true, idIdle: true});

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
    that.setState({bonusEvent: false, bonusNum : newBonusNum, pause: false, isIdle: false}, ()=> checkPos(that) );
}
  


export { togglePause, gameOver, bonusCheck, bonusEvent, bonusClose };