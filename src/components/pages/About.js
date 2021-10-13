import React from 'react';

class About extends React.Component{
    render(){
        return (
            <div style={{maxWidth : '600px',margin : '0 auto'}}>
                <br/><br/>
                <h4>About Wyneed</h4>
                <p>
                    "What You need" attempts to solve a repetitive questions been asked by many potential students looking to go abroad for studies.
                </p><br/>
                <p>Q :  How much do I need to go and Study in the Uk, Us or Canada?</p>
                <p>A: You can now do it yourself</p>

                <br/><br/>
                <h4>About Author</h4>
                <p><em>Oluwaseun Aransiola </em> is Web Developer based in Southampton, UK. Less is More.  </p><br/><br/>

                <h4>Credits</h4>
                <p>Currency Converter  API : https://www.currencyconverterapi.com/ </p>
                <p>React </p><br/><br/>

                <h4>Disclaimer</h4>
                <p>This is for Development Use and it only accurate as of Today. Please refer to <a href="https://www.gov.uk/student-visa/money" target="_blank">GOV.UK</a> for accurate Information </p>
            </div>
        )
    }
}

export default About;