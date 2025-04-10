import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

import { createAppKit } from "@reown/appkit/react";
import { EthersAdapter } from "@reown/appkit-adapter-ethers";
import { arbitrum, mainnet } from "@reown/appkit/networks";

const projectId = '1220b287cca753358313ff71c07b4d95';
const networks:any = [arbitrum, mainnet];
const metadata = {
  name: "My Wallet",
  description: "My Decentralized Application",
  url: 'https://reown.com/appkit',
  icons: ['https://assets.reown.com/reown-profile-pic.png']

};

createAppKit({
  adapters: [new EthersAdapter()],
  networks,
  metadata,
  projectId,
  features: {
    analytics: true,
  },
});



ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

 
 
 
 
 