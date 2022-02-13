import jss from 'jss'
import preset from 'jss-preset-default'
import Color from 'color'

const logoBlue = '#0b79a5';
const backgroundBlue = '#e5f6fd';
const hoverBlue = '#d7f2fd';
const shadowBlue = '#085b7c';
const darkGreen = 'rgb(48, 78, 58)';
const lightGreen = 'rgb(150, 202, 167)';
const darkRed = 'rgb(78, 25, 23)';
const lightRed = 'rgb(204, 124, 121)';
const darkYellow = 'rgb(104, 89, 2)';
const lightYellow = 'rgb(194, 173, 53)';
const darkGray = '#505050';
const lightGray = '#b3b3b3';

// One time setup with default plugins and settings.
jss.setup(preset())

const styles = {
  editBtn : {
    color: lightGreen,
    '&:hover': {
      color: darkGreen,
      background: lightGreen
    }
  },
  confirmBtn : {
    color: lightGreen,
    '&:hover': {
      color: darkGreen,
      background: lightGreen
    }
  },
  removeBtn : {
    color: lightRed,
    borderRadius: '0px 10px 10px 0px',
    '&:not(.disabled)': {
      '&:hover' :{
        color: darkRed,
        background: lightRed
      }
    }
  },
  checkBtn: {
    color: lightGray,
    background: lightGray,
    borderRadius: '10px 0px 0px 10px',
    '&:not(.disabled)': {
      '&:hover' :{
        color: darkGray,
        background: darkGray
      }
    },
    '&.checked' : {
      color: darkGray,
      background: lightGray,
      '&:not(.disabled)': {
        '&:hover' :{
          color: lightGray,
          background: darkGray
        }
      }
    }
  },
  item: {
    width: '100%',
    fontSize: '18px',
    padding: '10px',
    textAlign: 'left',
    display: 'block'
  }
}

export const {classes} = jss.createStyleSheet(styles).attach();