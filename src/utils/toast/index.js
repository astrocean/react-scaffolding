import style from './toast.module.css';
let timer=null;
let toast=null;
var Toast={
  show:(text, timeout, options)=>{
      var _timeout = timeout || 3000;
      timer&&clearTimeout(timer);
      if(toast){
        document.body.removeChild(toast);
      }
      timer=null;
      toast=null;

      toast = document.createElement('div');
      toast.classList.add(`${style.react_scaffolding_toast}`);
      let content = document
          .createTextNode(text||'');
      toast.appendChild(content);
      toast.style.animationDuration = _timeout / 1000 + 's';

      for (let prop in options) {
          toast.style[prop] = options[prop];
      }

      document.body.appendChild(toast);
      timer=setTimeout(function () {
          document.body.removeChild(toast);
          timer=null;
          toast=null;
      }, _timeout);
  }
};
export default  Toast;
