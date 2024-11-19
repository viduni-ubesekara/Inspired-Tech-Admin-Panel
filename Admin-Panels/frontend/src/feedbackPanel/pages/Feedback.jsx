import React, { useState } from "react";
import axios from "axios";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Rating from "@mui/material/Rating";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import FeedbackIcon from "@mui/icons-material/Feedback";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const defaultTheme = createTheme();

export default function FeedBack() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone_no: "",
    description: "",
    date: getCurrentDate(),
    category: "",
    rating: 0,
    recommend: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Validate input to allow only letters for first name and last name
    if (name === "firstName" || name === "lastName") {
      if (!/^[a-zA-Z]*$/.test(value)) {
        return;
      }
    }

    // Validate phone number to have exactly 10 digits
    if (name === "phone_no" && !/^\d{0,10}$/.test(value)) {
      return;
    }

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleRatingChange = (newValue) => {
    setFormData((prevData) => ({
      ...prevData,
      rating: newValue,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5000/api/user/feedback",
        formData
      );
      console.log("Response:", response.data);
      // Show success toast message
      toast.success("Feedback submitted successfully!", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      // Optionally, you can reset the form after successful submission
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        phone_no: "",
        description: "",
        date: getCurrentDate(),
        category: "",
        rating: 0,
        recommend: "",
      });
    } catch (error) {
      console.error("Error:", error);
    }
  };

  // Function to get current date in 'YYYY-MM-DD' format
  function getCurrentDate() {
    const now = new Date();
    const year = now.getFullYear();
    let month = now.getMonth() + 1;
    if (month < 10) {
      month = "0" + month;
    }
    let day = now.getDate();
    if (day < 10) {
      day = "0" + day;
    }
    return `${year}-${month}-${day}`;
  }

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="sm">
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Paper elevation={3} sx={{ p: 4, width: "100%" }}>
            <FeedbackIcon sx={{ fontSize: 60, color: "primary.main" }} />
            <div style={{ textAlign: 'center' }}>
              <Typography variant="h4" component="h1" gutterBottom>
                Share your Thoughts with us
              </Typography>
            </div>
            <div style={{ textAlign: 'center' }}>
              <Typography variant="h4" component="h1" gutterBottom>
                .............................
              </Typography>
            </div>

            <form onSubmit={handleSubmit}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    autoComplete="given-name"
                    name="firstName"
                    required
                    fullWidth
                    id="firstName"
                    label="First Name"
                    autoFocus
                    value={formData.firstName}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    fullWidth
                    id="lastName"
                    label="Last Name"
                    name="lastName"
                    autoComplete="family-name"
                    value={formData.lastName}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id="email"
                    type="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                    value={formData.email}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id="tel"
                    label="Phone Number"
                    name="phone_no"
                    autoComplete="phoneNumber"
                    value={formData.phone_no}
                    onChange={handleChange}
                    inputProps={{ maxLength: 10 }}
                    error={formData.phone_no.length !== 10}
                    helperText={
                      formData.phone_no.length !== 10
                        ? "Phone number must be exactly 10 digits"
                        : ""
                    }
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id="date"
                    label="Date"
                    type="date"
                    name="date"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    value={formData.date}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormControl fullWidth required>
                    <InputLabel id="category-label">Category</InputLabel>
                    <Select
                      labelId="category-label"
                      id="category"
                      value={formData.category}
                      label="Category"
                      name="category"
                      onChange={handleChange}
                    >
                      <MenuItem value="complement">Complement</MenuItem>
                      <MenuItem value="complaint">
                        Complaint
                      </MenuItem>
                      <MenuItem value="suggestions">Suggestions</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12}>
                  <Typography component="legend">Rating</Typography>
                  <Rating
                    name="rating"
                    value={formData.rating}
                    onChange={(event, newValue) => {
                      handleRatingChange(newValue);
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormControl fullWidth required>
                    <InputLabel id="recommend-label">
                      Would you recommend our site?
                    </InputLabel>
                    <Select
                      labelId="recommend-label"
                      id="recommend"
                      value={formData.recommend}
                      label="Would you recommend our site?"
                      name="recommend"
                      onChange={handleChange}
                    >
                      <MenuItem value="yes">Yes</MenuItem>
                      <MenuItem value="no">No</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12}>
                  <textarea
                    style={{
                      width: "100%",
                      minHeight: "150px",
                      resize: "vertical",
                    }}
                    placeholder="Feedback Description Maximum Characters: 5000"
                    aria-label="Feedback Description"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    required
                  />
                </Grid>
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Submit
              </Button>
            </form>
          </Paper>

          {/* Button at top-right corner */}
          <Button
            variant="contained"
            color="primary"
            href="/feedbackPanel/feedbackTable"
            style={{
              position: "absolute",
              top: "70px",
              right: "80px",
            }}
          >
            View All Feedbacks
          </Button>
        </Box>
      </Container>
      {/* Toast container for displaying success message */}
      <ToastContainer />
    </ThemeProvider>
  );
}
