import { useState } from 'react';
import AppHeader from '../appHeader/AppHeader';
import RandomChar from '../randomChar/RandomChar';
import CharList from '../charList/CharList';
import CharInfo from '../charInfo/CharInfo';
import ErrorBondary from '../errorBondary/ErrorBondary';

import decoration from '../../resources/img/vision.png';

const App = () => {
  const [selectendChar, setChar] = useState(null);

  const onCharSelectend = (id) => {
    setChar(id);
  };

  return (
    <div className='app'>
      <AppHeader />
      <main>
        <ErrorBondary>
          <RandomChar />
        </ErrorBondary>
        <div className='char__content'>
          <ErrorBondary>
            <CharList onCharSelectend={onCharSelectend} />
          </ErrorBondary>
          <ErrorBondary>
            <CharInfo charID={selectendChar} />
          </ErrorBondary>
        </div>
        <img className='bg-decoration' src={decoration} alt='vision' />
      </main>
    </div>
  );
};

export default App;
