import React, { useState, useEffect } from 'react'
import Video from './lib/video'
import videojs from 'video.js'
import Editor from './lib/editor'

function Index() {
    const [editor, setEditor] = useState({
        instance: null,
        text: "Start typing on editor to make notes, Add bookmark through video"
    })


    const onPlayerReady = (player) => {
        var Button = videojs.getComponent('Button');
        var BookMarkButton = videojs.extend(Button, {
            constructor: function () {
                Button.apply(this, arguments);
                this.setAttribute('title', "Set Bookmark");
                this.addClass('fa')
                this.addClass('fa-bookmark');
            },
            handleClick: function () {
                var htmlToInsert = `<strong><a href="${document.URL}${player.currentTime()}">Bookmark at ${player.currentTime()}</a><strong>`
                var editor = document.querySelector('#editorID .ql-editor')
                editor.innerHTML = editor.innerHTML + htmlToInsert
            }
        });
        videojs.registerComponent('BookMarkButton', BookMarkButton);
        player.getChild('controlBar').addChild('BookMarkButton', {});
    }

    const videoJsOptions = {
        controls: true,
        src: "https://bitdash-a.akamaihd.net/content/MI201109210084_1/m3u8s/f08e80da-bf1d-4e3d-8899-f0f6155f6efa.m3u8",
        onReady: onPlayerReady.bind(this)
    }


    const quillOptions = {
        placeholder: 'Compose an epic...',
        readOnly: false,
        theme: 'snow'
    };

    return (
        <div className="container">
            <div className="row mt-4 border-bottom">
                <div className="col">
                    <h2>Video js with ABR and HLS support Paired with Quill brewed with ♥</h2>
                </div>
            </div>
            <div className="row">
                <div className="col mt-4">
                    <Video {...videoJsOptions} className="video-js vjs-fluid vjs-16-9 vjs-big-play-centered" />
                </div>

            </div>
            <div className="row mt-4">
                <div className="col">
                    <Editor setEditor={setEditor} quillOptions={quillOptions} id={"editorID"}></Editor>
                </div>
                <div className="col">
                    {editor.text}
                </div>
            </div>
            <div className="row" style={{ height: "150px" }}></div>
        </div>

    )
}

export default Index;
