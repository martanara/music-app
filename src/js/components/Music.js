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
    thisMusic.dom.categorySelect = document.querySelector(select.formOf.categoriesSelect);
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
    let matchedSongs = [];

    const categoriesSelect = document.getElementById('categories__select');

    button.addEventListener('click', function(){
      thisMusic.resetWrapper(thisMusic.dom.searchPage);
      searchMessage.innerHTML = '';

      numberOfSongs = 0;
      matchedSongs = [];
  
      let selectedCategory = categoriesSelect.value;

      if(input.value === '' && selectedCategory === 'first'){
        for (let songData in thisMusic.data.songs){
          matchedSongs.push(thisMusic.data.songs[songData]);
        } 
      } else {
        if(input.value !== ''){
          for (let songData in thisMusic.data.songs){
            if (thisMusic.data.songs[songData].filename.toString().toUpperCase().includes(input.value.toUpperCase())) {
              matchedSongs.push(thisMusic.data.songs[songData]);
            } 
          }
        }
  
        for (let songData in thisMusic.data.songs){
          const songCategories = thisMusic.data.songs[songData].categories;
          if (songCategories.includes(selectedCategory)){
            if(!matchedSongs.includes(thisMusic.data.songs[songData])){
              matchedSongs.push(thisMusic.data.songs[songData]);
            }
          }
        }
      }

      for (let song of matchedSongs){
        thisMusic.render(song, thisMusic.dom.searchPage);
      }
      
      thisMusic.initPlayer(select.player.searchPage);

      numberOfSongs = matchedSongs.length;
      numberOfSongs == 1 ? searchMessage.innerHTML = `We found ${numberOfSongs} song...` : searchMessage.innerHTML = `We found ${numberOfSongs} songs...`;
    });
  }

  initDiscoverPageMusic(){
    const thisMusic = this;

    /*

    const playerButtons = document.querySelectorAll('.player');

    for(let btn of playerButtons){
      btn.addEventListener('click', function(event){
        const songInfo = event.target.closest('.song__info');
        const songCategories = songInfo.querySelector('');
      });
    }

    */
    
    
    /* try to immedaitely check for categories 

    for (let songData in thisMusic.data.songs){
      thisMusic.data.songs[songData].counter = 0;
    }
    
    const playerButtons = document.querySelectorAll('.player');

    for(let btn of playerButtons){
      btn.addEventListener('click', function(event){
        const songDiv = event.target.closest('.song');
        const songInfo = songDiv.querySelector('.song__title').innerHTML;
        const position = songInfo.search('-');
        const songTitle = songInfo.slice(position + 2);
        const songAuthor = songInfo.slice(0, position -1);

        for (let songData in thisMusic.data.songs){
          const song = thisMusic.data.songs[songData];

          if(song.author === songAuthor && song.title === songTitle){
            song.counter +=1;
          }
        }
      });
    }
    */
   
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

          for (let songData in thisMusic.data.songs){
            const songCategories = thisMusic.data.songs[songData].categories;
            let isActiveCategory = false;
    
            if (songCategories.includes(activeCategory)){
              isActiveCategory = true;
            }
    
            if (isActiveCategory){
              thisMusic.render(thisMusic.data.songs[songData], thisMusic.dom.homePage);
            }
          }
          thisMusic.initPlayer(select.player.homePage);
        } else {
          category.classList.remove(classNames.categories.active);
          activeCategory = '';
          thisMusic.initHomePageMusic();
        }
      }
    });
  }

  resetCategories(){
    const allCategoryLinks = document.querySelectorAll(select.linksOf.categories);

    for(let categoryLink of allCategoryLinks){
      categoryLink.classList.remove(classNames.categories.active);
    }
  }

  resetWrapper(wrapper){
    wrapper.innerHTML = '';
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
    const categorySelect = thisMusic.dom.categorySelect;
    

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
      const categoriesListHTML = templates.categoryTemplate(linkHtmlData);
      const categoriesSelectsHTML = templates.categorySelectTemplate(linkHtmlData);

      const categoryListDOM = utils.createDOMFromHTML(categoriesListHTML);
      const categorySelectDOM = utils.createDOMFromHTML(categoriesSelectsHTML);

      categoryList.appendChild(categoryListDOM);
      categorySelect.appendChild(categorySelectDOM);
    }
  }
}

export default Music;