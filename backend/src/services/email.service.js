import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();
const transporter = nodemailer.createTransport({
  service: "gmail",

  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export const sendOTPEmail = async (email, otp) => {
  try{await transporter.sendMail({
    from: process.env.EMAIL_USER,

    to: email,

    subject: "IntelliStudy Verification OTP",

    html: `
      <div>
        <h2>Email Verification</h2>
        <p>Your OTP is:</p>
        <h1>${otp}</h1>
        <p>Valid for 5 minutes.</p>
      </div>
    `,
  });}
  catch(error){
    console.error("Error sending email:",error)
  }
};
