import React from 'react';
import { 
  LayoutDashboard,
  User,
  CreditCard,
  Settings,
  Stethoscope,
  LogOut
} from 'lucide-react';

const DocSideBar = ({ selectedPage }) => {
  return (
    <aside className="w-64 bg-gray-900 text-white border-r border-gray-800 h-screen fixed">
      {/* Header */}
      <div className="p-4 border-b border-gray-800 flex items-center gap-3">
        <div className="h-10 w-10 rounded-full bg-blue-600 flex items-center justify-center">
          <Stethoscope className="h-5 w-5" />
        </div>
        <div>
          <h1 className="text-lg font-bold">Doctor Portal</h1>
          <p className="text-xs text-gray-400">Professional Dashboard</p>
        </div>
      </div>

      {/* Navigation */}
      <nav className="p-4">
        <ul className="space-y-1">
          <li>
            <a
              href="/dashboard"
              className={`flex items-center gap-3 p-3 rounded-md transition-colors ${
                selectedPage === 'dashboard' 
                  ? 'bg-gray-800 text-white' 
                  : 'text-gray-300 hover:bg-gray-800 hover:text-white'
              }`}
            >
              <LayoutDashboard className="h-5 w-5" />
              <span>Dashboard</span>
            </a>
          </li>
          <li>
            <a
              href="/patients"
              className={`flex items-center gap-3 p-3 rounded-md transition-colors ${
                selectedPage === 'patients' 
                  ? 'bg-gray-800 text-white' 
                  : 'text-gray-300 hover:bg-gray-800 hover:text-white'
              }`}
            >
              <User className="h-5 w-5" />
              <span>Patients</span>
            </a>
          </li>
          <li>
            <a
              href="/dashboard/subscription"
              className={`flex items-center gap-3 p-3 rounded-md transition-colors ${
                selectedPage === 'active-subscription' 
                  ? 'bg-gray-800 text-white' 
                  : 'text-gray-300 hover:bg-gray-800 hover:text-white'
              }`}
            >
              <CreditCard className="h-5 w-5" />
              <span>Subscription</span>
            </a>
          </li>
          <li>
            <a
              href="/dashboard/settings"
              className={`flex items-center gap-3 p-3 rounded-md transition-colors ${
                selectedPage === 'settings' 
                  ? 'bg-gray-800 text-white' 
                  : 'text-gray-300 hover:bg-gray-800 hover:text-white'
              }`}
            >
              <Settings className="h-5 w-5" />
              <span>Settings</span>
            </a>
          </li>
        </ul>
      </nav>

      {/* Footer */}
      <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-800">
        <a
          href="/logout"
          className="flex items-center gap-3 p-3 rounded-md text-gray-300 hover:bg-gray-800 hover:text-white transition-colors"
        >
          <LogOut className="h-5 w-5" />
          <span>Log Out</span>
        </a>
      </div>
    </aside>
  );
};

export default DocSideBar;



// import React from 'react';
// import { 
//   LayoutDashboard,
//   User,
//   CreditCard,
//   Settings,
//   Stethoscope,
//   LogOut,
//   FileText,
//   Calendar,
//   MessageSquare,
//   Bell,
//   ChevronDown,
//   ChevronUp
// } from 'lucide-react';
// import { useState } from 'react';

// const DocSideBar = ({ selectedPage }) => {
//   const [showMoreMenu, setShowMoreMenu] = useState(false);
//   const [notificationsOpen, setNotificationsOpen] = useState(false);

//   // Mock notifications data
//   const notifications = [
//     { id: 1, text: "New patient appointment request", time: "10 min ago", read: false },
//     { id: 2, text: "Subscription renewal reminder", time: "2 hours ago", read: true },
//     { id: 3, text: "New system update available", time: "1 day ago", read: true }
//   ];

//   const unreadCount = notifications.filter(n => !n.read).length;

//   return (
//     <aside className="w-64 bg-gray-900 text-white border-r border-gray-800 h-screen fixed flex flex-col">
//       {/* Header */}
//       <div className="p-4 border-b border-gray-800 flex items-center gap-3">
//         <div className="h-10 w-10 rounded-full bg-blue-600 flex items-center justify-center">
//           <Stethoscope className="h-5 w-5" />
//         </div>
//         <div>
//           <h1 className="text-lg font-bold">Doctor Portal</h1>
//           <p className="text-xs text-gray-400">Professional Dashboard</p>
//         </div>
//       </div>

