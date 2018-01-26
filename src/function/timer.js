


import { gameOver } from './gameCycle';

// Timer till the Game is "over"




const decrTimeLeft = (that) => {
    //console.log('timer');
    if(!that.state.pause){ 
        if(that.state.timeLeft > 0){
        setTimeout(
            ()=>{ 
                that.setState( 
                    prevState => ({
                    timeLeft: (prevState.timeLeft - 1 + that.timeBonus)
                    }),
                    ()=>{
                        that.timeBonus = 0;
                        decrTimeLeft(that)
                        })
        } , 1000 )
        } 

        else{
            // Game over !
            gameOver(that);


        }
    } else {
    
    setTimeout(  ()=> {decrTimeLeft(that) }, 1000);
    }
    
}

export {decrTimeLeft};