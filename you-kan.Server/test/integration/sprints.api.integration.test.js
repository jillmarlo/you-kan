const supertest = require('supertest');
const app = require('../../app.js');
const sequelize = require('../../db/db-connector.js');
const { User, Project, Sprint } = require('../../models');

let server;

describe('Sprint API', () => {
    let request;
    let user;
    let project;
    let sprint;

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

        project = await Project.create({
            project_name: 'Project 1',
            creator_user_id: user.user_id,
        });
    });

    afterAll((done) => {
        server.close(async () => {
            await sequelize.close();
            done();
        });
    });

    describe('POST /api/sprints', () => {
        it('should create a new sprint', async () => {
            const res = await request.post('/api/sprints').send({
                sprint_name: 'Sprint 1',
                project_id: project.project_id,
                start_date: new Date(),
                end_date: new Date(),
            });
            expect(res.status).toBe(201);
            sprint = res.body;
            expect(sprint.sprint_name).toBe('Sprint 1');
        });
    });

    describe('GET /api/sprints', () => {
        it('should fetch all sprints for a project', async () => {
            const res = await request.get(`/api/sprints/project/${project.project_id}`);
            expect(res.status).toBe(200);
            expect(res.body).toHaveLength(1);
            expect(res.body[0].sprint_name).toBe('Sprint 1');
        });
    });

    describe('GET /api/sprints/:id', () => {
        it('should fetch a sprint by ID', async () => {
            const res = await request.get(`/api/sprints/${sprint.sprint_id}`);
            expect(res.status).toBe(200);
            expect(res.body.sprint_name).toBe('Sprint 1');
        });
    });

    describe('PUT /api/sprints/:id', () => {
        it('should update an existing sprint', async () => {
            const res = await request.put(`/api/sprints/${sprint.sprint_id}`).send({
                sprint_name: 'Updated Sprint 1',
            });
            expect(res.body && typeof res.body === 'object').toBe(true);
            expect(res.status).toBe(200);
            expect(res.body.sprint_name).toBe('Updated Sprint 1');
        });

        it('should not update a non-existing sprint', async () => {
            const NON_EXISTING_SPRINT_ID = 7;
            const res = await request.put(`/api/sprints/${NON_EXISTING_SPRINT_ID}`).send({
                sprint_name: `Updated Sprint ${NON_EXISTING_SPRINT_ID}`,
            });
            expect(res.status).toBe(404);
        });
    });

    describe('DELETE /api/sprints/:id', () => {
        it('should delete an existing sprint', async () => {
            const res = await request.delete(`/api/sprints/${sprint.sprint_id}`);
            expect(res.status).toBe(204);
        });

        it('should not find the deleted sprint', async () => {
            const res = await request.get(`/api/sprints/${sprint.sprint_id}`);
            expect(res.status).toBe(404);
        });
    });
});
