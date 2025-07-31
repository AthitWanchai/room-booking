import React, { useState } from 'react';
import { X, User, Phone, Mail } from 'lucide-react';
import { Room } from '../types';

interface BookingModalProps {
     room: Room | null;
     isOpen: boolean;
     onClose: () => void;
     onConfirm: (bookingData: {
          guestName: string;
          phone: string;
          email: string;
          checkIn: string;
          checkOut: string;
          guests: number;
     }) => void;
     searchData: {
          checkIn: string;
          checkOut: string;
          guests: number;
     };
}

const BookingModal: React.FC<BookingModalProps> = ({
     room,
     isOpen,
     onClose,
     onConfirm,
     searchData
}) => {
     const [guestName, setGuestName] = useState('');
     const [phone, setPhone] = useState('');
     const [email, setEmail] = useState('');

     if (!isOpen || !room) return null;

     const calculateNights = () => {
          if (!checkIn || !checkOut) return 0;
          const checkInDate = new Date(checkIn);
          const checkOutDate = new Date(checkOut);
          return Math.ceil((checkOutDate.getTime() - checkInDate.getTime()) / (1000 * 60 * 60 * 24));
     };

     const [checkIn, setCheckIn] = useState(searchData.checkIn || '');
     const [checkOut, setCheckOut] = useState(searchData.checkOut || '');
     const nights = calculateNights();
     const totalPrice = nights * room.price;

     const handleSubmit = (e: React.FormEvent) => {
          e.preventDefault();
          onConfirm({
               guestName,
               phone,
               email,
               checkIn,
               checkOut,
               guests: searchData.guests,
          });
     };

     return (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
               <div className="bg-white rounded-lg max-w-md w-full mx-4 max-h-[90vh] overflow-y-auto">
                    <div className="flex justify-between items-center p-6 border-b">
                         <h2 className="text-xl font-semibold">จองห้องพัก</h2>
                         <button
                              onClick={onClose}
                              className="text-gray-400 hover:text-gray-600"
                         >
                              <X className="h-6 w-6" />
                         </button>
                    </div>

                    <form onSubmit={handleSubmit} className="p-6">
                         <div className="mb-6 p-4 bg-gray-50 rounded-lg">
                              <h3 className="font-semibold text-gray-800 mb-2">{room.name}</h3>
                              <div className="text-sm text-gray-600 space-y-1">
                                   <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                             วันที่เช็คอิน
                                        </label>
                                        <input
                                             type="date"
                                             value={checkIn}
                                             onChange={(e) => setCheckIn(e.target.value)}
                                             className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                             required
                                        />
                                   </div>

                                   <div className="mt-4">
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                             วันที่เช็คเอาท์
                                        </label>
                                        <input
                                             type="date"
                                             value={checkOut}
                                             onChange={(e) => setCheckOut(e.target.value)}
                                             className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                             required
                                        />
                                   </div>
                                   <p>จำนวนคืน: {nights} คืน</p>
                                   <p>ผู้เข้าพัก: {searchData.guests} คน</p>
                                   <p className="font-semibold text-blue-600">
                                        ราคารวม: ฿{totalPrice.toLocaleString()}
                                   </p>
                              </div>
                         </div>

                         <div className="space-y-4">
                              <div>
                                   <label className="block text-sm font-medium text-gray-700 mb-2">
                                        <User className="inline h-4 w-4 mr-1" />
                                        ชื่อ-นามสกุล
                                   </label>
                                   <input
                                        type="text"
                                        value={guestName}
                                        onChange={(e) => setGuestName(e.target.value)}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        required
                                   />
                              </div>

                              <div>
                                   <label className="block text-sm font-medium text-gray-700 mb-2">
                                        <Phone className="inline h-4 w-4 mr-1" />
                                        เบอร์โทรศัพท์
                                   </label>
                                   <input
                                        type="tel"
                                        value={phone}
                                        onChange={(e) => setPhone(e.target.value)}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        required
                                   />
                              </div>

                              <div>
                                   <label className="block text-sm font-medium text-gray-700 mb-2">
                                        <Mail className="inline h-4 w-4 mr-1" />
                                        อีเมล
                                   </label>
                                   <input
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        required
                                   />
                              </div>
                         </div>

                         <div className="flex space-x-3 mt-6">
                              <button
                                   type="button"
                                   onClick={onClose}
                                   className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50"
                              >
                                   ยกเลิก
                              </button>
                              <button
                                   type="submit"
                                   className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                              >
                                   ยืนยันการจอง
                              </button>
                         </div>
                    </form>
               </div>
          </div>
     );
};

export default BookingModal;