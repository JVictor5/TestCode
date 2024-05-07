import { ApiError } from '@burand/functions/exceptions';
import { AddDocument } from '@burand/functions/typings';
import { singleton } from 'tsyringe';

import { Product } from '@models/Product.js';

import { ProductRepository } from '@repositories/ProductRepository.js';
import { ProductParams } from './CreateProductValidation.js';

@singleton()
export class CreateProductUseCase {
  constructor(private _product: ProductRepository) {}

  async execute({ name, resumo, categoryId, priece, avatar }: ProductParams): Promise<string> {
    try {
      const productData: AddDocument<Product> = {
        name,
        resumo,
        categoryId,
        priece,
        avatar,
        active: true
      };

      const id = await this._product.add(productData);

      return id;
    } catch {
      throw new ApiError('User create failed', 'application/create-user', 500);
    }
  }
}
