import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

/**
 * ReactDOM.createRoot: 
 * HTML의 <div id="root"></div> 요소를 찾아 그 안에 React 앱을 렌더링합니다.
 */
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
