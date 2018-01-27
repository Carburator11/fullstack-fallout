import React from 'react';

export default function Shot(props){ 

    const shot = props.shotPosition.map((el) =>
        (el.active)?
        (<div style= {{ 
            left: el.x,
            top: el.y,
            width: 3, 
            height: 3
            }}  className= "shot"
                id = { el.id}
                key= { el.id} >
        </div>
        )
        :
        "");

return( <div>{shot}</div> )

};