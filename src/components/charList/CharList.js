import { Component } from 'react';
import Spinner from '../spiner/Spinr';
import MarvelService from '../../services/MarvelService';
import ErrorMassage from '../errorMassage/ErrorMassage';
import './charList.scss';
// import abyss from '../../resources/img/abyss.jpg';

class CharList extends Component {
  state = {
    charList: [],
    loading: true,
    error: false,
    newItemLoading: false,
    offset: 210,
    charEnded: false
  };

  marvelService = new MarvelService();

  componentDidMount() {
    this.onRequest();
  }

  onRequest = (offset) => {
    this.onCharListLoading();

    this.marvelService
      .getAllCHaracters(offset)
      .then(this.onListLoaded)
      .catch(this.onListError);
  };

  onCharListLoading = () => {
    this.setState({
      newItemLoading: true,
    });
  };

  onListLoaded = (newCharList) => {
    let ended = false

    if(newCharList.length <= 8) {
      ended = true;
    }

    this.setState(({ offset, charList }) => ({
      charList: [...charList, ...newCharList],
      loading: false,
      newItemLoading: false,
      offset: offset + 9,
      charEnded: ended,
    }));
  };

  onListError = (charList) => {
    this.setState({ loading: false, error: true });
  };

  renderItems(arr) {
    const items = arr.map((item) => {
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
          key={item.id}
          onClick={() => this.props.onCharSelectend(item.id)}
        >
          <img src={item.thumbnail} alt={item.name} style={imgStyle} />
          <div className='char__name'>{item.name}</div>
        </li>
      );
    });
    // А эта конструкция вынесена для центровки спиннера/ошибки
    return <ul className='char__grid'>{items}</ul>;
  }

  render() {
    const { charList, loading, error, newItemLoading, offset, charEnded } = this.state;

    const items = this.renderItems(charList);

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
          style = {{'display': charEnded ? 'none' : 'block'}}
          onClick={() => this.onRequest(offset)}>
          <div className='inner'>load more</div>
        </button>
      </div>
    );
  }
}

export default CharList;
