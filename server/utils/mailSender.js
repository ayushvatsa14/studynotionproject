const nodemailer = require("nodemailer");

const mailSender = async (email, title, body) => {
  try {
    // Create a transporter using environment variables for SMTP settings
    let transporter = nodemailer.createTransport({
      host: process.env.MAIL_HOST,      // SMTP host (e.g., smtp.gmail.com for Gmail)
      port: 587,                       // Common SMTP port (587 for TLS)
      secure: false,                   // Use TLS (false for non-secure, true for secure)
      auth: {
        user: process.env.MAIL_USER,   // Email account (e.g., your Gmail address)
        pass: process.env.MAIL_PASS,   // App-specific password or SMTP password
      },
      tls: {
        rejectUnauthorized: false,    // Allow self-signed certificates (optional)
      },
    });

    // Sending email
    let info = await transporter.sendMail({
      from: `"StudyNotion" <${process.env.MAIL_USER}>`, // Sender address
      to: email, // Receiver address
      subject: title, // Subject line
      html: body, // HTML body content
    });

    // Log the success of the email sent
    console.log("Email sent: " + info.response);

    return info; // Return the info object for debugging if needed
  } catch (error) {
    // Detailed error logging
    console.error("Error sending email:", error);
    throw new Error(`Failed to send email: ${error.message}`);
  }
};

module.exports = mailSender;
