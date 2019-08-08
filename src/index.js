import React from 'react'
import ReactDOM from 'react-dom'
import { ModalProvider } from 'styled-react-modal'
import { FadingModalBackground } from './styled'
import Paywall from './paywall'
import Footer from './foot/paywall'
import Faqs from './_children/faqs'
import './paywall.css'

function App() {
  return (
    <ModalProvider backgroundComponent={FadingModalBackground}>
      <div id="modal">
        <div className="app-container">
          <Paywall />
          <Footer />
        </div>
      </div>
    </ModalProvider>
    // <Faqs />
  )
}

const rootElement = document.getElementById('root')
ReactDOM.render(<App />, rootElement)
