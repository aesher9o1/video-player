import React from 'react';
import { render } from 'react-dom';
import Index from '.';
window.VIDEOJS_NO_BASE_THEME = true

render(<Index />, document.getElementById('app-root'));
