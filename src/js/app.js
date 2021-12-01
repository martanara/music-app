import {select, settings, classNames} from './settings.js';
import Song from './components/Song.js';

const app = {
  initData: function(){
    const thisApp = this;

    const songs = settings.db.url + '/' + settings.db.songs;

    fetch(songs)
      .then(function(rawResponse){
        return rawResponse.json();
      })
      .then(function(parsedResponse){
        thisApp.data.songs = parsedResponse;
        thisApp.initSongs();
      });
  },

  initSongs: function(){
    const thisApp = this;

    console.log('songs in initSongs', thisApp.data.songs);

    thisApp.dom = {};

    thisApp.dom.homePage = document.querySelector(select.containerOf.homePage);
    thisApp.dom.searchPage = document.querySelector(select.containerOf.searchPage);
    thisApp.dom.discoverPage = document.querySelector(select.containerOf.discoverPage);

    // For homepage:

    for (let songData in thisApp.data.songs){
      new Song(thisApp.data.songs[songData], thisApp.dom.homePage);
    }

    thisApp.initPlayer(select.player.homePage);

    // For search:

    const button = document.querySelector(select.searchElements.button);
    const input = document.getElementById(select.searchElements.input);
    const searchMessage = document.querySelector(select.searchElements.text);
    let numberOfSongs = 0;

    button.addEventListener('click', function(){
      thisApp.dom.searchPage.innerHTML = '';
      numberOfSongs = 0;
      searchMessage.innerHTML = '';

      for (let songData in thisApp.data.songs){
        if (thisApp.data.songs[songData].filename.toString().toUpperCase().includes(input.value.toUpperCase())) {
          new Song(thisApp.data.songs[songData], thisApp.dom.searchPage);
          numberOfSongs += 1;
        } 
      }
      thisApp.initPlayer(select.player.searchPage);
      input.value = '';
  
      numberOfSongs == 1 ? searchMessage.innerHTML = `We found ${numberOfSongs} song...` : searchMessage.innerHTML = `We found ${numberOfSongs} songs...`;
    });

    // For discover:

    const random = Math.floor(Math.random() * thisApp.data.songs.length);
    new Song(thisApp.data.songs[random], thisApp.dom.discoverPage);
   
    thisApp.initPlayer(select.player.discoverPage);
  },

  initPages: function(){
    const thisApp = this;

    thisApp.pages = document.querySelector(select.containerOf.pages).children;
    thisApp.navLinks = document.querySelectorAll(select.nav.links);
    console.log(thisApp.navLinks);

    const idFromHash = window.location.hash.replace('#/', '');

    let pageMatchingHash = thisApp.pages[0].id;

    for(let page of thisApp.pages){
      if(page.id == idFromHash){
        pageMatchingHash = page.id;
        break;
      }
    }

    thisApp.activatePage(pageMatchingHash);

    for(let link of thisApp.navLinks){
      link.addEventListener('click', function(event){
        const clickedElement = this;
        event.preventDefault();

        const id = clickedElement.getAttribute('href').replace('#', '');

        thisApp.activatePage(id);
      
        window.location.hash = '#/' + id;
      });
    }
  },

  activatePage: function(pageId){
    const thisApp = this;

    for(let page of thisApp.pages){
      page.classList.toggle(classNames.pages.active, page.id == pageId);
    }

    for(let link of thisApp.navLinks){
      link.classList.toggle(
        classNames.nav.active,
        link.getAttribute('href') == '#' + pageId
      );
    }
  },

  initPlayer: function(selector){
    // eslint-disable-next-line no-undef
    GreenAudioPlayer.init({
      selector: selector, 
      stopOthersOnPlay: true
    });
  },

  init: function(){
    const thisApp = this;

    thisApp.data = {};

    console.log('*** App starting ***');
    console.log('thisApp:', thisApp);
    console.log('settings:', settings);
    console.log('classNames:', classNames);

    thisApp.initData();
    thisApp.initPages();

    console.log('data', thisApp.data);
    console.log('songs', thisApp.data.songs);
  }
};

app.init();
