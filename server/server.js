//==> REQUESTING DEPENDENCIES
import mongoose from 'mongoose';

//==> CATCHING UNCAUGHT EXCEPTION ERRORS
process.on('uncaughtException', err => {
  console.log('UNCAUGHT EXCEPTION! 🔥  SHUTTING DOWN...');
  console.log(err, err.name, err.message);

  process.exit(1);
});

//==> CONNECTING ENV FILE
import dotenv from 'dotenv';
dotenv.config({ path: `./.env` });

//==> REQUESTING MODULES
import app from './app.js';

//==> CONNECTING THE DATABASE AND STARTING THE SERVER
const port = process.env.PORT || 3001;

mongoose
  .connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(port, () => {
      console.log(
        `==> DATABASE connection established!\n==> SERVER running on port ${port}...`
      );
    });
  })
  .catch(err => console.log(`Database connection error: ${err}`));

process.on('unhandledRejection', err => {
  console.log('UNHANDLED REJECTION! 🔥  SHUTTING DOWN...');
  console.log(err.name, err.message, err);

  server.close(() => {
    process.exit(1);
  });
});

process.on('SIGTERM', () => {
  console.log('SIGTERM RECEIVED! Shutting down gracefully...');

  server.close(() => {
    console.log('Process terminated!');
  });
});
