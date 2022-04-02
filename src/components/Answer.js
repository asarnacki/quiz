/* eslint-disable react/prop-types */
import React, { useState } from "react";
import { Box, List, ListItem } from "@mui/material";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Typography,
} from "@mui/material";
import ExpandCircleDownIcon from "@mui/icons-material/ExpandCircleDown";
import { green, red } from "@mui/material/colors";

// eslint-disable-next-line react/prop-types
export function Answer({ qnAnswers }) {
  const [expanded, setExpaned] = useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpaned(isExpanded ? panel : false);
  };

  const markCorrectOrNot = (question, idx) => {
    if (question.answer == idx) return { sx: { color: green[500] } };
    else if (question.selected == idx) return { sx: { color: red[500] } };

    // return { sx: { color: question.answer == idx ? green[500] : red[500] } };
  };

  return (
    <Box sx={{ mt: 5, width: "70%", maxWitdh: 640, mx: "auto" }}>
      {qnAnswers.map((item, i) => (
        <Accordion
          disableGutters
          key={i}
          expanded={expanded === i}
          onChange={handleChange(i)}
        >
          <AccordionSummary
            expandIcon={
              <ExpandCircleDownIcon
                sx={{
                  color: item.answer == item.selected ? green[500] : red[500],
                }}
              />
            }
          >
            <Typography sx={{ width: "90%", flexShrink: 0 }}>
              {item.question}
            </Typography>
          </AccordionSummary>

          <AccordionDetails>
            <List>
              {item.options.map((x, y) => (
                <ListItem key={y}>
                  <Typography {...markCorrectOrNot(item, y)}>
                    {String.fromCharCode(65 + y)}. {x}
                  </Typography>
                </ListItem>
              ))}
            </List>
          </AccordionDetails>
        </Accordion>
      ))}
    </Box>
  );
}
