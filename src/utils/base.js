import querystring from 'querystring';
 

var base={
  /**
   * 
   * 
   * @param {Object} obj     - e.g. var  b={a:{b:{c:{}}}}  
   * @param {String} linkStr - e.g 'a.b[c]'
   * @returns obj.prop or undefined or null or 0  - e.g b.a.b.c
   */
  getPropertyFromLinkStr(obj,linkStr){
    var linkArray=linkStr.split(/\.|\[|\]/);
    let prop=obj[linkArray[0]];
    if(!prop){
      return prop;
    }
    for(var i=1;i<linkArray.length;i++){
      prop=prop[linkArray[i]];
      if(!prop){
        return prop;
      }
    }
    return prop;
  },
  /**
   * @param {Object}  customOptions
   * @property {Boolean}  customOptions.isFormType  - is or not form
   * @property {Boolean}  customOptions.returnText  - response return a string
   */
  interface:async (url,params,customOptions={})=>{
    let fetchOptions={
      apiURL:'',
      credentials:'include',
      method: 'POST',
      headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
      },
      body: typeof(params) === 'string'?params:querystring.stringify(params)
    };

    Object.assign(fetchOptions,customOptions);

    if(fetchOptions.method==='GET'||fetchOptions.isFormType){
      delete fetchOptions.headers;
    }

    let _url=fetchOptions.apiURL+url;
    if(fetchOptions.method==='GET'){
      delete fetchOptions.body;
      let _params=querystring.stringify(params);
      _url+=_params?`?${_params}`:'';
    }
    
    if(fetchOptions.isFormType){
      var form = new FormData();
      let appendArrayToForm=(key,arr)=>{
        if(arr.length>1){
          arr.forEach((item)=>{
            form.append(`${key}[]`,item);
          });
        }else{
          form.append(`${key}`,arr[0]);
        }
      }
      for(let key in params){
        let valueType=Object.prototype.toString.call(params[key]);
        if(valueType==='[object Array]'){
          appendArrayToForm(key,params[key]);
        }else{
          form.append(key,params[key]);
        }
      }
      fetchOptions.body=form;
    }
    let result=await fetch(_url,fetchOptions).then((res)=>{
      if(!res.ok){
        return Promise.reject({
          responseFaild:true,
          message:'远程访问出错'+res.status
        });
      }
      if(fetchOptions.returnText){
        return res.text();
      }else{
        return res.json();
      }
    }).catch((e)=>{
      let message=e.message;
      if(!e.responseFaild){
        message='解析数据出错'+e.message;
      }
      return Promise.reject(message);
    });

    return result;
  },
  /**
   * @param {Date} or {Number} param1 
   * @param {String} param2  -'yyyy-MM-dd HH:mm:ss'
   */
  formatDate:(...params)=>{
    var date = params[0];
    var format = params[1] || "yyyy-MM-dd HH:mm:ss";
    if (typeof date === "number") {
      date = new Date(date*1000);
    }
    var paddNum =(num)=>{
      num += "";
      return num.replace(/^(\d)$/, "0$1");
    }
    var config = {
      yyyy : date.getFullYear(),
      yy : date.getFullYear().toString().substring(2),
      M  : date.getMonth() + 1,
      MM : paddNum(date.getMonth() + 1),
      d  : date.getDate(),
      dd : paddNum(date.getDate()),
      HH : paddNum(date.getHours()),
      mm : paddNum(date.getMinutes()),
      ss : paddNum(date.getSeconds())
    }
    return format.replace(/([a-z])(\1)*/ig, function(m){return config[m];});
  }
};

export default base;