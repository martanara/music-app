class Song {
  constructor(id, data){
    const thisSong = this;

    thisSong.id = id;
    thisSong.data = data;

    console.log(thisSong);

    thisSong.getElements();
  }

  getElements(){
    const thisSong = this;

    thisSong.dom = {};
  }
}

export default Song;