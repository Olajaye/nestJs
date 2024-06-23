import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { create } from 'domain';

describe('UserController', () => {
  let controller: UserController;

  const mockUserService = {
    create: jest.fn(dto => {
      return {
        id: Date.now(),
        ...dto
      }
    }),

    update: jest.fn().mockImplementation((id, dto) => {
      return {
        id,
        ...dto
      }
    }),
    findOne: jest.fn((id) => {
      return {
        id,
      }
    })

  }


  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [UserService]
    }).overrideProvider(UserService).useValue(mockUserService).compile();

    controller = module.get<UserController>(UserController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it("it should create a user", () => {
    
    expect(controller.create({ name: "Gbolahan", email: "olajaye@gmail.com", role: "ADMIN" })).toEqual({
      id: expect.any(Number), name: "Gbolahan",
      email:"olajaye@gmail.com", role: "ADMIN"
    })

    expect(mockUserService.create).toHaveBeenCalledWith({ name: "Gbolahan", email: "olajaye@gmail.com", role: "ADMIN" })
  })


  it("should update a user", () => {
    const dto = {name: "gbolahan"}
    
    expect(controller.update( 1, dto)).toEqual({
      id: 1,
      ...dto
    })

    expect(mockUserService.update).toHaveBeenCalled()
  })


  it("should find a user", () => {
    const dto = { name: "Gbolahan", email: "olajaye@gmail.com", role: "ADMIN" }
    expect(controller.findOne(1)).toEqual({
      id: 1,
    })
  })
});
