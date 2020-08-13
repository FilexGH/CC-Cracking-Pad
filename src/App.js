import React from "react";
import Header from "./Components/Header.js";
import Home from "./Components/Home.js";
import Classic from "./Components/Classic/Classic.js";
import Solo from "./Components/Solo/Solo.js";
import Footer from "./Components/Footer.js";
import "./Styles/App.css";
import HomePic from "./img/Backgrounds/HomePic.png";
import ClassicPic from "./img/Backgrounds/ClassicPic.png";
import SoloPic from "./img/Backgrounds/SoloPic.png";

const BACKGROUND_IMAGES = {
  Home: HomePic,
  Classic: ClassicPic,
  Solo: SoloPic,
};
const PAGES = {
  Home: <Home />,
  Classic: <Classic />,
  Solo: <Solo />,
};

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      Page: PAGES["Home"],
    };
  }
  changePage = (newPage) => {
    document.body.style.backgroundImage = `url(${BACKGROUND_IMAGES[newPage]})`;
    this.setState({
      Page: PAGES[newPage],
    });
  };
  render() {
    return (
      <div className="App">
        <Header changePage={this.changePage} />
        <br />
        {this.state.Page}
        <br />
        <Footer />
      </div>
    );
  }
}

export default App;
