import React from "react";
import {
  CellMeasurer,
  CellMeasurerCache,
  createMasonryCellPositioner,
  Masonry
} from "react-virtualized";
import ImageMeasurer from "react-virtualized-image-measurer";
import list from "./data";

// Array of images with captions
//const list = [{image: 'http://...', title: 'Foo'}];

// We need to make sure images are loaded from scratch every time for this demo
const noCacheList = list.map((item, index) => ({
  title: index + ". " + item.title,
  image: item.image + (item.image ? "?noCache=" + Math.random() : "")
}));

const keyMapper = (item, index) => item.image || index;

const columnWidth = 200;
const defaultHeight = 250;
const defaultWidth = columnWidth;

// Default sizes help Masonry decide how many images to batch-measure
const cache = new CellMeasurerCache({
  defaultHeight,
  defaultWidth,
  fixedWidth: true
});
// Our masonry layout will use 3 columns with a 10px gutter between
const cellPositionerConfig = {
  cellMeasurerCache: cache,
  columnCount: 3,
  columnWidth,
  spacer: 10
};

// Our masonry layout will use 3 columns with a 10px gutter between
const cellPositioner = createMasonryCellPositioner({
  cellMeasurerCache: cache,
  columnCount: 3,
  columnWidth,
  spacer: 10
});

const MasonryComponent = ({ itemsWithSizes , setRef }) => {

  function cellRenderer({ index, key, parent, style }) {
    const { item, size } = itemsWithSizes[index];
    const height = columnWidth * (size.height / size.width) || defaultHeight;

    return (
      <CellMeasurer cache={cache} index={index} key={key} parent={parent}>
        <div style={style}>
          <img
            src={item.image}
            alt={item.title}
            style={{
              height: height,
              width: columnWidth
            }}
          />
          <h4>{item.title}</h4>
        </div>
      </CellMeasurer>
    );
  }

  return (
    <Masonry
      cellCount={itemsWithSizes.length}
      cellMeasurerCache={cache}
      cellPositioner={cellPositioner}
      cellRenderer={cellRenderer}
      height={600}
      width={800}
      ref={setRef}
    />
  );
};

export default class Index extends React.Component {
  state = { images: noCacheList };

  masonryRef = null;

  // this shows how to significantly change the input array, if items will be only appended this recalculation is not needed
  shorten = () => {
    cache.clearAll();
    cellPositioner.reset(cellPositionerConfig);
    this.masonryRef.clearCellPositions();
    this.setState({ images: [...this.state.images.slice(1)] });
  };

  setMasonry = node => (this.masonryRef = node);
  render() {
    return (
      <div>
        <button onClick={this.shorten}>Resize</button>
        <ImageMeasurer
          items={this.state.images}
          image={item => item.image}
          keyMapper={keyMapper}
          onError={(error, item, src) => {
            console.error(
              "Cannot load image",
              src,
              "for item",
              item,
              "error",
              error
            );
          }}
          defaultHeight={defaultHeight}
          defaultWidth={defaultWidth}
        >
          {({ itemsWithSizes }) => (
            <MasonryComponent
              setRef={this.setMasonry}
              itemsWithSizes={itemsWithSizes}
            />
          )}
        </ImageMeasurer>
      </div>
    );
  }
}
