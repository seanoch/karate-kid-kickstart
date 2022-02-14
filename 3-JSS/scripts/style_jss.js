import { jss } from './preset_jss'
import { darkGreen, lightGreen, darkRed, lightRed, darkGray, lightGray } from './preset_jss'


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