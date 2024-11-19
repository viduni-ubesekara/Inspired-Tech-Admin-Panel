import React, { useState } from "react";
import axios from "axios";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Rating from "@mui/material/Rating";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";

const EditFeedbackDialog = ({ feedback, onSave, onClose }) => {
  const [editedFeedback, setEditedFeedback] = useState({ ...feedback });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedFeedback((prevFeedback) => ({
      ...prevFeedback,
      [name]: value,
    }));
  };

  const handleSave = async () => {
    try {
      const response = await axios.put(
        `http://localhost:5000/api/user/updatefeedback/${feedback._id}`,
        editedFeedback
      );
      onSave(response.data.data);
      onClose();
    } catch (error) {
      console.error("Error:", error);
      // Handle error appropriately, e.g., show error message to user
    }
  };

  const handleCancel = () => {
    onClose();
  };

  return (
    <Dialog open={true} onClose={handleCancel}>
      <DialogTitle>Edit Feedback</DialogTitle>
      <DialogContent>
        <TextField
          label="First Name"
          name="firstName"
          value={editedFeedback.firstName}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Last Name"
          name="lastName"
          value={editedFeedback.lastName}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Email"
          name="email"
          value={editedFeedback.email}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Phone Number"
          name="phone_no"
          value={editedFeedback.phone_no}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Description"
          name="description"
          value={editedFeedback.description}
          onChange={handleChange}
          fullWidth
          margin="normal"
          multiline
          rows={4}
        />
        <FormControl fullWidth margin="normal">
          <InputLabel id="category-label">Category</InputLabel>
          <Select
            labelId="category-label"
            id="category"
            name="category"
            value={editedFeedback.category}
            onChange={handleChange}
          >
            <MenuItem value="productIssue">Product Issue</MenuItem>
            <MenuItem value="customerServiceIssue">
              Customer Service Issue
            </MenuItem>
            <MenuItem value="websiteIssue">Website Issue</MenuItem>
          </Select>
        </FormControl>
        <FormControl fullWidth margin="normal">
          <InputLabel id="recommend-label">Recommend</InputLabel>
          <Select
            labelId="recommend-label"
            id="recommend"
            name="recommend"
            value={editedFeedback.recommend}
            onChange={handleChange}
          >
            <MenuItem value="yes">Yes</MenuItem>
            <MenuItem value="no">No</MenuItem>
          </Select>
        </FormControl>
        <Rating
          name="rating"
          value={editedFeedback.rating}
          onChange={(event, newValue) => {
            setEditedFeedback((prevFeedback) => ({
              ...prevFeedback,
              rating: newValue,
            }));
          }}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleCancel}>Cancel</Button>
        <Button onClick={handleSave}>Save</Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditFeedbackDialog;
