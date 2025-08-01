import { useState } from "react";

function AvatarGenerator() {
  const [name, setName] = useState("tidak ada");


  const avatarUrl = `https://api.dicebear.com/9.x/personas/svg?seed=${encodeURIComponent(name)}&backgroundColor=b6e3f4,c0aede,d1d4f9,ffd5dc,ffdfbf&radius=50`;


  const playKilluaSound = () => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance();
   
      const killuaMessages = [
        "Yosh! Avatar berhasil diunduh!"
      ];
      
      utterance.text = killuaMessages[Math.floor(Math.random() * killuaMessages.length)];
  
      utterance.pitch = 1.2; 
      utterance.rate = 1.1;  
      utterance.volume = 0.9; 
      
  
      const voices = speechSynthesis.getVoices();
      const preferredVoice = voices.find(voice => 
        voice.name.includes('Google')
      );
      
      if (preferredVoice) {
        utterance.voice = preferredVoice;
      }
      
      speechSynthesis.speak(utterance);
    }
  };


  const downloadAvatar = async () => {
    try {
      const response = await fetch(avatarUrl);
      const svgText = await response.text();
      
 
      const blob = new Blob([svgText], { type: 'image/svg+xml' });
      const url = URL.createObjectURL(blob);
      
      const link = document.createElement('a');
      link.href = url;
      link.download = `avatar-${name.replace(/\s+/g, '-').toLowerCase()}.svg`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      

      URL.revokeObjectURL(url);

      playKilluaSound();
      
    } catch (error) {
      console.error('Error downloading avatar:', error);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center p-4">
      <div className="max-w-md w-full space-y-8">

        <div className="text-center">
          <div className="inline-flex items-center gap-3 mb-2">
            <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
              <span className="text-black text-xl">🎨</span>
            </div>
            <h1 className="text-3xl font-bold tracking-tight">HelpPickUAvatar</h1>
          </div>
          <p className="text-gray-400 text-sm">
            Generate unique avatars based on your input
          </p>
        </div>

    
        <div className="bg-gray-900 border border-gray-800 rounded-2xl p-8 shadow-2xl">
     
          <div className="flex justify-center mb-8">
            <div className="relative">
              <div className="w-32 h-32 bg-white rounded-full p-1 shadow-lg">
                <img
                  src={avatarUrl}
                  alt={`Avatar for ${name}`}
                  className="w-full h-full rounded-full object-cover"
                />
              </div>
              <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-green-500 rounded-full border-4 border-gray-900 flex items-center justify-center">
                <div className="w-2 h-2 bg-white rounded-full"></div>
              </div>
            </div>
          </div>

    
          <div className="space-y-4">
            <label className="block">
              <span className="text-sm font-medium text-gray-300 mb-2 block">
                Enter name or text
              </span>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Type something..."
                className="w-full px-4 py-3 bg-black border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent transition-all duration-200"
              />
            </label>

         
            <button
              onClick={downloadAvatar}
              className="w-full bg-white text-black font-medium py-3 px-4 rounded-xl hover:bg-gray-100 transition-all duration-200 flex items-center justify-center gap-2 group"
            >
              <svg 
                className="w-4 h-4 group-hover:translate-y-0.5 transition-transform duration-200" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              Download Avatar
            </button>

            <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Generated for
                </span>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  <span className="text-xs text-green-400">Live</span>
                </div>
              </div>
              <p className="text-white font-medium mt-1 truncate">
                {name || "Enter a name..."}
              </p>
            </div>
          </div>

    
          <div className="mt-6 pt-4 border-t border-gray-800">
            <p className="text-xs text-gray-500 text-center">
              Powered by virgarakha • Updates in real-time
            </p>
          </div>
        </div>

       
        <div className="text-center text-xs text-gray-600">
          <p>Each input generates a unique avatar design</p>
        </div>
      </div>
    </div>
  );
}

export default AvatarGenerator;