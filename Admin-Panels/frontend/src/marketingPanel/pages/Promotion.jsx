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
import MenuItem from "@mui/material/MenuItem";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const defaultTheme = createTheme();

export default function Promotion() {
  const [formData, setFormData] = useState({
    promotionName: "",
    promotionKey: "",
    startDate: "",
    endDate: "",
    userEmail: "",
    number: "",
    promotionType: "",
    description: "",
    imageName: "",
    imageBase64: null,
  });

  const handleChange = async (e) => {
    const { name, value } = e.target;
    if (e.target.type === "file") {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        setFormData((prevData) => ({
          ...prevData,
          imageName: file.name,
          imageBase64: reader.result.split(",")[1],
        }));
      };
    } else {
      if (name === "number" && !/^\d+$/.test(value)) {
        return;
      }
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      for (const key in formData) {
        if (formData[key] === "") {
          toast.error("Please fill out all required fields");
          return;
        }
      }

      if (!isStrongPromotionKey(formData.promotionKey)) {
        toast.error("Promotion Key must be at least 8 characters long and contain letters, numbers, and special characters.");
        return;
      }

      if (!isValidEmail(formData.userEmail)) {
        toast.error("Please enter a valid email address");
        return;
      }

      if (!isValidPhoneNumber(formData.number)) {
        toast.error("Please enter a valid phone number with exactly 10 digits.");
        return;
      }

      const startDate = new Date(formData.startDate);
      const currentDate = new Date();
      if (startDate < currentDate) {
        toast.error("Start date cannot be a past date");
        return;
      }

      const endDate = new Date(formData.endDate);
      if (startDate >= endDate) {
        toast.error("Start date must be before end date");
        return;
      }

      const response = await axios.post(
        "http://localhost:5000/api/userpromo/createpromotions",
        formData
      );
      console.log("Response:", response.data);
      setFormData({
        promotionName: "",
        promotionKey: "",
        startDate: "",
        endDate: "",
        userEmail: "",
        promotionType: "",
        description: "",
        number: "",
        imageName: "",
        imageBase64: null,
      });
      toast.success("Form submitted successfully!");
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const isStrongPromotionKey = (key) => {
    const regex = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return regex.test(key);
  };

  const isValidEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const isValidPhoneNumber = (phoneNumber) => {
    return /^\d{10}$/.test(phoneNumber);
  };

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
          <Typography component="h1" variant="h5">
            Special Offer Form
          </Typography>
          
          <Paper elevation={3} style={{ padding: 20, marginTop: 20 }}>
            <Box
              component="form"
              sx={{ mt: 3 }}
              onSubmit={handleSubmit}
              noValidate
            >
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id="promotionName"
                    label="Promotion Name"
                    name="promotionName"
                    value={formData.promotionName}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id="promotionKey"
                    label="Promotion Key"
                    name="promotionKey"
                    value={formData.promotionKey}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    fullWidth
                    id="startDate"
                    label="Start Date"
                    name="startDate"
                    type="date"
                    value={formData.startDate}
                    onChange={handleChange}
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    fullWidth
                    id="endDate"
                    label="End Date"
                    name="endDate"
                    type="date"
                    value={formData.endDate}
                    onChange={handleChange}
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id="userEmail"
                    type="email"
                    label="User Email"
                    name="userEmail"
                    value={formData.userEmail}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id="number"
                    label="Phone Number"
                    name="number"
                    value={formData.number}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    select
                    fullWidth
                    id="promotionType"
                    label="Offer Type"
                    name="promotionType"
                    value={formData.promotionType}
                    onChange={handleChange}
                  >
                    <MenuItem value="Individual">Individual</MenuItem>
                    <MenuItem value="Group">Group</MenuItem>
                  </TextField>
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id="description"
                    label="Description"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    margin="normal"
                    fullWidth
                    id="imageBase64"
                    name="imageBase64"
                    type="file"
                    inputProps={{ accept: "image/*" }}
                    onChange={handleChange}
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
            </Box>
          </Paper>
          <Button
            variant="contained"
            color="primary"
            href="/marketingPanel/promotionTable"
            style={{
              position: "absolute",
              top: "70px",
              right: "80px",
            }}
          >
            View All Promotions
          </Button>
          <ToastContainer />
        </Box>
      </Container>
    </ThemeProvider>
  );
}
