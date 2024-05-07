import { Model } from '@burand/functions/firestore';

export interface Produto extends Model {
  tipo: 'Game' | 'Dlc' | 'Software' | 'GiftCard';
}
