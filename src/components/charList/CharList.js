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
  };

  marvelService = new MarvelService();

  componentDidMount() {
    console.log('mount');
    this.marvelService
      .getAllCHaracters()
      .then(this.onListLoaded)
      .catch(this.onListError);
  }

  onListLoaded = (charList) => {
    console.log('update');
    this.setState({ charList, loading: false });
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
    const { charList, loading, error } = this.state;

    const items = this.renderItems(charList);

    const errorMessage = error ? <ErrorMassage /> : null;
    const spinner = loading ? <Spinner /> : null;
    const content = !(loading || error) ? items : null;

    return (
      <div className='char__list'>
        {errorMessage}
        {spinner}
        {content}
        <button className='button button__main button__long'>
          <div className='inner'>load more</div>
        </button>
      </div>
    );
  }
}

export default CharList;
