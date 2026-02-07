import { useEffect } from 'react';
import { useSocket } from './context/SocketContext';
import { SocketEvent, type JoinRoomRequest } from '@collaborative-ide/shared'; // Import DTO
import { CodeEditor } from './components/CodeEditor';
import './App.css';

function App() {
  const { socket, isConnected } = useSocket();

  useEffect(() => {
    if (socket && isConnected) {
      // Create the DTO
      const payload: JoinRoomRequest = {
        roomId: 'architecture-test',
      };

      socket.emit(SocketEvent.JOIN_REQUEST, payload);
    }
  }, [socket, isConnected]);

  return (
    <div className="flex flex-col h-screen bg-gray-900 text-white">
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-3 bg-gray-800 border-b border-gray-700 shadow-md">
        <h1 className="text-xl font-bold tracking-wide">⚡ Collaborative IDE</h1>
        <div
          className={`px-4 py-1 rounded-full text-sm font-mono transition-colors ${isConnected ? 'bg-green-900/50 text-green-400 border border-green-700' : 'bg-red-900/50 text-red-400 border border-red-700'}`}
        >
          {isConnected ? '● Connected' : '○ Disconnected'}
        </div>
      </div>

      {/* Main Layout */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar Placeholder */}
        <div className="hidden md:flex w-64 flex-col bg-gray-800 border-r border-gray-700 p-4">
          <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4">
            Explorer
          </div>
          <div className="text-sm text-gray-500 italic">File tree pending...</div>
        </div>

        {/* Editor Container */}
        <div className="flex-1 relative bg-gray-900">
          <CodeEditor />
        </div>
      </div>
    </div>
  );
}

export default App;
