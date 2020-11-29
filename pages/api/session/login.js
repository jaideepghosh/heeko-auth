import CryptoJS from "crypto-js";
import dotenv from "dotenv";
import database from "../../../helpers/database";

dotenv.config();

export default async (req, res) => {
  try {
    if (!req.body || !req.body.email || !req.body.password) {
      return reject(new Error("Required input values are missing."));
    }
    const user = await new Promise((resolve, reject) => {
      database.users.findOne({ email: req.body.email }, {}, (error, doc) => {
        if (error) {
          console.error("login:: database.users.findOne:: error::", error);
          return reject(false);
        }
        //Check password.
        const decryptedPassword = CryptoJS.AES.decrypt(
          doc.password,
          process.env.ENCRYPTION_SECRET
        ).toString(CryptoJS.enc.Utf8);
        if (req.body.password !== decryptedPassword) {
          return reject(new Error("Incorrect password."));
        }
        delete doc.password;
        //start session
        database.sessions.findOne(
          {
            user_id: doc._id
          },
          (error, session) => {
            if (error) {
              console.error(
                "login:: database.sessions.findOne:: error::",
                error
              );
              return reject(false);
            }
            if (!session) {
              //Create session record.
              const newToken = CryptoJS.MD5(Date.now().toString());
              database.sessions.insert(
                {
                  user_id: doc._id,
                  token: newToken.toString()
                },
                (error, session) => {
                  if (error) {
                    console.error(
                      "login:: database.sessions.insert:: error::",
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
            } else {
              Object.assign(doc, {
                token: session.token
              });
              return resolve(doc);
            }
          }
        );
      });
    });
    res.status(200).json(user);
  } catch (error) {
    console.log("login:: error::", error);
    const message =
      error && error.message ? error.message : "Internal server error.";
    return res.status(500).json({ message });
  }
};
