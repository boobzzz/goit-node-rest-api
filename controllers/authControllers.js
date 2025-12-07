import { registerUser } from "../services/authServices.js";

export const registerController = async (req, res) => {
    const { email, subscription } = await registerUser(req.body);

    res.status(201).json({
        email,
        subscription
    });
}