import bcrypt from 'bcrypt';
import { HASH_SALT_ROUNDS } from "src/lib/constants/hash";

export const hashPassword = async (password: string) => {
    const salt = await bcrypt.genSalt(HASH_SALT_ROUNDS);
    return await bcrypt.hash(password, salt);
};

export const comparePassword = async (password: string, hash: string) => {
    const hashedPassword = await hashPassword(password);
    return await bcrypt.compare(hashedPassword, hash);
};
