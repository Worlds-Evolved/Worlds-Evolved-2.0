const express = require("express");
const app = express();
const cors = require('cors')
const userRoutes = require('./API/users.cjs')
const PORT = process.env.PORT || 3000;

app.use(cors())
app.use(require("morgan")("dev"));
app.use(express.json());

app.use(require("./API/auth.cjs").router);
app.use("/user", userRoutes)


app.get('/test', (req, res,next) => {
  res.json('test works')
})

app.use((req, res, next) => {
  next({ status: 404, message: "Endpoint not found." });
});

app.use((err, req, res, next) => {
  console.error(err);
  res.status(err.status ?? 500);
  res.json(err.message ?? "Sorry, something broke :(");
});

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}...`);
});


