import React from "react";
import { Menu } from "antd";

function LeftMenu(props) {
  return (
    <Menu mode={props.mode}>
      <Menu.Item key="scoreboard">
        <a href="/scoreboard">Scoreboard</a>
      </Menu.Item>
      <Menu.Item key="map">
        <a href="/map">Map</a>
      </Menu.Item>
    </Menu>
  );
}

export default LeftMenu;
