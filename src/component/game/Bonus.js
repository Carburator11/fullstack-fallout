import React, { Component } from 'react';
import agile from '../../pic/perk/agile.jpg';
import fullstack from '../../pic/perk/fullstack.jpg'
import learn from '../../pic/perk/learn.jpg'
import react from '../../pic/perk/react.jpg'

const perks = [react, fullstack, learn, agile];

export default class Bonus extends Component{
    constructor(props){
        super(props);
        this.state = {    };
        
    }

    render(){
        return(
            
                <div id = "bonus">
                    <div className="perk">
                        <img src = { perks[this.props.num] } alt='perks' />
                        <button onClick ={ this.props.close } ></button>                  
                    </div>
                </div>
            
            );
    }

}



  
