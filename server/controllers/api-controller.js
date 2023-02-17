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
  PostNew = async(req, res) => {
    const User_id = this.getUserId(req.cookies.edflixSessionToken);
    let {Artifact_id, Value} = req.body;

    try {
      // eslint-disable-next-line max-len
      await this.db.insertObject('Rating', {
        User_id,
        Artifact_id,
        Value,
      });


      res.end();
    } catch (e) {
      console.log(e);
      res
        .status(500)
        .json(e);
    }

  };
  getUser = async(req, res) => {
    let User_id = req.cookies.edflixSessionToken;

    try {
      // eslint-disable-next-line max-len
      let user = await this.db.get('SELECT * FROM User where User_id=?', [User_id]);
      if (user) {

        res
          .status(200)
          .json(user);

      } else {
        res
          .status(500)
          .json({ code: 'UNKNOWN_USERID' });
      }
    } catch (e) {
      console.log(e);
      res
        .status(500)
        .send('Internal Server Error - Could not get User.');
    }
  };

  getJournal = async(req, res) => {
    let User_id = req.cookies.edflixSessionToken;

    try {
      // eslint-disable-next-line max-len
      let journal = await this.db.get('SELECT j.* FROM User u INNER JOIN LearningJournal j ON u.Journal_id=j.Journal_id WHERE u.User_id=?', [User_id]);
      if (journal) {
        // eslint-disable-next-line max-len
        const modules = await this.db.all('SELECT Module_Name FROM JournalModule WHERE Journal_id=?', [journal.Journal_id]);
        if (modules) {
          journal.modules = modules.map((m) => m.Module_Name);
        }
        res
          .status(200)
          .json(journal);

      } else {
        res
          .status(500)
          .json({ code: 'UNKNOWN_JOURNALID' });
      }
    } catch (e) {
      console.log(e);
      res
        .status(500)
        .send('Internal Server Error - Could not get Journal.');
    }
  };
  JournalEdit = async(req, res) => {
    let {LevelOfStudy, UniversityCourse, University, Modules} = req.body;

    try {
      // eslint-disable-next-line max-len
      let result = await this.db.insertObject('LearningJournal', {
        LevelOfStudy, UniversityCourse, University,
      });
      let Journal_id = result.lastID;
      for (const key in Modules) {
        let Module_Name = Modules[key];
        await this.db.insertObject('JournalModule', {
          Journal_id, Module_Name,
        });
      }


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
