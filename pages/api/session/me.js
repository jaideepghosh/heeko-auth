import database from "../../../helpers/database";

export default async (req, res) => {
  if (!req.query || !req.query.token) {
    return res.status(422).json({ message: "Token required." });
  }
  try {
    const response = await new Promise((resolve, reject) => {
      database.sessions.findOne(
        {
          token: req.query.token
        },
        (error, doc) => {
          if (error) {
            console.error("me:: database.sessions.findOne:: error::", error);
            return reject(error);
          }
          if (!doc || !doc.user_id) {
            console.error("me:: database.users.findOne:: doc.user_id is null.");
            return reject(new Error("Corrupted data found."));
          }
          database.users.findOne({ _id: doc.user_id }, (error, user) => {
            if (error) {
              console.error("me:: database.users.findOne:: error::", error);
              return reject(error);
            }
            return resolve(user);
          });
        }
      );
    });
    return res.status(200).json(response);
  } catch (error) {
    console.error("me:: error::", error);
    const message =
      error && error.message ? error.message : "Internal server error.";
    return res.status(500).json({ message });
  }
};
