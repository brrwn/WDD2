import express from "express";

const app = express();
const PORT = 3000;

//get - display name, var name = "bjorn"
//post - logic, if username = "bjorn", password = "123", success else failed

app.use(express.json());

app.get("/getName", (req, res) => {
  var name = "Bjorn";
  res.status(200).json(name);
});

app.post("/login", (req, res) => {
  const { username, password } = req.body;
  if (username == "Bjorn" && password == "pass123") {
    res.status(200).json({
      message: "Login Successful.",
      status: "success",
    });
  } else {
    res.status(403).json({
      message: "Invalid username or password.",
      status: "failed",
    });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on PORT: ${PORT}`);
});
