import CryptoJS from "crypto-js";
import database from "../../../helpers/database";
import dotenv from "dotenv";
dotenv.config();

export default async (req, res) => {
  if (req.method !== "POST") {
    return res
      .status(404)
      .json({ message: `Unable to process ${req.method} method.` });
  }
  try {
    const user = await new Promise((resolve, reject) => {
      if (!req.body || !req.body.email || !req.body.password) {
        return reject(new Error("Required input values are missing."));
      }
      database.users.findOne(
        {
          email: req.body.email
        },
        (error, user) => {
          if (error) {
            console.log("register:: database.users.findOne:: error::", error);
            return reject(error);
          }
          if (user && user.email) {
            return reject(
              new Error("This email address is already registered.")
            );
          }
        }
      );
      const encryptedPassword = CryptoJS.AES.encrypt(
        req.body.password,
        process.env.ENCRYPTION_SECRET
      );
      database.users.insert(
        {
          email: req.body.email,
          password: encryptedPassword.toString()
        },
        (error, doc) => {
          if (error) {
            console.log("register:: database.users.insert:: error::", error);
            return reject(error);
          }
          //Create session record.
          const newToken = CryptoJS.MD5(Date.now().toString());
          database.sessions.insert(
            {
              user_id: doc._id,
              token: newToken.toString()
            },
            (error, session) => {
              if (error) {
                console.log(
                  "register:: database.sessions.insert:: error::",
                  error
                );
                return reject(error);
              }
              Object.assign(doc, {
                token: session.token
              });
              return resolve(doc);
            }
          );
        }
      );
    });
    return res.status(200).json(user);
  } catch (error) {
    console.log("register:: error::", error);
    const message =
      error && error.message ? error.message : "Internal server error.";
    return res.status(500).json({ message });
  }
};
