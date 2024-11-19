import React, { useState, useEffect } from "react";
import axios from "axios";
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

  

  return (
    <ThemeProvider theme={defaultTheme}>
      
      <motion.div // Wrap the text with motion component
        initial={{ opacity: 0, y: -50 }} // Initial animation state
        animate={{ opacity: 1, y: 0 }} // Animation when component mounts
        transition={{ duration: 1 }} // Animation duration
      >
        <Typography variant="h4" component="h1" gutterBottom style={{ textAlign: 'center', marginTop: "200px" }}>
          Digital Marketing Control Panel
        </Typography>
        <Container style={{ display: 'flex', justifyContent: 'center', marginTop: '50px' }}>
        <Button variant="contained" color="primary" href="/marketingPanel/promotionmain"style={{ marginRight: '20px', padding: '20px 40px' }}>
          New Promotions
        </Button>
        <Button variant="contained" color="primary" href="/marketingPanel/promotionTable" style={{ marginRight: '20px', padding: '20px 40px' }}>
          Special Offers
        </Button>
        <Button variant="contained" color="primary" href="/marketingPanel/promotionview" style={{ padding: '20px 40px' }}>
          Advanced Settings
        </Button>
      </Container>
      </motion.div>
      
      
     
      
      
    </ThemeProvider>
  );
}
