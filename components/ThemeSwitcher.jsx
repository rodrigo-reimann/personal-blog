import React, { useEffect, useState } from 'react';
import useDarkSide from '@/hooks/useDarkSide';
import { DarkModeSwitch } from 'react-toggle-dark-mode';

export default function ThemeSwitcher() {
  const [theme, setTheme] = useDarkSide(); // Obtaining the current theme from useDarkSide
  const [darkSide, setDarkSide] = useState(theme === 'dark');

  useEffect (() => {
    setDarkSide(theme === 'dark') // setDarkSide equals true IF theme equals dark
  }, [theme]);

  const toggleDarkMode = checked => {
    setTheme(checked ? 'dark' : 'light'); // Setting the theme based on checked value
  };

  return (
    <div>
      <DarkModeSwitch checked={darkSide} onChange={toggleDarkMode} size={24} moonColor='white' sunColor='white'/>
    </div>
  );
}
