import { Button, Drawer } from 'antd';
import React, { useState } from 'react';
import LeftMenu from './Sections/LeftMenu';
import RightMenu from './Sections/RightMenuHoc';
import './Sections/NavBar.css';
import { MenuOutlined } from '@ant-design/icons';

function NavBar(props){
    
    const [ Visible, setVisible] = useState(false);
    const showDrawer = () => {
        setVisible(true);
    }
    const onClose = () => {
        setVisible(false);
    }

    return(
        <nav className="menu" >
            <div className="menu__logo">
                <a href="/">Logo</a>
            </div>
            <div className="menu__container">
                <div className="menu_left">
                    <LeftMenu mode="horizontal" />
                </div>
                <div className="menu_right">
                    <RightMenu mode="horizontal" />
                </div>
                <Button 
                    className="menu__mobile-button"
                    type="primary"
                    onClick={showDrawer}
                ><MenuOutlined /></Button>
                <Drawer
                    title="Basic Drawer"
                    placement="right"
                    className="menu_drawer"
                    closable={false}
                    onClose={onClose}
                    visible={Visible}
                >
                    <LeftMenu mode="inline" />
                    <RightMenu mode="inline" />
                </Drawer>
            </div>
        </nav>
    );
}
export default NavBar;