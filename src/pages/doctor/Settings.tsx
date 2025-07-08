
import React, { useState } from 'react';
import Sidebar from '../../components/DocSidebar';
import Header from '../../components/DocHeader';
import SettingsForm from '../../components/SettingsForm';
import { Menu } from 'lucide-react';

const Settings = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 z-30 w-64 bg-white shadow-lg transform lg:translate-x-0 lg:static lg:inset-0 transition-transform duration-300 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <Sidebar selectedPage="settings" />
      </div>

      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-opacity-50 z-20 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between bg-white border-b border-gray-200 p-4 sticky top-0 z-10">
          <button
            className="lg:hidden text-gray-600"
            onClick={() => setSidebarOpen(true)}
          >
            <Menu className="h-6 w-6" />
          </button>
          <Header title="Account Settings" />
        </div>

        {/* Settings Content */}
        <main className="flex-1 overflow-y-auto p-6">
          <div className="max-w-6xl mx-auto">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
              <div className="p-6 border-b border-gray-200">
                <h3 className="text-lg font-semibold">Account Settings</h3>
                <p className="text-sm text-gray-500 mt-1">
                  Manage your account settings and preferences
                </p>
              </div>
              
              {/* The imported SettingsForm component */}
              <SettingsForm />
            </div>

            {/* Danger Zone */}
            <div className="mt-6 bg-white rounded-xl shadow-sm border border-red-200 overflow-hidden">
              <div className="p-4 border-b border-red-200 bg-red-50">
                <h3 className="text-lg font-semibold text-red-700">
                  Danger Zone
                </h3>
              </div>
              <div className="p-6">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                  <div>
                    <h4 className="font-medium">Delete Account</h4>
                    <p className="text-sm text-gray-500 mt-1">
                      Permanently remove your account and all associated data
                    </p>
                  </div>
                  <button className="mt-4 md:mt-0 px-4 py-2 border border-red-600 text-red-600 rounded-md hover:bg-red-50 transition-colors">
                    Delete Account
                  </button>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Settings;





















// import React, { useState } from 'react';
// import Sidebar from '../../components/DocSidebar';
// import Header from '../../components/DocHeader';
// import SettingsForm from '../../components/SettingsForm';

// import { Shield, Lock, Bell, CreditCard, Menu } from 'lucide-react';
// import { useForm } from 'react-hook-form';
// import { zodResolver } from '@hookform/resolvers/zod';
// import { z } from 'zod';

// // Define validation schemas for each tab
// const profileSchema = z.object({
//   firstName: z.string().min(2, "First name must be at least 2 characters"),
//   lastName: z.string().min(2, "Last name must be at least 2 characters"),
//   email: z.string().email("Invalid email address"),
//   bio: z.string().max(500, "Bio must be less than 500 characters").optional(),
// });

// const securitySchema = z.object({
//   currentPassword: z.string().min(8, "Password must be at least 8 characters"),
//   newPassword: z.string()
//     .min(8, "Password must be at least 8 characters")
//     .regex(/[A-Z]/, "Must contain at least one uppercase letter")
//     .regex(/[0-9]/, "Must contain at least one number"),
//   confirmPassword: z.string(),
// }).refine(data => data.newPassword === data.confirmPassword, {
//   message: "Passwords don't match",
//   path: ["confirmPassword"],
// });

// const notificationsSchema = z.object({
//   emailNotifications: z.boolean(),
//   pushNotifications: z.boolean(),
//   marketingEmails: z.boolean(),
// });

// const billingSchema = z.object({
//   cardNumber: z.string().regex(/^\d{16}$/, "Invalid card number"),
//   expiryDate: z.string().regex(/^(0[1-9]|1[0-2])\/?([0-9]{2})$/, "Invalid expiry date"),
//   cvv: z.string().regex(/^\d{3,4}$/, "Invalid CVV"),
// });

// type ProfileFormData = z.infer<typeof profileSchema>;
// type SecurityFormData = z.infer<typeof securitySchema>;
// type NotificationsFormData = z.infer<typeof notificationsSchema>;
// type BillingFormData = z.infer<typeof billingSchema>;

