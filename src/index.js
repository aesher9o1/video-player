import React, { useState, useEffect } from 'react'
import videojs from 'video.js'


function Index(props) {
    let player = null;
    let videoNode = null

    useEffect(() => {
        player = videojs(videoNode, props);
        player.httpSourceSelector();

        return () => {
            if (player)
                player.dispose()
        }
    })
    return (
        <div data-vjs-player>
            <video width="640" height="264" ref={node => videoNode = node} className="video-js"></video>
        </div>
    )
}

export default Index;
