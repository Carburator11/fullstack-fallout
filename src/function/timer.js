import { gameOver } from './gameCycle.js';



// Timer till the "Game over"
export const decrTimeLeft = () => {
        console.log('timer');
        if(!this.state.pause){
            
            if(this.state.timeLeft > 0){
            setTimeout(
                ()=>{ 
                    this.setState( 
                        prevState => ({
                        timeLeft: (prevState.timeLeft - 1)
                        }),
                        ()=>{
                            decrTimeLeft()
                            })
            } , 1000 )
            } 
    
            else{
                // Game over !
                gameOver(this);
    
    
            }
        } else {
        setTimeout(  ()=> {decrTimeLeft() }, 1000);
        }
    
}