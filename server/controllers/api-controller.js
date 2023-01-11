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
}

export default APIController;
