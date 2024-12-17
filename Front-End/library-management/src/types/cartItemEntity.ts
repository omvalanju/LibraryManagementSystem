import BookEntityType from './bookEntityType';

export default interface CartItemEntity
  extends Omit<BookEntityType, 'copiesAvailable'> {
  quantity: number;
  borrowDate: string;
  dueDate: string;
}
