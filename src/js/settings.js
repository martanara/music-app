export const select = {
  templateOf: {
    songs: '#template-song',
  },
  containerOf: {
    pages: '#pages',
    homePage: '.homepage-wrapper',
  },
  nav: {
    links: '.main-nav a',
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
    url: '//localhost:3131',
    songs: 'songs',
  },
};

export const templates = {
  songList: Handlebars.compile(document.querySelector(select.templateOf.songs).innerHTML),
};