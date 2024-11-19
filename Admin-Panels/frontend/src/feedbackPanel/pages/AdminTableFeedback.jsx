import React, { useState, useEffect } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Rating from "@mui/material/Rating";
import TextField from "@mui/material/TextField";
import SearchIcon from "@mui/icons-material/Search";
import InputAdornment from "@mui/material/InputAdornment";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const defaultTheme = createTheme();

export default function FeedbackTable() {
  const [feedbackList, setFeedbackList] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchFeedback = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/user/getfeedback"
        );
        setFeedbackList(response.data);
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchFeedback();
  }, []);

  const filteredFeedbackList = feedbackList.filter((feedback) =>
    feedback.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container>
        <div style={{ textAlign: "center", margin: "20px 0" }}>
          <Typography variant="h4" component="h1" gutterBottom>
            FEEDBACK CORNER
          </Typography>
         
        </div>
        <Grid container spacing={3}>
          {filteredFeedbackList.map((feedback, index) => (
            <Grid item xs={12} sm={8} md={12} key={index}>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Card>
                  <CardContent>
                    <Typography variant="h6">
                      {feedback.firstName} {feedback.lastName}
                    </Typography>
                    <Typography gutterBottom>
                      Rating:{" "}
                      <Rating
                        name="read-only"
                        value={feedback.rating}
                        readOnly
                      />
                    </Typography>
                    <Typography gutterBottom>
                      Date:{" "}
                      {new Date(feedback.date).toLocaleDateString()}
                    </Typography>
                    <Typography>{feedback.description}</Typography>
                  </CardContent>
                </Card>
              </motion.div>
            </Grid>
          ))}
        </Grid>
      </Container>
    </ThemeProvider>
  );
}
