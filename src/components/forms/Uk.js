import React from 'react';


class Uk extends React.Component{
    state = {
        tuition : 0,
        living_expenses : 0,
        total : 0,
        people : 1,
        place : 'london',
        show_result : false,
        currency : '',
        currency_show : '',
        new_currency_value : 0
    }

    handleChange = (e) => {
        this.setState({[e.target.name] : e.target.value});
    }
    calculate = () => {
        let living_in_london = 1334; //student
        let living_outside_london = 1023; //student

        let living_in_london_dependant = 845;
        let living_outside_london_dependant = 680;
        let living_expenses = 0;
        let people = parseInt(this.state.people);

        if(this.state.place === 'london'){
            living_expenses =+ living_in_london * 9;
            //it means this student is going with dependants
            if(people){
                living_expenses += living_in_london_dependant * (people - 1) * 9;
            }
        }else{
            //it means this student is going with dependants
            if(people){
                living_expenses += living_outside_london_dependant * (people - 1) * 9;
            }
            living_expenses += living_outside_london * 9;
        }
        let tuition = this.state.tuition ? parseFloat(this.state.tuition) : 0;
        let total = parseFloat(living_expenses) + tuition;
        this.setState({show_result : true,living_expenses : this.formatMoney(living_expenses),total : total});
    }

    convert = () =>{
        let cur = this.state.currency;
        let total = this.state.total;
        let c_name = 'GBP_'+cur;
        const d = new Date();
        //YYYY-MM-DD
        let date = d.getFullYear()+'/'+d.getMonth()+'/'+d.getDay();
        if(cur == ''){
            alert('choose a currency');
            return false;
        }
        //return true;
        //make api request
        fetch('https://free.currconv.com/api/v7/convert?q='+c_name+'&compact=ultra&apiKey=508c633db90db83f44bb')
            .then(async response => {
                const data = await response.json();

                if (!response.ok) {
                    // get error message from body or default to response statusText
                    const error = (data && data.message) || response.statusText;
                    return Promise.reject(error);
                }
                console.log(data);
                this.setState({ currency_show : cur,new_currency_value: data[c_name] * total});
            })
            .catch(error => {
                //this.setState({ errorMessage: error.toString() });
                alert(error.toString());
                console.error('There was an error!', error);
            });
        //update the new_currency_value
    }

     formatMoney(number) {
        if(isNaN(number)) return 0;
         return  number.toLocaleString('en-US');
    }

