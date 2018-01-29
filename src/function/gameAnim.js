

const checkPos= (pathX, pathY, playerX, playerY, pause) => {
    if(!pause){  
        var diffX = pathX - playerX ;
        var diffY = pathY - playerY ;
                 if( diffX === 0 && diffY > 0   ){ return { playerDir: "S", playerX: playerX + 0, playerY: playerY +  1, active: true}  }
            else if( diffX === 0 && diffY < 0   ){ return { playerDir: "N", playerX: playerX + 0, playerY: playerY   -1, active: true}  }
            else if( diffX > 0   && diffY === 0 ){ return { playerDir: "E", playerX: playerX + 1, playerY: playerY +  0, active: true}  }
            else if( diffX < 0   && diffY === 0 ){ return { playerDir: "W", playerX: playerX  -1, playerY: playerY +  0, active: true}  }
            else if( diffX > 0   && diffY > 0   ){ return { playerDir: "SE",playerX: playerX + 1, playerY: playerY +  1, active: true}  }
            else if( diffX > 0   && diffY < 0   ){ return { playerDir: "NE",playerX: playerX + 1, playerY: playerY   -1, active: true}  }
            else if( diffX < 0   && diffY > 0   ){ return { playerDir: "SW",playerX: playerX  -1, playerY: playerY +  1, active: true}  }
            else if( diffX < 0   && diffY < 0   ){ return { playerDir: "NW",playerX: playerX  -1, playerY: playerY   -1, active: true}  }
            else if( diffX === 0 && diffY === 0 ){ 
                return {active: false}
            }
    }
}

const shoot = (shots, playerX, playerY, e) =>{
    
    let newShot = {
        x: playerX +30,
        y: playerY -40,
        id: "shot"+e,
        num: e,
        active: true,
        impact: false,
        enemyShot: undefined
    };
    shots[e] = newShot;
    return shots;      
 
}

export { checkPos, shoot };