import React, { Component } from "react";
import "./styles.css";
import axios from "axios";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      URL: "https://z00.herokuapp.com",
      urlInput: "",
      newShortUrl: "",
      youTubeLinks: [
        // Google Search: "What was David Bowie doing on April 6th, 1973?"
        // "https://www.google.com/search?ei=iGr0W5bgFYyc_QbpvaXQAg&q=What+was+David+Bowie+doing+on+April+6th%2C+1973&oq=What+was+David+Bowie+doing+on+April+6th%2C+1973&gs_l=psy-ab.3...2732.26152..26921...11.0..0.132.5466.8j43....2..0....1..gws-wiz.....6..0j0i71j35i39j0i131j0i67j0i20i263j33i22i29i30j0i13j0i22i30j0i22i10i30j33i299j33i160.JkkF8j6Q5bc",
        "https://youtu.be/VbD_kBJc_gI", // "Let's Dance" by David Bowie
        "https://youtu.be/izGwDsrQ1eQ" // "Careless Whisper" by George Michael
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
    // If another link was previously copied, you need to clear newShortURL
    this.setState({
      newShortUrl: ""
    });

    axios.get(`${this.state.URL}/new/${this.state.urlInput}`).then(response => {
      this.setState({
        newShortUrl: response.data.shortUrl
      });
    });
  }

  handlePaste = url => {
    this.handleChange("urlInput", url);
  };

  render() {
    const renderNewUrl =
      this.state.newShortUrl === ""? (
        <div />
      ) :
      this.state.newShortUrl.includes("URL Invalid") === true? <div className="newUrl_url">Sorry! Looks like you entered an invalid URL!</div> : (
        // <div className="newUrlContent">Your new shortened URL will appear below on submit</div>
        <div className="newUrlContent">
          <div className="newUrl_text">
            Here is your new shortened URL! Go ahead and test it out!
          </div>
          <div className="newUrl_url">
            {" "}
            <a href={`${this.state.URL}/${this.state.newShortUrl}`}>
              {this.state.URL}/{this.state.newShortUrl}
            </a>
          </div>
        </div>
      );
    return (
      <div className="App">
        <div className="content_container">
          <div className="content">
            <div className="content_title"> URL Shortener</div>
            <div className="content_subtitle">
              {" "}
              Click one of the URL links below and
              click Submit
            </div>
            {this.state.youTubeLinks.map((item, index) => {
              return (
                <button
                  className="content_button"
                  onClick={event => this.handlePaste(event.target.value)}
                  value={item}
                  key={index}
                >
                  {item}
                </button>
              );
            })}
            <br />
            <textarea
              onChange={event =>
                this.handleChange("urlInput", event.target.value)
              }
              value={this.state.urlInput}
            />
            <br />
            <button onClick={this.handleSubmit} className="submit_button">Submit</button>
            {renderNewUrl}
          </div>
        </div>
      </div>
    );
  }
}

export default App;
