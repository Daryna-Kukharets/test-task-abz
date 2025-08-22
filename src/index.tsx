import React from "react";
import { createRoot } from 'react-dom/client';
import { App } from './App';
import './styles/import.scss';

import favicon from "./assets/icons/favicon.svg";

const setFavicon = (faviconUrl: string) => {
  let link: HTMLLinkElement | null = document.querySelector("link[rel*='icon']");
  
  if (link) {
    link.href = faviconUrl;
  } else {
    link = document.createElement('link');
    link.rel = 'icon';
    link.type = 'image/svg+xml';
    link.href = faviconUrl;
    document.getElementsByTagName('head')[0].appendChild(link);
  }
};

setFavicon(favicon);

const container = document.getElementById('root');
const root = createRoot(container!);
root.render(<App />);