import { gameOver } from './gameCycle.js';



// Timer till the "Game over"
const decrTimeLeft = (that) => {
    //console.log('timer');
    if(!that.state.pause){ 
        if(that.state.timeLeft > 0){
        setTimeout(
            ()=>{ 
                that.setState( 
                    prevState => ({
                    timeLeft: (prevState.timeLeft - 1)
                    }),
                    ()=>{
                        
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