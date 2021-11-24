export const select = {
  templateOf: {
    songs: '#template-song',
  },
  containerOf: {
    pages: '#pages',
    homePage: '.songs-home',
    searchPage: '.songs-search',
    discoverPage: '.songs-discover',
  },
  nav: {
    links: '.main-nav a',
  },
  player: {
    homePage: '.songs-home .player',
    searchPage: '.songs-search .player',
    discoverPage: '.songs-discover .player',
  },
  searchElements: {
    button: '.search-button',
    input: 'searchInput',
    text: '.search_success',
  }
};

export const classNames = {
  nav: {
    active: 'active',
  },
  pages: {
    active: 'active',
  }
};

export const settings = {
  db: {
    url: '//' + window.location.hostname + (window.location.hostname=='localhost' ? ':3131' : ''),
    songs: 'songs',
  },
};

export const templates = {
  songTemplate: Handlebars.compile(document.querySelector(select.templateOf.songs).innerHTML),
};