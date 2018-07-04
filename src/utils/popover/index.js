
import React from 'react';
import {
  render,
} from 'react-dom';
import style from './popover.module.css';
let _popover=null;
var popover={
  show:(elem,params)=>{
      if(_popover){
        document.body.removeChild(_popover);
      }
      _popover=null;

      _popover = document.createElement('div');
      _popover.classList.add(`${style.react_scaffolding_popover}`);
      document.body.appendChild(_popover);

      render(<div onClick={()=>{
        if(params&&params.onClickWrapper){
          params.onClickWrapper();
        }else{
          document.body.removeChild(_popover);
          _popover=null;
        }
      }}>{elem}</div>,_popover);

      return {
        close:()=>{
          if(_popover){
            document.body.removeChild(_popover);
          }
          _popover=null;
        }
      };
  }
};
export default  popover;
