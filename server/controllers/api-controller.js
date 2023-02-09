import Sqlite from '../db/connect.js';
import { getRecommendedArtifacts } from '../algorithm/algorithm.js';

class APIController {
  constructor() {
    this.db = new Sqlite();
    this.db.connect();
  }

  getArtifacts = async(req, res) => {
    try {
      let artifacts = await this.db.all('SELECT * FROM Artifact');
      res.json(artifacts);
    } catch (e) {
      console.log(e);
      res
        .status(500)
        .send('Internal Server Error - Could not get artifacts from database.');
    }

  };
  getArtifact = async(req, res) => {
    let id = req.params.id;
    try {
      // eslint-disable-next-line max-len
      let artifact = await this.db.get('SELECT * FROM Artifact where Artifact_id=?', [id]);
      res.json(artifact);
    } catch (e) {
      console.log(e);
      res
        .status(500)
        .send('Internal Server Error - Could not get artifact from database.');
    }

  };
  getArtifactRating = async(req, res) => {
    let id = req.params['id'];
    try {
      // eslint-disable-next-line max-len
      let rating = await this.db.get('SELECT AVG(Value) FROM Rating where Artifact_id=?', [id]);
      res.json(rating);
    } catch (e) {
      console.log(e);
      res
        .status(500)
        .send('Internal Server Error - Could not get rating from database.');
    }

  };
  getRecommendations = async(req, res) => {
    const userID = req.query.userID;
    try {
      const recommendations = await getRecommendedArtifacts(userID);
      res.json(recommendations);
    } catch (e) {
      console.log(e);
      res
        .status(500)
        .send('Internal Server Error - Could not fetch recommendations.');
    }
  };
  login = async(req, res) => {

    let {userName, password} = req.body;
    try {
      // eslint-disable-next-line max-len
      let user = await this.db.get('SELECT * FROM User where User_name=?', [userName]);
      if (user) {
        if (user.Password === password) {
          res.cookie('edflixSessionToken', user.User_id, {
            httpOnly: false,
          });
          res.send();
        } else {
          res
            .status(500)
            .json({ code: 'INCORRECT_PASSWORD' });
        }
      } else {
        res
          .status(500)
          .json({ code: 'UNKNOWN_USERNAME' });
      }
    } catch (e) {
      console.log(e);
      res
        .status(500)
        .send('Internal Server Error - Could not login.');
    }
  };
  register = async(req, res) => {
    let {userName, password, email} = req.body;
    console.log({userName, password, email});

    try {
      // eslint-disable-next-line max-len
      let result = await this.db.insertObject('User', {
        User_name: userName,
        Password: password,
        Email: email,
        ProfilePicture: null,
      });

      res.cookie('edflixSessionToken', result.lastID, {
        httpOnly: false,
      });
      res.send();
    } catch (e) {
      console.log(e);
      res
        .status(500)
        .json(e);
    }

  };


}


export default APIController;
