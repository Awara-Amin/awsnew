import React, { useState } from 'react';
import Paper from '@material-ui/core/Paper';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';

export default function TabProduct() {
  const [value, setValue] = useState(0);
  return (
    <div
    className="tab-color"
    >
      <Paper square>
        <Tabs
          
          value={value}
           textColor="#179519"
          indicatorColor="secondary"
          onChange={(event, newValue) => {
            setValue(newValue);
          }}
        >
          <Tab label="Product Details" active/>
          <Tab label="About the Author" />
        </Tabs>
        <h3>TAB NO: {value} clicked!</h3>
      </Paper>
    </div>
  );
}
