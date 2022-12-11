import express from "express";
import cors from "cors";
import router from "./controller.js";

const app = express();
const port = 3000;

app.use(cors());


// Add Access Control Allow Origin headers
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.use("/", router);

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
