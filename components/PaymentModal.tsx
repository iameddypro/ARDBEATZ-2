import React, { useState, useEffect } from 'react';
import { X, CreditCard, Check, Loader2, Download, ExternalLink, Smartphone, MessageCircle, Wallet } from 'lucide-react';
import { Beat, BeatPack } from '../types';
import { Button } from './Button';
import { SITE_CONFIG } from '../data/content';
import { useCurrency } from '../context/CurrencyContext';

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  product: Beat | BeatPack | null;
}

type PaymentMethod = 'paypal' | 'mobile' | null;
type Step = 'select' | 'confirm' | 'success';

export const PaymentModal: React.FC<PaymentModalProps> = ({ isOpen, onClose, product }) => {
  const { currency, formatPrice } = useCurrency();
  
  const [method, setMethod] = useState<PaymentMethod>(null);
  const [step, setStep] = useState<Step>('select');
  const [isVerifying, setIsVerifying] = useState(false);

  const isPack = product && 'beatsIncluded' in product;

  useEffect(() => {
    if (isOpen) {
      // Reset state when modal opens
      setMethod(null);
      setStep('select');
      setIsVerifying(false);
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

  const handlePaymentComplete = () => {
    setIsVerifying(true);
    setTimeout(() => {
      setIsVerifying(false);
      setStep('success');
    }, 1500);
  };

  // Construct PayPal Link
  const itemName = isPack ? `Pack: ${product.title}` : `${product.title} (License)`;
  const paypalLink = `https://www.paypal.com/cgi-bin/webscr?cmd=_xclick&business=${SITE_CONFIG.payment.paypalEmail}&item_name=${encodeURIComponent(itemName)}&amount=${product.price}&currency_code=USD`;

  // Construct WhatsApp Link
  const whatsappMessage = `Hi, I have completed the payment for "${product.title}" (${formatPrice(product.price)}). Here is my payment screenshot. Please send me the download link.`;
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
                    <span className="font-bold text-white">Mobile & Cards</span>
                    <span className="text-xs text-gray-500 mt-1">PawaPay, PesaPal, M-Pesa</span>
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
                    onClick={handlePaymentComplete} 
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
                
                {/* Gateways */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="p-3 bg-white/5 border border-white/10 rounded-lg text-center opacity-75 hover:opacity-100 cursor-pointer transition-all">
                    <span className="font-bold text-blue-400 block mb-1">PawaPay</span>
                    <span className="text-[10px] text-gray-500">Mobile Money Gateway</span>
                  </div>
                  <div className="p-3 bg-white/5 border border-white/10 rounded-lg text-center opacity-75 hover:opacity-100 cursor-pointer transition-all">
                    <span className="font-bold text-blue-500 block mb-1">PesaPal</span>
                    <span className="text-[10px] text-gray-500">Cards & Mobile</span>
                  </div>
                </div>

                <div className="relative py-1">
                    <div className="absolute inset-0 flex items-center"><span className="w-full border-t border-white/10"></span></div>
                    <div className="relative flex justify-center text-xs uppercase"><span className="bg-ard-card px-2 text-gray-500">Or Pay Directly</span></div>
                </div>

                {/* Direct Mobile */}
                <div className="bg-green-500/10 p-4 rounded-lg border border-green-500/30">
                    <div className="flex items-center gap-3 mb-3">
                       <div className="p-2 bg-green-600 rounded-full text-white">
                         <Smartphone className="w-4 h-4" />
                       </div>
                       <h4 className="font-bold text-white">Direct Mobile Transfer</h4>
                    </div>
                    
                    <div className="space-y-3">
                        <div className="flex justify-between items-center border-b border-white/5 pb-2">
                          <span className="text-gray-400 text-sm">Network</span>
                          <span className="text-white font-medium">M-Pesa / Vodacom</span>
                        </div>
                        <div className="flex justify-between items-center border-b border-white/5 pb-2">
                          <span className="text-gray-400 text-sm">Number</span>
                          <span className="text-white font-mono select-all">{SITE_CONFIG.payment.mpesaNumber}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-gray-400 text-sm">Name</span>
                          <span className="text-white font-medium">{SITE_CONFIG.payment.mpesaName}</span>
                        </div>
                    </div>
                </div>

                <Button 
                    variant="primary"
                    onClick={handlePaymentComplete} 
                    disabled={isVerifying}
                    className="w-full"
                >
                      {isVerifying ? (
                        <span className="flex items-center">
                          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                          Processing...
                        </span>
                      ) : (
                        'I have sent the money'
                      )}
                </Button>

                <button onClick={() => setStep('select')} className="w-full text-center text-sm text-gray-500 hover:text-white mt-2">
                  Change Payment Method
                </button>
             </div>
          )}

          {step === 'success' && (
            <div className="text-center py-4 space-y-6 animate-fade-in">
               <div className="w-20 h-20 bg-green-500/10 rounded-full flex items-center justify-center mx-auto">
                 <Check className="w-10 h-10 text-green-500" />
               </div>
               
               <div>
                  <h3 className="text-2xl font-bold text-white mb-2">Payment Recorded!</h3>
                  <p className="text-gray-300 text-sm">
                    To instantly receive your beat/pack, please complete the final verification step below.
                  </p>
               </div>
               
               <div className="bg-ard-primary/10 border border-ard-primary/30 p-4 rounded-xl text-left space-y-3">
                  <div className="flex items-start gap-3">
                     <MessageCircle className="w-5 h-5 text-ard-primary mt-0.5 flex-shrink-0" />
                     <div>
                        <h4 className="font-bold text-white text-sm">Required: Send Screenshot</h4>
                        <p className="text-xs text-gray-400 mt-1">
                          Click the button below to open WhatsApp and send us a screenshot of your payment. We will verify it instantly.
                        </p>
                     </div>
                  </div>
                  <a 
                    href={whatsappLink}
                    target="_blank"
                    rel="noopener noreferrer" 
                    className="flex items-center justify-center w-full bg-[#25D366] hover:bg-[#20bd5a] text-black font-bold py-3 px-4 rounded-lg transition-colors"
                  >
                    <MessageCircle className="w-4 h-4 mr-2" />
                    Send Screenshot to WhatsApp
                  </a>
               </div>
               
               <div className="pt-4 border-t border-white/10">
                 <p className="text-xs text-gray-500 mb-3">
                   Link already verified? Download directly below:
                 </p>
                 <Button onClick={triggerDownload} className="w-full flex items-center justify-center gap-2" variant="ghost">
                   <Download className="w-5 h-5" />
                   Download File
                 </Button>
               </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};