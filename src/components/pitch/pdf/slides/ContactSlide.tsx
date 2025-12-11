import { pitchDeckData } from '../../../../data/pitchDeckData';
import { contactInfo } from '../../../../data/brandData';

export const ContactSlide = () => (
  <div className="flex flex-col items-center justify-center h-full text-center px-16">
    <h2 className="text-6xl font-bold text-gray-900 mb-8">
      {pitchDeckData.contact.cta}
    </h2>

    <div className="bg-white rounded-3xl p-12 shadow-xl max-w-2xl w-full border-2 border-gray-200">
      <h1 className="text-5xl font-bold text-gray-900 mb-10">MARMELAT</h1>

      <div className="space-y-6 text-left mb-10">
        <div className="flex items-center gap-6">
          <div className="w-14 h-14 bg-gray-100 rounded-xl flex items-center justify-center">
            <svg className="w-7 h-7 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </div>
          <span className="text-xl text-marmelat-dark-pink">
            {contactInfo.email}
          </span>
        </div>
        <div className="flex items-center gap-6">
          <div className="w-14 h-14 bg-gray-100 rounded-xl flex items-center justify-center">
            <svg className="w-7 h-7 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
          </div>
          <div className="text-xl text-gray-700">
            {contactInfo.phones.map((phone) => (
              <div key={phone}>{phone}</div>
            ))}
          </div>
        </div>
      </div>

      <div className="border-t-2 border-gray-200 pt-8">
        <h4 className="font-bold text-xl text-gray-900 mb-6">Следующие шаги</h4>
        <div className="space-y-4">
          {pitchDeckData.contact.nextSteps.map((step, index) => (
            <div key={step} className="flex items-center gap-4 text-lg text-gray-600">
              <span className="w-8 h-8 bg-marmelat-light-pink rounded-full flex items-center justify-center text-sm font-bold text-marmelat-dark-pink">
                {index + 1}
              </span>
              {step}
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
);
