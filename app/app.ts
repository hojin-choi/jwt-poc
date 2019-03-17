import * as config from 'config';
import * as cors from 'cors';
import * as express from 'express';
import * as http from 'http';

import router from './routes';

const project = config.get<string>('project');

const app = express();
app.use(cors({
  origin: 'http://localhost:3001',
}));

app.use('/', router);

const server = http.createServer(app);
server.keepAliveTimeout = 70000;

server.on('error', (error) => {
  console.log(error.toString());
});

server.listen(process.env.PORT || 7201, () => {
  console.log(`[${new Date().toISOString()}] [${project}] Started`);
});

let shutdowning = false;
function shutdown() {
  if (shutdowning) {
    return;
  }
  console.log(`[${new Date().toISOString()}] [${project}] Shutdown`);
  shutdowning = true;

  // 60초간 끝나지 않으면 강제 종료
  setTimeout(() => {
    console.log(`[${new Date().toISOString()}] [${project}] Terminated by force`);
    process.exit(0);
  }, 60 * 1000);

  server.close(() => {
    console.log(`[${new Date().toISOString()}] [${project}] Terminate`);
    process.exit(0);
  });
}

process.on('SIGHUP', shutdown);
process.on('SIGTERM', shutdown);
process.on('SIGINT', shutdown);
