import {select, templates} from '.././settings.js';
import utils from '.././utils.js';

class Music {
  constructor(songs){
    const thisMusic = this;

    thisMusic.data = {};
    thisMusic.data.songs = songs;

    thisMusic.getElements();
    thisMusic.generateCategories();
    thisMusic.initHomePageMusic();
    thisMusic.initSearchPageMusic();
    thisMusic.initDiscoverPageMusic();
  }

  getElements(){
    const thisMusic = this;

    thisMusic.dom = {};

    thisMusic.dom.homePage = document.querySelector(select.containerOf.homePage);
    thisMusic.dom.searchPage = document.querySelector(select.containerOf.searchPage);
    thisMusic.dom.discoverPage = document.querySelector(select.containerOf.discoverPage);
  }

  initHomePageMusic(){
    const thisMusic = this;

    for (let songData in thisMusic.data.songs){
      thisMusic.render(thisMusic.data.songs[songData], thisMusic.dom.homePage);
    }

    thisMusic.initPlayer(select.player.homePage);
  }

  initSearchPageMusic(){
    const thisMusic = this;

    const button = document.querySelector(select.searchElements.button);
    const input = document.getElementById(select.searchElements.input);
    const searchMessage = document.querySelector(select.searchElements.text);
    let numberOfSongs = 0;

    button.addEventListener('click', function(){
      thisMusic.dom.searchPage.innerHTML = '';
      numberOfSongs = 0;
      searchMessage.innerHTML = '';

      for (let songData in thisMusic.data.songs){
        if (thisMusic.data.songs[songData].filename.toString().toUpperCase().includes(input.value.toUpperCase())) {
          thisMusic.render(thisMusic.data.songs[songData], thisMusic.dom.searchPage);
          numberOfSongs += 1;
        } 
      }
      thisMusic.initPlayer(select.player.searchPage);
      input.value = '';
  
      numberOfSongs == 1 ? searchMessage.innerHTML = `We found ${numberOfSongs} song...` : searchMessage.innerHTML = `We found ${numberOfSongs} songs...`;
    });
  }

  initDiscoverPageMusic(){
    const thisMusic = this;

    const random = Math.floor(Math.random() * thisMusic.data.songs.length);
    thisMusic.render(thisMusic.data.songs[random], thisMusic.dom.discoverPage);
   
    thisMusic.initPlayer(select.player.discoverPage);
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
    const thisMusic = this;

    const allCategories = [];
    const categoryList = document.querySelector(select.listOf.categories);
    

    for(let song of thisMusic.data.songs){
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
    }
  }
}

export default Music;