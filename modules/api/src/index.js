const express   = require('express');
const env       = require('./env');
const routes    = require('./routes');

// ...

const app = express();
app.use(express.json());
app.use('/', routes);

// health check
app.get('/healthz', (_req, res) => {
    res.send('OK');
});

// ...

const server = app.listen(env.port, () => {
    console.log(`Listening on port ${env.port}`)
});

// graceful shutdown
process.on('SIGTERM', () => {
    console.log('API server: Shutting down..');

    server.close(
        () => {
            console.log('API server: Shutdown complete!');
            process.exit(0); 
        }
    );
  });