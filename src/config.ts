import env from './env';

// check if env file exists
if (!env) {
  throw new Error('Env file not found');
}

export default env;
