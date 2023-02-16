import Sqlite from '../db/connect.js';
import { getRecommendedArtifacts } from '../algorithm/algorithm.js';

class APIController {
  constructor() {
    this.db = new Sqlite();
    this.db.connect();
  }

  getUserId = (sessionToken) => {
    // NOTE: for now, session tokens ARE user ids, but this could change
    return sessionToken;
  };

  getArtifacts = async(req, res) => {
    try {
      // eslint-disable-next-line max-len
      let artifacts = await this.db.all('SELECT Topic, ThumbnailURL, Artifact_Name FROM Artifact');
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
    const userID = this.getUserId(req.cookies.edflixSessionToken);
    try {
      if (userID == null) {
        res.json(null);
      } else {
        const recommendations = await getRecommendedArtifacts(userID);
        let recommended = recommendations.map((r) => {
          let a = this.db.get(
            'SELECT * FROM Artifact WHERE Artifact_id=?',
            [r[0]],
          );
          return a;
        });
        recommended = await Promise.all(recommended);
        res.json(recommended);
      }
    } catch (e) {
      console.log(e);
      res
        .status(500)
        .send('Internal Server Error - Could not fetch recommendations.');
    }
  };

  logout = async(req, res) => {
    res.clearCookie('edflixSessionToken');
    res.redirect('/');
  };

  login = async(req, res) => {
    let {userName, password, remember} = req.body;

    try {
      // eslint-disable-next-line max-len
      let user = await this.db.get('SELECT * FROM User where User_name=?', [userName]);
      if (user) {
        if (user.Password === password) {
          let cookieOpts = {
            httpOnly: true,
          };
          if (parseInt(remember, 2)) {
            cookieOpts.maxAge = 2700000;
          }
          res.cookie('edflixSessionToken', user.User_id, cookieOpts);
          res.end();
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

    try {
      // eslint-disable-next-line max-len
      let result = await this.db.insertObject('User', {
        User_name: userName,
        Password: password,
        Email: email,
        ProfilePicture: null,
      });

      res.cookie('edflixSessionToken', result.lastID, {
        httpOnly: true,
      });
      res.end();
    } catch (e) {
      console.log(e);
      res
        .status(500)
        .json(e);
    }

  };
}


export default APIController;
