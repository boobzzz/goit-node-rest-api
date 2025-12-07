import bcrypt from "bcrypt";
import User from "../db/models/User.js";
import HttpError from "../helpers/HttpError.js";
import { hashPassword } from "../helpers/hashPassword.js";
import { createToken } from "../helpers/jwt.js";

export const registerUser = async (payload) => {
    const hashedPassword = await hashPassword(payload.password);
    return User.create({ ...payload, password: hashedPassword });
}

export const loginUser = async ({ email, password }) => {
    const user = await findUser({ email });
    if (!user) {
        throw HttpError(401, "Email or password is wrong");
    }
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
        throw HttpError(401, "Email or password is wrong");
    }

    user.token = createToken({ id: user.id });
    return user;
}

export const findUser = (where) => {
    return User.findOne({ where });
}
