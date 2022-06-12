import React from "react";
import { Menu } from "antd";
import "./Navbar.css";

function LeftMenu(props) {
  return (
    <Menu mode={props.mode}>
      <Menu.Item key="mail">
        <a href="/" style={{ color: "rgb(37, 141, 252)" }}>
          Home
        </a>
      </Menu.Item>
    </Menu>
  );
}

export default LeftMenu;
