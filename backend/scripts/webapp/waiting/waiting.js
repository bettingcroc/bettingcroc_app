import express from 'express'
import { __dirname } from '../../config.js'

const app = express();
const port = process.env.PORT || 4004;

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/webapp/waiting/waiting.html');
});
app.get('/waiting.css', (req, res) => {
  res.sendFile(__dirname + '/webapp/waiting/waiting.css');
});
app.get('/image', (req, res) => {
  res.sendFile(__dirname + '/webapp/waiting/home.png');
});
app.get('/poppins', (req, res) => {
  res.sendFile(__dirname + '/webapp/waiting/Poppins-Regular.ttf');
});
app.get('/poppinsbold', (req, res) => {
  res.sendFile(__dirname + '/webapp/waiting/Poppins-Bold.ttf');
});
app.listen(port, () => {
  console.log(`Server started at http://localhost:${port}`);
});