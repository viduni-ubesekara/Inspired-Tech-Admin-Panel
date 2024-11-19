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
import SearchIcon from "@mui/icons-material/Search";
import InputAdornment from "@mui/material/InputAdornment";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import EditPromotionDialog from "./EditTable"; // Correct import
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { motion } from "framer-motion";

const defaultTheme = createTheme();

export default function Promotion() {
  const [promotions, setPromotions] = useState([]);
  const [editPromotion, setEditPromotion] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [editSuccess, setEditSuccess] = useState(false);
  const [deleteSuccess, setDeleteSuccess] = useState(false);
  const [deleteConfirmation, setDeleteConfirmation] = useState(false);
  const [deleteId, setDeleteId] = useState("");

  const generatePDF = () => {
    const input = document.getElementById("promotion-table-container");
    if (!input) {
      console.error("Table container not found.");
      return;
    }
    html2canvas(input).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");
      const imgWidth = 210; // A4 width in mm
      const pageHeight = 297; // A4 height in mm
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

      pdf.save("promotion_table.pdf");
    });
  };

  const filteredPromotionList = promotions.filter((promotion) =>
    promotion.userEmail.toLowerCase().includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    fetchPromotions();
  }, []);

  const fetchPromotions = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/userpromo/getpromotions"
      );
      const formattedPromotions = response.data.map((promotion) => ({
        ...promotion,
        startDate: new Date(promotion.startDate).toLocaleDateString(),
        endDate: new Date(promotion.endDate).toLocaleDateString(),
      }));
      setPromotions(formattedPromotions);
    } catch (error) {
      console.error("Error fetching promotions:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(
        `http://localhost:5000/api/userpromo/delete/${id}`
      );
      setPromotions(promotions.filter((promotion) => promotion._id !== id));
      setDeleteSuccess(true);
    } catch (error) {
      console.error("Error deleting promotion:", error);
    }
  };

  const handleEdit = (promotion) => {
    setEditPromotion(promotion);
  };

  const handleCloseEditDialog = () => {
    setEditPromotion(null);
  };

  const handleEditSuccessClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setEditSuccess(false);
  };

  const handleDeleteSuccessClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setDeleteSuccess(false);
  };

  const handleConfirmDelete = (id) => {
    setDeleteId(id);
    setDeleteConfirmation(true);
  };

  const handleCloseDeleteConfirmation = () => {
    setDeleteConfirmation(false);
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <motion.div // Wrap the text with motion component
        initial={{ opacity: 0, y: -50 }} // Initial animation state
        animate={{ opacity: 1, y: 0 }} // Animation when component mounts
        transition={{ duration: 1 }} // Animation duration
      >
        <Typography variant="h4" component="h1" gutterBottom style={{ textAlign: 'center', marginTop: "50px" }}>
          PROMOTION CORNER 
        </Typography>
      </motion.div>
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
    style: {
      color:"#387ADF",
      marginLeft: '70px',
      marginTop:"50px" // Adjust the value as needed
    },
  }}
/>
      <Button
        variant="contained"
        color="primary"
        onClick={generatePDF}
        style={{ float: "right", margin: "50px",marginTop:"50px" }}
      >
        Generate PDF
      </Button>
      <motion.div // Wrap the text with motion component
        initial={{ opacity: 0, y: -50 }} // Initial animation state
        animate={{ opacity: 1, y: 0 }} // Animation when component mounts
        transition={{ duration: 1 }} // Animation duration
      >
      <TableContainer
        id="promotion-table-container"
        sx={{ mt: "30px" }}
        component={Paper}
      >
        <Table sx={{ minWidth: 750 }} aria-label="promotion table">
          <TableHead sx={{ bgcolor: "#387ADF" }}>
            <TableRow>
              <TableCell style={{ width: "10%", fontWeight: "bold" }}>
                Promotion Name
              </TableCell>
              <TableCell style={{ width: "10%", fontWeight: "bold" }}>
                Promotion Key
              </TableCell>
              <TableCell style={{ width: "10%", fontWeight: "bold" }}>
                Start Date
              </TableCell>
              <TableCell style={{ width: "10%", fontWeight: "bold" }}>
                End Date
              </TableCell>
              <TableCell style={{ width: "10%", fontWeight: "bold" }}>
                User Email
              </TableCell>
              <TableCell style={{ width: "10%", fontWeight: "bold" }}>
                Number
              </TableCell>
              <TableCell style={{ width: "10%", fontWeight: "bold" }}>
                Promotion Type
              </TableCell>
              <TableCell style={{ width: "10%", fontWeight: "bold" }}>
                Description
              </TableCell>
              <TableCell style={{ width: "10%", fontWeight: "bold" }}>
                Image
              </TableCell>
              <TableCell style={{ width: "10%", fontWeight: "bold" }}>
                Actions
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredPromotionList.map((promotion) => (
              <TableRow key={promotion._id}>
                <TableCell>{promotion.promotionName}</TableCell>
                <TableCell>{promotion.promotionKey}</TableCell>
                <TableCell>{promotion.startDate}</TableCell>
                <TableCell>{promotion.endDate}</TableCell>
                <TableCell>{promotion.userEmail}</TableCell>
                <TableCell>{promotion.number}</TableCell>
                <TableCell>{promotion.promotionType}</TableCell>
                <TableCell>{promotion.description}</TableCell>
                <TableCell>
                  <img src={`data:image/png;base64,${promotion.imageBase64}`} alt="Promotion Image" style={{ width: "100px", height: "auto" }} />
                </TableCell>
                <TableCell>
                  <IconButton
                    aria-label="edit"
                    onClick={() => handleEdit(promotion)}
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    aria-label="delete"
                    onClick={() => handleConfirmDelete(promotion._id)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      </motion.div>
      <Snackbar open={editSuccess} autoHideDuration={6000} onClose={handleEditSuccessClose}>
        <MuiAlert onClose={handleEditSuccessClose} severity="success" sx={{ width: '100%' }}>
          Promotion edited successfully!
        </MuiAlert>
      </Snackbar>
      <Snackbar open={deleteSuccess} autoHideDuration={6000} onClose={handleDeleteSuccessClose}>
        <MuiAlert onClose={handleDeleteSuccessClose} severity="success" sx={{ width: '100%' }}>
          Promotion deleted successfully!
        </MuiAlert>
      </Snackbar>
      <Dialog
        open={deleteConfirmation}
        onClose={handleCloseDeleteConfirmation}
      >
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this promotion?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDeleteConfirmation}>Cancel</Button>
          <Button onClick={() => {
              handleDelete(deleteId);
              handleCloseDeleteConfirmation();
            }} 
            color="secondary">
            Delete
          </Button>
          
        </DialogActions>
      </Dialog>
      {editPromotion && (
        <EditPromotionDialog
          promotion={editPromotion}
          onSave={fetchPromotions}
          onClose={handleCloseEditDialog}
        />
      )}
      
    </ThemeProvider>
  );
}


