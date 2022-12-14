import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';
import { App } from './App';
import reportWebVitals from './reportWebVitals';
import store from './redux/reduxStore';

const root = ReactDOM.createRoot(document.getElementById('root'));
let renderTree = (state) => {
  root.render(
    <React.StrictMode>
      <App 
        appState={state}
        dispatch={store.dispatch.bind(store)}
      />
    </React.StrictMode>
  )
}

renderTree(store.getState())

store.subscribe(() => {
  let state = store.getState()
  renderTree(state)
})

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
