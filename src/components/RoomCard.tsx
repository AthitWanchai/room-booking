import React from 'react';
import { Room } from '../types';
import { Users, Wifi, Car, Coffee, Tv } from 'lucide-react';

interface RoomCardProps {
     room: Room;
     onBook: (roomId: string) => void;
}

const RoomCard: React.FC<RoomCardProps> = ({ room, onBook }) => {
     const getAmenityIcon = (amenity: string) => {
          switch (amenity.toLowerCase()) {
               case 'wifi':
                    return <Wifi className="h-4 w-4" />;
               case 'parking':
                    return <Car className="h-4 w-4" />;
               case 'breakfast':
                    return <Coffee className="h-4 w-4" />;
               case 'tv':
                    return <Tv className="h-4 w-4" />;
               default:
                    return null;
          }
     };

     return (
          <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
               <div className="h-48 bg-gray-200 relative">
                    <img
                         src={room.image}
                         alt={room.name}
                         className="w-full h-full object-cover"
                         onError={(e) => {
                              (e.target as HTMLImageElement).src = 'https://via.placeholder.com/400x200?text=Room+Image';
                         }}
                    />
                    {!room.available && (
                         <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                              <span className="text-white font-semibold">ไม่ว่าง</span>
                         </div>
                    )}
               </div>

               <div className="p-6">
                    <div className="flex justify-between items-start mb-2">
                         <h3 className="text-xl font-semibold text-gray-800">{room.name}</h3>
                         <span className="text-sm text-gray-500">{room.type}</span>
                    </div>

                    <div className="flex items-center text-gray-600 mb-3">
                         <Users className="h-4 w-4 mr-1" />
                         <span className="text-sm">รองรับได้ {room.capacity} คน</span>
                    </div>

                    <div className="flex flex-wrap gap-2 mb-4">
                         {room.amenities.map((amenity, index) => (
                              <div key={index} className="flex items-center bg-gray-100 px-2 py-1 rounded-full text-xs text-gray-600">
                                   {getAmenityIcon(amenity)}
                                   <span className="ml-1">{amenity}</span>
                              </div>
                         ))}
                    </div>

                    <div className="flex justify-between items-center">
                         <div>
                              <span className="text-2xl font-bold text-blue-600">
                                   ฿{room.price.toLocaleString()}
                              </span>
                              <span className="text-gray-500 text-sm ml-1">/คืน</span>
                         </div>

                         <button
                              onClick={() => onBook(room.id)}
                              disabled={!room.available}
                              className={`px-6 py-2 rounded-md font-medium transition-colors ${room.available
                                        ? 'bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500'
                                        : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                                   }`}
                         >
                              {room.available ? 'จองเลย' : 'ไม่ว่าง'}
                         </button>
                    </div>
               </div>
          </div>
     );
};

export default RoomCard;