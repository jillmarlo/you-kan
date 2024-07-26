const request = require('supertest');
const app = require('../../server');
const sequelize = require('../../db/db-connector.js');
const { User, Project, Sprint } = require('../../models');

describe('Task API', () => {
    let user;
    let project;
    let sprint;
    let task;

    beforeAll(async () => {
        await sequelize.authenticate();
        await sequelize.sync({ force: true }); // force DB to be clear before each test

        // dummy user, project, and sprint records
        // TODO: might be better to put these in a separate file so they're reusable
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
    });

    afterAll(async () => {
        await sequelize.close();
    });

    describe('POST /api/tasks', () => {
        it('should create a new task', async () => {
            const res = await request(app).post('/api/tasks').send({
                task_title: 'Task 1',
                sprint_id: sprint.sprint_id,
                priority: 'High',
                status: 'Open',
                effort: 2,
                creator_user_id: user.user_id,
                task_type: 'Backend',
            });
            expect(res.status).toBe(201);
            task = res.body;
            expect(task.task_title).toBe('Task 1');
        });
    });

    describe('GET /api/tasks', () => {
        it('should fetch all tasks', async () => {
            const res = await request(app).get('/api/tasks');
            expect(res.status).toBe(200);
            expect(res.body).toHaveLength(1);
            expect(res.body[0].task_title).toBe('Task 1');
        });

        it('should fetch tasks with status of "Open"', async () => {
            const res = await request(app).get('/api/tasks?status=Open');
            expect(res.status).toBe(200);
            expect(res.body).toHaveLength(1);
            expect(res.body[0].status).toBe('Open');
        });

        it('should fetch tasks with priority iof "High"', async () => {
            const res = await request(app).get('/api/tasks?priority=High');
            expect(res.status).toBe(200);
            expect(res.body).toHaveLength(1);
            expect(res.body[0].priority).toBe('High');
        });
    });

    describe('PUT /api/tasks/:task_id', () => {
        it('should update an existing task', async () => {
            const res = await request(app).put(`/api/tasks/${task.task_id}`).send({
                task_title: 'Updated Task 1',
                priority: 'Medium',
            });
            expect(res.body && typeof res.body === 'object').toBe(true);
            expect(res.status).toBe(200);
            console.log(res.body);
            expect(res.body.task_title).toBe('Updated Task 1');
            expect(res.body.priority).toBe('Medium');
        });
        it('should not update a non-existing task', async () => {
            const NON_EXISTING_TASK_ID = 7;
            const res = await request(app).put(`/api/tasks/${NON_EXISTING_TASK_ID}`).send({
                task_title: `Updated Task ${NON_EXISTING_TASK_ID}`,
                priority: 'Medium',
            });
            expect(res.status).toBe(404);
        });
    });

    describe('DELETE /api/tasks/:task_id', () => {
        it('should delete an existing task', async () => {
            const res = await request(app).delete(`/api/tasks/${task.task_id}`);
            expect(res.status).toBe(204);
        });

        it('should not find the deleted task', async () => {
            const res = await request(app).get(`/api/tasks/${task.task_id}`);
            expect(res.status).toBe(404);
        });
    });
});
