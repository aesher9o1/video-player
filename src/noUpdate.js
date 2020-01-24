import React, { Component } from 'react';

class NoUpdate extends Component {

    shouldComponentUpdate() {
        return false;
    }

    render() {
        return (
            <div></div>
        )
    }
}

export default NoUpdate;