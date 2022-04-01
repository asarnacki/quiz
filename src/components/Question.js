import {
  Card,
  CardContent,
  CardHeader,
  List,
  ListItemButton,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { createEndpoint } from "../api";
import { ENDPOINTS } from "../api/";
import useStateContext from "../hooks/useStateContext";
import { useNavigate } from "react-router-dom";

function Question() {
  const [questions, setQuestions] = useState([]);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [timeTaken, setTimeTaken] = useState(0);
  const { context, setContext } = useStateContext();
  const navigate = useNavigate();
  let timer;

  const updateAnswer = (questionID, optionIndex) => {
    const temp = [...context.selectedOptions];
    temp.push({
      questionID,
      selected: optionIndex,
    });

    if (questionIndex < 4) {
      setContext({ selectedOptions: [...temp] });
      setQuestionIndex(questionIndex + 1);
    } else {
      setContext({ selectedOptions: [...temp], timeTaken });
      navigate("/result");
    }
  };

  const startTimer = () => {
    timer = setInterval(() => {
      setTimeTaken((prev) => prev + 1);
    }, 1000);
  };

  useEffect(() => {
    setContext({
      timeTaken: 0,
      selectedOptions: [],
    });
    createEndpoint(ENDPOINTS.question)
      .fetch()
      .then((res) => {
        setQuestions(res.data);
        console.log(res.data);
        startTimer();
      })
      .catch((e) => console.log(e));

    return () => {
      clearInterval(timer);
    };
  }, []);
  return questions.length !== 0 ? (
    <Card sx={{ maxWidth: 640, mx: "auto", mt: 10 }}>
      <CardHeader
        title={`Question ${questionIndex + 1} of 5`}
        action={<Typography>{`${timeTaken}sec`}</Typography>}
      ></CardHeader>
      <CardContent>
        <Typography variant="h6">
          {questions[questionIndex].question}
          <List>
            {questions[questionIndex].options.map((answer, index) => (
              <ListItemButton
                key={index}
                disableRipple
                onClick={() =>
                  updateAnswer(questions[questionIndex].questionID, index)
                }
              >
                <div>
                  {`${String.fromCharCode(65 + index)}. `}
                  {answer}
                </div>
              </ListItemButton>
            ))}
          </List>
        </Typography>
      </CardContent>
    </Card>
  ) : null;
}

export default Question;