    showResult = () => {
        return this.state.show_result;
    }
    render(){
        return (
            <React.Fragment>
                <div className="form-row">
                    <label style={inputLabel}>How much is your Tuition (£)? </label>
                    <input style={inputStyle} type="number" name="tuition" placeholder="14,300" onChange={this.handleChange} />
                </div>
                <div className="form-row">
                    <label style={inputLabel}>Place of Study?</label>
                    <div>
                        <select style={inputStyle} name="place"
                            onChange={this.handleChange}>
                            <option value="london">London</option>
                            <option value="outside">Outside London</option>
                        </select>
                    </div>
                </div>
                <div className="form-row">
                    <label style={inputLabel}>How many people are going to study with you?</label>
                    <div>
                        <select style={inputStyle} name="people"
                            onChange={this.handleChange}>
                            <option value="1">I am going alone</option>
                            <option value="2">I am going with my partner</option>
                            <option value="3">I am going with my partner and 1 child</option>
                            <option value="4">I am going with my partner and 2 children</option>
                            <option value="5">I am going with my partner and 3 children</option>
                            <option value="6">I am going with my partner and 4 children</option>
                            <option value="7">I am going with my partner and 5 children</option>
                            <option value="8">I am going with my partner and 6 children</option>
                        </select>
                    </div>
                </div>
                <div className="form-row">
                    {this.showResult() ?
                        <div style={resultStyle} className="result-container">
                            <h4>Result</h4>
                            <ul>
                                <li>
                                    <span className="">Tuition </span> <span className="pull-right"> {this.formatMoney(parseFloat(this.state.tuition))}</span>
                                </li>
                                <li>
                                    <span className="">Living Expenses (9 months) </span> <span className="pull-right"> {this.state.living_expenses}</span>
                                </li>
                                <hr/>
                                <li>
                                    <span className="bold">Total</span> <h4 className="pull-right"> £ {this.formatMoney(this.state.total)}</h4>
                                </li>
                                <hr/>
                                <li>
                                    <span className="bold">Convert</span>
                                    <select name="currency" style={inputStyle} onChange={this.handleChange}>
                                        <option value="">Choose an Option</option>
                                        <option value="AED">United Arab Emirates dirham</option>
                                        <option value="AFN">Afghan afghani</option>
                                        <option value="ALL">Albanian lek</option>
                                        <option value="AMD">Armenian dram</option>
                                        <option value="AOA">Angolan kwanza</option>
                                        <option value="ARS">Argentine peso</option>
                                        <option value="AUD">Australian dollar</option>
                                        <option value="AWG">Aruban florin</option>
                                        <option value="AZN">Azerbaijani manat</option>
                                        <option value="BAM">Bosnia and Herzegovina convertible mark</option>
                                        <option value="BBD">Barbadian dollar</option>
                                        <option value="BDT">Bangladeshi taka</option>
                                        <option value="BGN">Bulgarian lev</option>
                                        <option value="BHD">Bahraini dinar</option>
                                        <option value="BIF">Burundian franc</option>
                                        <option value="BMD">Bermudian dollar</option>
                                        <option value="BND">Brunei dollar</option>
                                        <option value="BOB">Bolivian boliviano</option>
                                        <option value="BRL">Brazilian real</option>
                                        <option value="BSD">Bahamian dollar</option>
                                        <option value="BTN">Bhutanese ngultrum</option>
                                        <option value="BWP">Botswana pula</option>
                                        <option value="BYR">Belarusian ruble</option>
                                        <option value="BZD">Belize dollar</option>
                                        <option value="CAD">Canadian dollar</option>
                                        <option value="CDF">Congolese franc</option>
                                        <option value="CHF">Swiss franc</option>
                                        <option value="CLP">Chilean peso</option>
                                        <option value="CNY">Chinese yuan</option>
                                        <option value="COP">Colombian peso</option>
                                        <option value="CRC">Costa Rican colón</option>
                                        <option value="CUP">Cuban convertible peso</option>
                                        <option value="CVE">Cape Verdean escudo</option>
                                        <option value="CZK">Czech koruna</option>
                                        <option value="DJF">Djiboutian franc</option>
                                        <option value="DKK">Danish krone</option>
                                        <option value="DOP">Dominican peso</option>
                                        <option value="DZD">Algerian dinar</option>
                                        <option value="EGP">Egyptian pound</option>
                                        <option value="ERN">Eritrean nakfa</option>
                                        <option value="ETB">Ethiopian birr</option>
                                        <option value="EUR">Euro</option>
                                        <option value="FJD">Fijian dollar</option>
                                        <option value="FKP">Falkland Islands pound</option>
                                        <option value="GBP">British pound</option>
                                        <option value="GEL">Georgian lari</option>
                                        <option value="GHS">Ghana cedi</option>
                                        <option value="GMD">Gambian dalasi</option>
                                        <option value="GNF">Guinean franc</option>
                                        <option value="GTQ">Guatemalan quetzal</option>
                                        <option value="GYD">Guyanese dollar</option>
                                        <option value="HKD">Hong Kong dollar</option>
                                        <option value="HNL">Honduran lempira</option>
                                        <option value="HRK">Croatian kuna</option>
                                        <option value="HTG">Haitian gourde</option>
                                        <option value="HUF">Hungarian forint</option>
                                        <option value="IDR">Indonesian rupiah</option>
                                        <option value="ILS">Israeli new shekel</option>
                                        <option value="IMP">Manx pound</option>
                                        <option value="INR">Indian rupee</option>
                                        <option value="IQD">Iraqi dinar</option>
                                        <option value="IRR">Iranian rial</option>
                                        <option value="ISK">Icelandic króna</option>
                                        <option value="JEP">Jersey pound</option>
                                        <option value="JMD">Jamaican dollar</option>
                                        <option value="JOD">Jordanian dinar</option>
                                        <option value="JPY">Japanese yen</option>
                                        <option value="KES">Kenyan shilling</option>
                                        <option value="KGS">Kyrgyzstani som</option>
                                        <option value="KHR">Cambodian riel</option>
                                        <option value="KMF">Comorian franc</option>
                                        <option value="KPW">North Korean won</option>
                                        <option value="KRW">South Korean won</option>
                                        <option value="KWD">Kuwaiti dinar</option>
                                        <option value="KYD">Cayman Islands dollar</option>
                                        <option value="KZT">Kazakhstani tenge</option>
                                        <option value="LAK">Lao kip</option>
                                        <option value="LBP">Lebanese pound</option>
                                        <option value="LKR">Sri Lankan rupee</option>
                                        <option value="LRD">Liberian dollar</option>
                                        <option value="LSL">Lesotho loti</option>
                                        <option value="LTL">Lithuanian litas</option>
                                        <option value="LVL">Latvian lats</option>
                                        <option value="LYD">Libyan dinar</option>
                                        <option value="MAD">Moroccan dirham</option>
                                        <option value="MDL">Moldovan leu</option>
                                        <option value="MGA">Malagasy ariary</option>
                                        <option value="MKD">Macedonian denar</option>
                                        <option value="MMK">Burmese kyat</option>
                                        <option value="MNT">Mongolian tögrög</option>
                                        <option value="MOP">Macanese pataca</option>
                                        <option value="MRO">Mauritanian ouguiya</option>
                                        <option value="MUR">Mauritian rupee</option>
                                        <option value="MVR">Maldivian rufiyaa</option>
                                        <option value="MWK">Malawian kwacha</option>
                                        <option value="MXN">Mexican peso</option>
                                        <option value="MYR">Malaysian ringgit</option>
                                        <option value="MZN">Mozambican metical</option>
                                        <option value="NAD">Namibian dollar</option>
                                        <option value="NGN">Nigerian naira</option>
                                        <option value="NIO">Nicaraguan córdoba</option>
                                        <option value="NOK">Norwegian krone</option>
                                        <option value="NPR">Nepalese rupee</option>
                                        <option value="NZD">New Zealand dollar</option>
                                        <option value="OMR">Omani rial</option>
                                        <option value="PAB">Panamanian balboa</option>
                                        <option value="PEN">Peruvian nuevo sol</option>
                                        <option value="PGK">Papua New Guinean kina</option>
                                        <option value="PHP">Philippine peso</option>
                                        <option value="PKR">Pakistani rupee</option>
                                        <option value="PLN">Polish złoty</option>
                                        <option value="PRB">Transnistrian ruble</option>
                                        <option value="PYG">Paraguayan guaraní</option>
                                        <option value="QAR">Qatari riyal</option>
                                        <option value="RON">Romanian leu</option>
                                        <option value="RSD">Serbian dinar</option>
                                        <option value="RUB">Russian ruble</option>
                                        <option value="RWF">Rwandan franc</option>
                                        <option value="SAR">Saudi riyal</option>
                                        <option value="SBD">Solomon Islands dollar</option>
                                        <option value="SCR">Seychellois rupee</option>
                                        <option value="SDG">Singapore dollar</option>
                                        <option value="SEK">Swedish krona</option>
                                        <option value="SGD">Singapore dollar</option>
                                        <option value="SHP">Saint Helena pound</option>
                                        <option value="SLL">Sierra Leonean leone</option>
                                        <option value="SOS">Somali shilling</option>
                                        <option value="SRD">Surinamese dollar</option>
                                        <option value="SSP">South Sudanese pound</option>
                                        <option value="STD">São Tomé and Príncipe dobra</option>
                                        <option value="SVC">Salvadoran colón</option>
                                        <option value="SYP">Syrian pound</option>
                                        <option value="SZL">Swazi lilangeni</option>
                                        <option value="THB">Thai baht</option>
                                        <option value="TJS">Tajikistani somoni</option>
                                        <option value="TMT">Turkmenistan manat</option>
                                        <option value="TND">Tunisian dinar</option>
                                        <option value="TOP">Tongan paʻanga</option>
                                        <option value="TRY">Turkish lira</option>
                                        <option value="TTD">Trinidad and Tobago dollar</option>
                                        <option value="TWD">New Taiwan dollar</option>
                                        <option value="TZS">Tanzanian shilling</option>
                                        <option value="UAH">Ukrainian hryvnia</option>
                                        <option value="UGX">Ugandan shilling</option>
                                        <option value="USD">United States dollar</option>
                                        <option value="UYU">Uruguayan peso</option>
                                        <option value="UZS">Uzbekistani som</option>
                                        <option value="VEF">Venezuelan bolívar</option>
                                        <option value="VND">Vietnamese đồng</option>
                                        <option value="VUV">Vanuatu vatu</option>
                                        <option value="WST">Samoan tālā</option>
                                        <option value="XAF">Central African CFA franc</option>
                                        <option value="XCD">East Caribbean dollar</option>
                                        <option value="XOF">West African CFA franc</option>
                                        <option value="XPF">CFP franc</option>
                                        <option value="YER">Yemeni rial</option>
                                        <option value="ZAR">South African rand</option>
                                        <option value="ZMW">Zambian kwacha</option>
                                        <option value="ZWL">Zimbabwean dollar</option>
                                    </select>
                                </li>
                                <li>
                                    <button style={btnSubmit} onClick={() => this.convert()}>
                                        Convert
                                    </button>

                                    <span className="bold pull-right">{this.state.currency_show+ ' ' +this.formatMoney(this.state.new_currency_value)}</span>
                                </li>
                            </ul>
                        </div> : '' }
                    <button className="pull-right" style={btnSubmit} onClick={() => this.calculate()}>
                        Calculate
                    </button>
                </div>
            </React.Fragment>
        )
    }
}

const resultStyle = {
    float : 'left',
    minWidth : '400px',
    backgroundColor: '#f2f4f6',
    padding : '20px'

}
const btnSubmit = {
    padding : '10px 15px',
    borderRadius : '5px',
    backgroundColor : '#4CAF50',
    border: 'none',
    color : '#fff',
    cursor : 'pointer',
}
const inputLabel = {
    fontWeight : 'bold',
    marginBottom : '10px'
}
const inputStyle = {
    display : 'block',
    width : '100%',
    padding : '10px',
    border : '1px solid #ccc',
    borderRadius : '5px',
}
export default Uk;