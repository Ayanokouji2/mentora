import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter as Router } from "react-router-dom"
import { Toaster } from 'sonner';

createRoot(document.getElementById('root')).render(
	<StrictMode>
		<Router>
			<Toaster position="top-center" richColors />
			<App />
		</Router>
	</StrictMode>,
)
