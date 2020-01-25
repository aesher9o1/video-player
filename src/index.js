import React, { useState, useEffect } from 'react'
import Video from './lib/video'
import videojs from 'video.js'
import Editor from './lib/editor'

function Index() {
    const [editor, setEditor] = useState({
        instance: null,
        text: "Nothing yet."
    })


    const addTextToEditor = () => {
        var htmlToInsert = "<p>here is some <strong>awesome</strong> text</p>"
        var editor = document.getElementsByClassName('someEditorClass')
        editor[0].innerHTML = editor[0].innerHTML + htmlToInsert
    }
    const onPlayerReady = (player) => {
        var Button = videojs.getComponent('Button');
        var BookMarkButton = videojs.extend(Button, {
            constructor: function () {
                Button.apply(this, arguments);
                /* initialize your button */
            },
            handleClick: function () {
                addTextToEditor()
            }
        });
        videojs.registerComponent('BookMarkButton', BookMarkButton);
        player.getChild('controlBar').addChild('BookMarkButton', {});
    }

    const videoJsOptions = {
        controls: true,
        src: "https://bitdash-a.akamaihd.net/content/MI201109210084_1/m3u8s/f08e80da-bf1d-4e3d-8899-f0f6155f6efa.m3u8",
        width: "640",
        height: "264",
        onReady: onPlayerReady.bind(this)
    }


    const quillOptions = {
        placeholder: 'Compose an epic...',
        readOnly: false,
        theme: 'snow'
    };

    return (
        <section>
            <div>
                <Video {...videoJsOptions} />
            </div>
            <div>
                <h1>Bookmarks</h1>
                <Editor setEditor={setEditor} quillOptions={quillOptions} className={"someEditorClass"}></Editor>
            </div>
            <div>
                {editor.text}
                <button onClick={addTextToEditor}>Add</button>
            </div>
        </section>
    )
}

export default Index;
