const supertest = require('supertest');
const app = require('../../app.js');
const sequelize = require('../../db/db-connector.js');
const { User, Project } = require('../../models');

describe('Project API', () => {
    let server;
    let request;
    let user;
    let project;

    beforeAll(async () => {
        await sequelize.authenticate();
        await sequelize.sync({ force: true });
        server = app.listen(0, () => {
            console.log('Test server running on random port');
        });
        request = supertest(server);

        user = await User.create({
            first_name: 'John',
            last_name: 'Doe',
            email: 'john@example.com',
            password_hash: 'somehashedpassword',
        });
    });

    afterAll((done) => {
        server.close(async () => {
            await sequelize.close();
            done();
        });
    });

    describe('POST /api/projects', () => {
        it('should create a new project', async () => {
            const res = await request.post('/api/projects').send({
                project_name: 'Project 1',
                creator_user_id: user.user_id,
            });
            expect(res.status).toBe(201);
            project = res.body;
            expect(project.project_name).toBe('Project 1');
        });
    });

    describe('GET /api/projects/user/:userId', () => {
        it('should fetch projects by user ID', async () => {
            const res = await request.get(`/api/projects/user/${user.user_id}`);
            expect(res.status).toBe(200);
            expect(res.body).toHaveLength(1);
            expect(res.body[0].project_name).toBe('Project 1');
        });
    });

    describe('GET /api/projects/:id', () => {
        it('should fetch a project by ID', async () => {
            const res = await request.get(`/api/projects/${project.project_id}`);
            expect(res.status).toBe(200);
            expect(res.body.project_name).toBe('Project 1');
        });
    });

    describe('PUT /api/projects/:id', () => {
        it('should update an existing project', async () => {
            const res = await request.put(`/api/projects/${project.project_id}`).send({
                project_name: 'Updated Project 1',
            });
            expect(res.body && typeof res.body === 'object').toBe(true);
            expect(res.status).toBe(200);
            expect(res.body.project_name).toBe('Updated Project 1');
        });
        
        it('should not update a non-existing project', async () => {
            const NON_EXISTING_PROJECT_ID = 7;
            const res = await request.put(`/api/projects/${NON_EXISTING_PROJECT_ID}`).send({
                project_name: `Updated Project ${NON_EXISTING_PROJECT_ID}`,
            });
            expect(res.status).toBe(404);
        });
    });

    describe('DELETE /api/projects/:id', () => {
        it('should delete an existing project', async () => {
            const res = await request.delete(`/api/projects/${project.project_id}`);
            expect(res.status).toBe(204);
        });

        it('should not find the deleted project', async () => {
            const res = await request.get(`/api/projects/${project.project_id}`);
            expect(res.status).toBe(404);
        });
    });
});
