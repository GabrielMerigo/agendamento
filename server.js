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

app.get("/list", async (req, res) => {
  // await AppointmentService.Search("98321298731");

  const appointments = await AppointmentService.GetAll(true);
  res.render("list", { appointments });
});

app.get("/searchresult", async (req, res) => {
  const { search } = req.query;
  const appointments = await appointmentService.Search(search);
  res.render("list", { appointments });
});

const pollTime = 5 * 60000;

setInterval(() => {
  console.log("A task rodou!!");
}, pollTime);

app.listen(8080, () => {
  console.log("Server logado!!");
});
