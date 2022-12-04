import bcrypt from "bcrypt";

const saltRounds = 11;

export const hashPassword = async (plainTextPassword: string) => {
    const hashedPassword = await bcrypt.hash(plainTextPassword, saltRounds);
    return hashedPassword;
}

export const checkPassword = async (plainTextPassword: string, hashedPassword: string): Promise<boolean> => {
    const isValid = await bcrypt.compare(plainTextPassword, hashedPassword);
    return isValid;
}