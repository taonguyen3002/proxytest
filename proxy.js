// proxy-server.js
const express = require("express");
const fetch = require("node-fetch");
const app = express();

// Đọc JSON body
app.use(express.json());

// Proxy POST
app.post("/api/proxy", async (req, res) => {
  try {
    const googleApiUrl =
      "https://script.google.com/macros/s/AKfycbx1IbH-aFxytMz_gpALW2Pm009NBPr4ZdFh5hRS2Pc22bKC7kOq3LkguX1wSaLxJ2ki/exec"; // Thay bằng URL Web App của bạn

    const response = await fetch(googleApiUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(req.body),
    });

    const data = await response.text(); // Google Apps Script đôi khi trả text
    try {
      res.json(JSON.parse(data)); // Nếu trả JSON hợp lệ
    } catch (err) {
      res.send(data); // Nếu không phải JSON (trả nguyên text)
    }
  } catch (err) {
    console.error("Error:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Proxy GET (nếu cần)
app.get("/api/proxy", async (req, res) => {
  try {
    const googleApiUrl =
      "https://script.google.com/macros/s/AKfycbx1IbH-aFxytMz_gpALW2Pm009NBPr4ZdFh5hRS2Pc22bKC7kOq3LkguX1wSaLxJ2ki/exec"; // Thay bằng URL Web App của bạn

    const response = await fetch(googleApiUrl, {
      method: "GET",
    });

    const data = await response.text();
    try {
      res.json(JSON.parse(data));
    } catch (err) {
      res.send(data);
    }
  } catch (err) {
    console.error("Error:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`✅ Proxy server chạy tại http://localhost:${PORT}/api/proxy`);
});
