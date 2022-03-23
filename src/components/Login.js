import {
  Button,
  TextField,
  Box,
  CardContent,
  Card,
  Typography,
} from "@mui/material";
import React from "react";
import Center from "./Center";
import useForm from "../hooks/useForm";
import useStateContext from "../hooks/useStateContext";
import { createEndpoint, ENDPOINTS } from "../api";

const getFreshModel = () => ({
  name: "",
  email: "",
});
function Login() {
  const { values, errors, setErrors, handleInputChange } =
    useForm(getFreshModel);

  const { setContext } = useStateContext();

  const validate = () => {
    let temp = {};
    temp.email = /\S+@\S+\.\S+/.test(values.email) ? "" : "Email is not valid.";
    temp.name = values.name !== "" ? "" : "This field is required.";
    setErrors(temp);
    return Object.values(temp).every((x) => x === "");
  };

  const login = (e) => {
    e.preventDefault();
    if (validate())
      createEndpoint(ENDPOINTS.participant)
        .post(values)
        .then((res) => {
          setContext({ participantId: res.data.participantId });
        })
        .catch((e) => console.log(e));
  };

  return (
    <Center>
      <Card sx={{ width: 400 }}>
        <CardContent sx={{ textAlign: "center" }}>
          <Typography variant="h3" sx={{ my: 3 }}>
            Quiz App
          </Typography>
          <Box
            sx={{
              "& .MuiTextField-root": {
                margin: 1,
                width: "90%",
              },
            }}
          >
            <form noValidate onSubmit={login}>
              <TextField
                label="Email"
                name="email"
                value={values.email}
                variant="outlined"
                {...(errors.email && { error: true, helperText: errors.email })}
                onChange={handleInputChange}
              />
              <TextField
                label="Name"
                name="name"
                variant="outlined"
                value={values.name}
                {...(errors.name && { error: true, helperText: errors.name })}
                onChange={handleInputChange}
              />
              <Button
                type="submit"
                variant="contained"
                size="large"
                sx={{ width: "90%" }}
              >
                Start
              </Button>
            </form>
          </Box>
        </CardContent>
      </Card>
    </Center>
  );
}

export default Login;
