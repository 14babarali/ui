import React from 'react';

const SubscriptionSection = () => {
  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <h3 className="text-xl font-semibold mb-4">Active Subscription</h3>
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b">
              <th className="p-2">Plan Name</th>
              <th className="p-2">Status</th>
              <th className="p-2">Start Date</th>
              <th className="p-2">End Date</th>
              <th className="p-2">Price</th>
              <th className="p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b">
              <td className="p-2">VIP Plan</td>
              <td className="p-2 text-green-600">Active</td>
              <td className="p-2">01-07-2025</td>
              <td className="p-2">01-01-2026</td>
              <td className="p-2">$99.99</td>
              <td className="p-2">
                <button className="px-2 py-1 bg-blue-600 text-white rounded hover:bg-blue-700">Renew</button>
              </td>
            </tr>
            <tr className="border-b">
              <td className="p-2">Basic Plan</td>
              <td className="p-2 text-red-600">Expired</td>
              <td className="p-2">01-01-2025</td>
              <td className="p-2">30-06-2025</td>
              <td className="p-2">$29.99</td>
              <td className="p-2">
                <button className="px-2 py-1 bg-gray-400 text-white rounded cursor-not-allowed">Renew</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="flex justify-end mt-4">
        <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">Add New Plan</button>
      </div>
    </div>
  );
};

export default SubscriptionSection;