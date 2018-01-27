// Used by shoot function
import { animateShoot } from './ballistics';

const checkPos= (state) => {
    if(!state.pause){  
        var diffX = state.pathX - state.playerX ;
        var diffY = state.pathY - state.playerY ;
                 if( diffX === 0 && diffY > 0   ){ return move("S",   0,  1, state)  }
            else if( diffX === 0 && diffY < 0   ){ return move("N",   0, -1, state)  }
            else if( diffX > 0   && diffY === 0 ){ return move("E",   1,  0, state)  }
            else if( diffX < 0   && diffY === 0 ){ return move("W",  -1,  0, state)  }
            else if( diffX > 0   && diffY > 0   ){ return move("SE",  1,  1, state)  }
            else if( diffX > 0   && diffY < 0   ){ return move("NE",  1, -1, state)  }
            else if( diffX < 0   && diffY > 0   ){ return move("SW", -1,  1, state)  }
            else if( diffX < 0   && diffY < 0   ){ return move("NW", -1, -1, state)  }
            else if( diffX === 0 && diffY === 0 ){ 
                state.isIdle = true;
                return state
            }
    }
}

const move = (dir, x, y, state) => {
    if(!state.pause){
        that.setState(
        prevState => (
            { playerDir: dir,
              playerX: prevState.playerX + x,
              playerY: prevState.playerY + y           
            }), () => { 
                window.requestAnimationFrame(  () => { 
                    //checkPos(that.state)
                } )    
                    })

    }
}

const shoot = (that) =>{
    if(!that.state.pause){
        let newArray = that.state.shot;
        let newShoot = [ that.state.playerX +30, that.state.playerY -40 , "shot"+that.shotCount ];
        newArray[that.shotCount] = newShoot;
        that.setState({ shot:  newArray }, ()=>{ setTimeout(   that.setState({ isIdle: true }) , 1000 )    }) 
        animateShoot(that.shotCount, that);// imported from ballistics
        that.shotCount++;
    } 

}

export { checkPos, move, shoot };