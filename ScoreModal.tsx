import React from 'react';
import { ScoreResult } from '../types/quiz';
import { Download, RotateCcw } from 'lucide-react';

interface ScoreModalProps {
  scoreResult: ScoreResult;
  onRestart: () => void;
  onDownload: () => void;
}

const ScoreModal: React.FC<ScoreModalProps> = ({ scoreResult, onRestart, onDownload }) => {
  const passingGrades = { twk: 65, tiu: 80, tkp: 166 };
  
  const isTwkPass = scoreResult.twk >= passingGrades.twk;
  const isTiuPass = scoreResult.tiu >= passingGrades.tiu;
  const isTkpPass = scoreResult.tkp >= passingGrades.tkp;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl shadow-xl p-8 text-center max-w-lg w-full">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Hasil Ujian SKD</h2>
        <p className={`text-lg font-bold mb-4 ${scoreResult.isPass ? 'text-green-600' : 'text-red-600'}`}>
          {scoreResult.isPass ? 'SELAMAT, ANDA LULUS!' : 'MAAF, ANDA TIDAK LULUS'}
        </p>
        
        <div className="grid grid-cols-2 gap-4 text-left my-6">
          <div className="col-span-2 text-center border-b pb-2">
            <p className="text-lg text-gray-600">Total Skor Anda:</p>
            <p className="text-6xl font-bold text-blue-600">{scoreResult.total}</p>
          </div>
          
          <div className="bg-gray-50 p-3 rounded-lg">
            <p className="font-bold">TWK</p>
            <p className="text-2xl">{scoreResult.twk}</p>
            <p className="text-xs">Ambang Batas: {passingGrades.twk}</p>
            <p className={`text-sm font-semibold ${isTwkPass ? 'text-green-600' : 'text-red-600'}`}>
              {isTwkPass ? 'LULUS' : 'TIDAK LULUS'}
            </p>
          </div>
          
          <div className="bg-gray-50 p-3 rounded-lg">
            <p className="font-bold">TIU</p>
            <p className="text-2xl">{scoreResult.tiu}</p>
            <p className="text-xs">Ambang Batas: {passingGrades.tiu}</p>
            <p className={`text-sm font-semibold ${isTiuPass ? 'text-green-600' : 'text-red-600'}`}>
              {isTiuPass ? 'LULUS' : 'TIDAK LULUS'}
            </p>
          </div>
          
          <div className="col-span-2 bg-gray-50 p-3 rounded-lg">
            <p className="font-bold">TKP</p>
            <p className="text-2xl">{scoreResult.tkp}</p>
            <p className="text-xs">Ambang Batas: {passingGrades.tkp}</p>
            <p className={`text-sm font-semibold ${isTkpPass ? 'text-green-600' : 'text-red-600'}`}>
              {isTkpPass ? 'LULUS' : 'TIDAK LULUS'}
            </p>
          </div>
        </div>

        <div className="flex space-x-4 mt-8">
          <button
            onClick={onDownload}
            className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-lg transition duration-300 flex items-center justify-center"
          >
            <Download className="w-5 h-5 mr-2" />
            Download Pembahasan
          </button>
          <button
            onClick={onRestart}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition duration-300 flex items-center justify-center"
          >
            <RotateCcw className="w-5 h-5 mr-2" />
            Coba Lagi
          </button>
        </div>
      </div>
    </div>
  );
};

export default ScoreModal;