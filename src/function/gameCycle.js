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
        });
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

const bonusEvent = (that) => {
    console.log("BONUS");
    togglePause(that);
    that.setState({bonusEvent: true, bonusNum: 0});
  }
  
const bonusClose = (that) => {
    that.setState({bonusEvent: false, pause: false});
}
  


export { togglePause, gameOver, bonusEvent, bonusClose };