// const SettingsForms = ({ activeTab }: { activeTab: string }) => {
//   switch (activeTab) {
//     case 'profile':
//       return <ProfileForm />;
//     case 'security':
//       return <SecurityForm />;
//     case 'notifications':
//       return <NotificationsForm />;
//     case 'billing':
//       return <BillingForm />;
//     default:
//       return <ProfileForm />;
//   }
// };

// const ProfileForm = () => {
//   const { register, handleSubmit, formState: { errors } } = useForm<ProfileFormData>({
//     resolver: zodResolver(profileSchema),
//   });

//   const onSubmit = (data: ProfileFormData) => {
//     console.log("Profile updated:", data);
//   };

//   return (
//     <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-6">
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//         <div>
//           <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
//           <input
//             {...register("firstName")}
//             className={`w-full p-2 border rounded-md ${errors.firstName ? 'border-red-500' : 'border-gray-300'}`}
//           />
//           {errors.firstName && <p className="mt-1 text-sm text-red-600">{errors.firstName.message}</p>}
//         </div>
//         <div>
//           <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
//           <input
//             {...register("lastName")}
//             className={`w-full p-2 border rounded-md ${errors.lastName ? 'border-red-500' : 'border-gray-300'}`}
//           />
//           {errors.lastName && <p className="mt-1 text-sm text-red-600">{errors.lastName.message}</p>}
//         </div>
//       </div>
//       <div>
//         <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
//         <input
//           type="email"
//           {...register("email")}
//           className={`w-full p-2 border rounded-md ${errors.email ? 'border-red-500' : 'border-gray-300'}`}
//         />
//         {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>}
//       </div>
//       <div>
//         <label className="block text-sm font-medium text-gray-700 mb-1">Bio</label>
//         <textarea
//           {...register("bio")}
//           rows={3}
//           className={`w-full p-2 border rounded-md ${errors.bio ? 'border-red-500' : 'border-gray-300'}`}
//         />
//         {errors.bio && <p className="mt-1 text-sm text-red-600">{errors.bio.message}</p>}
//       </div>
//       <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">
//         Save Profile
//       </button>
//     </form>
//   );
// };

// const SecurityForm = () => {
//   const { register, handleSubmit, formState: { errors } } = useForm<SecurityFormData>({
//     resolver: zodResolver(securitySchema),
//   });

//   const onSubmit = (data: SecurityFormData) => {
//     console.log("Security updated:", data);
//   };

//   return (
//     <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-6">
//       <div>
//         <label className="block text-sm font-medium text-gray-700 mb-1">Current Password</label>
//         <input
//           type="password"
//           {...register("currentPassword")}
//           className={`w-full p-2 border rounded-md ${errors.currentPassword ? 'border-red-500' : 'border-gray-300'}`}
//         />
//         {errors.currentPassword && <p className="mt-1 text-sm text-red-600">{errors.currentPassword.message}</p>}
//       </div>
//       <div>
//         <label className="block text-sm font-medium text-gray-700 mb-1">New Password</label>
//         <input
//           type="password"
//           {...register("newPassword")}
//           className={`w-full p-2 border rounded-md ${errors.newPassword ? 'border-red-500' : 'border-gray-300'}`}
//         />
//         {errors.newPassword && <p className="mt-1 text-sm text-red-600">{errors.newPassword.message}</p>}
//       </div>
//       <div>
//         <label className="block text-sm font-medium text-gray-700 mb-1">Confirm New Password</label>
//         <input
//           type="password"
//           {...register("confirmPassword")}
//           className={`w-full p-2 border rounded-md ${errors.confirmPassword ? 'border-red-500' : 'border-gray-300'}`}
//         />
//         {errors.confirmPassword && <p className="mt-1 text-sm text-red-600">{errors.confirmPassword.message}</p>}
//       </div>
//       <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">
//         Update Password
//       </button>
//     </form>
//   );
// };

