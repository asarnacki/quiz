/* eslint-disable no-unused-vars */
import React from "react";
import useStateContext from "../hooks/useStateContext";
import { useEffect } from "react";
import { createEndpoint, ENDPOINTS } from "../api/index.js";
import { useState } from "react";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  Alert,
} from "@mui/material";
import { Box } from "@mui/system";
import { useNavigate } from "react-router";
import { Answer } from "./Answer";

export default function Result() {
  const { context, setContext } = useStateContext();
  const [score, setScore] = useState(0);
  const [qnAnswers, SetQnAnswers] = useState([]);
  const navigate = useNavigate();
  const [showAlert, setShowAlert] = useState(false);

  useEffect(() => {
    const ids = context.selectedOptions.map((x) => x.questionID);
    createEndpoint(ENDPOINTS.getAnswers)
      .post(ids)
      .then((res) => {
        const qnAns = context.selectedOptions.map((x) => ({
          ...x,
          ...res.data.find((y) => y.questionID == x.questionID),
        }));
        SetQnAnswers(qnAns);
        calculateScore(qnAns);
      })
      .catch((err) => console.log(err));
  }, []);

  const calculateScore = (qnAns) => {
    let tempScore = qnAns.reduce((acc, curr) => {
      return curr.answer == curr.selected ? acc + 1 : acc;
    }, 0);
    setScore(tempScore);
  };

  const restart = () => {
    setContext({
      timeTaken: 0,
      selectedOptions: [],
    });
    navigate("/question");
  };

  const submit = () => {
    createEndpoint(ENDPOINTS.participant)
      .put(context.participantID, {
        participantID: context.participantID,
        score: score,
        timeTaken: context.timeTaken,
      })
      .then((res) => {
        setShowAlert(true);
        setTimeout(() => {
          setShowAlert(false);
        }, 5000);
      })
      .catch((e) => console.log(e));
  };

  return (
    <>
      <Card
        sx={{ mt: 5, display: "flex", width: "70%", maxwidth: 640, mx: "auto" }}
      >
        <Box sx={{ display: "flex", flexDirectiom: "column", flexGrow: 1 }}>
          <CardContent sx={{ flex: "1 0 auto", textAlign: "center" }}>
            <Typography variant="h4">Congrats </Typography>
            <Typography variant="h5" sx={{ fontWeight: 600 }}>
              Yous score is: {score}/5
            </Typography>
            <Typography variant="h5">
              It took you {context.timeTaken}sec
            </Typography>
            <Button
              variant="contained"
              sx={{ mx: 1 }}
              size="small"
              onClick={submit}
            >
              Submit
            </Button>
            <Button
              variant="contained"
              sx={{ mx: 1 }}
              size="small"
              onClick={restart}
            >
              Retry
            </Button>
            <Alert
              severity="success"
              variant="string"
              sx={{
                width: "60%",
                m: "auto",
                visibility: showAlert ? "visible" : "hidden",
              }}
            >
              Score updated
            </Alert>
          </CardContent>
        </Box>
        <CardMedia component="img" sx={{ width: 220 }} image="./result.png" />
      </Card>
      <Answer qnAnswers={qnAnswers} />
    </>
  );
}
