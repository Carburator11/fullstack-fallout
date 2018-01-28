
const enemyShot = (target) => {
    if(target){
        if(target.spriteY === 0){
            target.spriteY = ( Math.random() > 0.5 )? -100:-200;
        } 
        target.spriteX -= 150 ;
        if (target.spriteX < -1500){
            target.status = "dead";
        }
        else{
            target.status = "dying";
        }                
        return target;
    }
    else { return }
}


const spawnEnemy= (that) => {
  // Enemy status (this SHOULD be an object !! ) is stored in an array [0-7] :
  // [X position (css left), Y position (css top), Width, Heigth, name/id/key, status, spriteX, spriteY ]
  let randomX  =  200 + (( Math.random() * 10 ) * 20  )  ;  
  let randomY  =  100 + (( Math.random() * 10 ) * 30 )  ;
  let newName  =  'cow' + (that.state.enemies.length + 1);
  let newEnemy =  [randomX, randomY, 50, 50, newName, 'alive', 0, 0];
  let newEnemyArray = that.state.enemies ;
  newEnemyArray.push(newEnemy);
  that.cowCount++;
  that.setState({ enemies: newEnemyArray  });
}

export { enemyShot, spawnEnemy }