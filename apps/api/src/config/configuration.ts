import { z } from "zod";

const envSchema = z.object({
  PORT: z.coerce.number().default(3001),
  DATABASE_URL: z.string().url(),
  WEB_APP_URL: z.string().url().default("http://localhost:3000"),
  JWT_SECRET: z.string().min(16),
});

export type AppConfig = z.infer<typeof envSchema>;

/** Validuje env premenné pri štarte – zlyhá rýchlo namiesto neskoršieho runtime chybného stavu. */
export function loadConfig(): AppConfig {
  return envSchema.parse(process.env);
}
