import jwt from "jsonwebtoken";

export const createToken = (
    jwtPayload: { userEmail: string; userName: string },
    secret: string,
    //   expiresIn: string,
) => {
    return jwt.sign(jwtPayload, secret, {
        expiresIn: "10d",
    });
};
