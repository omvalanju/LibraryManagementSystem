import CartItemEntity from './cartItemEntity';

export default interface OrderEntity {
  cartId: number;
  peopleId: number;
  peopleName: string;
  cartItems: CartItemEntity[];
}
