import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import fetch from "node-fetch";

const app = express();
const PORT = process.env.PORT || 5000;
const GEMINI_KEY = process.env.GEMINI_API_KEY;

app.use(cors());
app.use(bodyParser.json());

// Endpoint utama untuk AI Tutor
app.post("/get-answer", async (req, res) => {
  const { text, subject, level, syllabus } = req.body;

  if (!text) {
    return res.status(400).json({ error: "Tiada soalan diberikan." });
  }

  try {
    const prompt = `Sila selesaikan soalan berikut mengikut sukatan ${syllabus} untuk tahap ${level} subjek ${subject}. 
Berikan langkah demi langkah dan jawapan akhir. Soalan: ${text}`;

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_KEY}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
        }),
      }
    );

    const data = await response.json();

    const answer =
      data?.candidates?.[0]?.content?.parts?.[0]?.text ||
      "Tiada respon daripada Gemini.";

    res.json({
      rawAnswerText: answer,
      steps: [],
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Ralat semasa berhubung dengan Gemini API." });
  }
});

app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
