import React, { useState } from 'react';
import { Search, Calendar, Users } from 'lucide-react';

interface SearchFormProps {
     onSearch: (searchData: {
          checkIn: string;
          checkOut: string;
          guests: number;
     }) => void;
}

const SearchForm: React.FC<SearchFormProps> = ({ onSearch }) => {
     const [checkIn, setCheckIn] = useState('');
     const [checkOut, setCheckOut] = useState('');
     const [guests, setGuests] = useState(1);

     const handleSubmit = (e: React.FormEvent) => {
          e.preventDefault();
          onSearch({ checkIn, checkOut, guests });
     };

     return (
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
               <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div>
                         <label className="block text-sm font-medium text-gray-700 mb-2">
                              <Calendar className="inline h-4 w-4 mr-1" />
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

                    <div>
                         <label className="block text-sm font-medium text-gray-700 mb-2">
                              <Calendar className="inline h-4 w-4 mr-1" />
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

                    <div>
                         <label className="block text-sm font-medium text-gray-700 mb-2">
                              <Users className="inline h-4 w-4 mr-1" />
                              จำนวนผู้เข้าพัก
                         </label>
                         <select
                              value={guests}
                              onChange={(e) => setGuests(Number(e.target.value))}
                              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                         >
                              {[1, 2, 3, 4, 5, 6].map(num => (
                                   <option key={num} value={num}>{num} คน</option>
                              ))}
                         </select>
                    </div>

                    <div className="flex items-end">
                         <button
                              type="submit"
                              className="w-full bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 flex items-center justify-center"
                         >
                              <Search className="h-4 w-4 mr-2" />
                              ค้นหาห้องพัก
                         </button>
                    </div>
               </form>
          </div>
     );
};

export default SearchForm;