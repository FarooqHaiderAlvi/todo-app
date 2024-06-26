import Home from "./Components/Home";
import About from "./Components/About";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from "./Components/Navbar";
import User from "./Components/User";
import CreateTask from "./Components/CreateTask";
function App() {
  return (
    <>

  
      <BrowserRouter>
        <Routes>

          <Route path="/" element={<><Navbar/><Home/> </>} />
          <Route path="/about" element={<><Navbar/><About/> </>} />
          <Route path="/getUser/:id" element={<><Navbar/><User/> </>} />
          <Route path="/createTask/:id" element={<><Navbar/><CreateTask/> </>} />
           
        </Routes>


      </BrowserRouter>

    </>
  );
}

export default App;
