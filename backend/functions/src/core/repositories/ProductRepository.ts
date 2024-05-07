import { FirebaseAbstract } from '@burand/functions/firestore';
import { singleton } from 'tsyringe';

import { FirestoreCollecionName } from '@config/FirestoreCollecionName.js';
import { Product } from '@models/Product.js';

@singleton()
export class ProductRepository extends FirebaseAbstract<Product> {
  constructor() {
    super(FirestoreCollecionName.PRODUCT);
  }
}
