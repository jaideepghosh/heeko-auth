import Datastore from "nedb";
import * as path from "path";
import dotenv from "dotenv";
dotenv.config();

const getDataStorePath = (dataset) => {
  const appDirectory = path.resolve(process.cwd());
  return path.join(path.join(appDirectory, "/databases/" + dataset));
};

let db = {};
db.users = new Datastore({
  filename: getDataStorePath(`${process.env.USER_DATABASE_NAME}.db`),
  autoload: true
});
db.sessions = new Datastore({
  filename: getDataStorePath(`${process.env.SESSION_DATABASE_NAME}.db`),
  autoload: true
});

export default db;
