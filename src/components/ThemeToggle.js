import React from 'react';
import { ThemeImage, ThemeToggleBall, ThemeToggleContainer, ThemeIcons } from '../styles/Nav';
import { IconContext } from "react-icons";
import iconMap from '../data/iconMap';


function ThemeToggle(props) {
  return (
    <ThemeToggleContainer
      onClick={() => {
        props.onClick()
      }}
    >
      <ThemeIcons>
        <IconContext.Provider value={{ style: { fontSize: '14px' } }}>
          <ThemeImage>{iconMap['Moon']}</ThemeImage>
          <ThemeImage>{iconMap['Sun']}</ThemeImage>
        </IconContext.Provider>
      </ThemeIcons>
      <ThemeToggleBall />
    </ThemeToggleContainer>
  )
}

export default ThemeToggle;