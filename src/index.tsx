import React from "react";
import { createRoot } from 'react-dom/client';
import { App } from './App';
import './styles/import.scss';

import favicon from "./assets/icons/favicon.svg";

const link: HTMLLinkElement | null = document.querySelector("link[rel*='icon']");
if (link) {
  link.href = favicon; // Webpack підставить правильний шлях з хешем
}

const container = document.getElementById('root');
const root = createRoot(container!);
root.render(<App />);