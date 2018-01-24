// Used by shoot function
import { animateShoot } from './ballistics';

const checkPos= (that) => {
    if(!that.state.pause){  
        var diffX = that.state.pathX - that.state.playerX ;
        var diffY = that.state.pathY - that.state.playerY ;
                 if( diffX === 0 && diffY > 0   ){ move("S",   0,  1, that)  }
            else if( diffX === 0 && diffY < 0   ){ move("N",   0, -1, that)  }
            else if( diffX > 0   && diffY === 0 ){ move("E",   1,  0, that)  }
            else if( diffX < 0   && diffY === 0 ){ move("W",  -1,  0, that)  }
            else if( diffX > 0   && diffY > 0   ){ move("SE",  1,  1, that)  }
            else if( diffX > 0   && diffY < 0   ){ move("NE",  1, -1, that)  }
            else if( diffX < 0   && diffY > 0   ){ move("SW", -1,  1, that)  }
            else if( diffX < 0   && diffY < 0   ){ move("NW", -1, -1, that)  }
            else if( diffX === 0 && diffY === 0 ){ 
                that.setState({ isIdle: true });
            }
    }
}

const move = (dir, x, y, that) => {
    if(!that.state.pause){
        that.setState(
        prevState => (
            { playerDir: dir,
              playerX: prevState.playerX + x,
              playerY: prevState.playerY + y           
            }), () => { 
                window.requestAnimationFrame(  () => { checkPos(that) } )    
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