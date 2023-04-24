class AppointmentFactory {
  Build(simpleAppointment) {
    const day = simpleAppointment.date.getDate() + 1;
    const month = simpleAppointment.date.getMonth();
    const year = simpleAppointment.date.getFullYear();

    const [hour, minutes] = simpleAppointment.time.split(":");

    const startDate = new Date(
      year,
      month,
      day,
      Number(hour),
      Number(minutes),
      0,
      0
    );

    return {
      id: simpleAppointment._id,
      title: `${simpleAppointment.name} -  ${simpleAppointment.description}`,
      start: startDate,
      end: startDate,
    };
  }
}

module.exports = new AppointmentFactory();
