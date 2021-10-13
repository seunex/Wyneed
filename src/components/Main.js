import React from 'react';
import uk_logo from '../flags/uk.png';
import us_logo from '../flags/us.png';
import canada_logo from '../flags/canada.jpeg';
import Uk from "./forms/Uk";
import Us from "./forms/Us";
import Canada from "./forms/Canada";

class Main extends React.Component{
    state = {
        view : '',
        'flags' : [{
            'active' : 0,
            'name' : 'United Kingdom',
            'form' : <Uk />
        },{
            'active' : 0,
            'name' : 'United States',
            'form' : <Us />
        },{
            'active' : 0,
            'name' : 'Canada',
            'form' : <Canada />
        }]
    }
    showLinkContent =  () => {
        return this.state.view;
    }
    flagLink = (index) =>{
        this.setState({'view' :this.state.flags[index].form});
        return true;
    }
    render(){
        return (
            <div style={mainStyle}>
                <div className="flags-wrapper">
                    <h4>Where would you like to study? </h4>
                    <button onClick={() => this.flagLink(0)}>
                        <img src={uk_logo} />
                    </button>
                    <button onClick={() => this.flagLink(1)}>
                        <img src={us_logo} />
                    </button>
                    <button onClick={() => this.flagLink(2)}>
                        <img src={canada_logo} />
                    </button>
                </div>
                <div style={formStyle}>
                    {this.showLinkContent()}
                </div>
            </div>
        )
    }
}

const formStyle = {
    padding : '20px',
    margin : '0px auto',
    display : 'block',
}
const mainStyle = {
    minHeight : '400px',
}
export default Main;