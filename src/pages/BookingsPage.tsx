import React, { useState, useEffect } from 'react';
import { Calendar, User, MapPin, Clock } from 'lucide-react';
import { Booking } from '../types';

const BookingsPage: React.FC = () => {
     const [bookings, setBookings] = useState<Booking[]>([]);

     useEffect(() => {
          // Load bookings from localStorage
          const savedBookings = JSON.parse(localStorage.getItem('bookings') || '[]');
          setBookings(savedBookings);
     }, []);

     const getStatusColor = (status: string) => {
          switch (status) {
               case 'confirmed':
                    return 'bg-green-100 text-green-800';
               case 'pending':
                    return 'bg-yellow-100 text-yellow-800';
               case 'cancelled':
                    return 'bg-red-100 text-red-800';
               default:
                    return 'bg-gray-100 text-gray-800';
          }
     };

     const getStatusText = (status: string) => {
          switch (status) {
               case 'confirmed':
                    return 'ยืนยันแล้ว';
               case 'pending':
                    return 'รอยืนยัน';
               case 'cancelled':
                    return 'ยกเลิกแล้ว';
               default:
                    return status;
          }
     };

     const handleCancelBooking = (bookingId: string) => {
          if (confirm('คุณต้องการยกเลิกการจองนี้หรือไม่?')) {
               const updatedBookings = bookings.map(booking =>
                    booking.id === bookingId
                         ? { ...booking, status: 'cancelled' as const }
                         : booking
               );
               setBookings(updatedBookings);
               localStorage.setItem('bookings', JSON.stringify(updatedBookings));
          }
     };

     return (
          <div>
               <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-800 mb-2">การจองของฉัน</h1>
                    <p className="text-gray-600">จัดการและติดตามสถานะการจองห้องพัก</p>
               </div>

               {bookings.length === 0 ? (
                    <div className="text-center py-12">
                         <Calendar className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                         <h3 className="text-lg font-medium text-gray-900 mb-2">ยังไม่มีการจอง</h3>
                         <p className="text-gray-500">เมื่อคุณจองห้องพัก การจองจะแสดงที่นี่</p>
                    </div>
               ) : (
                    <div className="space-y-6">
                         {bookings.map((booking) => (
                              <div key={booking.id} className="bg-white rounded-lg shadow-md p-6">
                                   <div className="flex justify-between items-start mb-4">
                                        <div>
                                             <h3 className="text-xl font-semibold text-gray-800 mb-1">
                                                  การจอง #{booking.id}
                                             </h3>
                                             <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(booking.status)}`}>
                                                  {getStatusText(booking.status)}
                                             </span>
                                        </div>
                                        <div className="text-right">
                                             <p className="text-2xl font-bold text-blue-600">
                                                  ฿{typeof booking.totalPrice === 'number' ? booking.totalPrice.toLocaleString() : "-"}
                                             </p>
                                             <p className="text-sm text-gray-500">ราคารวม</p>
                                        </div>
                                   </div>

                                   <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="space-y-3">
                                             <h4 className="font-semibold text-gray-700 mb-3">ข้อมูลการจอง</h4>

                                             <div className="flex items-center text-gray-600">
                                                  <Calendar className="h-4 w-4 mr-3" />
                                                  <div>
                                                       <p className="text-sm">เช็คอิน: {new Date(booking.checkIn).toLocaleDateString('th-TH')}</p>
                                                       <p className="text-sm">เช็คเอาท์: {new Date(booking.checkOut).toLocaleDateString('th-TH')}</p>
                                                  </div>
                                             </div>

                                             <div className="flex items-center text-gray-600">
                                                  <User className="h-4 w-4 mr-3" />
                                                  <span className="text-sm">{booking.guests} ผู้เข้าพัก</span>
                                             </div>

                                             <div className="flex items-center text-gray-600">
                                                  <MapPin className="h-4 w-4 mr-3" />
                                                  <span className="text-sm">ห้อง ID: {booking.roomId}</span>
                                             </div>
                                        </div>

                                        <div className="space-y-3">
                                             <h4 className="font-semibold text-gray-700 mb-3">ข้อมูลผู้จอง</h4>

                                             <div className="flex items-center text-gray-600">
                                                  <User className="h-4 w-4 mr-3" />
                                                  <span className="text-sm">{booking.guestName}</span>
                                             </div>

                                             <div className="flex items-center text-gray-600">
                                                  <Clock className="h-4 w-4 mr-3" />
                                                  <p className="text-sm">
                                                       จองเมื่อ: {
                                                            !isNaN(Number(booking.id))
                                                                 ? new Date(parseInt(booking.id)).toLocaleDateString('th-TH')
                                                                 : "-"
                                                       }
                                                  </p>

                                             </div>
                                        </div>
                                   </div>

                                   {booking.status === 'confirmed' && (
                                        <div className="mt-6 pt-4 border-t border-gray-200">
                                             <div className="flex justify-end space-x-3">
                                                  <button
                                                       onClick={() => handleCancelBooking(booking.id)}
                                                       className="px-4 py-2 border border-red-300 text-red-700 rounded-md hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-red-500"
                                                  >
                                                       ยกเลิกการจอง
                                                  </button>
                                                  <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500">
                                                       แก้ไขการจอง
                                                  </button>
                                             </div>
                                        </div>
                                   )}
                              </div>
                         ))}
                    </div>
               )}
          </div>
     );
};

export default BookingsPage;