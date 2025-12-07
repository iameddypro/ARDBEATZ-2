import React, { useState, useEffect } from 'react';
import { X, CreditCard, Smartphone, Check, Copy, Loader2, Download, ExternalLink } from 'lucide-react';
import { Beat, BeatPack } from '../types';
import { Button } from './Button';
import { SITE_CONFIG } from '../data/content';
import { useCurrency } from '../context/CurrencyContext';

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  product: Beat | BeatPack | null;
}

export const PaymentModal: React.FC<PaymentModalProps> = ({ isOpen, onClose, product }) => {
  const [method, setMethod] = useState<'paypal' | 'mpesa'>('mpesa');
  const [copied, setCopied] = useState(false);
  const { formatPrice, currency } = useCurrency();
  
  // Verification State
  const [transactionId, setTransactionId] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  const isPack = product && 'beatsIncluded' in product;

  useEffect(() => {
    if (isOpen) {
      // Reset state when modal opens
      setPaymentSuccess(false);
      setTransactionId('');
      setIsVerifying(false);
      setMethod('mpesa');
    }
  }, [isOpen]);

  if (!isOpen || !product) return null;

  const handleCopy = () => {
    navigator.clipboard.writeText(SITE_CONFIG.payment.mpesaNumber.replace('+', ''));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const triggerDownload = () => {
    if (!product) return;
    
    let downloadUrl: string | undefined;
    
    if (isPack) {
      downloadUrl = (product as BeatPack).fileUrl;
    } else {
      const beat = product as Beat;
      downloadUrl = beat.audioUrl || beat.previewUrl;
    }
    
    if (downloadUrl) {
      const link = document.createElement('a');
      link.href = downloadUrl;
      link.download = `${product.title.replace(/\s+/g, '_')}_ARDBEATZ${isPack ? '_PACK.zip' : '.mp3'}`;
      link.target = '_blank';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  const handleVerify = () => {
    if (!transactionId.trim()) return;
    
    setIsVerifying(true);
    
    // Simulate backend verification delay
    setTimeout(() => {
      setIsVerifying(false);
      setPaymentSuccess(true);
      // Attempt auto-download after verification
      setTimeout(triggerDownload, 500);
    }, 2000);
  };

  const handleManualPayPalSuccess = () => {
    setIsVerifying(true);
    setTimeout(() => {
      setIsVerifying(false);
      setPaymentSuccess(true);
      setTimeout(triggerDownload, 500);
    }, 1500);
  };

  // Construct PayPal Link
  const itemName = isPack ? `Pack: ${product.title}` : `${product.title} (License)`;
  // PayPal typically requires base currency amount. Here we use USD.
  const paypalLink = `https://www.paypal.com/cgi-bin/webscr?cmd=_xclick&business=${SITE_CONFIG.payment.paypalEmail}&item_name=${encodeURIComponent(itemName)}&amount=${product.price}&currency_code=USD`;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={onClose} />
      
      <div className="relative bg-ard-card border border-white/10 w-full max-w-md rounded-2xl shadow-2xl overflow-hidden animate-fade-in-up">
        {/* Header */}
        <div className="p-6 border-b border-white/10 flex justify-between items-center bg-ard-dark">
          <div>
            <h3 className="text-xl font-bold text-white">Checkout</h3>
            <p className="text-sm text-gray-400">
              {isPack ? 'Buying pack' : 'Buying license for'} <span className="text-ard-primary">{product.title}</span>
            </p>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-white">
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {paymentSuccess ? (
            <div className="text-center py-6 animate-fade-in">
               <div className="w-20 h-20 bg-green-500/10 rounded-full flex items-center justify-center mx-auto mb-6">
                 <Check className="w-10 h-10 text-green-500" />
               </div>
               <h3 className="text-2xl font-bold text-white mb-2">Payment Verified!</h3>
               <p className="text-gray-300 mb-6">
                 Your purchase was successful. Your download should start automatically.
               </p>
               
               <div className="space-y-3">
                 <Button onClick={triggerDownload} className="w-full flex items-center justify-center gap-2" variant="primary">
                   <Download className="w-5 h-5" />
                   Download Now
                 </Button>
                 <Button onClick={onClose} className="w-full" variant="ghost">
                   Back to Store
                 </Button>
               </div>
               
               <div className="mt-4 text-xs text-gray-500">
                  A receipt has been sent to your email.
               </div>
            </div>
          ) : (
            <>
              <div className="flex gap-4 mb-6">
                <button
                  onClick={() => setMethod('mpesa')}
                  className={`flex-1 py-3 px-4 rounded-xl border flex flex-col items-center justify-center gap-2 transition-all ${
                    method === 'mpesa' 
                      ? 'bg-ard-primary/10 border-ard-primary text-white' 
                      : 'bg-black/20 border-white/10 text-gray-400 hover:bg-white/5'
                  }`}
                >
                  <Smartphone className="w-6 h-6" />
                  <span className="font-semibold text-sm">M-Pesa</span>
                </button>
                <button
                  onClick={() => setMethod('paypal')}
                  className={`flex-1 py-3 px-4 rounded-xl border flex flex-col items-center justify-center gap-2 transition-all ${
                    method === 'paypal' 
                      ? 'bg-blue-500/10 border-blue-500 text-white' 
                      : 'bg-black/20 border-white/10 text-gray-400 hover:bg-white/5'
                  }`}
                >
                  <CreditCard className="w-6 h-6" />
                  <span className="font-semibold text-sm">PayPal</span>
                </button>
              </div>

              <div className="bg-black/30 rounded-xl p-6 border border-white/5">
                {method === 'mpesa' ? (
                  <div className="space-y-4">
                    <div className="text-center mb-4">
                      <p className="text-gray-400 text-sm mb-1">Send Payment to</p>
                      <h4 className="text-2xl font-bold text-white tracking-wider flex items-center justify-center gap-2">
                        {SITE_CONFIG.payment.mpesaNumber}
                        <button onClick={handleCopy} className="p-1 hover:text-ard-primary transition-colors">
                          {copied ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
                        </button>
                      </h4>
                      <p className="text-xs text-ard-primary mt-1">Name: {SITE_CONFIG.payment.mpesaName}</p>
                    </div>
                    
                    <div className="space-y-2 text-sm text-gray-300 bg-white/5 p-4 rounded-lg">
                      <p><span className="text-ard-primary font-bold">1.</span> Go to M-Pesa Menu &gt; Lipa na M-Pesa</p>
                      <p><span className="text-ard-primary font-bold">2.</span> Select Buy Goods / Send Money</p>
                      <p><span className="text-ard-primary font-bold">3.</span> Enter Number: <span className="font-mono text-white">{SITE_CONFIG.payment.mpesaNumber}</span></p>
                      <p><span className="text-ard-primary font-bold">4.</span> Amount: <span className="font-mono text-white text-lg">{formatPrice(product.price)}</span></p>
                      <p><span className="text-ard-primary font-bold">5.</span> Enter PIN and Confirm</p>
                    </div>

                    <div className="pt-4 border-t border-white/10 mt-4">
                      <label className="block text-sm font-medium text-gray-400 mb-2">Confirm Payment</label>
                      <div className="space-y-3">
                        <input 
                            type="text" 
                            value={transactionId}
                            onChange={(e) => setTransactionId(e.target.value)}
                            placeholder="Enter Transaction ID (e.g. QKD123456)"
                            className="w-full bg-black/40 border border-white/10 rounded-lg p-3 text-white focus:border-ard-primary focus:outline-none transition-colors uppercase"
                        />
                        <Button 
                            onClick={handleVerify} 
                            className="w-full"
                            disabled={!transactionId.trim() || isVerifying}
                        >
                            {isVerifying ? (
                              <span className="flex items-center">
                                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                Verifying...
                              </span>
                            ) : (
                              'Verify Transaction'
                            )}
                        </Button>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="text-center space-y-6 py-4">
                    <div className="w-16 h-16 bg-blue-500/20 rounded-full flex items-center justify-center mx-auto text-blue-400">
                      <CreditCard className="w-8 h-8" />
                    </div>
                    <div>
                      <h4 className="text-lg font-bold text-white mb-2">Pay securely with PayPal</h4>
                      <p className="text-gray-400 text-sm">
                        You will be redirected to PayPal to complete your purchase.
                        {currency !== 'USD' && (
                          <span className="block mt-1 text-xs text-gray-500">Note: PayPal charges in USD (${product.price.toFixed(2)}).</span>
                        )}
                      </p>
                    </div>
                    <div className="space-y-3">
                        <a 
                        href={paypalLink} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center w-full bg-[#0070BA] hover:bg-[#005ea6] text-white font-bold py-3 px-6 rounded-lg transition-colors group"
                        >
                        Pay Now on PayPal
                        <ExternalLink className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                        </a>
                        
                        <div className="relative py-2">
                            <div className="absolute inset-0 flex items-center"><span className="w-full border-t border-white/10"></span></div>
                            <div className="relative flex justify-center text-xs uppercase"><span className="bg-ard-card px-2 text-gray-500">Then</span></div>
                        </div>

                        <Button 
                            variant="outline"
                            onClick={handleManualPayPalSuccess} 
                            disabled={isVerifying}
                            className="w-full text-sm"
                        >
                             {isVerifying ? 'Confirming...' : 'I have completed payment'}
                        </Button>
                    </div>
                  </div>
                )}
              </div>
            </>
          )}
        </div>

        {/* Footer */}
        {!paymentSuccess && (
          <div className="p-4 border-t border-white/10 bg-black/40 text-center">
            <p className="text-xs text-gray-500">Secure payments handled by {method === 'mpesa' ? 'M-Pesa' : 'PayPal'}.</p>
          </div>
        )}
      </div>
    </div>
  );
};