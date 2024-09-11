
import './App.css';
import Navbar from './components/Navbar';
import {Main,InitUser} from './components/ClientMain';
import { Start } from './components/ClientStart';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { RecoilRoot, useSetRecoilState } from 'recoil';


// function App() {
//   return (
//     <>
// <Navbar/>
//     <Main title = "hello"/>
//     </>
//   );
// }

function App() {
    // let myStyle={
    //    // background: 'purple',
    //    backgroundImage: "url('.\\purple_bg.jpg')",
    //     width: "100vw",
    //     minHeight: "100vh",
    //     backgroundSize: "cover",
    //     backgroundRepeat: "no-repeat"
    //   }
    const backgroundImage = 'url("meteor.jpg")';
    
  return (
      <RecoilRoot>
        <div>
          <div   style={{
          backgroundImage,
          backgroundSize: 'cover', // Adjust as needed (cover, contain, etc.)
          backgroundRepeat: 'no-repeat',
          minHeight: '100vh', // Ensure the background covers the entire viewport
        }}>
                  <Router>
                     <Navbar/>
                     
                        {/* <InitUser/> */}
                      <Routes>

                          <Route path={"/"} element={<Main title = "hello"/>}/>
                          <Route path={"/start"} element={<Start title = "hello"/>}/>
                      </Routes>
                  </Router>
                  </div>
          </div>
      </RecoilRoot>
  );
}

export default App;


