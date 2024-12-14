import PublisherEntityType from './publisherEntityType';

export default interface BookEntityType {
  bookId: number;
  bookTitle: string;
  authorName: string;
  publisher: PublisherEntityType;
  copiesAvailable: number;
  isbn: string;
}
