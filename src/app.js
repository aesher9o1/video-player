import React from 'react';
import { render } from 'react-dom';
import Index from '.';
require('videojs-http-source-selector')
require('videojs-contrib-quality-levels')

const videoJsOptions = {
    autoplay: true,
    controls: true,
    playbackRates: [0.5, 1, 1.5, 2],
    sources: [{
        src: 'https://bitdash-a.akamaihd.net/content/MI201109210084_1/m3u8s/f08e80da-bf1d-4e3d-8899-f0f6155f6efa.m3u8',
        type: 'application/x-mpegURL'
    }],
    plugins: {
        httpSourceSelector:
        {
            default: 'auto'
        }
    }
}

render(<Index {...videoJsOptions} />, document.getElementById('app-root'));
