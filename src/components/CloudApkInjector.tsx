import React, { useState } from 'react';
import { UploadCloud, FileCog, Terminal, Hammer, CheckCircle, AlertCircle, Download } from 'lucide-react';

export default function CloudApkInjector() {
  const [step, setStep] = useState(0); // 0: upload, 1: settings, 2: building, 3: done
  const [logs, setLogs] = useState<string[]>([]);

  const startPatching = () => {
    setStep(2);
    const buildSteps = [
      "Decompiling APK using Apktool...",
      "Analyzing Smali structure...",
      "Locating MainActivity...",
      "Injecting Dialog payload into onCreate()...",
      "Injecting OTA Receiver module...",
      "Recompiling APK...",
      "Signing APK with custom keystore...",
      "Zipalign process completed.",
      "Patching successful!"
    ];

    let current = 0;
    const interval = setInterval(() => {
      setLogs((prev) => [...prev, buildSteps[current]]);
      current++;
      if (current === buildSteps.length) {
        clearInterval(interval);
        setStep(3);
      }
    }, 800);
  };

  return (
    <div className="space-y-6">
      <div className="mb-6">
        <h3 className="text-xl font-semibold text-gray-900">Cloud APK Injector</h3>
        <p className="text-sm text-gray-500 mt-1">Automated web-based APK patcher. Upload a raw APK to inject your custom smali payloads directly from the browser.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Upload and Settings */}
        <div className="lg:col-span-2 space-y-6">
          {step === 0 && (
            <div 
              className="border-2 border-dashed border-blue-300 bg-blue-50 hover:bg-blue-100 transition-colors rounded-xl p-12 flex flex-col items-center justify-center cursor-pointer"
              onClick={() => setStep(1)}
            >
              <UploadCloud size={48} className="text-blue-500 mb-4" />
              <h4 className="text-lg font-medium text-blue-900">Upload Target APK</h4>
              <p className="text-sm text-blue-600/70 mt-2 text-center max-w-sm">Drag and drop your Android App (.apk) here, or click to browse files. Max file size: 150MB.</p>
            </div>
          )}

          {step >= 1 && (
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
              <div className="bg-slate-50 border-b border-gray-200 px-6 py-4 flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <FileCog className="text-slate-500" size={20} />
                  <span className="font-medium text-slate-800">target_app_v2.1.apk</span>
                </div>
                <span className="text-xs font-medium bg-emerald-100 text-emerald-700 px-2.5 py-1 rounded-full">Ready for Injection</span>
              </div>
              
              <div className="p-6">
                <h4 className="text-sm font-semibold text-slate-800 mb-4">Injection Settings</h4>
                
                <div className="space-y-4">
                  <label className="flex items-start space-x-3 p-3 border border-gray-100 rounded-lg hover:bg-slate-50 cursor-pointer">
                    <input type="checkbox" defaultChecked className="mt-1 w-4 h-4 text-blue-600 rounded" />
                    <div>
                      <span className="block text-sm font-medium text-slate-800">Standard Dialog Controller</span>
                      <span className="block text-xs text-slate-500 mt-0.5">Injects the base smali code to allow remote dialog popup triggering.</span>
                    </div>
                  </label>

                  <label className="flex items-start space-x-3 p-3 border border-gray-100 rounded-lg hover:bg-slate-50 cursor-pointer">
                    <input type="checkbox" defaultChecked className="mt-1 w-4 h-4 text-blue-600 rounded" />
                    <div>
                      <span className="block text-sm font-medium text-slate-800">OTA Dynamic Payload Receiver (Advanced)</span>
                      <span className="block text-xs text-slate-500 mt-0.5">Injects a DexClassLoader module to receive and execute raw Dex code over-the-air.</span>
                    </div>
                  </label>

                  <label className="flex items-start space-x-3 p-3 border border-gray-100 rounded-lg hover:bg-slate-50 cursor-pointer">
                    <input type="checkbox" className="mt-1 w-4 h-4 text-blue-600 rounded" />
                    <div>
                      <span className="block text-sm font-medium text-slate-800">Anti-Analysis & Obfuscation</span>
                      <span className="block text-xs text-slate-500 mt-0.5">Scramble injected signatures to bypass basic signature verification and AV detection.</span>
                    </div>
                  </label>
                </div>

                {step === 1 && (
                  <button 
                    onClick={startPatching}
                    className="mt-6 w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 rounded-lg flex items-center justify-center space-x-2 transition-all shadow-md shadow-blue-500/20"
                  >
                    <Hammer size={20} />
                    <span>Start Cloud Build</span>
                  </button>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Right Column: Terminal Logs */}
        <div className="bg-slate-900 rounded-xl shadow-lg border border-slate-700 flex flex-col overflow-hidden h-[500px]">
          <div className="bg-slate-950 px-4 py-3 border-b border-slate-800 flex items-center space-x-2">
            <Terminal size={16} className="text-slate-400" />
            <span className="text-xs font-mono text-slate-300">Cloud Build Server / Logs</span>
          </div>
          <div className="p-4 flex-1 overflow-y-auto font-mono text-xs leading-relaxed space-y-2">
            {step === 0 && (
              <span className="text-slate-600">Waiting for target APK...</span>
            )}
            {step >= 1 && logs.length === 0 && (
              <span className="text-slate-400">Ready to build. Configure settings and click 'Start Cloud Build'.</span>
            )}
            {logs.map((log, idx) => (
              <div key={idx} className="flex space-x-2">
                <span className="text-emerald-500">[{new Date().toISOString().split('T')[1].split('.')[0]}]</span>
                <span className={log.includes('successful') ? 'text-emerald-400 font-bold' : 'text-slate-300'}>{log}</span>
              </div>
            ))}
            {step === 2 && (
              <div className="flex space-x-2 animate-pulse">
                <span className="text-emerald-500">[{new Date().toISOString().split('T')[1].split('.')[0]}]</span>
                <span className="text-blue-400">Processing...</span>
              </div>
            )}
          </div>
          {step === 3 && (
            <div className="p-4 bg-slate-800 border-t border-slate-700">
              <button className="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-medium py-2.5 rounded-lg flex items-center justify-center space-x-2 transition-colors">
                <Download size={18} />
                <span>Download Patched APK</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
