// externals imports
import React from 'react'
import { Nav, INavLink, INavLinkGroup } from 'office-ui-fabric-react'

// internal imports
import SideNavProps from './types/SideNavProps'
import defineStyle from '../../../styling/defineStyle'

// --- styleSideNav -------------------------------------------------

const styleSideNav = defineStyle(theme => ({
  container: {
    display: 'flex',
    flexGrow: 1,
    height: '100%',
  },

  navigation: {
    width: '12rem',
    padding: '0 8px',
    margin: '6px',
    boxSizing: 'border-box',
    borderColor: theme.palette.neutralLight,
    borderWidth: '0 1px 0 0',
    borderStyle: 'solid',

    selectors: {
      '.ms-Nav-groupContent': {
        backgroundColor: 'transparent',
        padding: '0 !important',
        margin: '0 !important',
        marginTop: '0 !important',
      },
    
      '.ms-Nav-navItems *': {
        backgroundColor: 'transparent !important',
      },

      '& .ms-Nav-chevronButton': {
        fontSize: theme.fonts.mediumPlus.fontSize,
        color: theme.palette.neutralDark,
        backgroundColor: 'transparent',

        borderWidth: '0 0 1px 0',
        borderColor: theme.palette.neutralQuaternaryAlt,
        borderStyle: 'solid',
        marginBottom: '0',

        selectors: {
          ':hover': {
            backgroundColor: theme.palette.neutralLight, 
          }
        }
      },
      
      '.ms-Nav-compositeLink.is-expanded': {
        selectors: {
          ':hover': {
            backgroundColor: theme.palette.neutralLight + ' !important',
          },
          
          ':active': {
            backgroundColor: theme.palette.neutralQuaternary + ' !important',
          }
        }
      },

      '.ms-Nav-navItems': {
        margin: '0.325rem 0 1rem 0',
      },

      '.ms-Nav-compositeLink.is-expanded.is-selected': {
        backgroundColor: theme.palette.themeLighterAlt + ' !important',

        selectors: {
          '*': {
            color: theme.palette.black + ' !important',
            cursor: 'default !important',
          },

          '> button:after': {
            borderColor: theme.palette.themeSecondary,
          },

          ':hover *': {
            color: theme.palette.black + ' !important',
            backgroundColor: theme.palette.themeLighterAlt + ' !important',
          }
        }
      }
    }
  },

  content: {
    flexGrow: 1,
    marginLeft: '0.375rem',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'stretch',
    margin: '4px 6px'
  }
}))

// --- SideNav View -------------------------------------------------

function SideNavView(props: SideNavProps) {
  let ret = null

  if (props.items) {
    ret = styleSideNav(classes => 
      <div className={classes.container}>
        <div className={classes.navigation}>
          <Nav
            groups={getLinkGroups(props.items)}

            selectedKey={props.activeItemId}
          />
        </div>
      </div>
    )
  }

  return ret
}

// --- helpers ------------------------------------------------------

function getLinkGroups(items: any): INavLinkGroup[] { // TODO
  const linkGroups: INavLinkGroup[] = []

  items.forEach((item: any, idx: any) => {
    const linkGroup: INavLinkGroup = {
      name: item.text,
      links: getLinks(item.items)
    }

    linkGroups.push(linkGroup)
  })

  return linkGroups
}

function getLinks(items: any): INavLink[] {
  const links: INavLink[] = []

  items.forEach((item: any, idx: number) => { // TODO
    const link: INavLink = {
      key: item.id,
      name: item.text,
      isExpanded: true,
      link: null as any,
      url: null as any
    }

    links.push(link)
  })

  return links
}

// --- exports ------------------------------------------------------

export default SideNavView

