import { IUser } from "./user.interface";
import { User } from "./user.model";

const createUserIntoDB = async (payload: IUser) => {
    const newUser = await User.create(payload);
    const result = {
        _id: newUser?._id,
        name: newUser?.name,
        email: newUser?.email,
    };
    return result;
};

export const UserServices = {
    createUserIntoDB,
};
