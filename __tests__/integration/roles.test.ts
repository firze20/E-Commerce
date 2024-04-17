import Role from "../../app/database/models/Role";
import connectDatabase from "../../app/utils/connect";

const dbTeardown = async () => {
    await Role.destroy({ truncate: true, cascade: true, restartIdentity: true });
};

describe('Test Roles', () => {
    beforeAll(async () => {
        await connectDatabase(); // Initialize database connection
    });

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('Should return role details', async () => {
        // Create sample role records
        await Promise.all([
            Role.create({ id: 1, name: 'client', description: "Simple client that can buy items"}),
            Role.create({ id: 2, name: 'moderator', description: "Can buy and add items and stocks for each item"}),
            Role.create({ id: 3, name: 'admin', description: "Can buy, manage items and stocks, and manage users in the database"})
        ]);

        // Mock response for findOne method
        const mockResponse = {
            id: 1,
            name: "client",
            description: "Simple client that can buy items"
        };

        Role.findOne = jest.fn().mockResolvedValue(mockResponse);

        // Call your model method or perform operations here

        // Assert expectations
        // For example:
        // const result = await Role.findById(1);
        // expect(result).toEqual(mockResponse);
    });

    afterAll(async () => {
        await dbTeardown(); // Clean up database after all tests
    });
});
