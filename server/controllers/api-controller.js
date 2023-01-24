import Sqlite from '../db/connect.js';

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
  getArtifacts_id = async(req, res) => {
    let id = req.params['id'];
    try {
      // eslint-disable-next-line max-len
      let artifacts = await this.db.all(`SELECT * FROM Artifact where Artifact_id=${id}`);
      res.json(artifacts);
    } catch (e) {
      console.log(e);
      res
        .status(500)
        .send('Internal Server Error - Could not get artifacts from database.');
    }

  };
  getArtifacts_Name = async(req, res) => {
    let Name = req.params['Name'];
    try {
      // eslint-disable-next-line max-len
      let artifacts = await this.db.all(`SELECT * FROM Artifact where Artifact_Name=${Name}`);
      res.json(artifacts);
    } catch (e) {
      console.log(e);
      res
        .status(500)
        .send('Internal Server Error - Could not get artifacts from database.');
    }

  };
  getArtifacts_avag = async(req, res) => {
    let id = req.params['id'];
    try {
      // eslint-disable-next-line max-len
      let artifacts = await this.db.all(`SELECT * FROM Artifact where Artifact_id=${id}`);
      res.json(artifacts);
    } catch (e) {
      console.log(e);
      res
        .status(500)
        .send('Internal Server Error - Could not get artifacts from database.');
    }

  };
  login = async(req, res) => {

    let {userName, passWorld} = req.body;
    try {
      // eslint-disable-next-line max-len
      let artifacts = await this.db.all(`SELECT * FROM User where User_name='${userName}' and  Password= '${passWorld}'`);
      res.json(artifacts);
    } catch (e) {
      console.log(e);
      res
        .status(500)
        .send('Internal Server Error - Could not get artifacts from database.');
    }
  };
  register = async(req, res) => {
    let {Email, passWorld, userName} = req.body;
    try {
      // eslint-disable-next-line max-len
      let artifacts = await this.db.all(`SELECT * FROM User where User_name='${userName}' and  Password= '${passWorld}' and Email='${Email}'`);
      res.json(artifacts);
    } catch (e) {
      console.log(e);
      res
        .status(500)
        .send('Internal Server Error - Could not get artifacts from database.');
    }

  };


}


export default APIController;
