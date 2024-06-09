import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.join(process.cwd(), ".env") });

export default {
  jwt: {
    secret: process.env.JWT_SECRET as string,
    expires_in: process.env.JWT_EXPIRES_IN as string,
    refresh_secret: process.env.REFRESH_JWT_SECRET as string,
    refresh_expires_in: process.env.REFRESH_JWT_EXPIRES_IN as string,
  },
};
