import Canvas from "./components/Canvas"
import Header from "./components/Header"
import LeftSideBar from "./components/LeftSideBar"
import RightSideBar from "./components/RightSideBar"

function App() {


  return (
    <div className="h-screen flex flex-col">
      <header>
        <Header />
      </header>

      <main className="flex-grow">
        <div className="grid grid-cols-[max-content_5fr_1fr] gap-2 h-full">
          <LeftSideBar />
          <Canvas />
          <RightSideBar />
        </div>
      </main>
    </div>
  )
}

export default App
