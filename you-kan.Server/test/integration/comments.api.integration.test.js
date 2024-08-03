const supertest = require('supertest');
const app = require('../../app.js');
const sequelize = require('../../db/db-connector.js');
const { User, Project, Task, Comment } = require('../../models');

let server;

describe('Comment API', () => {
    let request;
    let user;
    let project;
    let task;
    let comment;

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

        task = await Task.create({
            task_title: 'Task 1',
            project_id: project.project_id,
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

    describe('POST /api/comments', () => {
        it('should create a new comment', async () => {
            const res = await request.post('/api/comments').send({
                task_id: task.task_id,
                comment_text: 'Comment 1',
                user_id: user.user_id,
            });
            expect(res.status).toBe(201);
            comment = res.body;
            expect(comment.comment_text).toBe('Comment 1');
        });
    });

    describe('GET /api/comments', () => {
        it('should fetch all comments', async () => {
            const res = await request.get('/api/comments');
            expect(res.status).toBe(200);
            expect(res.body).toHaveLength(1);
            expect(res.body[0].comment_text).toBe('Comment 1');
        });

        it('should fetch comments by task_id', async () => {
            const res = await request.get(`/api/comments?task_id=${task.task_id}`);
            expect(res.status).toBe(200);
            expect(res.body).toHaveLength(1);
            expect(res.body[0].task_id).toBe(task.task_id);
        });
    });

    describe('GET /api/comments/:id', () => {
        it('should fetch a comment by ID', async () => {
            const res = await request.get(`/api/comments/${comment.comment_id}`);
            expect(res.status).toBe(200);
            expect(res.body.comment_text).toBe('Comment 1');
        });
    });

    describe('PUT /api/comments/:id', () => {
        it('should update an existing comment', async () => {
            const res = await request.put(`/api/comments/${comment.comment_id}`).send({
                comment_text: 'Updated Comment 1',
            });
            expect(res.body && typeof res.body === 'object').toBe(true);
            expect(res.status).toBe(200);
            expect(res.body.comment_text).toBe('Updated Comment 1');
        });
        
        it('should not update a non-existing comment', async () => {
            const NON_EXISTING_COMMENT_ID = 7;
            const res = await request.put(`/api/comments/${NON_EXISTING_COMMENT_ID}`).send({
                comment_text: `Updated Comment ${NON_EXISTING_COMMENT_ID}`,
            });
            expect(res.status).toBe(404);
        });
    });

    describe('DELETE /api/comments/:id', () => {
        it('should delete an existing comment', async () => {
            const res = await request.delete(`/api/comments/${comment.comment_id}`);
            expect(res.status).toBe(204);
        });

        it('should not find the deleted comment', async () => {
            const res = await request.get(`/api/comments/${comment.comment_id}`);
            expect(res.status).toBe(404);
        });
    });
});
