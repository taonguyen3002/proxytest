// proxy-server.js
const express = require("express");
const cors = require("cors");
const axios = require("axios");
const app = express();

// Đọc JSON body
app.use(express.json());

// CORS: Cho phép mọi domain (hoặc chỉnh domain cụ thể nếu muốn)
app.use(
  cors({
    origin: "*", // Cho phép mọi domain
    credentials: true,
  })
);

// Proxy POST
app.post("/api/proxy", async (req, res) => {
  try {
    const googleApiUrl =
      "https://script.google.com/macros/s/AKfycbx1IbH-aFxytMz_gpALW2Pm009NBPr4ZdFh5hRS2Pc22bKC7kOq3LkguX1wSaLxJ2ki/exec";

    const response = await axios.post(googleApiUrl, req.body, {
      headers: { "Content-Type": "application/json" },
    });

    res.json(response.data);
  } catch (err) {
    console.error("Error:", err.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Proxy GET
app.get("/api/proxy", async (req, res) => {
  try {
    const googleApiUrl =
      "https://script.google.com/macros/s/AKfycbx1IbH-aFxytMz_gpALW2Pm009NBPr4ZdFh5hRS2Pc22bKC7kOq3LkguX1wSaLxJ2ki/exec";

    const response = await axios.get(googleApiUrl);

    res.json(response.data);
  } catch (err) {
    console.error("Error:", err.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`✅ Proxy server chạy tại http://localhost:${PORT}/api/proxy`);
});
