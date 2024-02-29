import React from 'react';
import './App.css';

class FilmItemRow extends React.Component{
  render(){
    return(
      <li>
        <a href={this.props.url}>{this.props.url}</a>
      </li>
    )
  }
}
class StarWars extends React.Component {
  constructor() {
    super();
    this.state = {
      loaddedCharacter: false,
      image: null,
      name: null,
      height: null,
      homeworld: null,
      films: []
    };
  }

  getNewChar() {
    console.log("This is new char.....");
    const randomNumber = Math.round(Math.random() * 88)
    const url = `https://akabab.github.io/starwars-api/api/id/${randomNumber}.json`;
    fetch(url)
      .then(response => response.json())
      .then(data=>{
        console.log(data);
        this.setState({
          image: data.image,
          name: data.name,
          height:data.height,
          homeworld: data.homeworld,
          films: data.films, //films property not appear in github 
          loaddedCharacter: true
        });
      })
  }

  render() {
    const movies = this.state.films ? this.state.films.map((url, i) => (
      <FilmItemRow key={i} url={url} />
    )) : null;
  
    return (
      <div>
        {this.state.loaddedCharacter && (
          <div>
            <img className='imageProfile' src={this.state.image} alt="img" />
            <h1>{this.state.name}</h1>
            <p>{this.state.height}cm</p>
            <p><a href={this.state.homeworld}>Homeworld</a></p>
            <ul>
              {movies}
            </ul>
          </div>
        )}
        <button onClick={() => this.getNewChar()} type='button' className='btn'>
          Randomize Character
        </button>
      </div>
    );
  }
  
}

function App() {
  return (
    <div className="App">
      <header className='App-header'>
        <StarWars />
      </header>
    </div>
  );
}

export default App;
