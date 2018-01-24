

// Triggers an animation of the enemy at index [e]
// Animation starts only if the enemy has the status 'alive' 
const enemyShot = (e, that) => {
    if(that.state.enemies[e][5] === "alive"){
        let newArray = that.state.enemies;
        newArray[e][5] = "shot";
        // There are two different animations for each "M" and "F" character, each one on a different Sprite row
        if((that.props.session.substr(0, 1) === "M" )){
            newArray[e][7] =  -100;
        } else{
            newArray[e][7] =  -200;
        }      
        that.setState({enemies: newArray}, ()=>{ 
            console.log(that.state.enemies[e][4] + ' - ' + that.state.enemies[e][5]);
            that.killCount++;
            that.playerScore += 15;
            console.log(that.props.session + " :" +  that.playerScore + " pts (kills: "  +  that.killCount  + ", shots: " + that.shotCount  +")" );

            // Animation 'enemyDie' will loop 10 times starting from 0
            enemyDie(e, 0, that);  
            
            // At the end of the animation, the enemy at index [e] is removed from the enemy array
            setTimeout(
                ()=>{
                  console.log(that.state.enemies[e][4] + " killed." );
                  let newArray = that.state.enemies; 
                  delete newArray[e];
                  that.setState({ enemies:  newArray  });
                  spawnEnemy(that);               
                }   , 1800)
        });  
    } 
}

// The animation triggered by "EnemyShot" will lopp 10 times
const enemyDie = (e, count, that)=> {
    if(count<10){
        count++;
        let newEnemies = that.state.enemies ;
        // Updating sprite left position on each loop
        newEnemies[e][6] =  newEnemies[e][6] - 150 ;

        // Animation will loop with a 150ms delay
        that.setState( { enemies: newEnemies  } , ()=> {
            setTimeout( ()=> {enemyDie(e, count, that)} , 150);
        })   
    } 
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

export { enemyShot, enemyDie, spawnEnemy }