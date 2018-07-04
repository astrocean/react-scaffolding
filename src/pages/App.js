import React, { Component } from 'react';
import logo from './logo.svg';
import'./App.css';
import styles from './Base.module.css';
import sassStyles from './Sass.module.scss';
import Utils from '../utils';

class App extends Component {
  componentDidMount(){
    Utils.Toast.show('render');
  }
  render() {
    var log=()=>{
      console.log('test arrow function');
    }
    log();
    
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p className={`${styles.color_red} ${sassStyles.bg_color_yellow}`}>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="#/a"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
          <button
           style={{
            padding:'20px'
          }}
            onClick={()=>{
              Utils.Popover.show(<div style={{
                color:'white'
              }}>popover</div>);
            }}
          >
            show popover
          </button>
          <div
            style={{
              color:'white'
            }}
          >
          日期是否存在safri兼容性问题？
            {
              Utils.Base.formatDate(new Date())
            }
          </div>
        </header>
      </div>
    );
  }
}

export default App;
