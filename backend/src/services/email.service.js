// import nodemailer from "nodemailer";
// import dotenv from "dotenv";
// dotenv.config();
// const transporter = nodemailer.createTransport({
//   host: "smtp.gmail.com",
//   port: 587,
//   secure: false,
//   auth: {
//     user: process.env.EMAIL_USER,
//     pass: process.env.EMAIL_PASS,
//   },
// });

// export const sendOTPEmail = async (email, otp) => {
//   try{await transporter.sendMail({
//     from: process.env.EMAIL_USER,

//     to: email,

//     subject: "IntelliStudy Verification OTP",

//     html: `
//       <div>
//         <h2>Email Verification</h2>
//         <p>Your OTP is:</p>
//         <h1>${otp}</h1>
//         <p>Valid for 5 minutes.</p>
//       </div>
//     `,
//   });}
//   catch(error){
//     console.error("Error sending email:",error)
//     throw error;
//   }
// };

import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendOTPEmail = async (email, otp) => {
  try {
    await resend.emails.send({
      from: "onboarding@resend.dev",
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
    });

    console.log("OTP email sent successfully");
  } catch (error) {
    console.error("Error sending email:", error);
    throw error;
  }
};