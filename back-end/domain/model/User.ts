import { User as UserPrisma } from '@prisma/client';
import { Role } from '../../types';

export class User {
    readonly id?: number;
    readonly username: string;
    readonly password: string;
    readonly role: Role;

    constructor(user: { id?: number; username: string; password: string; role: Role }) {
        this.validate(user);
        this.id = user.id;
        this.username = user.username;
        this.password = user.password;
        this.role = user.role;
    }

    private validate(user: { username: string; password: string; role: Role }) {
        if (!user.username?.trim()) {
            throw new Error('Username is required');
        }
        if (!user.password?.trim()) {
            throw new Error('Password is required');
        }
        if (user.password.length < 8) {
            throw new Error('Password must be at least 8 characters long');
        }
        if (!user.role) {
            throw new Error('Role is required');
        }
    }

    equals({ id, username, password, role }: User): boolean {
        return (
            this.id === id &&
            this.username === username &&
            this.password === password &&
            this.role === role
        );
    }

    /**
     * Converts a Prisma User object into a Domain User object.
     */
    static from({ id, username, password, role }: UserPrisma): User {
        return new User({
            id,
            username,
            password,
            role: role as Role,
        });
    }
}
