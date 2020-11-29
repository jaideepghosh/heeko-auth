import CryptoJS from "crypto-js";
import dotenv from "dotenv";
import nodemailer from "nodemailer";
import database from "../../../helpers/database";

dotenv.config();

const mailTransporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.GMAIL_SMTP_USER_EMAIL,
    pass: process.env.GMAIL_SMTP_PASSWORD
  }
});

const sendMail = (email, password) => {
  const mailPayload = {
    from: `${process.env.GMAIL_SMTP_USER_NAME} <${process.env.GMAIL_SMTP_USER_EMAIL}>`,
    to: email,
    subject: "Heeko Auth - Password",
    text: `Your password is: ${password}`
  };
  return new Promise((resolve, reject) => {
    mailTransporter.sendMail(mailPayload, (error, data) => {
      if (error) {
        return reject(error);
      } else {
        return resolve("Email sent successfully");
      }
    });
  });
};

export default async (req, res) => {
  try {
    const user = await new Promise((resolve, reject) => {
      if (!req.body || !req.body.email) {
        return reject(new Error("Required input values are missing."));
      }
      database.users.findOne(
        { email: req.body.email },
        {},
        async (error, doc) => {
          if (error) {
            console.error(
              "request-password:: database.users.findOne:: error::",
              error
            );
            return reject(false);
          }
          if (!doc) {
            return reject(new Error("Invalid email address."));
          }
          //Check password.
          const decryptedPassword = CryptoJS.AES.decrypt(
            doc.password,
            process.env.ENCRYPTION_SECRET
          ).toString(CryptoJS.enc.Utf8);
          await sendMail(doc.email, decryptedPassword);
          return resolve(true);
        }
      );
    });
    res.status(200).json({ message: "Please check your mail for password." });
  } catch (error) {
    console.log("request-password:: error::", error);
    const message =
      error && error.message ? error.message : "Internal server error.";
    return res.status(500).json({ message });
  }
};
