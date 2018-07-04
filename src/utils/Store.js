/**
 * 存储权重
 * 溢出自动移除权重低的内容
 * 
 * 
 * 
 */

const WEIGHT={
   _STORE_PRIVATE:99,
   SYSTEM:90,
   USER:80,
   FEATURES:70,
   LOG:60
}

var _store=localStorage;

class WeightStore{
  constructor(props={
    keysName:'__KEY_MAP'
  }){
    this.WEIGHT=WEIGHT;
    this.keysName=props.keysName;
    this.props=props;
  }

  async get(key){
    return await _store.getItem(key);
  }

  isQuotaExceeded(e){
    if(
      (e instanceof window.DOMException)
      && (
        // everything except Firefox
          e.code === 22 ||
          // Firefox
          e.code === 1014 ||
          // test name field too, because code might not be present
          // everything except Firefox
          e.name === 'QuotaExceededError' ||
          // Firefox
          e.name === 'NS_ERROR_DOM_QUOTA_REACHED'
        ) 
      // acknowledge QuotaExceededError only if there's something already stored
      && _store.length !== 0){
      return true;
    }
    return false;
  }


  async _set(key,val,quotaExceededCallback=async ()=>{
    return false;
  }){
    try{
      _store.setItem(key,val);
      return true;
    }catch(e){
      if(this.isQuotaExceeded(e)){
        return await quotaExceededCallback();
      }else{
        return false;
      }
    }
  }
  
  /**
   * 
   * @param {string} key 
   * @param {string} val 
   * @param {object} param 
   *    {bool} params.autoReSaveQuotaExceeded 溢出自动重试保存
   */
  async set(key,val,params={
    weight:this.WEIGHT.USER,
    autoReSaveQuotaExceeded:true
  }){ 
    console.log(key);
    let quotaExceededCallback=async ()=>{
      //只剩keymap了
      if(_store.length===1){
        return false;
      }
      if(params.autoReSaveQuotaExceeded){
        return await this.removeItems().then((result)=>{
          if(!result){
            return false;
          }
          return  this.set(key,val,params);
        });
      }
      return false;
    }

    if(key!==this.keysName){
      return await this.setKey({
        key,
        weight:params.weight
      }).then(()=>{
        return this._set(key,val,quotaExceededCallback)
      }).then((result)=>{
        if(!result&&key!==this.keysName){
          this.setKey({
            key,
            weight:params.weight,
            isRemove:true
          });
        }
        return result;
      });
    }

    return await this._set(key,val,quotaExceededCallback);
  } 
  
 
  async setKey(params={
    key:'',
    weight:this.WEIGHT.USER,
    isRemove:false
  }){
    if(params.key===this.keysName&&params.isRemove){
      return false;
    }

    return await this.get(this.keysName).then((value)=>{
      let keys={};

      if(!value){
        keys={
          [this.keysName]:{
            weight:this.WEIGHT._STORE_PRIVATE,
            update_time:new Date().getTime()
          }
        };
      }else{
        keys=JSON.parse(value);
      }

      if(params.isRemove){
        delete keys[params.key];
      }else{
        keys[params.key]={
          weight:params.weight,
          update_time:new Date().getTime()
        };
      }

      return this.set(this.keysName,JSON.stringify(keys));
    });
   
  }

   

   async removeItems(){ 
    return await this.get(this.keysName).then((value)=>{ 
      if(!value){
        return false;
      }

      let keys=JSON.parse(value);
      let keysArray=[];
      for(let key in keys){
        keysArray.push({
          key:key,
          ...keys[key]
        });
      }
       // 对需要排序的数字和位置的临时存储
       var mapped = keysArray.map((el, i)=>{
        return { index: i, value:el};
      });
    
      // 按照多个值排序数组
      mapped.sort((_keyA,_keyB)=>{
        let keyA={
          index:_keyA.index,
          ..._keyA.value
        };
        let keyB={
          index:_keyB.index,
          ..._keyB.value
        };

        let weightA=keyA.weight;
        let weightB=keyB.weight;

        if(weightA===weightB){ 
          return keyA.update_time===keyB.update_time?
                    (keyA.index>keyB.index?1:-1)
                    :keyA.update_time>keyB.update_time
                      ?1:-1;
        }
        if(weightA<weightB){
          return -1;
        }

        return 1;
      });

      // 根据索引得到排序的结果
      var result = mapped.map((el)=>{
        return keysArray[el.index];
      });

      this.del(result[0].key);
      return true;
    });
  }

  del(key){
    _store.removeItem(key);
    this.setKey({
      key:key,
      isRemove:true
    });
  }

  clear(){
    _store.clear(); 
  }
 }

//  var i=250;
//     let get=()=>{
//       Utils.Store.set('test'+i, new Array((i * 200) + 1).join('a'),{
//         weight:i<1000?Utils.Store.WEIGHT.SYSTEM:Utils.Store.WEIGHT.USER
//       }).then(()=>{
//         if(i<5000){
//           i+=250;
//           get();
//         }
//       });
     
//     }
//     get();
     

export default WeightStore;