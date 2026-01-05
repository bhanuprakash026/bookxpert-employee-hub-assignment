import type { LoginCredentials, User } from "../types/auth"
// Mock users for authentication
const MOCK_USERS = [
    { id: 1, email: 'admin@company.com', password: 'password123', name: 'Admin User' },
    { id: 2, email: 'hr@company.com', password: 'password123', name: 'HR Manager' },
];

export const authService = {
    login: async (credentials: LoginCredentials): Promise<User> => {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 800));

        const user = MOCK_USERS.find(
            u => u.email === credentials.email && u.password === credentials.password
        );

        if (!user) {
            throw new Error('Invalid email or password');
        }

        return { id: user.id, email: user.email, name: user.name };
    },
};
