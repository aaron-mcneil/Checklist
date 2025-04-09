import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './index.css'
import Home from './Home'
import Checklist from './Checklist'


export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/">
          <Route index element={<Home />} />
          <Route path="checklist/:checklistId" element={<Checklist />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )

}


const root = createRoot(document.getElementById('root')!);
root.render(<App />);