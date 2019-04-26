import '@babel/polyfill';
import express from 'express';
import bodyParser from 'body-parser';
import swaggerUi from 'swagger-ui-express';
import cors from 'cors';
import router from './server_db/routes/index';
import swaggerdoc from './swagger';

const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.json());
app.use(router);
app.use('/swagger', swaggerUi.serve, swaggerUi.setup(swaggerdoc));

app.get('/', (req, res) => {
  res.send(' Julius Welcome\'s you to Banka');
});

app.use('*', (req, res) => res.status(404).json({
  status: '404',
  message: 'route not found',
}));

const port = process.env.PORT || 8080;

app.listen(port, () => { console.log(`Listening on port ${port}`); });

export default app;
