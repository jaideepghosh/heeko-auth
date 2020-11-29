import CryptoJS from "crypto-js";
import dotenv from "dotenv";
import database from "../../../helpers/database";

dotenv.config();

export default async (req, res) => {
  try {
    const user = await new Promise((resolve, reject) => {
      if (!req.body || !req.body.email) {
        return reject(new Error("Required input values are missing."));
      }
      database.users.findOne({ email: req.body.email }, {}, (error, doc) => {
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
        return resolve(decryptedPassword);
      });
    });
    res.status(200).json(user);
  } catch (error) {
    console.log("request-password:: error::", error);
    const message =
      error && error.message ? error.message : "Internal server error.";
    return res.status(500).json({ message });
  }
};
