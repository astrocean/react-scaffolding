class Event{
  constructor(){
    this.events=[];
  }

  static generateTypes( types=[],beforeStr='',afterStr=''){
    var _types={};
    types.forEach((type)=>{
      let key=beforeStr?beforeStr+'_':'';
      key+=type;
      key+=beforeStr?'_'+afterStr:'';
      key.toUpperCase();
      _types[type.toUpperCase()]=key;
    });
    return _types;
  }

  on(type,handler=()=>{}){
    if(!this.events[type]){
      this.events[type]=[];
    }

    this.events[type].push(handler);
  }

  off(type,handler){
    if(!this.events[type]){
      return;
    }

    let index=this.events[type].indexOf(handler);
    if(index>-1){
      this.events[type].splice(index,1);
    }

    if(this.events[type].length===0){
      delete this.events[type];
    }
  }

  emit(type,event){
    if(!this.events[type]||this.events[type].length===0){
      return;
    }

    this.events.forEach((handler)=>{
      try{
        handler(event);
      }catch(e){

      }
    });
  }
}
 
export default Event;