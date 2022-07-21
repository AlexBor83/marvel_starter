import { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';

import Spinner from '../spiner/Spinr';
import MarvelService from '../../services/MarvelService';
import ErrorMassage from '../errorMassage/ErrorMassage';
import './charList.scss';
// import abyss from '../../resources/img/abyss.jpg';

const CharList = (props) => {
  
  const [charList, setCharList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [newItemLoading, setNewItemLoading] = useState(false)
  const [offset, setOffset] = useState(210)
  const [charEnded, setCharEnded] = useState(false)

  
  // state = {
  //   charList: [],
  //   loading: true,
  //   error: false,
  //   newItemLoading: false,
  //   offset: 210,
  //   charEnded: false,
  // };

  const marvelService = new MarvelService();

  useEffect(() => {
    onRequest();
  }, [])
  
  const onRequest = (offset) => {
    onCharListLoading();
    marvelService
      .getAllCHaracters(offset)
      .then(onListLoaded)
      .catch(onListError);
  };

  const onCharListLoading = () => {
    setNewItemLoading(true);    
  };

  const onListLoaded = (newCharList) => {
    let ended = false;

    if (newCharList.length <9) {
      ended = true;
    }

    setCharList(charList => [...charList, ...newCharList]);
    setLoading(loading => false);
    setNewItemLoading(newItemLoading => false);
    setOffset(offset => offset + 9);
    setCharEnded(charEnded => ended);
  };

  const onListError = (charList) => {
    setError(true);
    setLoading(false);
  };

  const itemsRefs = useRef([]);

  const focusOnItem = (id) => {
    itemsRefs.current.forEach((item) =>
      item.classList.remove('char__item_selected')
    );
    itemsRefs.current[id].classList.add('char__item_selected');
    itemsRefs.current[id].focus();
  };

  function renderItems(arr) {
    const items = arr.map((item, i) => {
      let imgStyle = { objectFit: 'cover' };
      if (
        item.thumbnail ===
        'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg'
      ) {
        imgStyle = { objectFit: 'unset' };
      }

      return (
        <li
          className='char__item'
          tabIndex={0}
          ref={el => itemsRefs.current[i] = el}
          key={item.id}
          onClick={() => {
            props.onCharSelectend(item.id);
            focusOnItem(i)
          }}
          
        >
          <img src={item.thumbnail} alt={item.name} style={imgStyle} />
          <div className='char__name'>{item.name}</div>
        </li>
      );
    });
    // А эта конструкция вынесена для центровки спиннера/ошибки
    return <ul className='char__grid'>{items}</ul>;
  }

  
    const items = renderItems(charList);

    const errorMessage = error ? <ErrorMassage /> : null;
    const spinner = loading ? <Spinner /> : null;
    const content = !(loading || error) ? items : null;

    return (
      <div className='char__list'>
        {errorMessage}
        {spinner}
        {content}
        <button
          className='button button__main button__long'
          disabled={newItemLoading}
          style={{ display: charEnded ? 'none' : 'block' }}
          onClick={() => onRequest(offset)}
        >
          <div className='inner'>load more</div>
        </button>
      </div>
    );
  
}

CharList.propTypes = {
  onCharSelectend: PropTypes.func.isRequired,
};

export default CharList;
