import {select, templates} from '.././settings.js';
import utils from '.././utils.js';

class SongList {
  constructor(songs){
    const thisSongList = this;

    thisSongList.data = {};
    thisSongList.data.songs = songs;
    
    thisSongList.initSongs();
  }

  initSongs(){
    const thisSongList = this;

    thisSongList.dom = {};

    thisSongList.dom.homePage = document.querySelector(select.containerOf.homePage);
    thisSongList.dom.searchPage = document.querySelector(select.containerOf.searchPage);
    thisSongList.dom.discoverPage = document.querySelector(select.containerOf.discoverPage);

    // For homepage:

    for (let songData in thisSongList.data.songs){
      thisSongList.render(thisSongList.data.songs[songData], thisSongList.dom.homePage);
    }

    thisSongList.initPlayer(select.player.homePage);

    // For search:

    const button = document.querySelector(select.searchElements.button);
    const input = document.getElementById(select.searchElements.input);
    const searchMessage = document.querySelector(select.searchElements.text);
    let numberOfSongs = 0;

    button.addEventListener('click', function(){
      thisSongList.dom.searchPage.innerHTML = '';
      numberOfSongs = 0;
      searchMessage.innerHTML = '';

      for (let songData in thisSongList.data.songs){
        if (thisSongList.data.songs[songData].filename.toString().toUpperCase().includes(input.value.toUpperCase())) {
          thisSongList.render(thisSongList.data.songs[songData], thisSongList.dom.searchPage);
          numberOfSongs += 1;
        } 
      }
      thisSongList.initPlayer(select.player.searchPage);
      input.value = '';
  
      numberOfSongs == 1 ? searchMessage.innerHTML = `We found ${numberOfSongs} song...` : searchMessage.innerHTML = `We found ${numberOfSongs} songs...`;
    });

    // For discover:

    const random = Math.floor(Math.random() * thisSongList.data.songs.length);
    thisSongList.render(thisSongList.data.songs[random], thisSongList.dom.discoverPage);
   
    thisSongList.initPlayer(select.player.discoverPage);
  }

  render(data, wrapper){
    const generatedHTML = templates.songTemplate(data);
    const songDOM = utils.createDOMFromHTML(generatedHTML);
    wrapper.appendChild(songDOM);
  }

  initPlayer(section){
    // eslint-disable-next-line no-undef
    GreenAudioPlayer.init({
      selector: section, 
      stopOthersOnPlay: true
    });
  }
}

export default SongList;