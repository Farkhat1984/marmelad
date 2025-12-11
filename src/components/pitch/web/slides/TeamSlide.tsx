import { motion } from 'framer-motion';
import { pitchDeckData } from '../../../../data/pitchDeckData';

export const TeamSlide = () => (
  <div className="h-full px-8 py-12 overflow-y-auto">
    <h2 className="text-5xl font-bold text-gray-900 mb-4 text-center">
      {pitchDeckData.team.title}
    </h2>
    <p className="text-center text-gray-600 mb-12">
      Совокупный опыт: <span className="font-bold">{pitchDeckData.team.totalExperience}</span> в индустрии
    </p>

    <div className="grid grid-cols-4 gap-6 max-w-5xl mx-auto">
      {pitchDeckData.team.members.map((member, index) => (
        <motion.div
          key={member.role}
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: index * 0.1 }}
          className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm"
        >
          <div className="w-16 h-16 bg-gray-100 rounded-full mx-auto mb-4 flex items-center justify-center">
            <svg className="w-8 h-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </div>
          <h3 className="text-lg font-bold text-gray-900 text-center mb-1">{member.role}</h3>
          <p className="text-sm text-marmelat-dark-pink text-center mb-2">{member.focus}</p>
          <p className="text-xs text-gray-500 text-center">{member.experience}</p>
        </motion.div>
      ))}
    </div>
  </div>
);