// const NotificationsForm = () => {
//   const { register, handleSubmit } = useForm<NotificationsFormData>({
//     resolver: zodResolver(notificationsSchema),
//     defaultValues: {
//       emailNotifications: true,
//       pushNotifications: true,
//       marketingEmails: false,
//     },
//   });

//   const onSubmit = (data: NotificationsFormData) => {
//     console.log("Notifications updated:", data);
//   };

//   return (
//     <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-6">
//       <div className="flex items-center justify-between">
//         <div>
//           <label className="block text-sm font-medium text-gray-700">Email Notifications</label>
//           <p className="text-sm text-gray-500">Receive important account notifications via email</p>
//         </div>
//         <label className="inline-flex items-center cursor-pointer">
//           <input type="checkbox" {...register("emailNotifications")} className="sr-only peer" />
//           <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
//         </label>
//       </div>
//       <div className="flex items-center justify-between">
//         <div>
//           <label className="block text-sm font-medium text-gray-700">Push Notifications</label>
//           <p className="text-sm text-gray-500">Receive push notifications on your device</p>
//         </div>
//         <label className="inline-flex items-center cursor-pointer">
//           <input type="checkbox" {...register("pushNotifications")} className="sr-only peer" />
//           <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
//         </label>
//       </div>
//       <div className="flex items-center justify-between">
//         <div>
//           <label className="block text-sm font-medium text-gray-700">Marketing Emails</label>
//           <p className="text-sm text-gray-500">Receive promotional emails and offers</p>
//         </div>
//         <label className="inline-flex items-center cursor-pointer">
//           <input type="checkbox" {...register("marketingEmails")} className="sr-only peer" />
//           <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
//         </label>
//       </div>
//       <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">
//         Save Preferences
//       </button>
//     </form>
//   );
// };

// const BillingForm = () => {
//   const { register, handleSubmit, formState: { errors } } = useForm<BillingFormData>({
//     resolver: zodResolver(billingSchema),
//   });

//   const onSubmit = (data: BillingFormData) => {
//     console.log("Billing updated:", data);
//   };

//   return (
//     <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-6">
//       <div>
//         <label className="block text-sm font-medium text-gray-700 mb-1">Card Number</label>
//         <input
//           placeholder="1234 5678 9012 3456"
//           {...register("cardNumber")}
//           className={`w-full p-2 border rounded-md ${errors.cardNumber ? 'border-red-500' : 'border-gray-300'}`}
//         />
//         {errors.cardNumber && <p className="mt-1 text-sm text-red-600">{errors.cardNumber.message}</p>}
//       </div>
//       <div className="grid grid-cols-2 gap-4">
//         <div>
//           <label className="block text-sm font-medium text-gray-700 mb-1">Expiry Date</label>
//           <input
//             placeholder="MM/YY"
//             {...register("expiryDate")}
//             className={`w-full p-2 border rounded-md ${errors.expiryDate ? 'border-red-500' : 'border-gray-300'}`}
//           />
//           {errors.expiryDate && <p className="mt-1 text-sm text-red-600">{errors.expiryDate.message}</p>}
//         </div>
//         <div>
//           <label className="block text-sm font-medium text-gray-700 mb-1">CVV</label>
//           <input
//             placeholder="123"
//             {...register("cvv")}
//             className={`w-full p-2 border rounded-md ${errors.cvv ? 'border-red-500' : 'border-gray-300'}`}
//           />
//           {errors.cvv && <p className="mt-1 text-sm text-red-600">{errors.cvv.message}</p>}
//         </div>
//       </div>
//       <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">
//         Update Payment Method
//       </button>
//     </form>
//   );
// };

// const Settings = () => {
//   const [sidebarOpen, setSidebarOpen] = useState(false);
//   const [activeTab, setActiveTab] = useState('profile');

//   const tabs = [
//     { name: 'Profile', icon: Lock, key: 'profile' },
//     { name: 'Security', icon: Shield, key: 'security' },
//     { name: 'Notifications', icon: Bell, key: 'notifications' },
//     { name: 'Billing', icon: CreditCard, key: 'billing' },
//   ];

