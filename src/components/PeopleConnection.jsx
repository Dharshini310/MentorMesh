import React from 'react';
import Lottie from 'lottie-react';

import animationData from '../assets/connecting-people.json';

const PeopleConnect = ()=>{
    return(
        <div style={{width:'300px',margin:'auto'}}>
            <Lottie animationData={animationData} loop={true}/>
        </div>
    )
}

export default PeopleConnect;