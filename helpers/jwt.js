import jwt from "jsonwebtoken";

export const createToken = (payload) => {
    return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "24h" });
};

export const verifyToken = (token) => {
    try {
        const data = jwt.verify(token, process.env.JWT_SECRET);
        return { data, error: null };
    } catch (error) {
        return { error, data: null }
    }
};
