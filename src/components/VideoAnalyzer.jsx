import React, { useState, useRef, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { getSportInsights } from '../data/insightsData';
import { Camera, Upload, ShieldCheck, Play, Pause, AlertCircle, RefreshCw, Cpu, Circle, Square, Trash2 } from 'lucide-react';

export default function VideoAnalyzer() {
  const { selectedSport, permissions, requestPermissions } = useApp();
  const [analyzingState, setAnalyzingState] = useState('idle'); // 'idle', 'camera_active', 'uploading', 'analyzing', 'completed'
  const [activeTab, setActiveTab] = useState('capture'); // 'capture', 'upload'
  const [insights, setInsights] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [loadingText, setLoadingText] = useState('');
  
  const videoRef = useRef(null);
  const streamRef = useRef(null);
  const fileInputRef = useRef(null);

  // Recording State & Refs
  const [isRecording, setIsRecording] = useState(false);
  const [recordSeconds, setRecordSeconds] = useState(0);
  const [recordedVideoUrl, setRecordedVideoUrl] = useState(null);
  const [isPlaybackMode, setIsPlaybackMode] = useState(false);

  const mediaRecorderRef = useRef(null);
  const recordedChunksRef = useRef([]);
  const recordingTimerRef = useRef(null);

  // Load custom insights when selected sport changes
  useEffect(() => {
    if (selectedSport) {
      setInsights(getSportInsights(selectedSport.id));
    }
  }, [selectedSport]);

  // Handle webcam activation
  const startCamera = async () => {
    try {
      if (streamRef.current) {
        stopCamera();
      }
      const stream = await navigator.mediaDevices.getUserMedia({ video: { width: 640, height: 480 } });
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play();
      }
      setAnalyzingState('camera_active');
    } catch (err) {
      console.warn("Webcam access failed, falling back to simulation: ", err);
      // Fallback: Simulate camera activity if user lacks hardware
      setAnalyzingState('camera_active');
    }
  };

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
  };

  // Start recording from stream
  const startRecording = () => {
    recordedChunksRef.current = [];
    setRecordSeconds(0);
    setIsRecording(true);
    setIsPlaybackMode(false);
    
    if (recordedVideoUrl) {
      URL.revokeObjectURL(recordedVideoUrl);
    }
    setRecordedVideoUrl(null);

    if (streamRef.current) {
      try {
        let options = { mimeType: 'video/webm;codecs=vp9,opus' };
        if (!MediaRecorder.isTypeSupported(options.mimeType)) {
          options = { mimeType: 'video/webm;codecs=vp8,opus' };
          if (!MediaRecorder.isTypeSupported(options.mimeType)) {
            options = { mimeType: 'video/webm' };
          }
        }
        const mediaRecorder = new MediaRecorder(streamRef.current, options);
        mediaRecorderRef.current = mediaRecorder;
        
        mediaRecorder.ondataavailable = (event) => {
          if (event.data && event.data.size > 0) {
            recordedChunksRef.current.push(event.data);
          }
        };

        mediaRecorder.onstop = () => {
          const blob = new Blob(recordedChunksRef.current, { type: 'video/webm' });
          const url = URL.createObjectURL(blob);
          setRecordedVideoUrl(url);
          setIsPlaybackMode(true);
        };

        mediaRecorder.start();
      } catch (err) {
        console.error("Failed to start MediaRecorder: ", err);
      }
    }

    recordingTimerRef.current = setInterval(() => {
      setRecordSeconds((prev) => prev + 1);
    }, 1000);
  };

  const stopRecording = () => {
    setIsRecording(false);
    if (recordingTimerRef.current) {
      clearInterval(recordingTimerRef.current);
      recordingTimerRef.current = null;
    }
    
    if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') {
      mediaRecorderRef.current.stop();
    } else {
      setIsPlaybackMode(true);
    }
  };

  const discardRecording = () => {
    if (recordedVideoUrl) {
      URL.revokeObjectURL(recordedVideoUrl);
    }
    setRecordedVideoUrl(null);
    setIsPlaybackMode(false);
    setRecordSeconds(0);
    startCamera();
  };

  const formatTime = (totalSeconds) => {
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  useEffect(() => {
    return () => {
      stopCamera();
      if (recordingTimerRef.current) {
        clearInterval(recordingTimerRef.current);
      }
      if (recordedVideoUrl) {
        URL.revokeObjectURL(recordedVideoUrl);
      }
    };
  }, [recordedVideoUrl]);

  const triggerUpload = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setAnalyzingState('uploading');
      setUploadProgress(0);
      
      const interval = setInterval(() => {
        setUploadProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval);
            startAnalysis();
            return 100;
          }
          return prev + 10;
        });
      }, 150);
    }
  };

  const startAnalysis = () => {
    // Stop any active recording before analysing
    if (isRecording) {
      setIsRecording(false);
      if (recordingTimerRef.current) {
        clearInterval(recordingTimerRef.current);
        recordingTimerRef.current = null;
      }
      if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') {
        mediaRecorderRef.current.stop();
      }
    }

    setAnalyzingState('analyzing');
    stopCamera();
    
    const messages = [
      "Decompressing video frames...",
      "Evaluating keyframe poses...",
      "Running MediaPipe skeleton detection...",
      "Extracting joint flexion metrics...",
      "Matching against athlete profiles..."
    ];
    
    let index = 0;
    setLoadingText(messages[0]);
    
    const interval = setInterval(() => {
      index++;
      if (index >= messages.length) {
        clearInterval(interval);
        setAnalyzingState('completed');
      } else {
        setLoadingText(messages[index]);
      }
    }, 1200);
  };

  const resetAnalyzer = () => {
    setAnalyzingState('idle');
    setUploadProgress(0);
    setIsRecording(false);
    setIsPlaybackMode(false);
    setRecordSeconds(0);
    if (recordedVideoUrl) {
      URL.revokeObjectURL(recordedVideoUrl);
    }
    setRecordedVideoUrl(null);
    if (recordingTimerRef.current) {
      clearInterval(recordingTimerRef.current);
      recordingTimerRef.current = null;
    }
  };

  // Render Biomechanical Skeleton Overlay (moving slightly to simulate joint detection)
  const renderBiomechanicalOverlay = () => {
    return (
      <svg className="absolute inset-0 w-full h-full pointer-events-none z-10" viewBox="0 0 640 480">
        {/* Glowing Head */}
        <circle cx="320" cy="110" r="14" fill="transparent" stroke="#00F2FE" strokeWidth="2.5" className="animate-pulse" />
        {/* Spine */}
        <line x1="320" y1="124" x2="320" y2="260" stroke="#00F2FE" strokeWidth="2.5" />
        
        {/* Shoulders */}
        <line x1="260" y1="150" x2="380" y2="150" stroke="#00F2FE" strokeWidth="2.5" />
        
        {/* Left Arm */}
        <line x1="260" y1="150" x2="220" y2="210" stroke="#00F2FE" strokeWidth="2" />
        <line x1="220" y1="210" x2="190" y2="170" stroke="#4FACFE" strokeWidth="2" />
        <circle cx="190" cy="170" r="4" fill="#39FF14" />
        
        {/* Right Arm */}
        <line x1="380" y1="150" x2="420" y2="210" stroke="#00F2FE" strokeWidth="2" />
        <line x1="420" y1="210" x2="450" y2="160" stroke="#4FACFE" strokeWidth="2" />
        <circle cx="450" cy="160" r="4" fill="#39FF14" />

        {/* Hips */}
        <line x1="275" y1="260" x2="365" y2="260" stroke="#00F2FE" strokeWidth="2.5" />

        {/* Left Leg */}
        <line x1="275" y1="260" x2="260" y2="340" stroke="#00F2FE" strokeWidth="2" />
        <line x1="260" y1="340" x2="270" y2="430" stroke="#4FACFE" strokeWidth="2" />
        <circle cx="270" cy="430" r="4" fill="#39FF14" />

        {/* Right Leg */}
        <line x1="365" y1="260" x2="380" y2="345" stroke="#00F2FE" strokeWidth="2" />
        <line x1="380" y1="345" x2="395" y2="430" stroke="#4FACFE" strokeWidth="2" />
        <circle cx="395" cy="430" r="4" fill="#39FF14" />

        {/* Key Joint Node Highlights */}
        <circle cx="320" cy="124" r="5" fill="#00F2FE" />
        <circle cx="260" y1="150" cy="150" r="5" fill="#00F2FE" />
        <circle cx="380" y1="150" cy="150" r="5" fill="#00F2FE" />
        <circle cx="220" y1="210" cy="210" r="5" fill="#39FF14" />
        <circle cx="420" y1="210" cy="210" r="5" fill="#39FF14" />
        <circle cx="275" cy="260" r="5" fill="#00F2FE" />
        <circle cx="365" cy="260" r="5" fill="#00F2FE" />
        <circle cx="260" cy="340" r="5" fill="#39FF14" />
        <circle cx="380" cy="345" r="5" fill="#39FF14" />

        {/* Holographic Text Metrics */}
        <text x="120" y="140" fill="#00F2FE" fontSize="10" fontFamily="monospace" letterSpacing="1">ELBOW FLEX: 98°</text>
        <text x="440" y="140" fill="#00F2FE" fontSize="10" fontFamily="monospace" letterSpacing="1">KNEE ANGLE: 115°</text>
        <text x="250" y="50" fill="#39FF14" fontSize="11" fontFamily="monospace" fontWeight="bold" letterSpacing="1">ACTIVE TRACKING</text>
      </svg>
    );
  };

  // 1. Ask Permissions Screen
  if (!permissions.camera || !permissions.media) {
    return (
      <div className="glass-panel rounded-3xl p-8 border border-white/5 max-w-2xl mx-auto text-center relative overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-accentBlue to-accentCyan" />
        <Cpu className="w-16 h-16 text-accentBlue mx-auto mb-6 animate-pulse" />
        
        <h2 className="text-2xl font-extrabold tracking-wide uppercase">AI Peripheral Authorization</h2>
        <p className="text-sm text-gray-400 mt-2 max-w-md mx-auto leading-relaxed">
          Athlete Intelligence requires access to your camera and file directory to run real-time pose estimation and computer vision pipelines.
        </p>

        <div className="my-8 flex justify-center space-x-6 border-y border-white/5 py-6 max-w-md mx-auto">
          <div className="flex items-center space-x-2 text-xs text-gray-300">
            <ShieldCheck className="w-5 h-5 text-accentCyan" />
            <span>Webcam Protocol</span>
          </div>
          <div className="flex items-center space-x-2 text-xs text-gray-300">
            <ShieldCheck className="w-5 h-5 text-accentCyan" />
            <span>Media File Access</span>
          </div>
        </div>

        <button
          onClick={requestPermissions}
          className="px-8 py-3.5 rounded-xl bg-gradient-to-r from-accentBlue to-accentCyan text-black font-bold text-sm tracking-wider uppercase hover:opacity-90 transition duration-300 shadow-[0_0_20px_rgba(0,242,254,0.3)]"
        >
          Authorize AI Subsystems
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Selector Console (Idle State) */}
      {analyzingState === 'idle' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Capture Panel */}
          <div 
            onClick={startCamera}
            className="glow-card glass-panel rounded-3xl p-8 border border-white/5 text-center cursor-pointer group flex flex-col justify-between"
          >
            <div>
              <div className="w-16 h-16 rounded-2xl bg-accentBlue/10 border border-accentBlue/20 flex items-center justify-center mx-auto mb-6 group-hover:bg-accentBlue/20 transition duration-300">
                <Camera className="w-8 h-8 text-accentBlue" />
              </div>
              <h3 className="text-xl font-bold uppercase tracking-wider">Capture Live Feed</h3>
              <p className="text-sm text-gray-400 mt-2 leading-relaxed">
                Connect your device camera to record and run a live 33-joint biomechanical scan on your movements.
              </p>
            </div>
            <span className="mt-8 text-xs font-bold text-accentBlue tracking-widest group-hover:underline uppercase">
              Launch Camera &rarr;
            </span>
          </div>

          {/* Upload Panel */}
          <div 
            onClick={triggerUpload}
            className="glow-card glass-panel rounded-3xl p-8 border border-white/5 text-center cursor-pointer group flex flex-col justify-between"
          >
            <div>
              <div className="w-16 h-16 rounded-2xl bg-accentCyan/10 border border-accentCyan/20 flex items-center justify-center mx-auto mb-6 group-hover:bg-accentCyan/20 transition duration-300">
                <Upload className="w-8 h-8 text-accentCyan" />
              </div>
              <h3 className="text-xl font-bold uppercase tracking-wider">Upload Footage</h3>
              <p className="text-sm text-gray-400 mt-2 leading-relaxed">
                Select pre-recorded video logs (MP4, WEBM) for computer vision diagnostics.
              </p>
            </div>
            <span className="mt-8 text-xs font-bold text-accentCyan tracking-widest group-hover:underline uppercase">
              Browse Directories &rarr;
            </span>
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              accept="video/*"
              className="hidden"
            />
          </div>
        </div>
      )}

      {/* 2. Uploading Progress */}
      {analyzingState === 'uploading' && (
        <div className="glass-panel rounded-3xl p-10 text-center border border-white/5 max-w-md mx-auto">
          <RefreshCw className="w-10 h-10 text-accentCyan mx-auto mb-6 animate-spin" />
          <h3 className="text-lg font-bold uppercase tracking-wider">Buffering Data</h3>
          <p className="text-xs text-gray-400 mt-1 mb-6">Uploading sport session capture to pipeline...</p>
          <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
            <div 
              style={{ width: `${uploadProgress}%` }}
              className="h-full bg-gradient-to-r from-accentBlue to-accentCyan transition-all duration-300"
            />
          </div>
          <span className="text-xs text-accentBlue font-bold block mt-3">{uploadProgress}% Transfer Complete</span>
        </div>
      )}

      {/* 3. Analyzing State */}
      {analyzingState === 'analyzing' && (
        <div className="glass-panel rounded-3xl p-10 text-center border border-white/5 max-w-md mx-auto relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-t from-accentBlue/5 to-transparent animate-pulse" />
          <Cpu className="w-12 h-12 text-accentBlue mx-auto mb-6 animate-pulse" />
          <h3 className="text-lg font-bold uppercase tracking-widest text-neon-gradient">Neural Processing</h3>
          <p className="text-xs text-gray-400 mt-1 mb-6 leading-relaxed">
            Running pose estimation & joint alignment neural networks...
          </p>
          
          {/* Diagnostic Loading Text */}
          <div className="py-2.5 px-4 rounded-xl bg-white/5 border border-white/5 text-xs text-accentBlue font-mono uppercase inline-block animate-pulse">
            &gt; {loadingText}
          </div>

          <div className="w-24 h-1 bg-white/10 rounded-full overflow-hidden mx-auto mt-6">
            <div className="h-full bg-accentBlue w-1/2 rounded-full animate-[ping_1.5s_infinite]" />
          </div>
        </div>
      )}

      {/* 4. Camera Screen Active */}
      {analyzingState === 'camera_active' && (
        <div className="glass-panel rounded-3xl overflow-hidden border border-white/5 flex flex-col items-center">
          <div className="relative w-full aspect-video max-w-4xl bg-black flex items-center justify-center overflow-hidden">
            {isPlaybackMode ? (
              recordedVideoUrl ? (
                /* Recorded Video Playback */
                <video 
                  src={recordedVideoUrl}
                  className="w-full h-full object-cover scale-x-[-1]"
                  controls
                  autoPlay
                  loop
                  playsInline
                />
              ) : (
                /* Simulated Playback */
                <div className="absolute inset-0 bg-[#070b12] flex flex-col items-center justify-center p-8 text-center animate-fade-in">
                  <Play className="w-12 h-12 text-accentCyan mb-4 animate-pulse" />
                  <h4 className="text-lg font-bold uppercase tracking-wider">Holographic Playback Active</h4>
                  <p className="text-xs text-gray-400 max-w-md mt-1">
                    Replaying recorded simulation clip ({formatTime(recordSeconds)}). Ready for biomechanical diagnosis.
                  </p>
                </div>
              )
            ) : (
              /* Live Camera Stream */
              <>
                <video 
                  ref={videoRef}
                  className="w-full h-full object-cover scale-x-[-1]"
                  muted
                  playsInline
                />
                {/* Fallback image if user camera blocked */}
                {!streamRef.current && (
                  <div className="absolute inset-0 bg-[#070b12] flex flex-col items-center justify-center p-8 text-center">
                    <AlertCircle className="w-12 h-12 text-accentBlue mb-4" />
                    <h4 className="text-lg font-bold uppercase tracking-wider">Device Stream Blocked/Offline</h4>
                    <p className="text-xs text-gray-400 max-w-md mt-1">
                      Could not bind system webcam. Operating in holographic simulation sandbox.
                    </p>
                  </div>
                )}
              </>
            )}

            {/* Scanning Laser HUD */}
            <div className="absolute inset-x-0 top-0 h-[2px] bg-accentBlue/40 shadow-[0_0_15px_#00F2FE] animate-[bounce_4s_infinite]" />
            
            {/* Visual scanlines overlay */}
            <div className="absolute inset-0 scanlines opacity-35 pointer-events-none" />

            {/* Dynamic Skeleton Mesh */}
            {renderBiomechanicalOverlay()}
          </div>

          {/* Camera Controls */}
          <div className="w-full p-6 border-t border-white/5 flex flex-wrap gap-4 items-center justify-between bg-black/25">
            {/* Status Indicator (Left) */}
            <div className="flex items-center space-x-3">
              {isRecording ? (
                <>
                  <span className="flex h-2.5 w-2.5 relative">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-red-500"></span>
                  </span>
                  <span className="text-xs font-mono text-gray-300">
                    REC [{formatTime(recordSeconds)}] | TELEMETRY RECORDING
                  </span>
                </>
              ) : isPlaybackMode ? (
                <>
                  <Play className="w-3.5 h-3.5 text-accentCyan animate-pulse" />
                  <span className="text-xs font-mono text-gray-300">
                    PLAYBACK [{formatTime(recordSeconds)}] | READY FOR DIAGNOSIS
                  </span>
                </>
              ) : (
                <>
                  <div className="h-2.5 w-2.5 rounded-full bg-green-500 animate-pulse"></div>
                  <span className="text-xs font-mono text-gray-300">
                    CAMERA ACTIVE | SYSTEM CALIBRATED
                  </span>
                </>
              )}
            </div>
            
            {/* Control Buttons (Right) */}
            <div className="flex space-x-3">
              {isRecording ? (
                /* Recording Mode Controls */
                <button 
                  onClick={stopRecording}
                  className="px-5 py-2 text-xs font-bold bg-white text-black rounded-lg hover:bg-gray-200 transition flex items-center space-x-2 shadow-[0_0_15px_rgba(255,255,255,0.25)]"
                >
                  <Square className="w-3.5 h-3.5 fill-black text-black" />
                  <span>Stop Recording</span>
                </button>
              ) : isPlaybackMode ? (
                /* Playback Mode Controls */
                <>
                  <button 
                    onClick={discardRecording}
                    className="px-4 py-2 text-xs font-semibold bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg transition flex items-center space-x-2"
                  >
                    <Trash2 className="w-3.5 h-3.5 text-red-400" />
                    <span>Discard</span>
                  </button>
                  <button 
                    onClick={startAnalysis}
                    className="px-5 py-2 text-xs font-bold bg-gradient-to-r from-accentBlue to-accentCyan text-black rounded-lg hover:opacity-90 transition flex items-center space-x-2 shadow-[0_0_15px_rgba(0,242,254,0.3)]"
                  >
                    <Cpu className="w-3.5 h-3.5" />
                    <span>Execute Diagnosis</span>
                  </button>
                </>
              ) : (
                /* Camera Active, Idle Controls */
                <>
                  <button 
                    onClick={startRecording}
                    className="px-5 py-2 text-xs font-bold bg-red-600 text-white rounded-lg hover:bg-red-700 transition flex items-center space-x-2"
                  >
                    <Circle className="w-3 h-3 fill-white text-white" />
                    <span>Record Video</span>
                  </button>
                  <button 
                    onClick={stopCamera}
                    className="px-4 py-2 text-xs font-semibold bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg transition"
                  >
                    Close Camera
                  </button>
                  <button 
                    onClick={startAnalysis}
                    className="px-5 py-2 text-xs font-bold bg-gradient-to-r from-accentBlue to-accentCyan text-black rounded-lg hover:opacity-90 transition"
                  >
                    Execute Diagnosis
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      )}

      {/* 5. Analysis Completed (Show Telemetry Report) */}
      {analyzingState === 'completed' && insights && (
        <div className="space-y-6">
          {/* Telemetry Main Header Card */}
          <div className="glass-panel rounded-3xl p-6 md:p-8 border border-white/5 flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-48 h-48 bg-accentBlue/5 rounded-full blur-3xl pointer-events-none" />
            
            <div className="flex items-center space-x-5">
              {/* Radial Progress Score */}
              <div className="relative w-24 h-24 flex items-center justify-center shrink-0">
                <svg className="w-full h-full transform -rotate-90">
                  <circle cx="48" cy="48" r="40" stroke="rgba(255,255,255,0.05)" strokeWidth="6" fill="transparent" />
                  <circle 
                    cx="48" cy="48" r="40" 
                    stroke="url(#blue-cyan-gradient)" 
                    strokeWidth="7" 
                    fill="transparent" 
                    strokeDasharray={251.2}
                    strokeDashoffset={251.2 - (251.2 * insights.overallScore) / 100}
                    strokeLinecap="round"
                  />
                  <defs>
                    <linearGradient id="blue-cyan-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#00F2FE" />
                      <stop offset="100%" stopColor="#4FACFE" />
                    </linearGradient>
                  </defs>
                </svg>
                <div className="absolute text-center">
                  <span className="text-2xl font-black">{insights.overallScore}</span>
                  <span className="text-[9px] text-gray-400 block font-mono">INDEX</span>
                </div>
              </div>

              <div>
                <span className="text-[10px] text-accentCyan font-bold uppercase tracking-widest">Diagnostic Report</span>
                <h3 className="text-xl font-bold uppercase tracking-wider mt-0.5">Biomechanical Analysis Secure</h3>
                <p className="text-xs text-gray-400 mt-1 leading-relaxed">
                  Overall posture, joint velocity, and strike alignment score for your <strong className="text-white uppercase">{selectedSport.name}</strong> drill.
                </p>
              </div>
            </div>

            <button 
              onClick={resetAnalyzer}
              className="w-full md:w-auto px-5 py-3 text-xs font-bold uppercase tracking-wider text-black bg-gradient-to-r from-accentBlue to-accentCyan rounded-xl hover:opacity-90 transition shadow-[0_0_15px_rgba(0,242,254,0.2)]"
            >
              Analyze New Video
            </button>
          </div>

          {/* Insights Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {insights.metrics.map((metric, i) => (
              <div 
                key={i}
                className="glass-panel rounded-2xl p-6 border border-white/5 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="text-sm font-bold uppercase tracking-wider">{metric.name}</h4>
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                      metric.score >= 80 ? 'bg-accentBlue/10 text-accentBlue border border-accentBlue/20' : 'bg-orange-500/10 text-orange-400 border border-orange-500/20'
                    }`}>
                      {metric.score}% {metric.status}
                    </span>
                  </div>

                  {/* Progress Indicator */}
                  <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden mb-4">
                    <div 
                      style={{ width: `${metric.score}%` }}
                      className={`h-full ${metric.score >= 80 ? 'bg-gradient-to-r from-accentBlue to-accentCyan' : 'bg-orange-400'}`}
                    />
                  </div>

                  <p className="text-xs text-gray-400 leading-relaxed font-sans">
                    {metric.tip}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-white/5 flex items-center space-x-1.5 text-[10px] text-gray-500 font-mono">
                  <Cpu className="w-3.5 h-3.5" />
                  <span>AI RECOMMENDATION GENERATED</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