//       {/* Navigation */}
//       <nav className="p-4 flex-1 overflow-y-auto">
//         <ul className="space-y-1">
//           <li>
//             <a
//               href="/dashboard"
//               className={`flex items-center gap-3 p-3 rounded-md transition-colors ${
//                 selectedPage === 'dashboard' 
//                   ? 'bg-gray-800 text-white' 
//                   : 'text-gray-300 hover:bg-gray-800 hover:text-white'
//               }`}
//             >
//               <LayoutDashboard className="h-5 w-5" />
//               <span>Dashboard</span>
//             </a>
//           </li>
//           <li>
//             <a
//               href="/dashboard/patients"
//               className={`flex items-center gap-3 p-3 rounded-md transition-colors ${
//                 selectedPage === 'patients' 
//                   ? 'bg-gray-800 text-white' 
//                   : 'text-gray-300 hover:bg-gray-800 hover:text-white'
//               }`}
//             >
//               <User className="h-5 w-5" />
//               <span>Patients</span>
//             </a>
//           </li>
//           <li>
//             <a
//               href="/dashboard/subscription"
//               className={`flex items-center gap-3 p-3 rounded-md transition-colors ${
//                 selectedPage === 'active-subscription' 
//                   ? 'bg-gray-800 text-white' 
//                   : 'text-gray-300 hover:bg-gray-800 hover:text-white'
//               }`}
//             >
//               <CreditCard className="h-5 w-5" />
//               <span>Subscription</span>
//             </a>
//           </li>
//           <li>
//             <a
//               href="/dashboard/prescriptions"
//               className={`flex items-center gap-3 p-3 rounded-md transition-colors ${
//                 selectedPage === 'prescriptions' 
//                   ? 'bg-gray-800 text-white' 
//                   : 'text-gray-300 hover:bg-gray-800 hover:text-white'
//               }`}
//             >
//               <FileText className="h-5 w-5" />
//               <span>Prescriptions</span>
//             </a>
//           </li>
//           <li>
//             <a
//               href="/dashboard/schedule"
//               className={`flex items-center gap-3 p-3 rounded-md transition-colors ${
//                 selectedPage === 'schedule' 
//                   ? 'bg-gray-800 text-white' 
//                   : 'text-gray-300 hover:bg-gray-800 hover:text-white'
//               }`}
//             >
//               <Calendar className="h-5 w-5" />
//               <span>Schedule</span>
//             </a>
//           </li>
          
//           {/* Notifications Dropdown */}
//           <li>
//             <button 
//               onClick={() => setNotificationsOpen(!notificationsOpen)}
//               className="flex items-center justify-between w-full p-3 rounded-md text-gray-300 hover:bg-gray-800 hover:text-white transition-colors"
//             >
//               <div className="flex items-center gap-3">
//                 <div className="relative">
//                   <Bell className="h-5 w-5" />
//                   {unreadCount > 0 && (
//                     <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-red-500 text-xs flex items-center justify-center">
//                       {unreadCount}
//                     </span>
//                   )}
//                 </div>
//                 <span>Notifications</span>
//               </div>
//               {notificationsOpen ? (
//                 <ChevronUp className="h-4 w-4" />
//               ) : (
//                 <ChevronDown className="h-4 w-4" />
//               )}
//             </button>
            
//             {notificationsOpen && (
//               <ul className="ml-10 mt-1 space-y-1">
//                 {notifications.map(notification => (
//                   <li key={notification.id}>
//                     <a
//                       href="#"
//                       className={`flex flex-col p-2 rounded text-sm ${
//                         notification.read 
//                           ? 'text-gray-400' 
//                           : 'text-white font-medium'
//                       } hover:bg-gray-700`}
//                     >
//                       <span>{notification.text}</span>
//                       <span className="text-xs text-gray-500">{notification.time}</span>
//                     </a>
//                   </li>
//                 ))}
//               </ul>
//             )}
//           </li>

//           {/* More Menu Dropdown */}
//           <li>
//             <button 
//               onClick={() => setShowMoreMenu(!showMoreMenu)}
//               className="flex items-center justify-between w-full p-3 rounded-md text-gray-300 hover:bg-gray-800 hover:text-white transition-colors"
//             >
//               <div className="flex items-center gap-3">
//                 <span>More</span>
//               </div>
//               {showMoreMenu ? (
//                 <ChevronUp className="h-4 w-4" />
//               ) : (
//                 <ChevronDown className="h-4 w-4" />
//               )}
//             </button>
            
//             {showMoreMenu && (
//               <ul className="ml-10 mt-1 space-y-1">
//                 <li>
//                   <a
//                     href="/dashboard/messages"
//                     className={`flex items-center gap-3 p-2 rounded text-sm ${
//                       selectedPage === 'messages' 
//                         ? 'text-white bg-gray-700' 
//                         : 'text-gray-400 hover:bg-gray-700 hover:text-white'
//                     }`}
//                   >
//                     <MessageSquare className="h-4 w-4" />
//                     <span>Messages</span>
//                   </a>
//                 </li>
//                 <li>
//                   <a
//                     href="/dashboard/settings"
//                     className={`flex items-center gap-3 p-2 rounded text-sm ${
//                       selectedPage === 'settings' 
//                         ? 'text-white bg-gray-700' 
//                         : 'text-gray-400 hover:bg-gray-700 hover:text-white'
//                     }`}
//                   >
//                     <Settings className="h-4 w-4" />
//                     <span>Settings</span>
//                   </a>
//                 </li>
//               </ul>
//             )}
//           </li>
//         </ul>
//       </nav>

//       {/* Footer */}
//       <div className="p-4 border-t border-gray-800">
//         <a
//           href="/logout"
//           className="flex items-center gap-3 p-3 rounded-md text-gray-300 hover:bg-gray-800 hover:text-white transition-colors"
//         >
//           <LogOut className="h-5 w-5" />
//           <span>Log Out</span>
//         </a>
//       </div>
//     </aside>
//   );
// };

// export default DocSideBar;