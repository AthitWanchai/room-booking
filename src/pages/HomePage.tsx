import React, { useState } from 'react';
import SearchForm from '../components/SearchForm';
import RoomCard from '../components/RoomCard';
import BookingModal from '../components/BookingModal';
import { Room, Booking } from '../types';
import { useNavigate } from 'react-router-dom';

// Mock data สำหรับห้องพัก
const mockRooms: Room[] = [
     {
          id: '1',
          name: 'ห้องดีลักซ์',
          type: 'Deluxe Room',
          price: 2500,
          capacity: 2,
          amenities: ['WiFi', 'TV', 'Breakfast'],
          image: 'https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=400&h=200&fit=crop',
          available: true
     },
     {
          id: '2',
          name: 'ห้องสวีท',
          type: 'Suite Room',
          price: 4500,
          capacity: 4,
          amenities: ['WiFi', 'TV', 'Breakfast', 'Parking'],
          image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=400&h=200&fit=crop',
          available: true
     },
     {
          id: '3',
          name: 'ห้องแฟมิลี่',
          type: 'Family Room',
          price: 3500,
          capacity: 6,
          amenities: ['WiFi', 'TV', 'Breakfast'],
          image: 'https://images.unsplash.com/photo-1566665797739-1674de7a421a?w=400&h=200&fit=crop',
          available: false
     },
     {
          id: '4',
          name: 'ห้องสแตนดาร์ด',
          type: 'Standard Room',
          price: 1800,
          capacity: 2,
          amenities: ['WiFi', 'TV'],
          image: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=400&h=200&fit=crop',
          available: true
     }
];

const HomePage: React.FC = () => {
     const navigate = useNavigate();
     const [rooms] = useState<Room[]>(mockRooms);
     const [filteredRooms, setFilteredRooms] = useState<Room[]>(mockRooms);
     const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);
     const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
     const [searchData, setSearchData] = useState({
          checkIn: '',
          checkOut: '',
          guests: 1
     });

     const handleSearch = (data: { checkIn: string; checkOut: string; guests: number }) => {
          setSearchData(data);
          // Filter rooms based on capacity
          const filtered = rooms.filter(room => room.capacity >= data.guests);
          setFilteredRooms(filtered);
     };

     const handleBookRoom = (roomId: string) => {
          const room = rooms.find(r => r.id === roomId);
          if (room) {
               setSelectedRoom(room);
               setIsBookingModalOpen(true);
          }
     };

     const handleConfirmBooking = (bookingData: {
          guestName: string;
          phone: string;
          email: string;
          checkIn: string;
          checkOut: string;
          guests: number;
     }) => {
          if (!selectedRoom) return;

          const calculateNights = () => {
               const checkIn = new Date(bookingData.checkIn);
               const checkOut = new Date(bookingData.checkOut);
               return Math.ceil((checkOut.getTime() - checkIn.getTime()) / (1000 * 60 * 60 * 24));
          };

          const newBooking: Booking = {
               id: Date.now().toString(),
               roomId: selectedRoom.id,
               guestName: bookingData.guestName,
               checkIn: bookingData.checkIn,
               checkOut: bookingData.checkOut,
               guests: bookingData.guests,
               totalPrice: calculateNights() * selectedRoom.price,
               status: 'confirmed'
          };

          // Save to localStorage for now
          const existingBookings = JSON.parse(localStorage.getItem('bookings') || '[]');
          localStorage.setItem('bookings', JSON.stringify([...existingBookings, newBooking]));

          setIsBookingModalOpen(false);
          setSelectedRoom(null);

          // Navigate to bookings page
          alert(`การจองสำเร็จ! หมายเลขการจอง: ${newBooking.id}`);
          navigate('/bookings');
     };

     return (
          <div>
               <SearchForm onSearch={handleSearch} />

               <div className="mb-6">
                    <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                         ห้องพักที่มีให้บริการ ({filteredRooms.length} ห้อง)
                    </h2>
               </div>

               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredRooms.map(room => (
                         <RoomCard
                              key={room.id}
                              room={room}
                              onBook={handleBookRoom}
                         />
                    ))}
               </div>

               {filteredRooms.length === 0 && (
                    <div className="text-center py-12">
                         <p className="text-gray-500 text-lg">ไม่พบห้องพักที่ตรงกับเงื่อนไขการค้นหา</p>
                    </div>
               )}

               <BookingModal
                    room={selectedRoom}
                    isOpen={isBookingModalOpen}
                    onClose={() => {
                         setIsBookingModalOpen(false);
                         setSelectedRoom(null);
                    }}
                    onConfirm={handleConfirmBooking}
                    searchData={searchData}
               />
          </div>
     );
};

export default HomePage;