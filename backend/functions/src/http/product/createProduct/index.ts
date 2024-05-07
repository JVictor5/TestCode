import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { CreateProductUseCase } from './CreateProductUseCase.js';
import { createProductValidation } from './CreateProductValidation.js';

export async function handleCreateUser(request: Request, response: Response): Promise<Response> {
  const body = createProductValidation.parse(request.body);

  const createProduct = container.resolve(CreateProductUseCase);

  const id = await createProduct.execute(body);

  return response.status(201).json({
    id
  });
}
