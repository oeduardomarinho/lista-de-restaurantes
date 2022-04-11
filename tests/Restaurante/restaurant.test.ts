/* eslint-disable global-require */
import { Sequelize } from 'sequelize-typescript';

import {
  Horario,
  Restaurante,
} from '../../src/apps/Restaurante/Restaurante.entity';
import { RestauranteService } from '../../src/apps/Restaurante/RestauranteService';
import { Produto } from '../../src/apps/Produto/Produto.entity';

describe('RestaurantService Module Tests', () => {
  let mockedSequelize: Sequelize;

  beforeEach(async () => {
    mockedSequelize = new Sequelize({
      models: [Restaurante, Produto],
      repositoryMode: true,
      validateOnly: true,
    });
    await mockedSequelize.sync({ force: true });
  });

  afterEach(async () => {
    jest.clearAllMocks();
    await mockedSequelize.close();
  });

  test('should create a Restaurant', async () => {
    const restaurantService: RestauranteService = new RestauranteService(
      mockedSequelize.getRepository(Restaurante)
    );
    jest.spyOn(restaurantService, 'create');
    const req = {
      name: 'Lanchonete',
      address: 'Rua sem nome',
      work_schedule: [
        { day: 'mon', openingTime: [12, 0], closingTime: [12, 30] } as Horario,
      ] as Horario[],
    } as Restaurante;

    const restaurantCreated = await restaurantService.create(req);

    expect(restaurantService.create).toHaveBeenCalledTimes(1);
    expect(restaurantCreated).toBeDefined();
    expect(restaurantCreated.id).toEqual(1);
  });

  test('should update a Restaurant', async () => {
    const restaurantService: RestauranteService = new RestauranteService(
      mockedSequelize.getRepository(Restaurante)
    );
    jest.spyOn(restaurantService, 'update');
    const req = {
      name: 'Lanchonete' as string,
      address: 'Rua sem nome' as string,
      work_schedule: [
        { day: 'mon', openingTime: [12, 0], closingTime: [12, 30] } as Horario,
      ] as Horario[],
    } as Restaurante;

    const updateReq = {
      ...req,
      work_schedule: [
        { day: 'sun', openingTime: [11, 0], closingTime: [15, 30] } as Horario,
        { day: 'mon', openingTime: [9, 30], closingTime: [14, 30] } as Horario,
        { day: 'tue', openingTime: [9, 30], closingTime: [14, 30] } as Horario,
        { day: 'wed', openingTime: [9, 30], closingTime: [14, 30] } as Horario,
        { day: 'thu', openingTime: [9, 30], closingTime: [14, 30] } as Horario,
        { day: 'fri', openingTime: [9, 30], closingTime: [14, 30] } as Horario,
        { day: 'sat', openingTime: [11, 0], closingTime: [15, 30] } as Horario,
      ] as Horario[],
    } as Restaurante;

    const restaurantCreated = await restaurantService.create(req);
    expect(restaurantCreated.id).toBe(1);

    const restaurantUpdated = await restaurantService.update(1, updateReq);
    expect(restaurantService.update).toHaveBeenCalledTimes(1);
    expect(restaurantUpdated).toBeUndefined();

    const recoveredRestaurant = await restaurantService.findOne(1);

    expect(recoveredRestaurant.name).toBe(req.name);
    expect(recoveredRestaurant.work_schedule).toBe(
      '{"day":"sun","openingTime":[11,0],"closingTime":[15,30]},' +
        '{"day":"mon","openingTime":[9,30],"closingTime":[14,30]},' +
        '{"day":"tue","openingTime":[9,30],"closingTime":[14,30]},' +
        '{"day":"wed","openingTime":[9,30],"closingTime":[14,30]},' +
        '{"day":"thu","openingTime":[9,30],"closingTime":[14,30]},' +
        '{"day":"fri","openingTime":[9,30],"closingTime":[14,30]},' +
        '{"day":"sat","openingTime":[11,0],"closingTime":[15,30]}'
    );
  });

  test('should find only one a Restaurant', async () => {
    const restaurantService = new RestauranteService(
      mockedSequelize.getRepository(Restaurante)
    );
    jest.spyOn(restaurantService, 'findOne');
    const req = {
      name: 'Lanchonete' as string,
      address: 'Rua sem nome' as string,
      work_schedule: [
        { day: 'mon', openingTime: [12, 0], closingTime: [12, 30] } as Horario,
      ] as Horario[],
    } as Restaurante;

    await restaurantService.create(req);
    
    const findOneReq = { id: 1 } as { id: number };
    const restaurantFinded = await restaurantService.findOne(findOneReq.id);
    expect(restaurantService.findOne).toHaveBeenCalledTimes(1);
    expect(restaurantFinded).toBeDefined();
  });

  test('should find all Restaurant instances', async () => {
    const restaurantService: RestauranteService = new RestauranteService(
      mockedSequelize.getRepository(Restaurante)
    );
    jest.spyOn(restaurantService, 'list');
    const reqs = [
      {
        name: 'Lanchonete' as string,
        address: 'Rua sem nome' as string,
        work_schedule: [
          {
            day: 'mon',
            openingTime: [12, 0],
            closingTime: [12, 30],
          } as Horario,
        ] as Horario[],
      } as Restaurante,
      {
        name: 'Foodtruck' as string,
        address: 'Rua atrás da rua sem nome' as string,
        work_schedule: [
          {
            day: 'mon',
            openingTime: [12, 0],
            closingTime: [12, 30],
          } as Horario,
        ] as Horario[],
      } as Restaurante,
    ] as Restaurante[];

    reqs.forEach(async (req:Restaurante) => {
      await restaurantService.create(req);
    })
    
    const restaurants = await restaurantService.list() as Restaurante[];
    expect(restaurants).toBeDefined();
    
    expect(restaurantService.list).toHaveBeenCalledTimes(1);
    expect(restaurants.map((restaurant:Restaurante) => restaurant.id)).toEqual([1, 2]);
  });

  test('should delete a Restaurant', async () => {
    const restaurantService: RestauranteService = new RestauranteService(
      mockedSequelize.getRepository(Restaurante)
    );
    jest.spyOn(restaurantService, 'delete');
    const req = {
      name: 'Lanchonete',
      address: 'Rua sem nome',
      work_schedule: [
        { day: 'mon', openingTime: [12, 0], closingTime: [12, 30] } as Horario,
      ] as Horario[],
    } as Restaurante;

    await restaurantService.create(req);

    const deleteCount = await restaurantService.delete(1);

    expect(deleteCount).toEqual(1);
  });
});
