import React, { useState, useEffect, memo } from 'react'
import videojs from 'video.js'
import PropTypes from 'prop-types';
import Controls from './controls.json'
import './video.css'
require('videojs-http-source-selector')
require('videojs-contrib-quality-levels')



function Video(props) {
    let player = {}
    let playerId = `video-player-${(new Date) * 1}`


    useEffect(() => {
        init_player()
        init_player_events()

        player.removeAttribute("controls")


        return (() => {
            if (player) player.dispose();
        })
    }, [])
    const init_player = () => {
        const playerOptions = generate_player_options(props);
        player = videojs(document.querySelector(`#${playerId}`), playerOptions);
        player.src(props.src)
        player.poster(props.poster)
        set_controls_visibility(player, props.hideControls);

    }


    const init_player_events = () => {
        let currentTime = 0;
        let previousTime = 0;
        let position = 0;

        player.ready(() => {
            props.onReady(player);
            window.player = player;
        });
        player.on('play', () => {
            props.onPlay(player.currentTime());
        });
        player.on('pause', () => {
            props.onPause(player.currentTime());
        });
        player.on('timeupdate', (e) => {
            props.onTimeUpdate(player.currentTime());
            previousTime = currentTime;
            currentTime = player.currentTime();
            if (previousTime < currentTime) {
                position = previousTime;
                previousTime = currentTime;
            }
        });
        player.on('seeking', () => {
            player.off('timeupdate', () => { });
            player.one('seeked', () => { });
            props.onSeeking(player.currentTime());
        });

        player.on('seeked', () => {
            let completeTime = Math.floor(player.currentTime());
            props.onSeeked(position, completeTime);
        });
        player.on('ended', () => {
            props.onEnd();
        });

    }


    const generate_player_options = () => {
        const playerOptions = {};
        playerOptions.controls = props.controls;
        playerOptions.autoplay = props.autoplay;
        playerOptions.preload = props.preload;
        playerOptions.width = props.width;
        playerOptions.plugins = props.plugins;
        playerOptions.height = props.height;
        playerOptions.bigPlayButton = props.bigPlayButton;
        const hidePlaybackRates = props.hidePlaybackRates || props.hideControls.includes('playbackrates');
        if (!hidePlaybackRates) playerOptions.playbackRates = props.playbackRates;
        return playerOptions;
    }

    const set_controls_visibility = (player, hidden_controls) => {
        Object.keys(Controls).map(x => { player.controlBar[Controls[x]].show() })
        hidden_controls.map(x => { player.controlBar[Controls[x]].hide() });
    }




    return (
        <video id={playerId} className={props.className}></video>
    )
}

Video.propTypes = {
    src: PropTypes.string,
    poster: PropTypes.string,
    controls: PropTypes.bool,
    autoplay: PropTypes.bool,
    preload: PropTypes.oneOf(['auto', 'none', 'metadata']),
    width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    hideControls: PropTypes.arrayOf(PropTypes.string),
    bigPlayButton: PropTypes.bool,
    bigPlayButtonCentered: PropTypes.bool,
    onReady: PropTypes.func,
    onPlay: PropTypes.func,
    handleBookmarkClick: PropTypes.func,
    onPause: PropTypes.func,
    onTimeUpdate: PropTypes.func,
    onSeeking: PropTypes.func,
    onSeeked: PropTypes.func,
    fluid: PropTypes.bool,
    onEnd: PropTypes.func,
    playbackRates: PropTypes.arrayOf(PropTypes.number),
    hidePlaybackRates: PropTypes.bool,
    className: PropTypes.string
}

Video.defaultProps = {
    src: "",
    poster: "",
    controls: true,
    autoplay: false,
    preload: 'auto',
    playbackRates: [0.5, 1, 1.5, 2],
    hidePlaybackRates: false,
    className: "",
    fluid: true,
    hideControls: [],
    bigPlayButton: true,
    bigPlayButtonCentered: false,
    plugins: {
        httpSourceSelector:
        {
            default: 'auto'
        }
    },
    onReady: () => { },
    onPlay: () => { },
    onPause: () => { },
    onTimeUpdate: () => { },
    onSeeking: () => { },
    onSeeked: () => { },
    onEnd: () => { }
}


export default memo(Video)
