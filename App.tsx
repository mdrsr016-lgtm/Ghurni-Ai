import { useState } from 'react';
import LoginScreen from './components/LoginScreen';
import ChatInterface from './components/ChatInterface';
import Sidebar from './components/Sidebar';
import { ViewState } from './types';

function App() {
  const [view, setView] = useState<ViewState>(ViewState.LOGIN);

  const handleLogin = () => {
    setView(ViewState.DASHBOARD);
  };

  const handleLogout = () => {
    setView(ViewState.LOGIN);
  };

  return (
    <div className={`w-full font-sans text-gray-900 bg-white ${view === ViewState.DASHBOARD ? 'h-[100dvh] overflow-hidden' : 'min-h-screen'}`}>
      {view === ViewState.LOGIN ? (
        <LoginScreen onLogin={handleLogin} />
      ) : (
        <div className="flex w-full h-full">
          <Sidebar onLogout={handleLogout} />
          <ChatInterface />
        </div>
      )}
    </div>
  );
}

export default App;