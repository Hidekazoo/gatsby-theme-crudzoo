import * as React from 'react';
import styled from 'styled-components';
const { ThemeToggler } = require('gatsby-plugin-dark-mode');

const DarkModeLabel = styled.label`
  text-align: right;
  margin: 15px 0;
  display: block;
  color: var(--textNormal);
`;

const ToggleDarkMode: React.FC = () => {
  return (
    <ThemeToggler>
      {({ theme, toggleTheme }: { theme: string; toggleTheme: any }) => (
        <DarkModeLabel>
          <input
            type="checkbox"
            onChange={e => toggleTheme(e.target.checked ? 'dark' : 'light')}
            checked={theme === 'dark'}
          />{' '}
          Dark Mode
        </DarkModeLabel>
      )}
    </ThemeToggler>
  );
};

export default ToggleDarkMode;
