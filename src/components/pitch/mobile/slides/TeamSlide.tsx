import { motion } from 'framer-motion';
import { pitchDeckData } from '../../../../data/pitchDeckData';

export const TeamSlide = () => (
  <div className="h-full px-4 py-6 overflow-y-auto">
    <h2 className="text-2xl font-bold text-gray-900 mb-2 text-center">
      {pitchDeckData.team.title}
    </h2>
    <p className="text-xs text-center text-gray-600 mb-6">
      Совокупный опыт: <span className="font-bold">{pitchDeckData.team.totalExperience}</span>
    </p>

    {/* Team members - 2 column grid */}
    <div className="grid grid-cols-2 gap-3">
      {pitchDeckData.team.members.map((member, index) => (
        <motion.div
          key={member.role}
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: index * 0.1 }}
          className="bg-white rounded-lg p-4 border border-gray-200 shadow-sm"
        >
          <div className="w-12 h-12 bg-gray-100 rounded-full mx-auto mb-3 flex items-center justify-center">
            <svg className="w-6 h-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </div>
          <h3 className="text-sm font-bold text-gray-900 text-center mb-1">{member.role}</h3>
          <p className="text-xs text-marmelat-dark-pink text-center mb-1">{member.focus}</p>
          <p className="text-[10px] text-gray-500 text-center">{member.experience}</p>
        </motion.div>
      ))}
    </div>
  </div>
);
