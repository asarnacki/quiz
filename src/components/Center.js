/* eslint-disable react/prop-types */
import React from "react";
import { Grid } from "@mui/material";

function Center(props) {
  return (
    <Grid
      container
      direction="column"
      alignItems="center"
      justifyContent="center"
      sx={{ minHeight: "100vh" }}
    >
      <Grid item sx={{ my: 1 }}>
        {props.children}
      </Grid>
    </Grid>
  );
}

export default Center;
