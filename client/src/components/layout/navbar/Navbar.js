import React from 'react';
import { BrowserRouter as Router, useLocation } from 'react-router-dom';
import { SideBarItem } from './SideBarItem';
import { Menu } from 'semantic-ui-react';
import './sideBar.scss';

export class SideBar extends React.Component {
  render() {
    return (
      <Menu borderless vertical stackable fixed='left' className='side-nav'>
        <SideBarItem highlight={true}  label='Home' icon='home' />
        <SideBarItem label='Accounts' icon='user'/>
        <SideBarItem label='Guests' icon='users' />
        <SideBarItem label='Logs' icon='database' />
        <SideBarItem label='logout' icon='logout' />
      </Menu>
    );
  }
}