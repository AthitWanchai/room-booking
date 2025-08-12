import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Hotel, Calendar, Home, Settings } from 'lucide-react';

const Header: React.FC = () => {
     const location = useLocation();

     const isActive = (path: string) => {
          return location.pathname === path;
     };

     return (
          <header className="bg-blue-600 text-white shadow-lg">
               <div className="container mx-auto px-4 py-6">
                    <div className="flex items-center justify-between">
                         <Link to="/" className="flex items-center space-x-3 hover:text-blue-200">
                              <Hotel className="h-8 w-8" />
                              <h1 className="text-2xl font-bold">ระบบจองห้องพัก</h1>
                         </Link>
                         <nav className="flex items-center space-x-6">
                              <Link
                                   to="/"
                                   className={`flex items-center space-x-2 hover:text-blue-200 ${isActive('/') ? 'text-blue-200 border-b-2 border-blue-200 pb-1' : ''
                                        }`}
                              >
                                   <Home className="h-5 w-5" />
                                   <span>หน้าหลัก</span>
                              </Link>
                              <Link
                                   to="/bookings"
                                   className={`flex items-center space-x-2 hover:text-blue-200 ${isActive('/bookings') ? 'text-blue-200 border-b-2 border-blue-200 pb-1' : ''
                                        }`}
                              >
                                   <Calendar className="h-5 w-5" />
                                   <span>การจอง</span>
                              </Link>
                              <Link
                                   to="/rooms"
                                   className={`flex items-center space-x-2 hover:text-blue-200 ${isActive('/rooms') ? 'text-blue-200 border-b-2 border-blue-200 pb-1' : ''
                                        }`}
                              >
                                   <Settings className="h-5 w-5" />
                                   <span>จัดการห้องพัก</span>
                              </Link>
                         </nav>
                    </div>
               </div>
          </header>
     );
};

export default Header;