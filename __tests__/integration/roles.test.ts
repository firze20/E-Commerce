import createServer from "../../app/utils/server";
import Role from "./../../app/database/models/Role";
import connectDatabase from "../../app/utils/connect";



connectDatabase();

const dbTeardown = async () => {
    await Role.destroy({ truncate: true, cascade: true, restartIdentity: true });
}

describe('Test Roles', () => {
    beforeAll(async () => {
        await Promise.all([
            Role.create({ id: 1, name: 'client', description: "Simple client that can buy items"}),
            Role.create({ id: 2, name: 'moderator', description: "Can buy and add items and stocks for each item"}),
            Role.create({ id: 3, name: 'admin', description: "Can buy, manage items and stocks, and manage users in the database"})
        ])
    })

    it('Should return role details', async () => {
        const roleId = 1;

        const mockResponse = {
            id: 1,
            name: "client",
            description: "Simple client that can buy items"
        }

        Role.findOne = jest.fn().mockResolvedValue(mockResponse);

        //act

        
    })

    afterAll(async () => {
        await dbTeardown();
    })
})