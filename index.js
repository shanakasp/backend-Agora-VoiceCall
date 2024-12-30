const express = require("express");
const cors = require("cors");
const { RtcTokenBuilder, RtcRole } = require("agora-access-token");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;
const APP_ID = process.env.AGORA_APP_ID;
const APP_CERTIFICATE = process.env.AGORA_APP_CERTIFICATE;

app.post("/generateToken", (req, res) => {
  const { channelName, uid, role } = req.body;

  if (!channelName || !uid) {
    return res.status(400).json({ error: "channelName and uid are required" });
  }

  const agoraRole =
    role === "subscriber" ? RtcRole.SUBSCRIBER : RtcRole.PUBLISHER;

  const token = RtcTokenBuilder.buildTokenWithUid(
    APP_ID,
    APP_CERTIFICATE,
    channelName,
    uid,
    agoraRole,
    Math.floor(Date.now() / 1000) + 3600 // Token valid for 1 hour
  );

  res.json({ token });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
