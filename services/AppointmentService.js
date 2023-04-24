const appointment = require("../models/Appointment");
const mongoose = require("mongoose");
const AppointmentFactory = require("../factories/AppointmentFactory");

const Appo = mongoose.model("Appointment", appointment);

class AppointmentService {
  async Create({ name, email, description, cpf, date, time }) {
    const newAppo = new Appo({
      name,
      email,
      description,
      cpf,
      date,
      time,
      finished: false,
    });

    try {
      await newAppo.save();
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  async GetAll(showFinished) {
    if (showFinished) {
      return await Appo.find();
    } else {
      const appos = await Appo.find({ finished: false });
      const appointments = [];

      appos.forEach((appointment) => {
        if (!!appointment.date) {
          appointments.push(AppointmentFactory.Build(appointment));
        }
      });

      return appointments;
    }
  }

  async GetById(id) {
    try {
      return await Appo.findOne({ _id: id });
    } catch (err) {
      console.log(err);
    }
  }

  async Finish(id) {
    try {
      await Appo.findByIdAndUpdate(id, { finished: true });
      return true;
    } catch (err) {
      console.err(err);
      return false;
    }
  }

  async Search(query) {
    try {
      const appos = Appo.find().or([{ email: query }, { cpf: query }]);
      return appos;
    } catch (err) {
      console.log(err);
    }
  }
}

module.exports = new AppointmentService();
