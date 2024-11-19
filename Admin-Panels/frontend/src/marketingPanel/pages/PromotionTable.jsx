import React, { useState, useEffect } from "react";
import axios from "axios";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import InputAdornment from "@mui/material/InputAdornment";
import TextField from "@mui/material/TextField";
import SearchIcon from "@mui/icons-material/Search";
import { motion } from "framer-motion";
import Button from "@mui/material/Button";

const defaultTheme = createTheme();

export default function Promotion() {
  const [promotions, setPromotions] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

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

  const filteredPromotionList = promotions
    .filter(
      (promotion, index, self) =>
        self.findIndex((p) => p.promotionName === promotion.promotionName) ===
        index
    )
    .filter((promotion) =>
      promotion.userEmail.toLowerCase().includes(searchTerm.toLowerCase())
    );

  return (
    <ThemeProvider theme={defaultTheme}>
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <Typography
          variant="h4"
          component="h1"
          gutterBottom
          style={{ textAlign: "center", marginTop: "50px", color: "#3f51b5" }}
        >
          Special Offers
        </Typography>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
          }}
        >
          {filteredPromotionList.map((promotion) => (
            <motion.div
              key={promotion._id}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              style={{ margin: "10px" }}
            >
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <Card
                  style={{
                    width: "300px",
                    marginTop: "70px",
                    border: "1px solid #3f51b5",
                    borderRadius: "15px",
                    overflow: "hidden",
                    boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
                  }}
                >
                  <CardContent>
                    <Typography
                      gutterBottom
                      variant="h5"
                      component="div"
                      style={{ color: "#3f51b5" }}
                    >
                      {promotion.promotionName}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      style={{ width: "100%" }}
                    >
                      {promotion.description}
                    </Typography>
                    <div
                      style={{
                        marginTop: "10px",
                        display: "flex",
                        justifyContent: "center",
                      }}
                    >
                      <img
                        src={`data:image/png;base64,${promotion.imageBase64}`}
                        alt="Promotion Image"
                        style={{
                          maxWidth: "50%",
                          height: "100%",
                          borderRadius: "15px",
                        }}
                      />
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </motion.div>
      <Button
        variant="contained"
        color="primary"
        href="/marketingPanel/promotionview"
        style={{
          position: "absolute",
          top: "70px",
          right: "80px",
          backgroundColor: "#3f51b5",
          color: "white",
          boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
        }}
      >
        Advanced Settings
      </Button>
    </ThemeProvider>
  );
}

