import React, { useState, useEffect } from "react";
import axios from "axios";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import EditFeedbackDialog from "./EditTable";
import SearchIcon from "@mui/icons-material/Search";
import InputAdornment from "@mui/material/InputAdornment";
import TextField from "@mui/material/TextField";
import Rating from "@mui/material/Rating";
import Chart from "chart.js/auto";
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import Button from '@mui/material/Button';
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const defaultTheme = createTheme();

export default function FeedbackTable() {
  const [feedbackList, setFeedbackList] = useState([]);
  const [editingFeedback, setEditingFeedback] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchFeedback = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/user/getfeedback"
        );
        setFeedbackList(response.data);
        renderChart(response.data);
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchFeedback();
  }, []);

  const handleEdit = (feedback) => {
    setEditingFeedback(feedback);
  };

  const handleSave = (editedFeedback) => {
    const updatedList = feedbackList.map((feedback) =>
      feedback === editingFeedback ? editedFeedback : feedback
    );
    setFeedbackList(updatedList);
    setEditingFeedback(null);
  };

  const handleCancel = () => {
    setEditingFeedback(null);
  };

  const handleDelete = async (feedbackId) => {
    try {
      await axios.delete(
        `http://localhost:5000/api/user/deletefeedback/${feedbackId}`
      );
      const updatedList = feedbackList.filter(
        (feedback) => feedback._id !== feedbackId
      );
      setFeedbackList(updatedList);
      renderChart(updatedList);
      toast.success("Feedback successfully deleted.");
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const generatePDF = () => {
    const input = document.getElementById("feedback-table-container");
    if (!input) {
      console.error("Table container not found.");
      return;
    }
    html2canvas(input).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");
      const imgWidth = 210;
      const pageHeight = 297;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      let heightLeft = imgHeight;
      let position = 0;

      pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;

      while (heightLeft >= 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }

      pdf.save("feedback_table.pdf");
    });
  };

  const filteredFeedbackList = feedbackList.filter((feedback) =>
    feedback.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const renderChart = (data) => {
    const ratings = data.map((feedback) => feedback.rating);
    const ratingCounts = Array.from(
      { length: 5 },
      (_, i) => ratings.filter((rating) => rating === i + 1).length
    );

    const ctx = document.getElementById("ratingsChart");
    new Chart(ctx, {
      type: "doughnut",
      data: {
        labels: ["1 Star", "2 Stars", "3 Stars", "4 Stars", "5 Stars"],
        datasets: [
          {
            label: "Rating Distribution",
            data: ratingCounts,
            backgroundColor: [
              "rgba(255, 99, 132, 0.2)",
              "rgba(54, 162, 235, 0.2)",
              "rgba(255, 206, 86, 0.2)",
              "rgba(75, 192, 192, 0.2)",
              "rgba(153, 102, 255, 0.2)",
            ],
            borderColor: [
              "rgba(255, 99, 132, 1)",
              "rgba(54, 162, 235, 1)",
              "rgba(255, 206, 86, 1)",
              "rgba(75, 192, 192, 1)",
              "rgba(153, 102, 255, 1)",
            ],
            borderWidth: 3,
          },
        ],
      },
      options: {
        plugins: {
          legend: {
            display: false,
          },
          tooltip: {
            callbacks: {
              label: (context) => {
                const label = context.label || "";
                const value = context.raw || 0;
                const total = ratingCounts.reduce((acc, cur) => acc + cur, 0);
                const percentage = ((value / total) * 100).toFixed(2);
                return `${label}: ${percentage}%`;
              },
            },
          },
        },
        layout: {
          padding: {
            left: 20,
            right: 20,
            top: 20,
            bottom: 20,
          },
        },
      },
    });
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <ToastContainer />
      <div style={{ textAlign: 'center' }}>
        <Typography variant="h4" component="h1" gutterBottom>
          FEEDBACK CONTROL PANEL
        </Typography>
      </div>
      <TextField
        placeholder="Search by email"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
        }}
      />
      <Button
        variant="contained"
        color="primary"
        onClick={generatePDF}
        style={{ float: "right", margin: "10px" }}
      >
        Generate PDF
      </Button>

      <TableContainer
        id="feedback-table-container"
        sx={{ mt: "30px" }}
        component={Paper}
      >
        <Table sx={{ minWidth: 750 }} aria-label="feedback table">
          <TableHead sx={{ bgcolor: "#4793AF" }}>
            <TableRow>
              <TableCell style={{ width: "10%", fontWeight: "bold" }}>
                First Name
              </TableCell>
              <TableCell style={{ width: "10%", fontWeight: "bold" }}>
                Last Name
              </TableCell>
              <TableCell style={{ width: "15%", fontWeight: "bold" }}>
                Email
              </TableCell>
              <TableCell style={{ width: "15%", fontWeight: "bold" }}>
                Phone Number
              </TableCell>
              <TableCell style={{ width: "10%", fontWeight: "bold" }}>
                Rating
              </TableCell>
              <TableCell style={{ width: "15%", fontWeight: "bold" }}>
                Date
              </TableCell>
              <TableCell style={{ width: "15%", fontWeight: "bold" }}>
                Category
              </TableCell>
              <TableCell style={{ width: "10%", fontWeight: "bold" }}>
                Recommend
              </TableCell>
              <TableCell style={{ width: "40%", fontWeight: "bold" }}>
                Description
              </TableCell>
              <TableCell style={{ width: "10%", fontWeight: "bold" }}>
                {/* Action */}
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredFeedbackList.map((feedback, index) => (
              <TableRow key={index}>
                <TableCell>{feedback.firstName}</TableCell>
                <TableCell>{feedback.lastName}</TableCell>
                <TableCell>{feedback.email}</TableCell>
                <TableCell>{feedback.phone_no}</TableCell>
                <TableCell>
                  <Rating name="read-only" value={feedback.rating} readOnly />
                </TableCell>
                <TableCell>
                  {new Date(feedback.date).toLocaleDateString()}
                </TableCell>
                <TableCell>{feedback.category}</TableCell>
                <TableCell>{feedback.recommend}</TableCell>
                <TableCell>{feedback.description}</TableCell>
                <TableCell>
                  {editingFeedback === feedback ? (
                    <EditFeedbackDialog
                      feedback={feedback}
                      onSave={handleSave}
                      onClose={handleCancel}
                    />
                  ) : (
                    <>
                      <IconButton
                        color="primary"
                        aria-label="edit"
                        onClick={() => handleEdit(feedback)}
                      >
                        <EditIcon />
                      </IconButton>
                      <IconButton
                        color="secondary"
                        aria-label="delete"
                        onClick={() => handleDelete(feedback._id)}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <div
        style={{ width: "500px", margin: "50px auto", position: "relative" }}
      >
        <canvas id="ratingsChart"></canvas>
        <div
          style={{
            position: "absolute",
            top: "50%",
            right: "-200px",
            transform: "translateY(-50%)",
            textAlign: "center",
            fontWeight: "bold",
            padding: "10px",
            fontSize: "20px",
          }}
        >
          {feedbackList.length > 0 &&
            Array.from({ length: 5 }, (_, i) => (
              <div key={i}>
                <span style={{ color: Chart.defaults.color[i] }}>
                  {i + 1} Star
                </span>{" "}
                -{" "}
                {(
                  (feedbackList.filter((feedback) => feedback.rating === i + 1)
                    .length /
                    feedbackList.length) *
                  100
                ).toFixed(2)}
                %
              </div>
            ))}
        </div>
      </div>
    </ThemeProvider>
  );
}
