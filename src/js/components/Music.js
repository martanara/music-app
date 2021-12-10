import {select, templates} from '.././settings.js';
import utils from '.././utils.js';
import HomePage from './HomePage.js';
import SearchPage from './SearchPage.js';
import DiscoverPage from './DiscoverPage.js';

class Music {
  constructor(songs){
    const thisMusic = this;

    thisMusic.data = {};
    thisMusic.data.songs = songs;
    thisMusic.data.categories = [];
    thisMusic.pages = {};

    thisMusic.getElements();
    thisMusic.generateCategories(); // zostawiamy
    thisMusic.renderCategories();

    thisMusic.pages.HomePage = new HomePage(thisMusic.data.songs, thisMusic.data.categories);
    thisMusic.pages.SearchPage = new SearchPage(thisMusic.data.songs);
    thisMusic.pages.DiscoverPage = new DiscoverPage(thisMusic.data.songs, thisMusic.data.categories);
  }

  getElements(){
    const thisMusic = this;

    thisMusic.dom = {};

    thisMusic.dom.categoryList = document.querySelector(select.listOf.categories);
    thisMusic.dom.categorySelect = document.querySelector(select.formOf.categoriesSelect);
  }

  generateCategories(){
    const thisMusic = this;

    for(let song of thisMusic.data.songs){
      const songCategories = song.categories;

      for(let item of songCategories){
        if(!thisMusic.data.categories.includes(item)){
          thisMusic.data.categories.push(item);
        }
      }
    }
  }

  renderCategories(){
    const thisMusic = this;

    for(let category of thisMusic.data.categories){
      const linkHtmlData = {name: category};
      const categoriesListHTML = templates.categoryTemplate(linkHtmlData);
      const categoriesSelectsHTML = templates.categorySelectTemplate(linkHtmlData);

      const categoryListDOM = utils.createDOMFromHTML(categoriesListHTML);
      const categorySelectDOM = utils.createDOMFromHTML(categoriesSelectsHTML);

      thisMusic.dom.categoryList.appendChild(categoryListDOM);
      thisMusic.dom.categorySelect.appendChild(categorySelectDOM);
    }
  }
}

export default Music;