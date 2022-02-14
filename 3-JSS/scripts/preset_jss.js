import jss from 'jss'
import preset from 'jss-preset-default'

const darkGreen = 'rgb(48, 78, 58)';
const lightGreen = 'rgb(150, 202, 167)';
const darkRed = 'rgb(78, 25, 23)';
const lightRed = 'rgb(204, 124, 121)';
const darkGray = '#505050';
const lightGray = '#b3b3b3';

// One time setup with default plugins and settings.
jss.setup(preset());

export { jss } 
export { darkGreen, lightGreen, darkRed, lightRed, darkGray, lightGray }