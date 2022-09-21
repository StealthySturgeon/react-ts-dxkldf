import * as React from 'react';
import './style.css';
import {
  AutoSizer,
  CellMeasurer,
  CellMeasurerCache,
  Grid,
  InfiniteLoader,
} from 'react-virtualized';
import { faker } from '@faker-js/faker';
import 'react-virtualized/styles.css'; // only needs to be imported once

const columnCount = 2;

const data = new Array(100).fill(0).map((_) => ({
  image: faker.image.people(640, 480, true),
  name: faker.name.fullName(),
  title: faker.name.jobTitle(),
  city: faker.address.cityName(),
  zipcode: faker.address.zipCode(),
}));

const Card = ({
  image,
  name,
  title,
  city,
  zipcode,
  onLoad,
}: {
  image: string;
  name: string;
  title: string;
  city: string;
  zipcode: string;
  onLoad: React.ReactEventHandler;
}) => {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        border: '1px solid green',
        height: '100%',
      }}
    >
      <img src={image} onLoad={onLoad} />
      <div>{name}</div>
      <div>{title}</div>
      <div>{city}</div>
      <div>{zipcode}</div>
    </div>
  );
};

const cache = new CellMeasurerCache({
  fixedWidth: true,
  defaultHeight: 100,
  minHeight: 75,
});

function cellRenderer({ columnIndex, key, parent, rowIndex, style }) {
  return (
    <CellMeasurer
      cache={cache}
      columnIndex={columnIndex}
      key={key}
      parent={parent}
      rowIndex={rowIndex}
    >
      {({ registerChild, measure }) => (
        <div
          style={{
            ...style,
            whiteSpace: 'nowrap',
          }}
        >
          <Card
            {...data[rowIndex * columnCount + columnIndex]}
            onLoad={measure}
          />
        </div>
      )}
    </CellMeasurer>
  );
}

export default function App() {
  return (
    <div
      style={{
        backgroundColor: 'red',
        height: '100vh',
        width: '100vw',
      }}
    >
      <AutoSizer>
        {({ height, width }) => (
          <Grid
            cellRenderer={cellRenderer}
            columnCount={columnCount}
            columnWidth={700}
            deferredMeasurementCache={cache}
            height={height}
            rowCount={Math.ceil(data.length / columnCount)}
            rowHeight={cache.rowHeight}
            width={width}
          />
        )}
      </AutoSizer>
    </div>
  );
}
