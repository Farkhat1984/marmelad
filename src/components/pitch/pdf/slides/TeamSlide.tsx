import { pitchDeckData } from '../../../../data/pitchDeckData';

export const TeamSlide = () => (
  <div className="h-full px-16 py-16">
    <h2 className="text-6xl font-bold text-gray-900 mb-6 text-center">
      {pitchDeckData.team.title}
    </h2>
    <p className="text-xl text-center text-gray-600 mb-12">
      Совокупный опыт: <span className="font-bold">{pitchDeckData.team.totalExperience}</span> в индустрии
    </p>

    <div className="grid grid-cols-4 gap-8 max-w-6xl mx-auto">
      {pitchDeckData.team.members.map((member) => (
        <div
          key={member.role}
          className="bg-white rounded-2xl p-8 border-2 border-gray-200 shadow-sm"
        >
          <div className="w-20 h-20 bg-gray-100 rounded-full mx-auto mb-6 flex items-center justify-center">
            <svg className="w-10 h-10 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </div>
          <h3 className="text-xl font-bold text-gray-900 text-center mb-2">{member.role}</h3>
          <p className="text-lg text-marmelat-dark-pink text-center mb-3">{member.focus}</p>
          <p className="text-sm text-gray-500 text-center">{member.experience}</p>
        </div>
      ))}
    </div>
  </div>
);
