import { enemyShot } from './enemyAnim';



// Argument 'e' is defined by 'shotCount', it is the index of the 'shot' in this.state.shot
const checkImpact = (e, state, that) => {
    that.state.enemies.forEach((el) =>{
        var margin = 10;
        var shotOnX = ( (state.shot[e].x > ( el[0] - margin) ) && ( state.shot[e][0] < ( el[0] + el[2] + margin  ) ) );
        var shotOnY = ( (state.shot[e].y > ( el[1] - margin) ) && ( state.shot[e][1] < ( el[1] + el[3] + margin  ) ) );
        if(shotOnX  &&  shotOnY){
            that.setState({shootStatus : {
                anEnemyHasBeenShot: true,
                indexOfEnemyShot: that.state.enemies.indexOf(el)
                }
            });
        }  
    })
}

// Argument 'e' is the index of the 'shot' in Array this.state.shot
// Each element of this.state.shot is an array containing the position of each 'shot'
// Each element of this.state.enemies is an array containing the position of each 'enemy'
// Deleting a 'shot'/'enemy' from its Array deletes the 'enemy' from the DOM
const animateShoot = (state, that) => {
    console.log(state.shotCount);
    var intervID = setInterval(
        ()=>{
            checkImpact(state.shotCount, that);
            
            // CASE : bullet out of playground  (hardcoded playground width = 790 ! )
            if(that.state.shot[state.shotCount].x > 790){
                clearInterval(intervID);
                let newArray = state.shot;
                delete newArray[state.shotCount];
                that.setState({ shot:  newArray  });
                }

            else{

                // CASE : an enemy is shot
                if(state.shootStatus.anEnemyHasBeenShot){
                    clearInterval(intervID);
                    let newArray = that.state.shot;
                    delete newArray[state.shotCount];   
                    enemyShot(that.shootStatus.indexOfEnemyShot, that);// imported from enemyAnim
                    that.shootStatus = {
                        anEnemyHasBeenShot: false,
                        indexOfEnemyShot: ''}

                    that.setState({ shot:  newArray  });
                    }                  

                else{
                    // CASE : no collision, the shot keeps moving...
                    let newArray = state.shot;
                    newArray[state.shotCount].x += 20;
                    that.setState({ shot:  newArray  });
                  }                    
            }
    }, 50);

}

export { checkImpact, animateShoot }