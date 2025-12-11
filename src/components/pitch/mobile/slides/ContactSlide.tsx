import { motion } from 'framer-motion';
import { pitchDeckData } from '../../../../data/pitchDeckData';
import { contactInfo } from '../../../../data/brandData';

export const ContactSlide = () => (
  <div className="flex flex-col items-center justify-center h-full text-center px-4">
    <motion.h2
      initial={{ y: -15, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="text-2xl font-bold text-gray-900 mb-4"
    >
      {pitchDeckData.contact.cta}
    </motion.h2>

    <motion.div
      initial={{ scale: 0.95, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 0.2 }}
      className="bg-white rounded-xl p-6 shadow-lg max-w-sm w-full border border-gray-200"
    >
      <h1 className="text-2xl font-bold text-gray-900 mb-4">MARMELAT</h1>

      <div className="space-y-3 text-left mb-6">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center">
            <svg className="w-4 h-4 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </div>
          <a href={`mailto:${contactInfo.email}`} className="text-sm text-marmelat-dark-pink">
            {contactInfo.email}
          </a>
        </div>
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center">
            <svg className="w-4 h-4 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
          </div>
          <div className="text-sm text-gray-700">
            {contactInfo.phones.map((phone) => (
              <a key={phone} href={`tel:${phone.replace(/\s/g, '')}`} className="block">
                {phone}
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className="border-t border-gray-200 pt-4">
        <h4 className="font-bold text-sm text-gray-900 mb-2">Следующие шаги</h4>
        <div className="space-y-1.5">
          {pitchDeckData.contact.nextSteps.map((step, index) => (
            <div key={step} className="flex items-center gap-2 text-xs text-gray-600">
              <span className="w-5 h-5 bg-marmelat-light-pink rounded-full flex items-center justify-center text-[10px] font-bold text-marmelat-dark-pink">
                {index + 1}
              </span>
              {step}
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  </div>
);
