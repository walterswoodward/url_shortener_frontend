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
      this.state.newShortUrl.includes("URL Invalid") === true? <div>Sorry! Looks like you entered an invalid URL!</div> : (
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
              Click one of the URL links below (OR use one of your own) and
              click Submit
            </div>
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
            <textarea
              onChange={event =>
                this.handleChange("urlInput", event.target.value)
              }
              value={this.state.urlInput}
            />
            <br />
            <button onClick={this.handleSubmit}>Submit</button>
            {renderNewUrl}
          </div>
        </div>
      </div>
    );
  }
}

export default App;
