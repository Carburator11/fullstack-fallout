import cv from '../cv/PVautherin_DevJS_fullstack.pdf';
import React, { Component } from 'react';



export default class CV extends Component{
    componentWillMount() {
        window.open({cv}, '_blank');
   
    }



} 
