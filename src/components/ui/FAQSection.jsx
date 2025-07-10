import React, { useState } from 'react';

const FAQSection = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const faqs = [
    {
      question: 'Can I see who reads my email campaign?',
      answer:
        'Yes, you can track who opens your email campaigns using our email analytics tools. Detailed reports are provided in your dashboard.',
    },
    {
      question: 'How can I book an appointment?',
      answer:
        'Booking an appointment is easy! Simply go to the booking page, choose your preferred time, and confirm your details.',
    },
    {
      question: 'What payment methods do you accept?',
      answer:
        'We accept all major credit cards, PayPal, and bank transfers. You can choose your preferred method during checkout.',
    },
  ];

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section className="p-12 bg-gray-50 w-full">
      <h2 className="text-4xl font-bold text-gray-900 mb-4 text-center">Frequently Asked Questions</h2>
      <p className="text-gray-600 mb-12 text-center max-w-2xl mx-auto">
        We use only the best quality materials on the market to provide the best products to our patients.
      </p>

      <div className="max-w-4xl mx-auto space-y-4">
        {faqs.map((faq, index) => (
          <div
            key={index}
            className="bg-white p-6 rounded-xl shadow-md cursor-pointer transition hover:shadow-lg"
            onClick={() => toggleFAQ(index)}
          >
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900">{faq.question}</h3>
              <svg
                className={`w-5 h-5 text-blue-600 transition-transform ${activeIndex === index ? 'transform rotate-180' : ''
                  }`}
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.06 1.06l-4.24 4.24a.75.75 0 01-1.06 0L5.23 8.27a.75.75 0 01.02-1.06z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            {activeIndex === index && (
              <p className="text-gray-600 mt-4 transition-all duration-300">{faq.answer}</p>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};

export default FAQSection;
