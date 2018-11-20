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
        "https://youtu.be/VbD_kBJc_gI?list=RDVbD_kBJc_gI",
        "https://youtu.be/izGwDsrQ1eQ",
        "https://youtu.be/HEXWRTEbj1I"
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
    const URL = "http://localhost:5000/";
    // If another link was previously copied, you need to clear newShortURL
    this.setState({
      newShortUrl: ""
    })

    axios.get(`${URL}new/${this.state.urlInput}`).then(response => {
      console.log(response);
      console.log(
        "Here is your new shortUrl LINK:",
        `http://localhost:5000/${response.data.shortUrl}`
      );
      this.setState({
        newShortUrl: <a href={`http://localhost:5000/${
          response.data.shortUrl
        }`} >http://localhost:5000/{
          response.data.shortUrl
        }</a>
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
          <h3> URL Shortener</h3>
          <h4> Click one of the URL links below and click Submit</h4>
          {this.state.youTubeLinks.map((item, index) => {
            return(
            <button
              onClick={event => this.handlePaste(event.target.value)}
              value={item}
              key={index}
            >
              {item}
            </button>
          )})}

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
            <div>{this.state.newShortUrl}</div>
          )}
        </header>
      </div>
    );
  }
}

export default App;
