import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';
import { App } from './App';
import reportWebVitals from './reportWebVitals';
import state, {
  subscribe,
  changeSelectedOrder,
  changePoint,
} from './redux/store';

const root = ReactDOM.createRoot(document.getElementById('root'));
let renderTree = (state) => {
  root.render(
    <React.StrictMode>
      <App 
        appState={state}
        changeSelectedOrder={changeSelectedOrder}
        changePoint={changePoint}
      />
    </React.StrictMode>
  )
}

renderTree(state)

subscribe(renderTree)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
