/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-console */
import express from 'express';
import colors from 'colors';
import routes from './routes/index';

const app = express();

app.use(express.json());
app.use(routes);

app.listen(1919, () => {
  console.log(colors.blue(`Server it's running!! In port 1919!`));
});
