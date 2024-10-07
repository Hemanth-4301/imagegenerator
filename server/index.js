const express = require("express");
const cors = require("cors");
const axios = require("axios");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;

app.post("/generate-image", async (req, res) => {
  const { prompt } = req.body;

  try {
    const response = await axios.post(
      "https://api-inference.huggingface.co/models/CompVis/stable-diffusion-v1-4",
      { inputs: prompt },
      {
        headers: {
          Authorization: `Bearer ${process.env.HUGGING_FACE_API_KEY}`,
          "Content-Type": "application/json",
        },
        responseType: "arraybuffer",
      }
    );

    const base64Image = Buffer.from(response.data, "binary").toString("base64");
    const imageUrl = `data:image/png;base64,${base64Image}`;

    res.json({ imageUrl });
    console.log(imageUrl);
  } catch (error) {
    res.status(500).send("Error generating image");
    console.log(error);
  }
});

console.log(process.env.HUGGING_FACE_API_KEY);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
