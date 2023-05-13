// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';



const { Variables, Model } = initSchema(schema);

export {
  Variables,
  Model
};