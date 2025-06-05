import 'dotenv/config';
import * as joi from 'joi';

interface EnvVars {
  PORT: number;
  NODE_ENV: 'development' | 'production' | 'test';
  MONGO_URI: string;
  MONGO_DB: string;
  ORIGIN: string[];
}

const envsSchema = joi
  .object({
    PORT: joi.number().default(3000),
    NODE_ENV: joi
      .string()
      .valid('development', 'production', 'test')
      .default('development'),
    MONGO_URI: joi.string().required(),
    MONGO_DB: joi.string().required(),
    ORIGIN: joi
      .alternatives()
      .try(
        joi.array().items(joi.string().uri()),
        joi.string().custom((value, helpers) => {
          try {
            if (typeof value !== 'string') {
              return helpers.error('any.invalid');
            }
            const parsed = JSON.parse(value);
            if (!Array.isArray(parsed)) {
              return helpers.error('any.invalid');
            }
            return parsed as string[];
          } catch {
            return helpers.error('any.invalid');
          }
        }),
      )
      .default([
        'http://localhost:3000',
        'http://localhost:8000',
        'http://localhost:4321',
      ]),
  })
  .unknown(true);

const { error, value } = envsSchema.validate(process.env);

if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

export const envs: EnvVars = value;
