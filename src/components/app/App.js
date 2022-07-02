import { Component } from 'react';
import AppHeader from '../appHeader/AppHeader';
import RandomChar from '../randomChar/RandomChar';
import CharList from '../charList/CharList';
import CharInfo from '../charInfo/CharInfo';

import decoration from '../../resources/img/vision.png';

class App extends Component {
  
    state = {
    selectendChar: null
  }

  onCharSelectend = (id) => {
    this.setState ({
        selectendChar: id,
    })
  }
  
  
    render() {
    return (
      <div className='app'>
        <AppHeader />
        <main>
          <RandomChar />
          <div className='char__content'>
            <CharList onCharSelectend = {this.onCharSelectend}/>
            <CharInfo charID = {this.state.selectendChar}/>
          </div>
          <img className='bg-decoration' src={decoration} alt='vision' />
        </main>
      </div>
    );
  }
}


export default App;
