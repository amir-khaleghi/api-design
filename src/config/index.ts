import merge from 'lodash.merge';

process.env.NODE_ENV = process.env.NODE_ENV || 'development';
const stage = process.env.STAGE || 'local';

// ─── Dynamic Environment ──────────────────────────── 🟩 ─
// create dynamic config base on environment
let envConfig;

if (stage === 'production') {
  envConfig = require('./prod').default; //interruption between ES6 and previous ver
} else if (stage === 'testing') {
  envConfig = require('./testing').default;
} else {
  envConfig = require('./local').default;
}

// ─── Configuration Object ─────────────────────────── 🟩 ─
export default merge(
  {
    //default config
    stage,
    env: process.env.NODE_ENV,
    port: 3002,
    secrets: {
      jwt: process.env.JWT_SECRET,
      dbUrl: process.env.DATABASE_URL,
    },
  },
  //overwrite the configuration
  envConfig
);
