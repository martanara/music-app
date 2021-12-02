import {select, templates, classNames} from '.././settings.js';
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
    thisMusic.filterByCategories();
  }

  getElements(){
    const thisMusic = this;

    thisMusic.dom = {};

    thisMusic.dom.homePage = document.querySelector(select.containerOf.homePage);
    thisMusic.dom.searchPage = document.querySelector(select.containerOf.searchPage);
    thisMusic.dom.discoverPage = document.querySelector(select.containerOf.discoverPage);
    thisMusic.dom.categoryList = document.querySelector(select.listOf.categories);
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
      thisMusic.resetWrapper(thisMusic.dom.searchPage);

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

  filterByCategories(){
    const thisMusic = this;

    let activeCategory = '';

    thisMusic.dom.categoryList.addEventListener('click', function(event){
      event.preventDefault();

      thisMusic.resetWrapper(thisMusic.dom.homePage);

      const category = event.target;

      if(category.classList.contains(classNames.categories.isCategory)){
        const categoryName = category.getAttribute(select.attributesOf.category);
  
        if(!category.classList.contains(classNames.categories.active)){
          thisMusic.resetCategories();
          category.classList.add(classNames.categories.active);
          activeCategory = categoryName;
        } else {
          category.classList.remove(classNames.categories.active);
          activeCategory = '';
        }
      }

      for (let songData in thisMusic.data.songs){
        const songCategories = thisMusic.data.songs[songData].categories;
        let isActiveCategory = 'no';

        if (songCategories.includes(activeCategory)){
          isActiveCategory = 'yes';
        }

        if (isActiveCategory === 'yes'){
          thisMusic.render(thisMusic.data.songs[songData], thisMusic.dom.homePage);
        }
      }
      thisMusic.initPlayer(select.player.homePage);
    });
  }

  resetWrapper(wrapper){
    wrapper.innerHTML = '';
  }

  resetCategories(){
    const allCategoryLinks = document.querySelectorAll(select.linksOf.categories);

    for(let categoryLink of allCategoryLinks){
      categoryLink.classList.remove(classNames.categories.active);
    }
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
    const categoryList = thisMusic.dom.categoryList;
    

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