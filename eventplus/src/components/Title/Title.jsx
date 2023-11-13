import React from 'react';
import "./Title.css"

const Title = ( {titleText, additionalClass = '', color = '', borderColor = ''} ) => {
    return (
        <h1 className = {`title margem-acima ${additionalClass}`} style={{color : color}}>
            {titleText}
            <hr className='margem-acima title__underscore' style = {{borderColor : borderColor}}/>
        </h1>
    );
};

export default Title;