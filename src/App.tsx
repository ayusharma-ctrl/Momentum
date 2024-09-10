import Header from "./components/Header"
import LeftSideBar from "./components/LeftSideBar"
import FlowCanvas from "./components/FlowCanvas"
import RightSideBar from "./components/RightSideBar"

function App() {

  return (
    <div className="h-screen max-h-screen flex flex-col">
      <header>
        <Header />
      </header>

      <main className="flex-grow overflow-y-hidden hidden lg:block">
        <div className="grid grid-cols-[max-content_5fr_1fr] h-full">
          <LeftSideBar />
          <FlowCanvas />
          <RightSideBar />
        </div>
      </main>
      
    </div>
  )
}

export default App
