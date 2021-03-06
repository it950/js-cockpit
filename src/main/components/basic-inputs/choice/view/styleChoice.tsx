// internal imports
import defineStyle from '../../../../styling/defineStyle'

// --- styleChoice --------------------------------------------------

const styleChoice = defineStyle(theme => ({
  container: {
  },

  label: {
    fontSize: theme.fonts.smallPlus.fontSize,
    fontFamily: theme.fonts.smallPlus.fontFamily,
    margin: '0 0 1px 0',
  },
}))

// --- exports ------------------------------------------------------

export default styleChoice
