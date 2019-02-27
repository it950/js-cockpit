import React, { ReactNode } from 'react'
import ReactDOM from 'react-dom'
import { defineComponent } from 'js-react-utils'
import { initSystemIcons, Brand, AppSelector, DataExplorer, DataForm, HBox, SideNav, LoginForm, MenuBar, Cockpit, UserMenu } from '../main/js-cockpit'
import { loadTheme } from 'office-ui-fabric-react'

import { MdAdd, MdEdit, MdRemove } from 'react-icons/md'

import { of as observableOf } from 'rxjs'
import { delay } from 'rxjs/operators'

import faker from 'faker'
import Color from 'color'
import { FiEdit, FiPlus, FiMinus, FiTrash, FiTrash2 } from 'react-icons/fi'

initSystemIcons()

const primaryColor = '#e6522c'

loadTheme({
  palette: {
    // 'themePrimary': primaryColor,
    // 'themeSecondary': Color(primaryColor).lighten(0.2).string(),
    // 'themeTertiary': Color(primaryColor).lighten(0.4).string(),
  }
})

function Demo() {
  const loginForm =
    <LoginForm fullSize={true}>
      <LoginForm.Above>
          <Brand
            vendor="meet+greet"
            title="Back office"
            size="huge"
          />
      </LoginForm.Above>
    </LoginForm>

  const dataExplorer =
    <DataExplorer
      title="Back-office users"

      loadData={loadData}

      columns={[
        { kind: 'column', title: 'First name', field: 'firstName', sortable: true },
        { kind: 'column', title: 'Last name', field: 'lastName', sortable: true },
        { kind: 'column', title: 'Postal code', field: 'postalCold', sortable: true },
        { kind: 'column', title: 'City', field: 'city', sortable: true },
        { kind: 'column', title: 'Country', field: 'country', sortable: true }
      ]}

      actions={[
        { kind: 'general', title: 'Add', icon: <FiPlus/> },
        { kind: 'singleRow', title: 'Edit', icon: <FiEdit/> },
        { kind: 'multiRow', title: 'Delete', icon: <FiTrash2/> }
      ]}
    >
    </DataExplorer>

  const dataForm =
    <DataForm headline="My DataForm">
      <DataForm.Actions>
        <DataForm.Action
          text="Save"
        /> 
        <DataForm.Action
          text="Clone"
        /> 
        <DataForm.Action
          text="Delete"
        /> 
      </DataForm.Actions>
    </DataForm>

  const cockpit =
    <Cockpit onLogout={() => alert('Juhu')}>
      <Cockpit.Brand>
        <Brand
          vendor="meet+greet"
          title="Back Office"
        />
      </Cockpit.Brand>
      <Cockpit.TopNav>
        <AppSelector
          apps={[
            {
              kind: 'app',
              id: 'cms',
              title: 'Web Shop',
              description: 'Some description for the CMS'
            },
            {
              kind: 'app',
              id: 'mms',
              title: 'Media management',
              description: 'Some description for the MMS'
            }
          ]}
        />
      </Cockpit.TopNav>
      <Cockpit.UserNav>
        <UserMenu
          fullName="Jane Doe"
        />
      </Cockpit.UserNav>
      <Cockpit.Menu>
        <MenuBar
          onAction={() => alert('Juhu')}

          items={[
            {
              kind: 'menu',
              text: 'Users',
              
              items: [
                { kind: 'item', id: '1.1', text: 'Item-1.1'},
                { kind: 'item', id: '1.2', text: 'Item-1.2', disabled: true },
                { kind: 'item', id: '1.3', text: 'Item-1.3'},
                { kind: 'item', id: '1.4', text: 'Item-1.4'},
              ]
            },
            {
              kind: 'menu',
              text: 'Content',
              
              items: [
                { kind: 'item', id: '2.1', text: 'Item-2.1'},
                { kind: 'item', id: '2.2', text: 'Item-2.2', disabled: true },
                { kind: 'item', id: '2.3', text: 'Item-2.3'},
                { kind: 'item', id: '2.4', text: 'Item-2.4'},
              ]
            },
            {
              kind: 'menu',
              text: 'Media',
              
              items: [
                { kind: 'item', id: '3.1', text: 'Item-3.1'},
                { kind: 'item', id: '3.2', text: 'Item-3.2', disabled: true },
                { kind: 'item', id: '3.3', text: 'Item-3.3'},

                {
                  kind: 'menu',
                  text: 'Item-3.4',

                  items: [
                    { kind: 'item', id: '3.4.1', text: 'Item-3.4.1' }
                  ]
                },
              ]
            },
            {
              kind: 'menu',
              text: 'Help',
              
              items: [
                { kind: 'item', id: '4.1', text: 'About...'},
              ]
            }
          ]}
        />
      </Cockpit.Menu>
      <Cockpit.SideNav>
        <SideNav activeItemId="user-groups">
          <SideNav.Menu text="Menu1">
            <SideNav.Item
              id="users"
              text="Users"
            />
            <SideNav.Item
              id="user-groups"
              text="User groups"
            />
          </SideNav.Menu>
          <SideNav.Menu text="Menu2">
            <SideNav.Item
              id="users2"
              text="Users"
            />
            <SideNav.Item
              id="user-groups2"
              text="User groups"
            />
          </SideNav.Menu>
        </SideNav>
      </Cockpit.SideNav>
      <Cockpit.Center style={{ padding: '5px' }}>
        {dataExplorer}
      </Cockpit.Center>
    </Cockpit>

  return cockpit
}

function fakeData(count: number) {
  const ret: any[] = []

  for(let i = 0; i < count; ++i) {
    ret.push({
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
      city: faker.address.city(),
      postalCode: faker.address.zipCode(),
      country: faker.address.country()
    })
  }

  return ret
}

function loadData(params: {offset: number, count: number, sortBy: string | null, sortDesc: boolean}) {
  const totalItemCount = 1241
  
  let data = fakeData(totalItemCount)

if (params.sortBy) {
  data.sort((recs1, recs2) => {
    let ret = 0

    const
      v1 = recs1[params.sortBy],
      v2 = recs2[params.sortBy];

    if (v1 > v2) {
      ret = 1
    } else if (v1 < v2) {
      ret = -1
    } else {
      ret = 0
    }

    if (params.sortDesc) {
      ret = -ret
    }

    return ret
  })
}

  data = data.slice(params.offset, params.offset + params.count)

  return observableOf({data, totalItemCount })
                    .pipe(delay(1000))

}


ReactDOM.render(<Demo/>, document.getElementById('main-content'))

