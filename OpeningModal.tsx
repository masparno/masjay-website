import React from 'react';
import { BookOpen, Play } from 'lucide-react';

interface OpeningModalProps {
  onStartExam: () => void;
}

const OpeningModal: React.FC<OpeningModalProps> = ({ onStartExam }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl shadow-xl p-8 text-center max-w-md w-full">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Mulai Simulasi Tes CPNS (Set 11)</h2>
        <div className="text-blue-500 mb-4">
          <BookOpen className="w-16 h-16 mx-auto" />
        </div>
        <p className="text-gray-600 mb-6">Anda akan mengerjakan 110 soal dalam waktu 100 menit.</p>
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-left mb-6">
          <h3 className="font-semibold text-gray-700 mb-2">Petunjuk:</h3>
          <ul className="list-disc list-inside text-gray-600 space-y-1">
            <li>Pilih jawaban yang paling tepat</li>
            <li>Anda dapat melewati soal dan kembali lagi</li>
            <li>Waktu akan terus berjalan</li>
            <li>Pastikan koneksi internet stabil</li>
          </ul>
        </div>
        <button 
          onClick={onStartExam}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition duration-300 flex items-center justify-center"
        >
          <Play className="w-5 h-5 mr-2" />
          Mulai Ujian
        </button>
      </div>
    </div>
  );
};

export default OpeningModal;