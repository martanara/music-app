import { templates } from '../settings.js';
import utils from '../utils.js';

class SongList {
  constructor(song, wrapper) {
    const thisSongList = this;

    thisSongList.data = {};
    thisSongList.data.song = song;

    thisSongList.getElements(wrapper);
    thisSongList.render();
  }

  getElements(wrapper) {
    const thisSongList = this;

    thisSongList.dom = {};
    thisSongList.dom.wrapper = wrapper;
  }

  render() {
    const thisSongList = this;
    
    const generatedHTML = templates.songTemplate(thisSongList.data.song);
    const songDOM = utils.createDOMFromHTML(generatedHTML);
    thisSongList.dom.wrapper.appendChild(songDOM);
  }
}

export default SongList;