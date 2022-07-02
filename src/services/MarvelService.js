class MarvelService {
  _apiBase = 'https://gateway.marvel.com:443/v1/public/';
  _apikey = 'apikey=652ed442bf44f568bb700d60511d3253';

  getResource = async (url) => {
    let res = await fetch(url);

    if (!res.ok) {
      throw new Error(`Cloud not fetch ${url}, status ${res.status}`);
    }

    return await res.json();
  };

  _trancformCharacter = (char) => {

    return {
      id: char.id,
      name: char.name,
      description: char.description ? `${char.description.slice(0, 210)}...` : 'There is no description for this character',
      thumbnail: char.thumbnail.path + '.' + char.thumbnail.extension,
      homepage: char.urls[0].url,
      
      wiki: char.urls[1].url,
    };
  };

  getAllCHaracters = async () => {
    const res = await this.getResource(
      `${this._apiBase}characters?limit=9&offset=210&${this._apikey}`
    );

    return res.data.results.map(this._trancformCharacter);
  };

  getAllCHaracter = async (id) => {
    const res = await this.getResource(
      `${this._apiBase}characters/${id}?${this._apikey}`
    );
    return this._trancformCharacter(res.data.results[0]);
  };
}

export default MarvelService;
