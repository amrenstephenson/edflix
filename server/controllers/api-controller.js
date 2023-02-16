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
      const filter = req.query.filter;
      // eslint-disable-next-line max-len
      let artifacts = await this.db.all('SELECT Artifact_id, Topic, ThumbnailURL, Artifact_Name FROM Artifact');
      if (filter) {
        artifacts = artifacts.filter(
          (a) => a.Artifact_Name.toLowerCase().includes(filter.toLowerCase()) ||
          a.Topic.toLowerCase().includes(filter.toLowerCase()),
        );
      }
      res.json(artifacts);
    } catch (e) {
      console.log(e);
      res
        .status(500)
        .send('Internal Server Error - Could not get artifacts from database.');
    }

  };

  getPopularArtifacts = async(req, res) => {
    let topic = req.params.topic;
    try {
      let artifacts = await this.db.all(
        // eslint-disable-next-line max-len
        `
        SELECT
          r.Artifact_id,
          a.Topic,
          a.ThumbnailURL,
          a.Artifact_Name,
          AVG(Value) avg_rating
        FROM
          Rating r
          INNER JOIN
          Artifact a ON a.Artifact_id=r.Artifact_id
        WHERE
          a.Topic=?
        GROUP BY
          r.Artifact_id
        ORDER BY
          avg_rating DESC
        `,
        [topic],
      );
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
      let average = await this.db.get(`
        SELECT
          avg(Value) as average
        FROM
          Rating
        WHERE
          Artifact_id=?
      `, [id]);
      let counts = await this.db.get(`
          SELECT
            count(*) AS total,
            sum(case when Value=1 then 1 else 0 end) AS "1",
            sum(case when Value=2 then 1 else 0 end) AS "2",
            sum(case when Value=3 then 1 else 0 end) AS "3",
            sum(case when Value=4 then 1 else 0 end) AS "4",
            sum(case when Value=5 then 1 else 0 end) AS "5"
          FROM
            Rating
          WHERE
            Artifact_id=?
        `, [id],
      );
      res.json({...average, counts: counts});
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
      res.status(500).send('Internal Server Error - Could not login.');
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
