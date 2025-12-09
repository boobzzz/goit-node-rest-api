import {
    registerUser,
    verifyEmail,
    loginUser,
    logoutUser,
    updateAvatar
} from "../services/authServices.js";

export const registerController = async (req, res) => {
    const { email, subscription } = await registerUser(req.body);

    res.status(201).json({
        email,
        subscription
    });
}

export const verifyController = async (req, res) => {
    const { verificationToken } = req.params;
    await verifyEmail(verificationToken);

    res.status(200).json({
        message: "Verification successful"
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
    const { avatarURL } = await updateAvatar({
        user: req.user,
        file: req.file
    });

    res.status(200).json({
        avatarURL
    });
}
