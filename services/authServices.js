import User from "../db/models/User.js";
import { hashPassword } from "../helpers/hashPassword.js";

export const registerUser = async (payload) => {
    const hashedPassword = await hashPassword(payload.password);
    return User.create({ ...payload, password: hashedPassword });
}
