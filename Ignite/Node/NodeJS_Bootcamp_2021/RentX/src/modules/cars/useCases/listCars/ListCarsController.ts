import { container } from 'tsyringe';
import { Request, Response } from 'express';

import { ListCarsUseCase } from './ListCarsUseCase';

class ListCarsController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { brand, name, category_id } = request.query;

    const listCarsUseCase = container.resolve(ListCarsUseCase);

    const cars = await listCarsUseCase.execute({
      category_id: category_id as string,
      brand: brand as string,
      name: name as string,
    });

    return response.json(cars);
  }
}

export { ListCarsController };
