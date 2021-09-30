const express = require('express');
const cors = require('cors');
const morgan = require('morgan'); //요청 정보 로깅
const helmet = require('helmet'); // 보안에 필요한 옵션을 헤더에 추가
const express_error = require('express-async-errors');
const tweetsRoutes = require('./router/tweets');
const authRoutes = require('./router/auth');
const { config } = require('./config');
// 바디 파서 사용

const app = express();

app.use(express.json());
app.use(helmet());
app.use(cors());
app.use(morgan('tiny'));

app.use('/tweets', tweetsRoutes);
app.use('/auth', authRoutes);

app.use((req, res, next) => {
  res.sendStatus(404);
});
app.use((error, req, res, next) => {
  console.error(error);
  res.sendStatus(500);
});
app.listen(config.host.port);
