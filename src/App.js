import React, { Component } from "react";
import "./App.css";
import axios from "axios";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      urlInput: "",
      newShortUrl: "",
      youTubeLinks: [
        "https://longurlmaker.com/go?id=91lengthened0lengthy9farZoff071b1j4elongateURLcutprotractedShortlinks1stretching101YepIt00nelongated048longish1URLvizm6remotetalll0bcTinyLink2ShortURLoutstretchedU76waDecentURL0Shrinkrb13549MooURL3IsZgdlengthenedf1utlofty0gangling8fA2NShrinkr879ff74c10gangling0RubyURL8farZreachingpsustained0005lastinga3x7BeamZtoe4MinilienxfganglingB651adustretch1spunZoutvSitelutions51spunZoutFhURLMyURL10ffarZoffy83301URLSimURL9loftyk30BeamZto808running9highlShredURLo6elingeringbaldistantNanoRef221extensive00ilrunningfaraway10111sustained50116URL7Sitelutionsbexpandedhighdeep89dlingeringvsustainedSnipURL01010elongate4c1b31yURLPie70bg0688great1outstretched50a1Ulimit3197310StartURLstringy01cshcontinuedtall51CanURL40MooURLf916spreadZout50628r0Shorl72d10901prolonged6stretched6lengthenedr5fURlZie9enlargedenlarged21loftyn8571URLvi56spunZout9yURLHawkdenduring11110tlingering5s917farawayyhigh0gxstretchedFhURLb7FhURLXZseprotracted1g9elengthened1ShrinkURLzNutshellURLx3LiteURLqrangyStartURLEzURLv0ShrtndfarZoff1a5URlZiees138d0Shim80SnipURL1lanky15h0sustained3URlZiefarawaytalldeep110enduringURLcutU76URLCutter196URLZcoZukprolongedNanoRefrb0036DoiopShoterLink4cfaraway0URLPie8DecentURL1cNotLong41v6great40MooURL64GetShorty6TinyLink41148e1106URL0YepItsustainedYepItdrawnZout9ShrinkURL0l050extensive18r11tlingeringm4lengthyc0URLcut58h4b0lengthenedatowering71fMetamark06URL44URLHawkstretching24xLiteURLenduringMinilien9URLPie17Smallr6e03lanky0U76f1Redirxf5enlargedShortURLlengthy1ydURLviDecentURL90ink002Shortlinks9m0pfarZoff00MooURLlanky0stretch0greateirangyja0vremote8foutstretchedtall0pNe19808RedirxEasyURLShortenURL336nqUrlTea301URL71Shim75100ShredURLofaraway09EasyURL3Sitelutionslofty810pyloftyextensive1jf8a5distant6URL72MyURL17z170aRubyURLaganglingg7h041lingering0qdrawnZout1g8ShoterLink0dlongish4lnkZin00distantstretched301URLEasyURL1lingeringURLPieffrunnings1G8Lm960m0401TraceURL1110NanoRefn1stretchedelongate0G8L09lnkZinf016vcontinueduShoterLink301URLr1G8Lorangy4dd68106GetShortyxURLZcoZuk4stretchedUlimit91URLHawk5s1NanoRef90l8lPiURL585704rbtowering106f0zB65"
      ]
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(field, value) {
    this.setState({ [field]: value });
  }

  handleSubmit(e) {
    e.preventDefault();
    const URL = "https://wsw-url-shortener.herokuapp.com";
    // const URL = "http://localhost:5000";
    // If another link was previously copied, you need to clear newShortURL
    this.setState({
      newShortUrl: ""
    });

    axios.get(`${URL}/new/${this.state.urlInput}`).then(response => {
      this.setState({
        newShortUrl: (
          <a href={`${URL}/${response.data.shortUrl}`}>
            {URL}/{response.data.shortUrl}
          </a>
        )
      });
    });
  }

  handlePaste = url => {
    this.handleChange("urlInput", url);
  };

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1> URL Shortener</h1>
          <h4> Click one of the URL links below and click Submit</h4>
          {this.state.youTubeLinks.map((item, index) => {
            return (
              <button
                onClick={event => this.handlePaste(event.target.value)}
                value={item}
                key={index}
              >
                {item}
              </button>
            );
          })}
          <br />
          <input
            onChange={event =>
              this.handleChange("urlInput", event.target.value)
            }
            placeholder={this.state.urlInput}
          />
          <br />
          <button onClick={this.handleSubmit}>Submit</button>
          {this.state.newShortUrl === "" ? (
            <h5> </h5>
          ) : (
            <div>
              <h5>Here is your new shortened URL! Click</h5>
              <div>{this.state.newShortUrl}</div>
            </div>
          )}
        </header>
      </div>
    );
  }
}

export default App;
