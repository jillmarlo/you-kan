const supertest = require('supertest');
const app = require('../../app.js');
const sequelize = require('../../db/db-connector.js');
const { User, Project, Sprint, Task, Subtask } = require('../../models');

let server;

describe('Subtask API', () => {
    let user;
    let project;
    let sprint;
    let task;
    let subtask;

    beforeAll(async () => {
        await sequelize.authenticate();
        await sequelize.sync({ force: true });
        server = app.listen(0, () => {
            console.log('Test server running on random port');
        });
        
        request = supertest(server)

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

        sprint = await Sprint.create({
            sprint_name: 'Sprint 1',
            project_id: project.project_id,
        });

        task = await Task.create({
            task_title: 'Task 1',
            project_id: project.project_id,
            sprint_id: sprint.sprint_id,
            priority: 'High',
            status: 'Open',
            effort: 2,
            creator_user_id: user.user_id,
            task_type: 'Backend',
        });
    });

    afterAll((done) => {
        server.close(async () => {
            await sequelize.close();
            done();
        });
    });
    describe('POST /api/subtasks', () => {
        it('should create a new subtask', async () => {
            const res = await request.post('/api/subtasks').send({
                task_id: task.task_id,
                subtask_description: 'Subtask 1',
            });
            expect(res.status).toBe(201);
            subtask = res.body;
            expect(subtask.subtask_description).toBe('Subtask 1');
        });
    });

    describe('GET /api/subtasks', () => {
        it('should fetch all subtasks', async () => {
            const res = await request.get('/api/subtasks');
            expect(res.status).toBe(200);
            expect(res.body).toHaveLength(1);
            expect(res.body[0].subtask_description).toBe('Subtask 1');
        });

        it('should fetch subtasks by task_id', async () => {
            const res = await request.get(`/api/subtasks?task_id=${task.task_id}`);
            expect(res.status).toBe(200);
            expect(res.body).toHaveLength(1);
            expect(res.body[0].task_id).toBe(task.task_id);
        });
    });

    describe('GET /api/subtasks/:id', () => {
        it('should fetch a subtask by ID', async () => {
            const res = await request.get(`/api/subtasks/${subtask.subtask_id}`);
            expect(res.status).toBe(200);
            expect(res.body.subtask_description).toBe('Subtask 1');
        });
    });

    describe('PUT /api/subtasks/:id', () => {
        it('should update an existing subtask', async () => {
            const res = await request.put(`/api/subtasks/${subtask.subtask_id}`).send({
                subtask_description: 'Updated Subtask 1',
            });
            expect(res.body && typeof res.body === 'object').toBe(true);
            expect(res.status).toBe(200);
            expect(res.body.subtask_description).toBe('Updated Subtask 1');
        });
        
        it('should not update a non-existing subtask', async () => {
            const NON_EXISTING_SUBTASK_ID = 7;
            const res = await request.put(`/api/subtasks/${NON_EXISTING_SUBTASK_ID}`).send({
                subtask_description: `Updated Subtask ${NON_EXISTING_SUBTASK_ID}`,
            });
            expect(res.status).toBe(404);
        });
    });

    describe('DELETE /api/subtasks/:id', () => {
        it('should delete an existing subtask', async () => {
            const res = await request.delete(`/api/subtasks/${subtask.subtask_id}`);
            expect(res.status).toBe(204);
        });

        it('should not find the deleted subtask', async () => {
            const res = await request.get(`/api/subtasks/${subtask.subtask_id}`);
            expect(res.status).toBe(404);
        });
    });
});
