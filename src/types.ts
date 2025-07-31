export interface Room {
  id: string;
  name: string;
  type: string;
  price: number;
  capacity: number;
  amenities: string[];
  image: string;
  available: boolean;
}

export interface Booking {
  id: string;
  roomId: string;
  guestName: string;
  checkIn: string;
  checkOut: string;
  guests: number;
  totalPrice: number;
  status: "pending" | "confirmed" | "cancelled";
}
