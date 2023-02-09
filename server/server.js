// import dependencies and initialize express
import express from 'express';
import path from 'path';
import bodyParser from 'body-parser';
import helmet from 'helmet';

import { fileURLToPath } from 'url';

import healthRoutes from './routes/health-route.js';
import apiRoutes from './routes/api-routes.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// if production, enable helmet
/* c8 ignore next 3  */
if (process.env.VCAP_APPLICATION) {
  app.use(helmet());
}

// enable parsing of http request body
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// have node serve the files for our built React app
app.use(express.static(path.resolve(__dirname, '../client/build')));

// routes and api calls
app.use('/health', healthRoutes);
app.use('/api', apiRoutes);

// start node server
const port = process.env.PORT || 3000;
const server = app.listen(port, () => {
  console.log(`App UI available http://localhost:${port}`);
});

// all other GET requests not handled before will return our React app
app.use((req, res, next) => {
  res.sendFile(path.join(__dirname, '../client/build', 'index.html'));
});

export {app, server};
