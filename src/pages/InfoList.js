import React from "react";
import {
  List  
} from "react-virtualized";
import list from "./data";

// Array of images with captions
//const list = [{image: 'http://...', title: 'Foo'}];

// We need to make sure images are loaded from scratch every time for this demo
const noCacheList = list.map((item, index) => ({
  title: index + ". " + item.title,
  image: item.image + (item.image ? "?noCache=" + Math.random() : "")
}));

export default class Index extends React.Component {
  state = { images: noCacheList };

  colListRef = null;
  
  rowRenderer({ 
    key,         // Unique key within array of rows
    index,       // Index of row within collection
    isScrolling, // The List is currently being scrolled
    isVisible,   // This row is visible within the List (eg it is not an overscanned row)
    style     
  }) {
    const item= noCacheList[index];
   

    return (
      <div style={style}  index={index} key={key}>
          <img
            src={item.image}
            alt={item.title}
            style={{
              height: 80,
              width: 1080/4
            }}
          />
          <span>{item.title}</span>
        </div>
    );
  }

  setColList = node => (this.colListRef = node);
  render() {
    return (
      <div>
         <List
          width={1080}
          height={300}
          rowCount={noCacheList.length}
          rowHeight={100}
          rowRenderer={this.rowRenderer}
        />
      </div>
    );
  }
}