//   return (
//     <div className="flex h-screen bg-gray-50 overflow-hidden">
//       {/* Sidebar */}
//       <div className={`fixed inset-y-0 left-0 z-30 w-64 bg-white shadow-lg transform lg:translate-x-0 lg:static lg:inset-0 transition-transform duration-300 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
//         <Sidebar selectedPage="settings" />
//       </div>

//       {/* Mobile Sidebar Overlay */}
//       {sidebarOpen && (
//         <div
//           className="fixed inset-0 bg-opacity-50 z-20 lg:hidden"
//           onClick={() => setSidebarOpen(false)}
//         ></div>
//       )}

//       {/* Main content */}
//       <div className="flex-1 flex flex-col overflow-hidden">
//         {/* Header */}
//         <div className="flex items-center justify-between bg-white border-b border-gray-200 p-4 sticky top-0 z-10">
//           <button
//             className="lg:hidden text-gray-600"
//             onClick={() => setSidebarOpen(true)}
//           >
//             <Menu className="h-6 w-6" />
//           </button>
//           <Header title="Account Settings" />
//         </div>

//         {/* Settings Content */}
//         <main className="flex-1 overflow-y-auto p-6">
//           <div className="max-w-6xl mx-auto space-y-6">
//             {/* Settings Tabs */}
//             <div className="mb-4">
//               <nav className="flex flex-wrap space-x-4 border-b border-gray-200">
//                 {tabs.map((tab) => (
//                   <button
//                     key={tab.key}
//                     onClick={() => setActiveTab(tab.key)}
//                     className={`px-4 py-2 flex items-center gap-2 font-medium border-b-2 transition-colors ${
//                       activeTab === tab.key
//                         ? 'border-blue-600 text-blue-600'
//                         : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
//                     }`}
//                   >
//                     <tab.icon className="h-4 w-4" />
//                     <span>{tab.name}</span>
//                   </button>
//                 ))}
//               </nav>
//             </div>

//             {/* Active Tab Content */}
//             <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
//               <div className="p-6 border-b border-gray-200">
//                 <h3 className="text-lg font-semibold flex items-center gap-2">
//                   {React.createElement(tabs.find(tab => tab.key === activeTab)?.icon || Lock, { className: "h-5 w-5 text-blue-600" })}
//                   <span>{tabs.find(tab => tab.key === activeTab)?.name} Settings</span>
//                 </h3>
//                 <p className="text-sm text-gray-500 mt-1">
//                   Manage your {activeTab} settings and preferences
//                 </p>
//               </div>

//               <SettingsForms activeTab={activeTab} />

           
//             </div>
//             <SettingsForm />
//             {/* Danger Zone */}
//             <div className="mt-6 bg-white rounded-xl shadow-sm border border-red-200 overflow-hidden">
//               <div className="p-4 border-b border-red-200 bg-red-50">
//                 <h3 className="text-lg font-semibold text-red-700">
//                   Danger Zone
//                 </h3>
//               </div>
//               <div className="p-6">
//                 <div className="flex flex-col md:flex-row md:items-center md:justify-between">
//                   <div>
//                     <h4 className="font-medium">Delete Account</h4>
//                     <p className="text-sm text-gray-500 mt-1">
//                       Permanently remove your account and all associated data
//                     </p>
//                   </div>
//                   <button className="mt-4 md:mt-0 px-4 py-2 border border-red-600 text-red-600 rounded-md hover:bg-red-50 transition-colors">
//                     Delete Account
//                   </button>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </main>
//       </div>
//     </div>
//   );
// };

// export default Settings;













// import React, { useState } from 'react';
// import Sidebar from '../../components/DocSidebar';
// import Header from '../../components/DocHeader';
// import SettingsForm from '../../components/SettingsForm';
// import { Shield, Lock, Bell, CreditCard, Menu } from 'lucide-react';

// const Settings = () => {
//   const [sidebarOpen, setSidebarOpen] = useState(false);
//   const [activeTab, setActiveTab] = useState('profile');

