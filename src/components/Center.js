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
      <Grid item sx={1}>{props.children}
      </Grid>
    </Grid>
  );
}

export default Center;
