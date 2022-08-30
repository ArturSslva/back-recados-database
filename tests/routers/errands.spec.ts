import request from 'supertest';
import Application from '../../src/app';
import { ErrandService } from '../../src/service/errands';

jest.mock('../../src/service/errands');

// jest.setTimeout(90000);

describe('Errand Router', () => {
    const application = new Application();
    application.init();

    beforeEach(() => {
        jest.resetAllMocks();
    });

    describe('POST /errands', () => {
        it('should return 200 -', async () => {
            const dto = {
                id: 1,
                content: 'any_content'
            }

            jest.spyOn(ErrandService.prototype, 'create').mockResolvedValue(dto);
            
            await request(application.server).post('/errands')
                .send({
                    content: 'new_content'
                }).expect(200);
        });

        it('should return 400...', async () => {
            await request(application.server).post('/errands')
                .send({content : null})
                    .expect(400);
                    
            const result = await request(application.server).post('/errands')
                .send({
                    content: 'a'
                });

            expect(result.status).toBe(400);
        });
    });
});