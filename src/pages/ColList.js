import React from "react";
import {
  Grid 
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
  
  cellRenderer({ columnIndex, key, rowIndex, style }) {
    const item= noCacheList[rowIndex*4+columnIndex];
   

    return (
      <div style={style}  index={columnIndex} key={key} parent={rowIndex}>
          <img
            src={item.image}
            alt={item.title}
            style={{
              height: 80,
              width: 1080/4
            }}
          />
          <h4>{item.title}</h4>
        </div>
    );
  }

  setColList = node => (this.colListRef = node);
  render() {
    return (
      <div>
         <Grid
          cellRenderer={this.cellRenderer}
          height={600}
          width={800}
          columnWidth={1080/4}
          columnCount={4}
          fixedColumnCount={2}
          fixedRowCount={1}
          rowHeight={140}
          rowCount={noCacheList.length/4}
        />
      </div>
    );
  }
}
