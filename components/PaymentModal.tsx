import React, { useState, useEffect } from 'react';
import { X, CreditCard, Check, Loader2, Download, ExternalLink, Smartphone, MessageCircle, Wallet, AlertCircle } from 'lucide-react';
import { Beat, BeatPack } from '../types';
import { Button } from './Button';
import { SITE_CONFIG } from '../data/content';
import { useCurrency } from '../context/CurrencyContext';
import { useData } from '../context/DataContext';

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  product: Beat | BeatPack | null;
}

type PaymentMethod = 'paypal' | 'mobile' | null;
type Step = 'select' | 'confirm' | 'success';

export const PaymentModal: React.FC<PaymentModalProps> = ({ isOpen, onClose, product }) => {
  const { currency, formatPrice } = useCurrency();
  const { addOrder } = useData();
  
  const [method, setMethod] = useState<PaymentMethod>(null);
  const [step, setStep] = useState<Step>('select');
  const [isVerifying, setIsVerifying] = useState(false);
  const [transactionId, setTransactionId] = useState('');
  const [error, setError] = useState('');

  const isPack = product && 'beatsIncluded' in product;

  useEffect(() => {
    if (isOpen) {
      // Reset state when modal opens
      setMethod(null);
      setStep('select');
      setIsVerifying(false);
      setTransactionId('');
      setError('');
    }
  }, [isOpen]);

  if (!isOpen || !product) return null;

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

  const saveOrder = (method: 'PayPal' | 'M-Pesa', tid?: string) => {
    addOrder({
      id: tid || `PAY-${Date.now().toString().slice(-6)}`,
      customerName: 'Guest User', // In real app, get from login
      productTitle: product.title,
      amount: product.price,
      date: new Date().toLocaleDateString(),
      paymentMethod: method,
      transactionId: tid,
      status: 'Verified', // Auto-verified for this demo flow
    });
  };

  const handlePaypalComplete = () => {
    setIsVerifying(true);
    setTimeout(() => {
      saveOrder('PayPal');
      setIsVerifying(false);
      setStep('success');
    }, 1500);
  };

  const handleVerifyMobilePayment = () => {
    if (!transactionId || transactionId.length < 5) {
      setError('Please enter a valid Transaction ID');
      return;
    }
    
    setError('');
    setIsVerifying(true);
    
    // Simulate API verification delay
    setTimeout(() => {
      saveOrder('M-Pesa', transactionId);
      setIsVerifying(false);
      setStep('success');
    }, 2000);
  };

  // Construct PayPal Link
  const itemName = isPack ? `Pack: ${product.title}` : `${product.title} (License)`;
  const paypalLink = `https://www.paypal.com/cgi-bin/webscr?cmd=_xclick&business=${SITE_CONFIG.payment.paypalEmail}&item_name=${encodeURIComponent(itemName)}&amount=${product.price}&currency_code=USD`;

  // Construct WhatsApp Link
  const whatsappMessage = `Hi, I have completed the payment for "${product.title}" (${formatPrice(product.price)}). Transaction ID: ${transactionId}. Please send me the download link.`;
  const whatsappLink = `https://wa.me/${SITE_CONFIG.payment.whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={onClose} />
      
      <div className="relative bg-ard-card border border-white/10 w-full max-w-lg rounded-2xl shadow-2xl overflow-hidden animate-fade-in-up flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="p-5 border-b border-white/10 flex justify-between items-center bg-ard-dark">
          <div>
            <h3 className="text-xl font-bold text-white">Checkout</h3>
            <p className="text-sm text-gray-400">
              {isPack ? 'Buying pack' : 'Buying license for'} <span className="text-ard-primary font-semibold">{product.title}</span>
            </p>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-white">
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto custom-scrollbar">
          
          {step === 'select' && (
            <div className="space-y-6">
               <div className="text-center mb-6">
                 <p className="text-gray-400 text-sm mb-1">Total Amount</p>
                 <p className="text-4xl font-bold text-white">{formatPrice(product.price)}</p>
               </div>

               <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                 <button 
                    onClick={() => { setMethod('paypal'); setStep('confirm'); }}
                    className="flex flex-col items-center justify-center p-6 bg-white/5 border border-white/10 rounded-xl hover:bg-[#0070BA]/10 hover:border-[#0070BA] hover:shadow-lg hover:shadow-[#0070BA]/20 transition-all group"
                 >
                    <div className="w-12 h-12 rounded-full bg-[#0070BA]/20 flex items-center justify-center mb-3 group-hover:bg-[#0070BA] group-hover:text-white transition-colors text-[#0070BA]">
                      <ExternalLink className="w-6 h-6" />
                    </div>
                    <span className="font-bold text-white">PayPal</span>
                    <span className="text-xs text-gray-500 mt-1">International</span>
                 </button>

                 <button 
                    onClick={() => { setMethod('mobile'); setStep('confirm'); }}
                    className="flex flex-col items-center justify-center p-6 bg-white/5 border border-white/10 rounded-xl hover:bg-green-600/10 hover:border-green-600 hover:shadow-lg hover:shadow-green-600/20 transition-all group"
                 >
                    <div className="w-12 h-12 rounded-full bg-green-600/20 flex items-center justify-center mb-3 group-hover:bg-green-600 group-hover:text-white transition-colors text-green-500">
                      <Smartphone className="w-6 h-6" />
                    </div>
                    <span className="font-bold text-white">M-Pesa</span>
                    <span className="text-xs text-gray-500 mt-1">Mobile Money</span>
                 </button>
               </div>
            </div>
          )}

          {step === 'confirm' && method === 'paypal' && (
             <div className="space-y-6">
                <div className="bg-[#0070BA]/10 p-4 rounded-lg border border-[#0070BA]/30 flex items-start gap-3">
                   <div className="p-2 bg-[#0070BA] rounded-full text-white mt-1">
                     <ExternalLink className="w-4 h-4" />
                   </div>
                   <div>
                     <h4 className="font-bold text-white mb-1">Pay with PayPal</h4>
                     <p className="text-sm text-gray-400">You will be redirected to PayPal to complete your purchase securely.</p>
                   </div>
                </div>

                <div className="bg-black/30 p-4 rounded-lg border border-white/10">
                   <p className="text-xs text-gray-500 uppercase mb-2">Recipient Email</p>
                   <p className="font-mono text-white select-all">{SITE_CONFIG.payment.paypalEmail}</p>
                </div>

                <a 
                  href={paypalLink} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center justify-center w-full bg-[#0070BA] hover:bg-[#005ea6] text-white font-bold py-4 px-6 rounded-xl transition-all shadow-lg shadow-blue-500/20"
                >
                  Proceed to PayPal
                  <ExternalLink className="w-4 h-4 ml-2" />
                </a>

                <div className="relative py-2">
                    <div className="absolute inset-0 flex items-center"><span className="w-full border-t border-white/10"></span></div>
                    <div className="relative flex justify-center text-xs uppercase"><span className="bg-ard-card px-2 text-gray-500">After Payment</span></div>
                </div>

                <Button 
                    variant="outline"
                    onClick={handlePaypalComplete} 
                    disabled={isVerifying}
                    className="w-full"
                >
                      {isVerifying ? (
                        <span className="flex items-center">
                          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                          Verifying...
                        </span>
                      ) : (
                        'I have completed the payment'
                      )}
                </Button>

                <button onClick={() => setStep('select')} className="w-full text-center text-sm text-gray-500 hover:text-white mt-2">
                  Change Payment Method
                </button>
             </div>
          )}

          {step === 'confirm' && method === 'mobile' && (
             <div className="space-y-6">
                
                {/* Direct Mobile Details */}
                <div className="bg-green-500/10 p-4 rounded-lg border border-green-500/30">
                    <div className="flex items-center gap-3 mb-3">
                       <div className="p-2 bg-green-600 rounded-full text-white">
                         <Smartphone className="w-4 h-4" />
                       </div>
                       <h4 className="font-bold text-white">M-Pesa Payment Details</h4>
                    </div>
                    
                    <div className="space-y-3 mb-4">
                        <div className="flex justify-between items-center border-b border-white/5 pb-2">
                          <span className="text-gray-400 text-sm">Send to Number</span>
                          <span className="text-white font-mono select-all text-lg">{SITE_CONFIG.payment.mpesaNumber}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-gray-400 text-sm">Recipient Name</span>
                          <span className="text-white font-medium">{SITE_CONFIG.payment.mpesaName}</span>
                        </div>
                    </div>
                    
                    <div className="text-xs text-green-200 bg-green-900/30 p-3 rounded border border-green-500/20 leading-relaxed">
                        1. Go to M-Pesa Menu<br/>
                        2. Select "Send Money"<br/>
                        3. Enter Number: <b>{SITE_CONFIG.payment.mpesaNumber}</b><br/>
                        4. Enter Amount: <b>{formatPrice(product.price)}</b><br/>
                        5. Copy the <b>Transaction ID</b> received in the SMS
                    </div>
                </div>

                {/* Verification Input */}
                <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-300">Enter Confirmation Code</label>
                    <input 
                        type="text" 
                        value={transactionId}
                        onChange={(e) => {
                            setTransactionId(e.target.value.toUpperCase());
                            setError('');
                        }}
                        placeholder="e.g. QK85..."
                        className={`w-full bg-black/40 border ${error ? 'border-red-500' : 'border-white/20'} rounded-lg p-3 text-white placeholder-gray-600 focus:outline-none focus:ring-1 ${error ? 'focus:ring-red-500' : 'focus:ring-green-500'} transition-all font-mono uppercase tracking-wide`}
                    />
                    {error && (
                        <div className="flex items-center text-xs text-red-500 animate-fade-in">
                            <AlertCircle className="w-3 h-3 mr-1" />
                            {error}
                        </div>
                    )}
                </div>

                <Button 
                    variant="primary"
                    onClick={handleVerifyMobilePayment} 
                    disabled={isVerifying || !transactionId}
                    className="w-full bg-gradient-to-r from-green-600 to-green-500 hover:from-green-500 hover:to-green-400 shadow-green-500/20"
                >
                      {isVerifying ? (
                        <span className="flex items-center">
                          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                          Verifying...
                        </span>
                      ) : (
                        'Verify Payment'
                      )}
                </Button>

                <button onClick={() => setStep('select')} className="w-full text-center text-sm text-gray-500 hover:text-white mt-2">
                  Change Payment Method
                </button>
             </div>
          )}

          {step === 'success' && (
            <div className="text-center py-4 space-y-6 animate-fade-in">
               <div className="w-20 h-20 bg-green-500/10 rounded-full flex items-center justify-center mx-auto border-2 border-green-500/30">
                 <Check className="w-10 h-10 text-green-500" />
               </div>
               
               <div>
                  <h3 className="text-2xl font-bold text-white mb-2">Payment Verified!</h3>
                  <p className="text-gray-300 text-sm">
                    Thank you for your purchase. Your transaction has been confirmed successfully.
                  </p>
               </div>
               
               {method === 'mobile' && (
                   <div className="bg-white/5 border border-white/10 p-4 rounded-xl text-left">
                       <p className="text-xs text-gray-500 uppercase mb-1">Transaction ID</p>
                       <p className="font-mono text-lg text-white tracking-widest">{transactionId}</p>
                   </div>
               )}
               
               <div className="pt-4 border-t border-white/10 space-y-3">
                 <Button onClick={triggerDownload} className="w-full flex items-center justify-center gap-2 py-4 bg-ard-primary hover:bg-red-600 text-white">
                   <Download className="w-5 h-5" />
                   Download Now
                 </Button>
                 
                 <div className="text-xs text-gray-500 mt-4">
                    Having trouble? <a href={whatsappLink} target="_blank" rel="noreferrer" className="text-ard-primary hover:underline">Contact Support</a>
                 </div>
               </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};