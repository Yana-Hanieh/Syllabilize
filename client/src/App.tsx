import './App.css';
// LoginPage is currently implemented as a JavaScript module without type declarations.
// @ts-expect-error
import LoginPage from './pages/LoginPage';
function App() {

  return (
  
    <div className="min-h-screen">
      <LoginPage/>
    </div>
  )
}

export default App
