import React, { useState } from 'react';
import { Plus, Edit, Trash2, Eye } from 'lucide-react';
import { Room } from '../types';

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

const RoomsPage: React.FC = () => {
     const [rooms, setRooms] = useState<Room[]>(mockRooms);

     const handleToggleAvailability = (roomId: string) => {
          setRooms(rooms.map(room =>
               room.id === roomId
                    ? { ...room, available: !room.available }
                    : room
          ));
     };

     const handleDeleteRoom = (roomId: string) => {
          if (confirm('คุณต้องการลบห้องนี้หรือไม่?')) {
               setRooms(rooms.filter(room => room.id !== roomId));
          }
     };

     return (
          <div>
               <div className="flex justify-between items-center mb-8">
                    <div>
                         <h1 className="text-3xl font-bold text-gray-800 mb-2">จัดการห้องพัก</h1>
                         <p className="text-gray-600">จัดการข้อมูลห้องพักและสถานะความพร้อมใช้งาน</p>
                    </div>
                    <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 flex items-center">
                         <Plus className="h-4 w-4 mr-2" />
                         เพิ่มห้องใหม่
                    </button>
               </div>

               <div className="bg-white rounded-lg shadow-md overflow-hidden">
                    <div className="overflow-x-auto">
                         <table className="min-w-full divide-y divide-gray-200">
                              <thead className="bg-gray-50">
                                   <tr>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                             ห้องพัก
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                             ประเภท
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                             ราคา/คืน
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                             จำนวนผู้เข้าพัก
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                             สถานะ
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                             การจัดการ
                                        </th>
                                   </tr>
                              </thead>
                              <tbody className="bg-white divide-y divide-gray-200">
                                   {rooms.map((room) => (
                                        <tr key={room.id} className="hover:bg-gray-50">
                                             <td className="px-6 py-4 whitespace-nowrap">
                                                  <div className="flex items-center">
                                                       <div className="h-12 w-12 flex-shrink-0">
                                                            <img
                                                                 className="h-12 w-12 rounded-lg object-cover"
                                                                 src={room.image}
                                                                 alt={room.name}
                                                                 onError={(e) => {
                                                                      (e.target as HTMLImageElement).src = 'https://via.placeholder.com/48x48?text=Room';
                                                                 }}
                                                            />
                                                       </div>
                                                       <div className="ml-4">
                                                            <div className="text-sm font-medium text-gray-900">{room.name}</div>
                                                            <div className="text-sm text-gray-500">ID: {room.id}</div>
                                                       </div>
                                                  </div>
                                             </td>
                                             <td className="px-6 py-4 whitespace-nowrap">
                                                  <div className="text-sm text-gray-900">{room.type}</div>
                                             </td>
                                             <td className="px-6 py-4 whitespace-nowrap">
                                                  <div className="text-sm font-medium text-gray-900">
                                                       ฿{room.price.toLocaleString()}
                                                  </div>
                                             </td>
                                             <td className="px-6 py-4 whitespace-nowrap">
                                                  <div className="text-sm text-gray-900">{room.capacity} คน</div>
                                             </td>
                                             <td className="px-6 py-4 whitespace-nowrap">
                                                  <button
                                                       onClick={() => handleToggleAvailability(room.id)}
                                                       className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${room.available
                                                                 ? 'bg-green-100 text-green-800 hover:bg-green-200'
                                                                 : 'bg-red-100 text-red-800 hover:bg-red-200'
                                                            }`}
                                                  >
                                                       {room.available ? 'ว่าง' : 'ไม่ว่าง'}
                                                  </button>
                                             </td>
                                             <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                                  <div className="flex space-x-2">
                                                       <button className="text-blue-600 hover:text-blue-900">
                                                            <Eye className="h-4 w-4" />
                                                       </button>
                                                       <button className="text-yellow-600 hover:text-yellow-900">
                                                            <Edit className="h-4 w-4" />
                                                       </button>
                                                       <button
                                                            onClick={() => handleDeleteRoom(room.id)}
                                                            className="text-red-600 hover:text-red-900"
                                                       >
                                                            <Trash2 className="h-4 w-4" />
                                                       </button>
                                                  </div>
                                             </td>
                                        </tr>
                                   ))}
                              </tbody>
                         </table>
                    </div>
               </div>

               <div className="mt-6 bg-white rounded-lg shadow-md p-6">
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">สถิติห้องพัก</h3>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                         <div className="bg-blue-50 p-4 rounded-lg">
                              <div className="text-2xl font-bold text-blue-600">{rooms.length}</div>
                              <div className="text-sm text-gray-600">ห้องทั้งหมด</div>
                         </div>
                         <div className="bg-green-50 p-4 rounded-lg">
                              <div className="text-2xl font-bold text-green-600">
                                   {rooms.filter(room => room.available).length}
                              </div>
                              <div className="text-sm text-gray-600">ห้องว่าง</div>
                         </div>
                         <div className="bg-red-50 p-4 rounded-lg">
                              <div className="text-2xl font-bold text-red-600">
                                   {rooms.filter(room => !room.available).length}
                              </div>
                              <div className="text-sm text-gray-600">ห้องไม่ว่าง</div>
                         </div>
                         <div className="bg-yellow-50 p-4 rounded-lg">
                              <div className="text-2xl font-bold text-yellow-600">
                                   ฿{Math.round(rooms.reduce((sum, room) => sum + room.price, 0) / rooms.length).toLocaleString()}
                              </div>
                              <div className="text-sm text-gray-600">ราคาเฉลี่ย</div>
                         </div>
                    </div>
               </div>
          </div>
     );
};

export default RoomsPage;