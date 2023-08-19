const nodemailer = require("nodemailer");

module.exports = async (email, subject, text, html) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      host: "smtp.example.com",
      port: 587,
      secure: true,
      auth: {
        user: "manjushakatkhede96@gmail.com",
        pass: "kvxifknfkimvnegc",
      },
      from: "manjushakatkhede96@gmail.com",
    });

    await transporter.sendMail({
      from: "manjushakatkhede96@gmail.com",
      to: email,
      subject: subject,
      text: text,
      html: html,
    });
  } catch (error) {
    console.log(error);
    return error;
  }
};
