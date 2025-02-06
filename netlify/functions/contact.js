const nodemailer = require("nodemailer");
exports.handler = async (event) => {
  try {
    const { name, email, message, subject } = JSON.parse(event.body);

    let transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USERs, // Your email
        pass: process.env.EMAIL_PASSs, // Your email app password
      },
    });

    let mailOptions = {
      from: email, // Sender address
      to: `${process.env.EMAIL_USERs}, ${process.env.EMAIL_USER}`, // Recipient address
      subject: `New Contact Form Submission: ${subject}`, // Email subject
      html: `
        <h3>New Contact Form Submission</h3>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Subject:</strong> ${subject}</p>
        <p><strong>Message:</strong> ${message}</p>
      `,
    };

    await transporter.sendMail(mailOptions);

    return {
      statusCode: 200,
      body: JSON.stringify({ message: "Email sent successfully!" }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message }),
    };
  }
};
