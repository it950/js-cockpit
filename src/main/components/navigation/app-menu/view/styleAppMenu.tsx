// internal imports
import defineStyle from '../../../../styling/defineStyle'

// --- styleAppMenu ---------------------------------------------

const styleAppMenu = defineStyle(theme => ({
  container: {
  },

  inner: {
    display: 'inline-flex',
    alignItems: 'center',
    height: '42px',
    borderColor: 'white',
    borderWidth: '0 0 0 1px',
    paddingLeft: '1rem',
    cursor: 'pointer',

    selectors: {
      '& .ms-Pivot': {
        marginLeft: '0.25rem',
      }
    }
  },

  icon: {
    display: 'inline-block',
    color: theme.palette.themePrimary,
  },

  label: {
    margin: '0 0.5rem',
    cursor: 'pointer',
    fontSize: theme.fonts.medium.fontSize,
    fontFamily: theme.fonts.medium.fontFamily,
  },

  callout: {
    display: 'flex',
    flexDirection: 'column',
    minWidth: '300px',
    boxSizing: 'border-box',
  },

  appLink: {
    margin: '4px 4px',
    padding: '6px 10px',
    color: theme.palette.black,
    borderWidth: '1px 0 0 0',
    borderStyle: 'solid',
    borderColor: theme.palette.neutralLight,
    cursor: 'pointer',

    selectors: {
      ':first-child': {
        borderTopWidth: 0
      },

      ':hover': {
        backgroundColor: theme.palette.themeLighter,
      },
      
      ':active': {
        backgroundColor: theme.palette.themeLight,
      }
    }
  },

  appLinkTitle: {
    display: 'inline-block',
    fontSize: theme.fonts.medium.fontSize,
    fontFamily: theme.fonts.medium.fontFamily,
  },

  appLinkDescription: {
    display: 'block',
    fontSize: theme.fonts.smallPlus.fontSize,
    fontFamily: theme.fonts.smallPlus.fontFamily,
    marginTop: '4px'
  }
}))

// --- exports ------------------------------------------------------

export default styleAppMenu
