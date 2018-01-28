
// This compoenent is mostly for enemies...
// It was called NPC at the beginning of the project for "Non-Playing Character"
// Its properties come from Playgroung compoent {this.state.enemies}
// This component should be (or will be) renamed Enemies instead of NPC.js

import React from 'react';
import Cow from './Cow.js';

export default function NPC(props){ 

    const npc = props.npcPosition.map((el) =>
    <div style= {{ 
        left:   el.x,
        top:    el.y,
        width:  el.w, 
        height: el.h
        }}  className= "npc"
            id = { el.id}
            key= { el.id} >
    <Cow
            spriteX = { el.spriteX}
            spriteY = { el.spriteY}
     />
    </div>
    );

return( <div>{npc}</div> )

};