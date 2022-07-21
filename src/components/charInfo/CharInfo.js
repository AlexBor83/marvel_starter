import { Component } from 'react';
import PropTypes from 'prop-types'

import Spinner from '../spiner/Spinr';
import ErrorMassage from '../errorMassage/ErrorMassage';
import MarvelService from '../../services/MarvelService';
import Skeleton from '../skeleton/Skeleton';

import './charInfo.scss';
import thor from '../../resources/img/thor.jpeg';

class CharInfo extends Component {
  state = {
    char: null,
    loading: false,
    error: false,
  };

  marvelService = new MarvelService();

  componentDidMount() {
    this.updateChar();
  }

  componentDidUpdate(prevProps) {
    if (this.props.charID !== prevProps.charID) {
      this.updateChar();
    }
  }

  onCharLoaded = (char) => {
    console.log('update');
    this.setState({ char, loading: false });
  };

  onCharLoading = () => {
    this.setState({ loading: true });
  };

  onError = () => {
    this.setState({
      loading: false,
      error: true,
    });
  };

  updateChar = () => {
    const { charID } = this.props;

    if (!charID) {
      return;
    }

    this.onCharLoading();

    this.marvelService
      .getAllCHaracter(charID)
      .then(this.onCharLoaded)
      .catch(this.onError);
  };

  render() {
    const { char, loading, error } = this.state;

    const skeleton = char || loading || error ? null : <Skeleton />;
    const errorMassage = error ? <ErrorMassage /> : null;
    const spiner = loading ? <Spinner /> : null;
    const content = !(error || loading || !char) ? <VieW char={char} /> : null;

    return (
      <div className='char__info'>
        {skeleton}
        {errorMassage}
        {spiner}
        {content}
      </div>
    );
  }
}

const VieW = ({ char }) => {
  const { name, description, thumbnail, homepage, wiki, comics } = char;

  let imgStyle = { objectFit: 'cover' };

  if (
    thumbnail ===
    'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg'
  ) {
    imgStyle = { objectFit: 'contain' };
  }

  return (
    <>
      <div className='char__basics'>
        <img src={thumbnail} alt={name} style={imgStyle} />
        <div>
          <div className='char__info-name'>{name}</div>
          <div className='char__btns'>
            <a href={homepage} className='button button__main'>
              <div className='inner'>homepage</div>
            </a>
            <a href={wiki} className='button button__secondary'>
              <div className='inner'>Wiki</div>
            </a>
          </div>
        </div>
      </div>
      <div className='char__descr'>{description}</div>

      <div className='char__comics'>Comics:</div>
      <ul className='char__comics-list'>
        {comics.lenght > 0 ? null : 'Comics is not'}
        {comics.map((item, i) => {
            if (i>9) return;
          return (
            <li key={i} className='char__comics-item'>
              {item.name}
            </li>
          );
        })}
      </ul>
    </>
  );
};

CharInfo.propTypes = {
  charID: PropTypes.number
}

export default CharInfo;
