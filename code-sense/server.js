const PORT = 8000;
const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(express.json());
app.use(cors());

const API_KEY = process.env.API_KEY;


app.post('/completions', async (req, res)=> {
  const options = {
      method: 'POST',
      headers: {
          "Authorization": `Bearer ${API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
          model: "gpt-3.5-turbo",
          messages: [{role: "user", content: req.body.message}],
          max_tokens: 500,
      })
  }
  try {
      const response = await fetch('https://api.openai.com/v1/chat/completions', options);
      const data = await response.json();
      if (data) {
        if (data.error) {
          console.log(data.error.message);
        }
      console.log(data);
      console.log("answer********\n", data.choices[0].message);
      res.send(data);
      } else {
        console.log("error", data);
      }
  } catch (err) {
      console.error(err);
      // console.log(err.error.message)
      res.send(err);
  }
})
app.post("/check", async(req, res) => {
  try {
    console.log("req.body",req.body);
    console.log("req.body.message", req.body.message);

    res.send("Working!");
  } catch (error) {
    console.log("errro");
    res.send("Not working!");
  }
})

app.listen(PORT, () => console.log('Your server is running on PORT ' + PORT))
