import database from '../util/database';
import { User } from '../domain/model/User';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

const getAllUsers = async (): Promise<User[]> => {
    try {
        const usersPrisma = await database.user.findMany();
        return usersPrisma.map((userPrisma) => User.from(userPrisma));
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
};

const getUserById = async (id: number): Promise<User | null> => {
    try {
        const userPrisma = await database.user.findUnique({
            where: { id },
        });
        return userPrisma ? User.from(userPrisma) : null;
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
};

const getUserByUsername = async (username: string): Promise<User | null> => {
    const userPrisma = await database.user.findUnique({ where: { username } });
    return userPrisma ? User.from(userPrisma) : null;
};

const createUser = async (user: User): Promise<User> => {
    const existingUser = await getUserByUsername(user.username);
    if (existingUser) {
        throw new Error('Username already taken');
    }

    try {
        const hashedPassword = await bcrypt.hash(user.password, 12);
        const userPrisma = await database.user.create({
            data: {
                username: user.username,
                password: hashedPassword,
                role: user.role,
            },
        });
        return User.from(userPrisma);
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
};

const authenticate = async ({ username, password }: { username: string; password: string }) => {
    try {
        const userPrisma = await database.user.findFirst({ where: { username } });

        if (!userPrisma) {
            console.log('❌ Username not found:', username);
            throw new Error('Invalid username or password');
        }

        const isValidPassword = await bcrypt.compare(password, userPrisma.password);
        if (!isValidPassword) {
            console.log('❌ Password incorrect for user:', username);
            throw new Error('Invalid username or password');
        }

        const token = jwt.sign(
            { username: userPrisma.username, role: userPrisma.role },
            process.env.JWT_SECRET!,
            {
                expiresIn: '24h',
            }
        );

        console.log('✅ User authenticated:', username);
        return {
            token,
            username: userPrisma.username,
            role: userPrisma.role,
        };
    } catch (error) {
        console.error(error);
        throw new Error('Authentication failed.');
    }
};

export default {
    getAllUsers,
    getUserById,
    getUserByUsername,
    createUser,
    authenticate,
};
