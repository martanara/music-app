import {select, templates} from '.././settings.js';
import utils from '.././utils.js';

class SongList {
  constructor(songs){
    const thisSongList = this;

    thisSongList.data = {};
    thisSongList.data.songs = songs;

    thisSongList.getElements();
    thisSongList.initSongs();
    thisSongList.generateCategories();
  }

  getElements(){
    const thisSongList = this;

    thisSongList.dom = {};

    thisSongList.dom.homePage = document.querySelector(select.containerOf.homePage);
    thisSongList.dom.searchPage = document.querySelector(select.containerOf.searchPage);
    thisSongList.dom.discoverPage = document.querySelector(select.containerOf.discoverPage);
  }

  initSongs(){
    const thisSongList = this;

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

  generateCategories(){
    const thisSongList = this;

    const allCategories = [];
    const categoryList = document.querySelector(select.listOf.categories);
    

    for(let song of thisSongList.data.songs){
      const songCategories = song.categories;

      for(let item of songCategories){
        if(!allCategories.includes(item)){
          allCategories.push(item);
        }
      }
    }

    for(let category of allCategories){
      const linkHtmlData = {name: category};
      const generatedHTML = templates.categoryTemplate(linkHtmlData);
      const categoryDOM = utils.createDOMFromHTML(generatedHTML);

      categoryList.appendChild(categoryDOM);
      console.log(categoryDOM);
    }
  }
}

export default SongList;