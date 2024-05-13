import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { BrowserRouter, MemoryRouter as Router,} from 'react-router-dom';

import reportWebVitals from "./../src/main/webapp/reportWebVitals";
import SimpleReactLightbox from "simple-react-lightbox";
import  ThemeContext  from "./../src/main/webapp/context/ThemeContext"; 

ReactDOM.render(
  <SimpleReactLightbox>
    <BrowserRouter basename="/">
      <ThemeContext>
        <App />
      </ThemeContext>
    </BrowserRouter>
  </SimpleReactLightbox>,
  document.getElementById("root")
);
reportWebVitals();
