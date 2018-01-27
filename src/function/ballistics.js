import { enemyShot } from './enemyAnim';

// Argument 'e' is defined by 'shotCount', it is the index of the 'shot' in this.state.shot

const stepShot = (state, that, e) => { 

    const impactCheck = () => {
        let resultObj={};    

        state.enemies.forEach((el) =>{
            var margin = 10;
            var shotOnX = ( (state.shot[e].x > ( el[0] - margin) ) && ( state.shot[e].x < ( el[0] + el[2] + margin  ) ) );
            var shotOnY = ( (state.shot[e].y > ( el[1] - margin) ) && ( state.shot[e].y < ( el[1] + el[3] + margin  ) ) );
            
            if(shotOnX  &&  shotOnY){           
                resultObj = {
                    hasShot: true,
                    enemyShot: state.enemies.indexOf(el)
                }
            }
        })
        return resultObj ;

    }
            
    let result = impactCheck();
    if(result.hasShot){
        //console.log("RESULT: ", result.enemyShot);
    } else {
        //console.log("RESULT:  :/");
    }

    // CASE : bullet out of playground  (hardcoded playground width = 790 ! )
    if(state.shot[e].x > 790){
        state.shot[e].active = false;
        return state ;
        }

    else{

        // CASE : an enemy is shot
        if(result.hasShot){
            state.shot[e].active = false;
            console.log("Launching enemy Die anim ", result.enemyShot);
            //return state;
            return enemyShot(state, that, result.enemyShot);// imported from enemyAnim 
            }                  

        else{
            // CASE : no collision, the shot keeps moving...
            state.shot[e].x += 5;
            return state;
            }                    
    }
}

export { stepShot }