
export const BookDetailsList: BookDetails[] = [
  {
    checkInDate: new Date('May 1,2019'),
    checkOutDate: new Date('May 2,2019'),
    hotelName: 'Bai Hotel',
    roomType: 'Twin Bed',
    unitPrice: 2500.00,
    qty: 3
  },
  {
    checkInDate: new Date('May 2, 2019'),
    checkOutDate: new Date('May 5, 2019'),
    hotelName: 'Quest Hotel',
    roomType: 'King Suite',
    unitPrice: 5000.00,
    qty: 3
  },
  {
    checkInDate: new Date('May 5,2019'),
    checkOutDate: new Date('May 15,2019'),
    hotelName: 'Red Planet',
    roomType: 'Dorm Bed',
    unitPrice: 700.00,
    qty: 3
  }
];

export class BookDetails {

  constructor(
    public checkInDate: Date,
    public checkOutDate: Date,
    public hotelName?: string,
    public roomType?: string,
    public unitPrice?: number,
    public qty?: number,
  ) {}
}
