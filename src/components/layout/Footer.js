import React from 'react';
import {Link} from 'react-router-dom';

class Footer extends React.Component{
    render(){
        return (
            <div className="text-center footer">
                <p style={{color : '#555',marginBottom : '10px'}}> <Link to="/">Home</Link> | <Link to="/about">About </Link> </p>
                <p>Disclaimer : This is for Development Use and it only accurate as of Today. Please refer to <a href="https://www.gov.uk/student-visa/money" target="_blank">GOV.UK</a> for accurate Information </p>
            </div>
        )
    }
}

export default Footer;