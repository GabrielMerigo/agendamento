const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const appointmentService = require("./services/AppointmentService");
const AppointmentService = require("./services/AppointmentService");

app.use(express.static("public"));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.set("view engine", "ejs");

mongoose.connect("mongodb://localhost:27017/agendamento");

app.get("/", (req, res) => {
  res.render("index");
});

app.get("/cadastro", (req, res) => {
  res.render("create");
});

app.post("/create", async (req, res) => {
  const status = await appointmentService.Create(req.body);

  if (!status) res.send("Ocorreu uma falha");

  res.redirect("/");
});

app.get("/appointments", async (req, res) => {
  const appointments = await AppointmentService.GetAll(false);
  res.json(appointments);
});

app.get("/event/:id", async (req, res) => {
  const { id } = req.params;
  const appointment = await AppointmentService.GetById(id);

  res.render("event", { appointment });
});

app.post("/finish", async (req, res) => {
  const { id } = req.body;
  await AppointmentService.Finish(id);
  res.redirect("/");
});

app.listen(8080, () => {});
