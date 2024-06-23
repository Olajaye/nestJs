import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';

describe('UserService', () => {
  let service: UserService;

  // const mockUserService = {

  // }
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserService],
    }).compile();

    service = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it("should create a new user", () => {
    const dto = { name: "gbolahan", role: "ADMIN", email: "olajaye@gmail.com", id: expect.any(Number) }
    
    expect(service.create({ name: "gbolahan",email: "olajaye@gmail.com", role: "ADMIN" })).toEqual({
      ...dto
    })
  })

  it("should delete a user",  async () => {
    const dto = { name: "Gbolahan", role: "INTERN", email: "Olajaye@gmail.com", }

    expect(await service.delete(1)).toEqual({
      id: 1,
      ...dto
    })
  })
 
});
