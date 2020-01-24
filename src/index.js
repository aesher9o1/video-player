import React, { useState, useEffect } from 'react'
import videojs from 'video.js'
import Bookmark from './bookmark'
import NoUpdate from './noUpdate'


function Index(props) {
    let player = null;
    let videoNode = null
    const [bookmarks, addBookmarks] = useState([])

    useEffect(() => {
        player = videojs(videoNode, props);
        player.httpSourceSelector();
        let bookmark = new Bookmark(player, null, addBookmarks)
        player.controlBar.addChild(bookmark)

        return () => {
            player.dispose()
        }
    })
    return (
        <div>
            <NoUpdate>
                <div data-vjs-player>

                    <video width="640" height="264" ref={node => videoNode = node} className="video-js"></video>

                </div>
            </NoUpdate>
            <div>

            </div>
        </div>
    )
}

export default Index;
