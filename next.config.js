/** @type {import('next').NextConfig} */

const { PHASE_DEVELOPMENT_SERVER } = require('next/constants');

module.exports = (phase) => {
  if (phase === PHASE_DEVELOPMENT_SERVER) {
    return {
      reactStrictMode: false,
      env: {
        mongodb_username: process.env.MONGODB_USERNAME,
        mongodb_password: process.env.MONGODB_PASSWORD,
        mongodb_clustername: process.env.MONGODB_CLUSTERNAME,
        mongodb_database: process.env.MONGODB_DATABASE_DEV,
      },
    };
  }

  return {
    reactStrictMode: false,
    env: {
      mongodb_username: process.env.MONGODB_USERNAME,
      mongodb_password: process.env.MONGODB_PASSWORD,
      mongodb_clustername: process.env.MONGODB_CLUSTERNAME,
      mongodb_database: process.env.MONGODB_DATABASE,
    },
  };
};
