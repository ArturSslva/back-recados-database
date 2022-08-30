import { Request } from 'express';
import ErrandsController from '../../src/controllers/errands';
import { CacheRepository } from '../../src/database/repositories/cache';
import { ErrandService } from '../../src/service/errands';

jest.mock('../../src/database/repositories/errands.ts');

const makeSut = () => {
    const service = new ErrandService();
    const cache = new CacheRepository();

    return new ErrandsController(service, cache);
}

describe('Errands Controller', () => {
    beforeEach(() => {
        jest.resetAllMocks();
    });

    describe('INDEX', () => {
        it('should return -', async () => {
            const sut = makeSut();
            const dto = [{
                id: 1,
                content: 'any_content_test'
            }];

            jest.spyOn(ErrandService.prototype, 'find')
                .mockResolvedValue(dto);

                const request = {} as Request;
                const response: any = {
                    json: jest.fn().mockResolvedValue(dto),
                    status: jest.fn()
                };
                
            const responseController = await sut.index(request, response);
            
            expect(responseController).toEqual(dto);
            expect(responseController).toHaveLength(1);
        });

        it('should call CacheRepository -', async () => {
            const sut = makeSut();
            const dto = [{
                id:1,
                content: 'any_content'
            }];

            jest.spyOn(ErrandService.prototype, 'find').mockResolvedValue(dto.map(item => ({...item, id: 1})));

            const getSpy = jest.spyOn(CacheRepository.prototype, 'find').mockResolvedValue(dto);

            const request = {} as Request;
            const response: any = {
                json: jest.fn().mockResolvedValue(dto),
                status: jest.fn()
            };

            await sut.index(request, response);

            expect(getSpy).toBeCalledWith('errands:all');
        });

        it('should return empty list -', async () => {
            const sut = makeSut();
            const dto = [{
                id: 1,
                content: 'any_content_test'
            }];

            jest.spyOn(ErrandService.prototype, 'find')
                .mockResolvedValue(dto);

            const request = {} as Request;
            const response: any = {
                json: jest.fn().mockResolvedValue(null),
                status: jest.fn()
            };

            const responseController = await sut.index(request, response);

            expect(responseController).toBe(null);
        });

        it('should have -', async () => {
            const sut = makeSut();
            const dto = [{
                id: 1,
                content: 'any_content_test'
            }];

            jest.spyOn(ErrandService.prototype, 'find')
                .mockResolvedValue(dto);

                const request = {} as Request;
                const response: any = {
                    json: jest.fn().mockResolvedValue(dto[0]),
                    status: jest.fn()
                };
                
            const responseController = await sut.index(request, response);
            
            expect(responseController).toHaveProperty('content');
            expect(responseController).toHaveProperty('id');

            expect.assertions(2);
        });
        
    });

    describe('STORE', () => {
        it('should store and return stored item -', async () => {
            const sut = makeSut();
            const dto = {
                id: 2,
                content: 'any_content_test'
            };

            jest.spyOn(ErrandService.prototype, 'create')
                .mockResolvedValue(dto);

            const request = {
                body: {
                    id: 2,
                    content: 'TEST'
                }
            } as Request;
            const response: any = {
                json: jest.fn().mockResolvedValue(dto),
                status: jest.fn()
            };

            const responseController = await sut.store(request, response);

            expect(responseController).toBeTruthy();
            expect(responseController).toHaveProperty('content');

            expect.assertions(2);
        });

        it('should store and return stored item  without optional field-', async () => {
            const sut = makeSut();
            const dto = {
                id: 2,
                content: 'any_content_test'
            };

            jest.spyOn(ErrandService.prototype, 'create')
                .mockResolvedValue(dto);

            const request = {
                body: {
                    content: 'TEST'
                }
            } as Request;
            const response: any = {
                json: jest.fn().mockResolvedValue(dto),
                status: jest.fn()
            };

            const responseController = await sut.store(request, response);

            expect(responseController).toBeTruthy();
            expect(responseController).toHaveProperty('content');

            expect.assertions(2);
        });

        it('should return error-', async () => {
            const sut = makeSut();
            const dto = {
                id: 2,
                content: ''
            };

            jest.spyOn(ErrandService.prototype, 'create')
                .mockRejectedValue;

            const request = {
                body: {}
            } as Request;
            const response: any = {
                json: jest.fn().mockResolvedValue(dto),
                status: jest.fn()
            };

            const responseController = await sut.store(request, response);

            expect(responseController).toBeFalsy();
        });

        it('should clean cache -', async () => {
            const sut = makeSut();
            const dto = {
                id: 2,
                content: 'any_content_test'
            };

            jest.spyOn(ErrandService.prototype, 'create')
                .mockResolvedValue(dto);

            const request = {
                body: {
                    content: 'TEST'
                }
            } as Request;
            const response: any = {
                json: jest.fn().mockResolvedValue(dto),
                status: jest.fn()
            };

            const cleanSpy = jest.spyOn(CacheRepository.prototype, 'delete');

            await sut.store(request, response);

            expect(cleanSpy).toBeCalledWith('errands:all');
        });
    });

    describe('UPDATE', () => {
        it('should update and return updated item -', async () => {
            const sut = makeSut();
            const dto = {
                id: 1,
                content: 'any_content'
            };

            jest.spyOn(ErrandService.prototype, 'update')
                .mockResolvedValue(dto);

                const request = {
                    body: {
                        id: 1,
                        content: 'new_content' 
                    }
                } as Request;
                const response: any = { 
                    json: dto,
                    status: jest.fn()
                };

                const responseController = await sut.store(request, response);

                expect(response).toBeTruthy();
                expect(response.json).toStrictEqual(dto);

                expect.assertions(2);
        });

        it('should return error when errand id not number -', async () => {
            const sut = makeSut();
            const dto = {
                id: 'sadasd',
                content: 'any_content'
            };

            jest.spyOn(ErrandService.prototype, 'update')
                .mockRejectedValue;

                const request = {
                    body: {
                        id: 1,
                        content: 'new_content' 
                    }
                } as Request;
                const response: any = { 
                    json: jest.fn().mockResolvedValue(dto),
                    status: jest.fn()
                };

                const responseController = await sut.store(request, response);

                expect(responseController).toBeFalsy();
        });

        it('should clean cache -', async () => {
            const sut = makeSut();
            const dto = {
                id: 2,
                content: 'any_content_test'
            };

            jest.spyOn(ErrandService.prototype, 'update')
                .mockResolvedValue(dto);

            const request = {
                body: {
                    content: 'TEST'
                }
            } as Request;
            const response: any = {
                json: jest.fn().mockResolvedValue(dto),
                status: jest.fn()
            };

            const cleanSpy = jest.spyOn(CacheRepository.prototype, 'delete');

            await sut.store(request, response);

            expect(cleanSpy).toBeCalledWith('errands:all');
        });

    });

    describe('DELETE', () => {
        it('should delete -', async () => {
            const sut = makeSut();

            jest.spyOn(ErrandService.prototype, 'delete');

            const request = {
                params: {
                    id: 1
                }
            } as unknown as Request;
            const response: any = {
                status: jest.fn().mockResolvedValue(204)
            };

            const responseController = await sut.delete(request, response);

            expect(responseController).toBeTruthy();
        });

        it('should return error when delete -', async () => {
            const sut = makeSut();

            jest.spyOn(ErrandService.prototype, 'delete');

            const request = {
                params: {
                    id: 'a'
                }
            } as unknown as Request;
            const response: any = {
                status: jest.fn().mockResolvedValue(204)
            };

            const responseController = await sut.delete(request, response);

            expect(responseController).toStrictEqual(204);
        });

        it('should clean cache -', async () => {
            const sut = makeSut();
            const dto = {
                id: 2,
                content: 'any_content_test'
            };

            jest.spyOn(ErrandService.prototype, 'delete')

            const request = {
                body: {
                    content: 'TEST'
                }
            } as Request;
            const response: any = {
                json: jest.fn().mockResolvedValue(dto),
                status: jest.fn()
            };

            const cleanSpy = jest.spyOn(CacheRepository.prototype, 'delete');

            await sut.store(request, response);

            expect(cleanSpy).toBeCalledWith('errands:all');
            expect(cleanSpy).toBeCalled();

            expect.assertions(2);
        });
    });
    
});