class MusicPlayer {
  constructor(selector) {
    const thisMusicPlayer = this;

    thisMusicPlayer.initPlayer(selector);
  }

  initPlayer(selector) {
    // eslint-disable-next-line no-undef
    GreenAudioPlayer.init({
      selector: selector,
      stopOthersOnPlay: true
    });
  }
}

export default MusicPlayer;