const express = require("express");
const app = express();

app.get("/", (req, res) => {
  console.log(`[GET /] - ${new Date().toISOString()}`);
  res.send("Hello World!");
});

const PORT = process.env.PORT || 9191;
app.listen(PORT, () => console.log(`[Server] - Running on port ${PORT}`));
