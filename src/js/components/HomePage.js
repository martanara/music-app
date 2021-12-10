import SongList from './SongList.js';
import { select, classNames } from './../settings.js';
import utils from '../utils.js';
import MusicPlayer from './MusicPlayer.js';

class HomePage {
  constructor(songsData, categories) {
    const thisHomePage = this;

    thisHomePage.data = {};
    thisHomePage.data.songs = songsData;
    thisHomePage.data.categories = categories;

    thisHomePage.getElements();
    thisHomePage.renderSongs();
    thisHomePage.filterByCategories();
  }

  getElements() {
    const thisHomePage = this;

    thisHomePage.dom = {};
    thisHomePage.dom.wrapper = document.querySelector(select.containerOf.homePage);
    thisHomePage.dom.categoryList = document.querySelector(select.listOf.categories);
    thisHomePage.dom.categoryLinks = document.querySelectorAll(select.linksOf.categories);
  }

  renderSongs() {
    const thisHomePage = this;

    for (let songData in thisHomePage.data.songs) {
      new SongList(thisHomePage.data.songs[songData], thisHomePage.dom.wrapper);
    }
    thisHomePage.initWidgets();
  }

  filterByCategories(){
    const thisHomePage = this;

    let activeCategory = '';

    thisHomePage.dom.categoryList.addEventListener('click', function(event){
      event.preventDefault();

      utils.resetWrapper(thisHomePage.dom.wrapper);

      const category = event.target;

      if(category.classList.contains(classNames.categories.isCategory)){
        const categoryName = category.getAttribute(select.attributesOf.category);
  
        if(!category.classList.contains(classNames.categories.active)){
          thisHomePage.resetCategories();
          category.classList.add(classNames.categories.active);
          console.log(thisHomePage.dom.categoryLinks);
          activeCategory = categoryName;

          for (let songData in thisHomePage.data.songs){
            const songCategories = thisHomePage.data.songs[songData].categories;
            
            if (songCategories.includes(activeCategory)){
              new SongList(thisHomePage.data.songs[songData], thisHomePage.dom.wrapper);
            }
          }
          thisHomePage.initWidgets();
        } else {
          category.classList.remove(classNames.categories.active);
          console.log(thisHomePage.dom.categoryLinks);
          activeCategory = '';
          thisHomePage.renderSongs();
        }
      }
    });
  }

  resetCategories(){
    const thisHomePage = this;

    const allCategoryLinks = thisHomePage.dom.categoryLinks;

    for(let categoryLink of allCategoryLinks){
      categoryLink.classList.remove(classNames.categories.active);
    }
  }

  initWidgets() {
    new MusicPlayer(select.player.homePage) ;
  }
}

export default HomePage;