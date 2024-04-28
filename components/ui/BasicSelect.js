import * as React from "react";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

export default function SelectLabels(props) {
  const handleStatusChange = (event) => {
    props.setStatus(event.target.value);
  };

  const handlePriceRangeChange = (event) => {
    props.setPriceRange(event.target.value);
  };

  return (
    <div>
      <FormControl
        sx={{ m: 1, minWidth: 120, bgcolor: "white", borderRadius: "9px" }}
      >
        <Select value={props.status} onChange={handleStatusChange} displayEmpty>
          <MenuItem value={""}>Status (All)</MenuItem>
          <MenuItem value={"Active"}>Active</MenuItem>
          <MenuItem value={"Sold"}>Sold</MenuItem>
          <MenuItem value={"Closed"}>Closed</MenuItem>
        </Select>
      </FormControl>
      <FormControl
        sx={{ m: 1, minWidth: 120, bgcolor: "white", borderRadius: "9px" }}
      >
        <Select value={props.priceRange} onChange={handlePriceRangeChange} displayEmpty>
          <MenuItem value={""}>$ Price (All)</MenuItem>
          <MenuItem value={"upTo5k"}>0 - 5,000</MenuItem>
          <MenuItem value={"upTo10k"}>5,000 - 10,000</MenuItem>
          <MenuItem value={"upTo20k"}>10,000 - 20,000</MenuItem>
          <MenuItem value={"upTo50k"}>20,000 - 50,000</MenuItem>
          <MenuItem value={"upTo100k"}>50,000 - 100,000</MenuItem>
          <MenuItem value={"moreThan100k"}>100,000+</MenuItem>
        </Select>
      </FormControl>
    </div>
  );
}
