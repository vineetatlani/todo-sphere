import mongoose from 'mongoose';
import { Application } from './declarations';
import logger from './logger';

export default function (app: Application): void {
  const uri = app.get('mongodb');
  mongoose.set("strictQuery", false);

  mongoose.connect(uri).catch(err => {
    logger.error(err);
    process.exit(1);
  });

  app.set('mongooseClient', mongoose);
}
