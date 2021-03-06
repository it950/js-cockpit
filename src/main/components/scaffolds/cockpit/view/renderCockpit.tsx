// external imports
import React, { ReactNode } from 'react'

// internal imports
import styleCockpit from './styleCockpit'
import CockpitProps from '../types/CockpitProps'

// --- renderCockpit ------------------------------------------------

function renderCockpit(props: CockpitProps) {
  let
    brand: ReactNode = null,
    topNav: ReactNode = null,
    userNav: ReactNode = null,
    menu: ReactNode = null,
    sidebar: ReactNode = null,
    Center: ReactNode = null

  const getContent = (child: any, displayName: string) => {
    let ret = null

    if (child && child.type && child.type.displayName === displayName
      && child.hasOwnProperty('props')
      && child.props && child.props.children) {

      ret =
        <div
          className={child.props.className}
          style={child.props.style}
        >
          {child.props.children}
        </div>
    }

    return ret
  }

  React.Children.forEach(props.children, (child: any) => {
    brand = brand || getContent(child, 'Cockpit.Brand')
    topNav = topNav || getContent(child, 'Cockpit.TopNav')
    userNav = userNav || getContent(child, 'Cockpit.UserNav')
    menu = menu || getContent(child, 'Cockpit.Menu')
    sidebar = sidebar || getContent(child, 'Cockpit.Sidebar')
    Center = Center || getContent(child, 'Cockpit.Center')
  })

  return styleCockpit(classes => {
    const header =
      !brand && !topNav && !userNav
        ? null
        : <div className={classes.header}>
            <div className={classes.headerStart}>
              {brand}
            </div>
            <div className={classes.headerCenter}>
              {topNav}
            </div>
            <div className={classes.headerEnd}>
              {userNav}
            </div>
          </div>

    return (
      <div data-component="Cockpit" className={classes.container}>
        {header}
        <div>
          {menu}
        </div>
        <div className={classes.content}>
          <div className={classes.sidebar}>
            {sidebar}
          </div>
          <div className={classes.center}>
            {Center}
          </div>
        </div>
      </div>
    )
  })
}

// --- exports ------------------------------------------------------

export default renderCockpit 
