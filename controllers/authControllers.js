import {registerUser, loginUser, logoutUser, updateAvatar} from "../services/authServices.js";

export const registerController = async (req, res) => {
    const { email, subscription } = await registerUser(req.body);

    res.status(201).json({
        email,
        subscription
    });
}

export const loginController = async (req, res) => {
    const user = await loginUser(req.body);

    res.status(201).json({
        token: user.token,
        user: {
            email: user.email,
            subscription: user.subscription
        }
    });
}

export const getCurrentController = async (req, res) => {
    const { email, subscription } = req.user;

    res.status(200).json({
        email,
        subscription
    });
}

export const logoutController = async (req, res) => {
    await logoutUser(req.user);

    res.status(204).send();
}

export const updateAvatarController = async (req, res) => {
    // console.log('req.file:', req.file);
    // console.log('req.body:', req.body);
    // console.log('req.headers:', req.headers['content-type']);
    const { avatarURL } = await updateAvatar({
        user: req.user,
        file: req.file
    });

    res.status(200).json({
        avatarURL
    });
}
