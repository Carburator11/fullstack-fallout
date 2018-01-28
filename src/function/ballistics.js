const checkImpact = (enemies, currentShot) =>{
    // shot is out of Playground (hardcoded width = 790 ! )
    if(currentShot.x > 790){
        currentShot.active= false;
        console.log('shot'+ currentShot.num +" - out without collision")
        return currentShot;
        }   
    
    else{
        let margin = 10;
        enemies.forEach((el) =>{
            let shotOnX = ( (currentShot.x > ( el.x - margin) ) && ( currentShot.x < ( el.x + el.w + margin  ) ) );
            let shotOnY = ( (currentShot.y > ( el.y - margin) ) && ( currentShot.y < ( el.y + el.h + margin  ) ) );
            
            if(shotOnX  &&  shotOnY && (el.status === "alive") ){           
            // collision with an alive Enemy
                el.status = "shot";
                currentShot.enemyShot =  enemies.indexOf(el);
                currentShot.impact = true;       
                console.log('shot'+ currentShot.num +" - impact on enemy" + currentShot.enemyShot);
                return {currentShot, enemies}
                }
            
        })
        
        // No collision
            currentShot.x += 3;
            return currentShot ;
        }
        
    
}


export { checkImpact }