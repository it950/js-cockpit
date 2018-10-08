import React, { SFC } from 'react'
import { defineComponent } from 'js-react-utils'
import { ControlCenterModel } from './ControlCenter'
import Brand from './internal/control-center/components/Brand'
import defineStyle from '../../styling/defineStyle'
import { ITheme } from 'office-ui-fabric-react'
import DefaultAvatar from './internal/control-center/icons/DefaultAvatar'
import LogoutIcon from './internal/control-center/icons/LogoutIcon'
import AppsIcon from './internal/control-center/icons/AppsIcon'
import ChevronDownIcon from '../../system-icons/ChevronDownIcon'
import Color from 'color'

const styleControlCenter = defineStyle((theme: ITheme) => {
  return {
    controlCenter: {
      display: 'flex',
      flexDirection: 'column',
      minWidth: '100%',
      position: 'absolute',
      height: '100%',
      justifyContent: 'stretch',
    },

    header: {
      display: 'flex',
      alignItems: 'stretch',
      height: '42px',
      minWidth: '100%',
      color: '#f0f0f0',
      backgroundColor: 'rgb(50,50,50)' 
    },

    headerStart: {
      padding: '0.1rem 0.5rem',
      whiteSpace: 'nowrap',
    },

    headerCenter: {
      flexGrow: 1,
      padding: '0 2rem 0.2rem 4rem',
      whiteSpace: 'nowrap',
    },

    headerEnd: {
      display: 'flex',
      alignItems: 'center',
      whiteSpace: 'nowrap',

      selectors: {
        '& > *': {
          marginLeft: '0.9rem'
        }
      }
    },

    content: {
      flexGrow: 1,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'stretch',
    },
  }
})

function render(model: ControlCenterModel) {
  const main =
    model.apps.length === 0
      ? null
      : model.apps[0]

  return styleControlCenter(classes =>
    <div className={classes.controlCenter}>
      <div className={classes.header}>
        <div className={classes.headerStart}>
          <Brand vendor={model.vendor} title={model.title} logo={model.logo}/>
        </div>
        <div className={classes.headerCenter}>
          <AppSelector/>
        </div>
        <div className={classes.headerEnd}>
          { <DefaultAvatar/> }
          { UserMenu({ username: 'Jane Doe' }) }
          { <LogoutButton/> }
        </div>
      </div>
      <div className={classes.content}>
        { model.apps.length > 0 ? model.apps[0].content : null }
      </div>
    </div>
  )
}

// --- exports ------------------------------------------------------

export default {
  render
}

// ------------------------------------------------------------------

const styleAppSelector = defineStyle((theme: ITheme) => ({
  container: {
    display: 'flex',
    alignItems: 'center',
    height: '42px',
    borderColor: 'white',
    borderWidth: '0 0 0 1px',
    paddingLeft: '1rem',
    cursor: 'pointer',

    selectors: {
      '& > *': {
        margin: '0.1rem 0.1rem'
      }
    }
  },

  icon: {
    display: 'inline-block',
    marginRight: '0.5rem',
    color: theme.palette.themePrimary
  },

  label: {
  }
}))

type AppSelectorProps = {
}

const AppSelector = defineComponent<AppSelectorProps>({
  displayName: 'AppSelector',

  render() {
    return styleAppSelector(classes =>
      <div>
        <div className={classes.container}>
          <div className={classes.icon}>
            <AppsIcon/>
          </div>
          <label className={classes.label}>Content Management</label>
          <ChevronDownIcon/>
        </div>
      </div>
    )
  }
})


// ------------------------------------------------------------------

const styleUserMenu = defineStyle({
  container: {
  }
})

type UserMenuProps = {
  username: string
}

const UserMenu = (props: UserMenuProps) => {
  return styleUserMenu(classes =>
      <div className={classes.container}>
        { props.username }
      </div>
  )
}

const styleLogoutButton = defineStyle((theme: ITheme) => ({
  button: {
    color: theme.palette.white,
    backgroundColor: theme.palette.themePrimary,
    border: 'none',
    width: '42px',
    height: '42px',
    textAlign: 'center',
    verticalAlign: 'middle',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    //borderWidth: '0 0 0 0.5px',
    //borderStyle: 'solid',
    //borderColor: Color(theme.palette.themePrimary).lighten(0.5),
    
    selectors: {
      '&:hover': {
        backgroundColor: Color(theme.palette.themePrimary).darken(0.2)
      },

      '&:active': {
        backgroundColor: Color(theme.palette.themePrimary).darken(0.1)
      }
    }
  }
}))

type LogoutButtonProps = {
}

const LogoutButton = defineComponent<LogoutButtonProps>({
  displayName: 'LogoutButton',

  render() {
    return styleLogoutButton(classes =>
      <a className={classes.button}>
        <LogoutIcon/>
      </a>
    )
  }
})