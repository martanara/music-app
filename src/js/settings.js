export const select = {
  templateOf: {
    songs: '#template-song',
  },
  containerOf: {
    pages: '#pages',
    homePage: '.homepage-wrapper',
    searchPage: '.song-list',
    discoverPage: '.discover-wrapper',
  },
  nav: {
    links: '.main-nav a',
  },
  player: {
    homePage: '.homepage-wrapper .player',
    searchPage: '.search-wrapper .player',
    discoverPage: '.discover-wrapper .player',
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