import {templates} from '.././settings.js';
import utils from '.././utils.js';

class Song {
  constructor(data, wrapper){
    const thisSong = this;

    thisSong.data = data;
    thisSong.wrapper = wrapper;

    thisSong.render();
  }

  render(){
    const thisSong = this;

    const generatedHTML = templates.songTemplate(thisSong.data);
    const songDOM = utils.createDOMFromHTML(generatedHTML);
    thisSong.wrapper.appendChild(songDOM);
  }
}

export default Song;