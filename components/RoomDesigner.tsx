import React, { useState, useCallback, ChangeEvent, useRef } from 'react';
import { generateDesignIdeas } from '../services/geminiService';
import { UploadIcon, SparklesIcon, ArrowPathIcon, BedIcon, DiningIcon, KitchenIcon, LivingRoomIcon, OfficeIcon, BathroomIcon } from './icons';

type Stage = 'initial' | 'preview' | 'loading' | 'result' | 'error';
type RoomType = 'Bedroom' | 'Living Room' | 'Dining Room' | 'Kitchen' | 'Office' | 'Bathroom';

const roomTypes: { name: RoomType, icon: React.FC<any> }[] = [
  { name: 'Bedroom', icon: BedIcon },
  { name: 'Living Room', icon: LivingRoomIcon },
  { name: 'Dining Room', icon: DiningIcon },
  { name: 'Kitchen', icon: KitchenIcon },
  { name: 'Bathroom', icon: BathroomIcon },
  { name: 'Office', icon: OfficeIcon },
];

const designStyles = [
  'Modern Minimalist',
  'Bohemian',
  'Scandinavian',
  'Industrial',
  'Coastal',
  'Mid-Century Modern'
];

const RoomDesigner: React.FC = () => {
  const [roomType, setRoomType] = useState<RoomType>('Living Room');
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [stylePrompt, setStylePrompt] = useState<string>('Modern Minimalist');
  const [stage, setStage] = useState<Stage>('initial');
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const designerRef = useRef<HTMLDivElement>(null);

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
        setStage('preview'); // Move to preview, but the main state is managed by having a file
      };
      reader.readAsDataURL(file);
    }
  };

  const handleGenerateClick = useCallback(async () => {
    if (!imageFile || !stylePrompt || !roomType) {
      setErrorMessage('Please select a room type, upload an image, and choose a style.');
      setStage('error');
      return;
    }
    setStage('loading');
    setErrorMessage(null);
    try {
      const { imageUrl } = await generateDesignIdeas(imageFile, roomType, stylePrompt);
      setGeneratedImage(imageUrl);
      setStage('result');
    } catch (err) {
      const error = err as Error;
      setErrorMessage(error.message || 'An unknown error occurred.');
      setStage('error');
    }
  }, [imageFile, stylePrompt, roomType]);

  const handleResetForNewStyle = () => {
    setGeneratedImage(null);
    setErrorMessage(null);
    setStage('preview');
  };
  
  const handleStartOver = () => {
    setImageFile(null);
    setImagePreview(null);
    setGeneratedImage(null);
    setErrorMessage(null);
    setStage('initial');
    if (designerRef.current) {
        designerRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }

  const handleStartDesigning = () => {
      if (designerRef.current) {
          designerRef.current.scrollIntoView({ behavior: 'smooth' });
      }
  };
  
  const renderContent = () => {
    if (stage === 'loading') {
      return (
        <div className="flex flex-col items-center justify-center text-center py-20">
          <ArrowPathIcon className="h-16 w-16 text-[#C17D53] animate-spin mb-6" />
          <h2 className="text-3xl font-bold text-white">Crafting your new look...</h2>
          <p className="text-slate-400 mt-2">Our AI is re-imagining your space. This can take a moment.</p>
        </div>
      );
    }

    if (stage === 'error') {
      return (
        <div className="flex flex-col items-center justify-center text-center py-20 bg-red-900/20 p-8 rounded-lg">
          <h2 className="text-2xl font-bold text-red-400">An Error Occurred</h2>
          <p className="text-red-400 mt-2 mb-6 max-w-md">{errorMessage}</p>
          <button
            onClick={handleStartOver}
            className="bg-red-600 text-white font-semibold py-2 px-5 rounded-lg hover:bg-red-700 transition"
          >
            Start Over
          </button>
        </div>
      );
    }
    
    if (stage === 'result' && generatedImage && imagePreview) {
      return (
        <div className="text-center py-10">
            <h2 className="text-4xl font-extrabold text-white mb-2">Design Complete!</h2>
            <p className="text-slate-400 mb-10 max-w-2xl mx-auto">Here’s the vision for your <span className="font-semibold text-[#C17D53]">{roomType}</span> in a <span className="font-semibold text-[#C17D53]">{stylePrompt}</span> style.</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8 items-stretch">
                <div className="flex flex-col">
                    <h3 className="font-bold text-xl mb-3 text-slate-300">Before</h3>
                    <img src={imagePreview} alt="Original room" className="rounded-xl shadow-md w-full h-full object-cover" />
                </div>
                <div className="flex flex-col">
                    <h3 className="font-bold text-xl mb-3 text-white">After</h3>
                    <img src={generatedImage} alt="Generated interior design" className="rounded-xl shadow-xl w-full h-full object-cover ring-4 ring-offset-2 ring-offset-slate-800 ring-[#C17D53]" />
                </div>
            </div>
             <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
                 <button onClick={handleResetForNewStyle} className="w-full sm:w-auto flex items-center justify-center gap-2 bg-teal-800 text-white font-semibold py-3 px-6 rounded-lg hover:bg-teal-700 transition-transform duration-200 active:scale-95">
                    <SparklesIcon className="h-5 w-5" />
                    Try a Different Style
                </button>
                <button onClick={handleStartOver} className="w-full sm:w-auto bg-slate-700 text-slate-200 font-semibold py-3 px-6 rounded-lg border border-slate-600 hover:bg-slate-600 transition">
                  Design Another Room
                </button>
            </div>
        </div>
      );
    }

    return (
      <div className="space-y-12">
        {/* Step 1: Room Type */}
        <div>
          <h3 className="text-2xl font-bold text-slate-100 mb-1"><span className="text-[#C17D53]">Step 1:</span> Choose Your Room</h3>
          <p className="text-slate-400 mb-5">Select the type of space you're redesigning.</p>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {roomTypes.map(rt => {
              const Icon = rt.icon;
              const isSelected = roomType === rt.name;
              return (
                <button key={rt.name} onClick={() => setRoomType(rt.name)} className={`flex flex-col items-center justify-center p-4 rounded-xl border-2 transition-all duration-200 ${isSelected ? 'bg-slate-700 border-[#C17D53] shadow-lg scale-105' : 'bg-slate-700/50 border-slate-600 hover:border-slate-500 hover:shadow-md'}`}>
                  <Icon className={`h-8 w-8 mb-2 transition-colors ${isSelected ? 'text-[#C17D53]' : 'text-slate-400'}`} />
                  <span className={`font-semibold text-sm transition-colors ${isSelected ? 'text-slate-100' : 'text-slate-300'}`}>{rt.name}</span>
                </button>
              )
            })}
          </div>
        </div>

        {/* Step 2: Upload */}
        <div>
          <h3 className="text-2xl font-bold text-slate-100 mb-1"><span className="text-[#C17D53]">Step 2:</span> Upload Your Photo</h3>
          <p className="text-slate-400 mb-5">Show us the current state of your room.</p>
          <div className="flex flex-col items-center justify-center p-6 border-2 border-dashed border-slate-600 rounded-xl bg-slate-900/50 text-center min-h-[250px]">
            {imagePreview ? (
              <img src={imagePreview} alt="Room preview" className="max-h-60 w-auto rounded-lg shadow-md" />
            ) : (
              <>
                <UploadIcon className="h-12 w-12 text-slate-500 mb-4" />
                <h4 className="text-lg font-semibold text-slate-200">Click to Select Your Photo</h4>
                <p className="text-sm text-slate-500 mt-1">PNG, JPG, or JPEG accepted</p>
              </>
            )}
             <input type="file" id="file-upload" accept="image/png, image/jpeg" onChange={handleFileChange} className="sr-only" />
             <label htmlFor="file-upload" className="mt-4 cursor-pointer text-sm font-semibold text-[#C17D53] bg-transparent border border-[#C17D53] px-4 py-2 rounded-md hover:bg-[#C17D53]/10 transition">
                {imagePreview ? 'Change Photo' : 'Select Photo'}
             </label>
          </div>
        </div>
        
        {/* Step 3: Style and Generate */}
        <div className={`${!imageFile ? 'opacity-50 cursor-not-allowed' : ''}`}>
           <h3 className="text-2xl font-bold text-slate-100 mb-1"><span className="text-[#C17D53]">Step 3:</span> Select Your Style</h3>
           <p className="text-slate-400 mb-5">What aesthetic are you dreaming of?</p>
           <div className={`space-y-4 ${!imageFile ? 'pointer-events-none' : ''}`}>
             <div className="flex flex-wrap gap-2">
              {designStyles.map(style => (
                <button key={style} onClick={() => setStylePrompt(style)} className={`px-4 py-2 text-sm font-medium rounded-full transition-all duration-200 ${stylePrompt === style ? 'bg-teal-700 text-white shadow' : 'bg-slate-700 text-slate-300 border border-slate-600 hover:bg-slate-600'}`}>
                  {style}
                </button>
              ))}
             </div>
             <input
                id="style-prompt"
                type="text"
                value={stylePrompt}
                onChange={(e) => setStylePrompt(e.target.value)}
                placeholder="Or describe a custom style..."
                className="w-full px-4 py-3 border border-slate-600 bg-slate-700 text-slate-200 rounded-lg focus:ring-2 focus:ring-[#C17D53] focus:border-[#C17D53] transition placeholder:text-slate-500"
              />
              <div className="pt-4">
                 <button
                    onClick={handleGenerateClick}
                    disabled={!imageFile}
                    className="w-full flex items-center justify-center gap-3 bg-[#C17D53] text-white font-bold py-4 px-6 rounded-lg hover:bg-[#a86b44] transition-all duration-200 active:scale-95 disabled:bg-slate-600 disabled:cursor-not-allowed shadow-lg hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-800 focus:ring-[#C17D53]"
                  >
                    <SparklesIcon className="h-6 w-6" />
                    Generate My New Design
                  </button>
              </div>
           </div>
        </div>
      </div>
    )
  }

  return (
    <>
      <div className="relative text-center py-24 sm:py-32 lg:py-40 px-4 overflow-hidden bg-slate-800">
        <div 
          className="absolute inset-0 bg-cover bg-center" 
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1616046229478-9901c5536a45?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')"}}
        >
          <div className="absolute inset-0 bg-black/60"></div>
        </div>
        <div className="relative z-10">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight">
            Design Your Dream Space
          </h1>
          <p className="mt-6 max-w-2xl mx-auto text-lg text-slate-200">
            AI-powered interior design, personalized for you. See your room's potential in seconds.
          </p>
          <button
            onClick={handleStartDesigning}
            className="mt-10 bg-white text-[#C17D53] font-bold py-3 px-8 rounded-full text-lg hover:bg-gray-200 transition-transform duration-300 transform hover:scale-105 shadow-lg"
          >
            Get Started
          </button>
        </div>
      </div>

      <div ref={designerRef} className="container mx-auto px-4 sm:px-6 lg:px-8 -mt-20 relative z-20 pb-16">
        <div className="bg-slate-800 p-6 sm:p-8 lg:p-12 rounded-2xl shadow-2xl border border-slate-700">
          {renderContent()}
        </div>
      </div>
    </>
  );
};

export default RoomDesigner;