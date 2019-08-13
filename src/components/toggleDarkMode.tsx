import * as React from "react"
import styled from "../styles/styled"

const { ThemeToggler } = require("gatsby-plugin-dark-mode")

const ToggleSlider = styled.span`
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #282c35;
  -webkit-transition: 0.4s;
  transition: 0.4s;
  border-radius: 34px;
  &:before {
    position: absolute;
    content: "";
    height: 26px;
    width: 26px;
    left: 4px;
    bottom: 4px;
    background-color: #fff;
    transition: 0.4s;
    border-radius: 50%;
  }
`

const ToggleSwitch = styled.label`
  position: relative;
  display: inline-block;
  width: 60px;
  height: 34px;

  input {
    opacity: 0;
    width: 0;
    height: 0;

    &:checked + ${ToggleSlider} {
      background-color: #282c35;
      border: 1px solid hsla(0, 0%, 100%, 0.88);
    }
    &:focus + ${ToggleSlider} {
      box-shadow: 0 0 1px #2196f3;
    }

    &:checked + ${ToggleSlider}:before {
      -webkit-transform: translateX(26px);
      -ms-transform: translateX(26px);
      transform: translateX(26px);
    }
  }
`

const ThemeWrap = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
`
const ModeTitle = styled.div`
  color: var(--textNormal);
  margin-right: 1em;
  font-size: 20px;
`

const ToggleDarkMode: React.FC = () => {
  return (
    <ThemeToggler>
      {({ theme, toggleTheme }: { theme: string; toggleTheme: any }) => (
        <ThemeWrap>
          <ModeTitle>{theme === "dark" ? "dark" : "light"}</ModeTitle>
          <ToggleSwitch>
            <input
              type="checkbox"
              onChange={e => toggleTheme(e.target.checked ? "dark" : "light")}
              checked={theme === "dark"}
            />
            <ToggleSlider />
          </ToggleSwitch>
        </ThemeWrap>
      )}
    </ThemeToggler>
  )
}

export default ToggleDarkMode
