import { Model } from '@burand/functions/firestore';

export interface Product extends Model {
  active: boolean;
  avatar: string;
  name: string;
  resumo: string;
  categoryId: string;
  priece: string;
}
