import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL || "hassaankhawaja1015@gmail.com",
    pass: process.env.PASSWORD || "lbxw wlrm pmle pqpw",
  },
});

export const sendOtpEmail = async (to, otp) => {
  await transporter.sendMail({
    from: `"Games MarketPlace" <${process.env.EMAIL}>`,
    to,
    subject: "Verification OTP Code",
    text: ` Verification OTP Code is : ${otp}`,
    html: `<p>Your OTP code is: <b>${otp}</b></p>`,
  });
};