//   const tabs = [
//     { name: 'Profile', icon: Lock, key: 'profile' },
//     { name: 'Security', icon: Shield, key: 'security' },
//     { name: 'Notifications', icon: Bell, key: 'notifications' },
//     { name: 'Billing', icon: CreditCard, key: 'billing' },
//   ];

//   return (
//     <div className="flex h-screen bg-gray-50 overflow-hidden">
//       {/* Sidebar */}
//       <div className={`fixed inset-y-0 left-0 z-30 w-64 bg-white shadow-lg transform lg:translate-x-0 lg:static lg:inset-0 transition-transform duration-300 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
//         <Sidebar selectedPage="settings" />
//       </div>

//       {/* Mobile Sidebar Overlay */}
//       {sidebarOpen && (
//         <div
//           className="fixed inset-0  bg-opacity-50 z-20 lg:hidden"
//           onClick={() => setSidebarOpen(false)}
//         ></div>
//       )}

//       {/* Main content */}
//       <div className="flex-1 flex flex-col overflow-hidden">
//         {/* Header */}
//         <button
//             className="lg:hidden text-gray-600"
//             onClick={() => setSidebarOpen(true)}
//           >
//             <Menu className="h-6 w-6" />
//           </button>

//           <Header title="Account Settings" />
//         <div className="flex items-center justify-between bg-white border-b border-gray-200 p-4 sticky top-0 z-10">
       

          
//         </div>

//         {/* Settings Content */}
//         <main className="flex-1 overflow-y-auto p-6">
//           <div className="max-w-6xl mx-auto space-y-6">
//           <div className="flex items-center gap-4">
//             <button className="text-sm bg-blue-600 text-white px-3 py-1.5 rounded hover:bg-blue-700 transition-colors">
//               Save Changes
//             </button>
//           </div>
//             {/* Settings Tabs */}
//             <div className="mb-4">
//               <nav className="flex flex-wrap space-x-4 border-b border-gray-200">
//                 {tabs.map((tab) => (
//                   <button
//                     key={tab.key}
//                     onClick={() => setActiveTab(tab.key)}
//                     className={`px-4 py-2 flex items-center gap-2 font-medium border-b-2 transition-colors ${
//                       activeTab === tab.key
//                         ? 'border-blue-600 text-blue-600'
//                         : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
//                     }`}
//                   >
//                     <tab.icon className="h-4 w-4" />
//                     <span>{tab.name}</span>
//                   </button>
//                 ))}
//               </nav>
//             </div>

//             {/* Active Tab Content */}
//             <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
//               <div className="p-6 border-b border-gray-200">
//                 <h3 className="text-lg font-semibold flex items-center gap-2">
//                   <Lock className="h-5 w-5 text-blue-600" />
//                   <span>{tabs.find(tab => tab.key === activeTab)?.name} Settings</span>
//                 </h3>
//                 <p className="text-sm text-gray-500 mt-1">
//                   Manage your {activeTab} settings and preferences
//                 </p>
//               </div>

//               {/* You can conditionally render different forms here based on activeTab */}
//               <SettingsForm />
//             </div>

//             {/* Danger Zone */}
//             <div className="mt-6 bg-white rounded-xl shadow-sm border border-red-200 overflow-hidden">
//               <div className="p-4 border-b border-red-200 bg-red-50">
//                 <h3 className="text-lg font-semibold text-red-700">
//                   Danger Zone
//                 </h3>
//               </div>
//               <div className="p-6">
//                 <div className="flex flex-col md:flex-row md:items-center md:justify-between">
//                   <div>
//                     <h4 className="font-medium">Delete Account</h4>
//                     <p className="text-sm text-gray-500 mt-1">
//                       Permanently remove your account and all associated data
//                     </p>
//                   </div>
//                   <button className="mt-4 md:mt-0 px-4 py-2 border border-red-600 text-red-600 rounded-md hover:bg-red-50 transition-colors">
//                     Delete Account
//                   </button>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </main>
//       </div>
//     </div>
//   );
// };

// export default Settings;

