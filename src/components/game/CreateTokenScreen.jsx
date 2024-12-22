import React, { useState } from 'react';
import { useTheme } from '../ThemeProvider';
import { Bot, Coins, Shield, Lock, FileText, ChevronRight, AlertCircle, CheckCircle2, Copy } from 'lucide-react';



const initialFormData = {
  name: '',
  symbol: '',
  decimals: '18',
  totalSupply: '',
  taxFee: '0',
  liquidityFee: '0',
  maxWallet: '100',
  maxTransaction: '100'
};

export function CreateTokenScreen() {
  const { theme } = useTheme();
  const [formData, setFormData] = useState(initialFormData);
  const [step, setStep] = useState(1);
  const [isDeploying, setIsDeploying] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleDeploy = async () => {
    setIsDeploying(true);
    // Simulate deployment
    setTimeout(() => {
      setIsDeploying(false);
      setStep(3);
    }, 2000);
  };

  const renderStep1 = () => (
    <div className="space-y-4">
      <div className={`
        p-4 rounded-xl
        ${theme === 'dark' ? 'bg-slate-800/50' : 'bg-white/50'}
        backdrop-blur-sm
      `}>
        <div className="flex items-center gap-3 mb-4">
          <Bot className="w-6 h-6 text-blue-500" />
          <h2 className="text-lg font-bold">Token Details</h2>
        </div>

        <div className="space-y-4">
          <div>
            <label className="text-sm text-slate-500 mb-1 block">Token Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="e.g., My Token"
              className={`
                w-full px-4 py-3 rounded-xl
                ${theme === 'dark' ? 'bg-slate-900/50' : 'bg-white'}
                border ${theme === 'dark' ? 'border-slate-700' : 'border-slate-200'}
                focus:outline-none focus:ring-2 focus:ring-blue-500/50
              `}
            />
          </div>

          <div>
            <label className="text-sm text-slate-500 mb-1 block">Token Symbol</label>
            <input
              type="text"
              name="symbol"
              value={formData.symbol}
              onChange={handleChange}
              placeholder="e.g., MTK"
              className={`
                w-full px-4 py-3 rounded-xl
                ${theme === 'dark' ? 'bg-slate-900/50' : 'bg-white'}
                border ${theme === 'dark' ? 'border-slate-700' : 'border-slate-200'}
                focus:outline-none focus:ring-2 focus:ring-blue-500/50
              `}
            />
          </div>

          <div>
            <label className="text-sm text-slate-500 mb-1 block">Total Supply</label>
            <input
              type="number"
              name="totalSupply"
              value={formData.totalSupply}
              onChange={handleChange}
              placeholder="e.g., 1000000"
              className={`
                w-full px-4 py-3 rounded-xl
                ${theme === 'dark' ? 'bg-slate-900/50' : 'bg-white'}
                border ${theme === 'dark' ? 'border-slate-700' : 'border-slate-200'}
                focus:outline-none focus:ring-2 focus:ring-blue-500/50
              `}
            />
          </div>

          <div>
            <label className="text-sm text-slate-500 mb-1 block">Decimals</label>
            <input
              type="number"
              name="decimals"
              value={formData.decimals}
              onChange={handleChange}
              placeholder="18"
              className={`
                w-full px-4 py-3 rounded-xl
                ${theme === 'dark' ? 'bg-slate-900/50' : 'bg-white'}
                border ${theme === 'dark' ? 'border-slate-700' : 'border-slate-200'}
                focus:outline-none focus:ring-2 focus:ring-blue-500/50
              `}
            />
          </div>
        </div>
      </div>

      <button
        onClick={() => setStep(2)}
        className="w-full py-3 rounded-xl font-medium bg-blue-500 text-white flex items-center justify-center gap-2"
      >
        <span>Continue</span>
        <ChevronRight className="w-4 h-4" />
      </button>
    </div>
  );

  const renderStep2 = () => (
    <div className="space-y-4">
      <div className={`
        p-4 rounded-xl
        ${theme === 'dark' ? 'bg-slate-800/50' : 'bg-white/50'}
        backdrop-blur-sm
      `}>
        <div className="flex items-center gap-3 mb-4">
          <Shield className="w-6 h-6 text-blue-500" />
          <h2 className="text-lg font-bold">Token Security</h2>
        </div>

        <div className="space-y-4">
          <div>
            <label className="text-sm text-slate-500 mb-1 block">Tax Fee (%)</label>
            <input
              type="number"
              name="taxFee"
              value={formData.taxFee}
              onChange={handleChange}
              placeholder="0"
              className={`
                w-full px-4 py-3 rounded-xl
                ${theme === 'dark' ? 'bg-slate-900/50' : 'bg-white'}
                border ${theme === 'dark' ? 'border-slate-700' : 'border-slate-200'}
                focus:outline-none focus:ring-2 focus:ring-blue-500/50
              `}
            />
          </div>

          <div>
            <label className="text-sm text-slate-500 mb-1 block">Liquidity Fee (%)</label>
            <input
              type="number"
              name="liquidityFee"
              value={formData.liquidityFee}
              onChange={handleChange}
              placeholder="0"
              className={`
                w-full px-4 py-3 rounded-xl
                ${theme === 'dark' ? 'bg-slate-900/50' : 'bg-white'}
                border ${theme === 'dark' ? 'border-slate-700' : 'border-slate-200'}
                focus:outline-none focus:ring-2 focus:ring-blue-500/50
              `}
            />
          </div>

          <div>
            <label className="text-sm text-slate-500 mb-1 block">Max Wallet (%)</label>
            <input
              type="number"
              name="maxWallet"
              value={formData.maxWallet}
              onChange={handleChange}
              placeholder="100"
              className={`
                w-full px-4 py-3 rounded-xl
                ${theme === 'dark' ? 'bg-slate-900/50' : 'bg-white'}
                border ${theme === 'dark' ? 'border-slate-700' : 'border-slate-200'}
                focus:outline-none focus:ring-2 focus:ring-blue-500/50
              `}
            />
          </div>

          <div>
            <label className="text-sm text-slate-500 mb-1 block">Max Transaction (%)</label>
            <input
              type="number"
              name="maxTransaction"
              value={formData.maxTransaction}
              onChange={handleChange}
              placeholder="100"
              className={`
                w-full px-4 py-3 rounded-xl
                ${theme === 'dark' ? 'bg-slate-900/50' : 'bg-white'}
                border ${theme === 'dark' ? 'border-slate-700' : 'border-slate-200'}
                focus:outline-none focus:ring-2 focus:ring-blue-500/50
              `}
            />
          </div>
        </div>
      </div>

      <div className={`
        p-4 rounded-xl text-sm
        ${theme === 'dark' ? 'bg-yellow-500/10' : 'bg-yellow-50'}
        flex items-start gap-2
      `}>
        <AlertCircle className="w-5 h-5 text-yellow-500 shrink-0 mt-0.5" />
        <div className="text-yellow-500">
          Make sure to review all parameters carefully. Token parameters cannot be changed after deployment.
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <button
          onClick={() => setStep(1)}
          className={`
            py-3 rounded-xl font-medium
            ${theme === 'dark' ? 'bg-slate-800' : 'bg-white'}
            border ${theme === 'dark' ? 'border-slate-700' : 'border-slate-200'}
          `}
        >
          Back
        </button>
        <button
          onClick={handleDeploy}
          disabled={isDeploying}
          className="py-3 rounded-xl font-medium bg-blue-500 text-white flex items-center justify-center gap-2"
        >
          {isDeploying ? (
            <>
              <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              <span>Deploying</span>
            </>
          ) : (
            <>
              <Lock className="w-4 h-4" />
              <span>Deploy Token</span>
            </>
          )}
        </button>
      </div>
    </div>
  );

  const renderStep3 = () => (
    <div className="space-y-4">
      <div className={`
        p-6 rounded-xl text-center
        ${theme === 'dark' ? 'bg-slate-800/50' : 'bg-white/50'}
        backdrop-blur-sm
      `}>
        <div className="w-16 h-16 rounded-full bg-green-500/10 flex items-center justify-center mx-auto mb-4">
          <CheckCircle2 className="w-8 h-8 text-green-500" />
        </div>
        
        <h2 className="text-xl font-bold mb-2">Token Deployed!</h2>
        <p className="text-sm text-slate-500 mb-6">
          Your token has been successfully deployed to the blockchain
        </p>

        <div className={`
          p-4 rounded-xl mb-6
          ${theme === 'dark' ? 'bg-slate-900/50' : 'bg-slate-50'}
        `}>
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-slate-500">Token Address</span>
            <button className="text-blue-500">
              <Copy className="w-4 h-4" />
            </button>
          </div>
          <div className="font-mono text-sm break-all">
            0x1234567890abcdef1234567890abcdef12345678
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <button className={`
            py-3 rounded-xl font-medium flex items-center justify-center gap-2
            ${theme === 'dark' ? 'bg-slate-900/50' : 'bg-white'}
            border ${theme === 'dark' ? 'border-slate-700' : 'border-slate-200'}
          `}>
            <FileText className="w-4 h-4" />
            View Contract
          </button>
          <button className="py-3 rounded-xl font-medium bg-blue-500 text-white flex items-center justify-center gap-2">
            <Coins className="w-4 h-4" />
            Add Liquidity
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="px-4 py-6">
      {/* Progress Steps */}
      <div className="flex items-center justify-between mb-6">
        {[1, 2, 3].map((s) => (
          <div
            key={s}
            className={`
              flex-1 h-1 rounded-full
              ${s === 1 ? 'ml-0' : 'ml-2'}
              ${s <= step ? 'bg-blue-500' : theme === 'dark' ? 'bg-slate-700' : 'bg-slate-200'}
            `}
          />
        ))}
      </div>

      {step === 1 && renderStep1()}
      {step === 2 && renderStep2()}
      {step === 3 && renderStep3()}
    </div>
  );
}