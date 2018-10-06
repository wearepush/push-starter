import dotenv from 'dotenv';

const env = process.env.NODE_ENV;

let dotEnvConfig = {
  path: '.env'
};

if (env === 'production') {
  dotEnvConfig = {
    path: '.env.production'
  };
}

export default dotenv.config(dotEnvConfig);
