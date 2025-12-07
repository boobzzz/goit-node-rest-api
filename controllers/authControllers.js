import { registerUser, loginUser } from "../services/authServices.js";

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
