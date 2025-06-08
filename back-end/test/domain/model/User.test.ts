import { User } from '../../../domain/model/User';
import { Role } from '../../../types';

describe('User Class', () => {
    let validUser: User;

    beforeEach(() => {
        validUser = new User({
            userId: 1,
            username: 'johndoe',
            password: 'password123',
            role: 'user',
        });
    });

    it('should create a user with valid data', () => {
        expect(validUser.getUserId()).toBe(1);
        expect(validUser.getUsername()).toBe('johndoe');
        expect(validUser.getRole()).toBe('user');
    });

    it('should throw an error if username is missing', () => {
        expect(() => {
            new User({
                userId: 2,
                username: '',
                password: 'password123',
                role: 'admin',
            });
        }).toThrow('Username is required');
    });

    it('should throw an error if password is missing', () => {
        expect(() => {
            new User({
                userId: 3,
                username: 'janedoe',
                password: '',
                role: 'admin',
            });
        }).toThrow('Password is required');
    });

    it('should throw an error if role is invalid', () => {
        expect(() => {
            new User({
                userId: 4,
                username: 'janedoe',
                password: 'password123',
                role: 'invalid' as Role, // Cast to Role to force invalid input
            });
        }).toThrow('Role must be either "admin" or "user".');
    });

    it('should validate password correctly', () => {
        expect(validUser.validatePassword('password123')).toBe(true);
        expect(validUser.validatePassword('wrongpassword')).toBe(false);
    });

    it('should update password when valid', () => {
        validUser.updatePassword('newpassword123');
        expect(validUser.validatePassword('newpassword123')).toBe(true);
    });

    it('should throw an error if updated password is too short', () => {
        expect(() => validUser.updatePassword('short')).toThrow(
            'Password must be at least 8 characters long'
        );
    });

    it('should compare two users correctly using equals()', () => {
        const anotherUser = new User({
            userId: 1,
            username: 'johndoe',
            password: 'password123',
            role: 'user',
        });
        expect(validUser.equals(anotherUser)).toBe(true);

        const differentUser = new User({
            userId: 2,
            username: 'janedoe',
            password: 'password123',
            role: 'admin',
        });
        expect(validUser.equals(differentUser)).toBe(false);
    });
});
