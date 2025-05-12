import "./App.css";
import ChatContainer from "./pages/ChatContainer";

function App() {
  return (
    <div className="flex relative">
      <div className="flex flex-col p-10 h-screen w-screen items-center transition-all duration-200">
        <ChatContainer />
      </div>
    </div>
  );
}

export default App;
