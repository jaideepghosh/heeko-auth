import database from "../../../helpers/database";

export default async (req, res) => {
  if (!req.query || !req.query.token) {
    res.status(422).json({ message: "Token required." });
  }
  try {
    await new Promise((resolve, reject) => {
      database.sessions.remove({ token: req.query.token }, {}, (error, doc) => {
        if (error) {
          console.log("logout:: db.session:: error::", error);
          return reject(false);
        }
        return resolve(true);
      });
    });
    res.status(200).json({ message: "You have been successfully logged out!" });
  } catch (error) {
    console.log("logout:: error::", error);
    res.status(500).json({ message: "Internal server error." });
  }
};
