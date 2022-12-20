class APIController {
  getArtifacts = (req, res) => {
    console.log('APIController - getArtifacts');
    res.json({Test: 123}); // TODO send list of artifacts.
  };
}

export default APIController;
