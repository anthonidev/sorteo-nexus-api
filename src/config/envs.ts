import 'dotenv/config';

import * as joi from 'joi';

interface EnvVars {
  PORT: number;
  MONGO_URI: string;
  MONGO_DB: string;
}

const envsSchema = joi
  .object({
    PORT: joi.number().required(),
    MONGO_URI: joi.string().required(),
    MONGO_DB: joi.string().required(),
  })
  .unknown(true);

const { error, value } = envsSchema.validate(process.env, {
  allowUnknown: true,
});

if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

const envVars: EnvVars = value;

export const envs = {
  port: envVars.PORT,
  mongoUri: envVars.MONGO_URI,
  mongoDb: envVars.MONGO_DB,
};
