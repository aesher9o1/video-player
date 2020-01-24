import videojs from 'video.js'

export default class Bookmark extends videojs.getComponent('Button') {
    player = null;
    addBookmarks = null;
    constructor(player, options = {}, addBookmarks) {
        super(player, options);
        this.addClass('vjs-add-bookmark');
        this.player = player
        this.addBookmarks = addBookmarks;
    }

    handleClick(_e) {
        console.log(this.player.currentTime)
        // this.addBookmarks( [ this.player.currentTime()])
    }
}