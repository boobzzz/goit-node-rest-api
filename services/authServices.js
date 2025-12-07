import bcrypt from "bcrypt";
import User from "../db/models/User.js";
import HttpError from "../helpers/HttpError.js";
import { hashPassword } from "../helpers/hashPassword.js";

export const registerUser = async (payload) => {
    const hashedPassword = await hashPassword(payload.password);
    return User.create({ ...payload, password: hashedPassword });
}

export const loginUser = async (payload) => {
    const user = await User.findOne({
        where: {
            email: payload.email
        }
    });
    if (!user) {
        throw HttpError(401, "Email or password is wrong");
    }
    const passwordMatch = await bcrypt.compare(payload.password, user.password);
    if (!passwordMatch) {
        throw HttpError(401, "Email or password is wrong");
    }

    user.token = 'dsvcscsdcs5dcsdcsbfs456sc';
    return user;
}
