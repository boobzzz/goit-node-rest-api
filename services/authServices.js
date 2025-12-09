import path from "node:path";
import fs from 'node:fs/promises';
import bcrypt from "bcrypt";
import User from "../db/models/User.js";
import HttpError from "../helpers/HttpError.js";
import { hashPassword } from "../helpers/hashPassword.js";
import { getUserAvatarURL } from "../helpers/avatar.js";
import { createToken, verifyToken } from "../helpers/jwt.js";
import { sendMail, getVerificationLink } from "../helpers/sendMail.js";

const avatarsDir = path.resolve("public", "avatars");

export const registerUser = async (payload) => {
    const password = await hashPassword(payload.password);
    const avatarURL = await getUserAvatarURL(payload.email);
    const user = await User.create({
        ...payload,
        password,
        avatarURL,
        verificationToken: createToken({ email: payload.email })
    });

    const verificationParams = {
        to: payload.email,
        subject: "Email verification",
        html: getVerificationLink(user.verificationToken),
    };

    await sendMail(verificationParams);

    return user;
}

export const verifyEmail = async (token) => {
    const { data, error } = verifyToken(token);
    if (error) {
        throw HttpError(404, "User not found");
    }

    const user = await findUser({ email: data.email });
    if (user.verify) {
        throw HttpError(400, "Verification has already been passed");
    }
    await user.update({
        verify: true,
        verificationToken: null
    });
}

export const loginUser = async ({ email, password }) => {
    const user = await findUser({ email });
    if (!user) {
        throw HttpError(401, "Email or password is wrong");
    }
    if (!user.verify) {
        throw HttpError(401, "Email is not verified");
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
        throw HttpError(401, "Email or password is wrong");
    }

    await user.update({
        token: createToken({ id: user.id })
    });
    return user;
}

export const logoutUser = async (user) => {
    await user.update({ token: null });
    return user;
}

export const updateAvatar = async ({ user, file }) => {
    if (!file) {
        throw HttpError(400, "File not uploaded");
    }

    const { path: tempUpload, originalname } = file;
    const filename = `${user.id}_${originalname}`;
    const resultUpload = path.join(avatarsDir, filename);

    await fs.rename(tempUpload, resultUpload);

    const newAvatarURL = path.join("avatars", filename).replace(/\\/g, "/");
    await user.update({ avatarURL: newAvatarURL });
    return user;
}

export const findUser = (where) => {
    return User.findOne({ where });
}
