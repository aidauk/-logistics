// interface Booking {
//   entry_date: string;
//   leaving_date: string;
// }

// const bookings: Booking[] = [
//   {
//     entry_date: '2023-11-25',
//     leaving_date: '2023-11-30',
//   },
//   {
//     entry_date: '2023-12-05',
//     leaving_date: '2023-12-07',
//   },
// ];

// const newBooking: Booking = {
//   entry_date: '2024-01-01',
//   leaving_date: '2024-01-05',
// };

// const currentDate: Date = new Date();

// // Remove objects from the array whose dates have expired
// const filteredBookings: Booking[] = bookings.filter((booking: Booking) => {
//   const leavingDate: number = Date.parse(booking.leaving_date);
//   return leavingDate > currentDate.getTime() - 1;
// });

// const overlappingBooking: Booking | undefined = filteredBookings.find((booking: Booking) => {
//   const entryDate: number = Date.parse(booking.entry_date);
//   const leavingDate: number = Date.parse(booking.leaving_date);
//   const newEntryDate: number = Date.parse(newBooking.entry_date);
//   const newLeavingDate: number = Date.parse(newBooking.leaving_date);

//   return (
//     (newEntryDate >= entryDate && newEntryDate <= leavingDate) ||
//     (newLeavingDate >= entryDate && newLeavingDate <= leavingDate) ||
//     (newEntryDate <= entryDate && newLeavingDate >= leavingDate)
//   );
// });

// if (
//   Date.parse(newBooking.entry_date) < currentDate.getTime() ||
//   Date.parse(newBooking.leaving_date) < currentDate.getTime()
// ) {
//   console.log('Error: Booking dates cannot be before the current date');
// } else if (
//   Date.parse(newBooking.entry_date) >= Date.parse(newBooking.leaving_date)
// ) {
//   console.log('Error: The entry date must be earlier than the leaving date');
// } else if (overlappingBooking) {
//   console.log('Error: Overlapping booking detected');
// } else {
//   filteredBookings.push(newBooking);
//   console.log('New booking added:', newBooking);
// }

const products: number[] = [1, 2, 3, 4, 5]; // Example array of product IDs

function removeProductById(id: number): void {
  const index = products.indexOf(id); // Find the index of the ID in the array

  if (index !== -1) {
    products.splice(index, 1); // Remove the ID from the array
  }
}

// Usage example
const productIdToRemove = 3;
removeProductById(productIdToRemove);
console.log(products);
