import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { CreditCard, DollarSign, Heart, Coffee, BookOpen, CheckCircle } from 'lucide-react';
import { cn } from '../utils/cn';

const DonationPage: React.FC = () => {
  const { user } = useAuth();
  const [amount, setAmount] = useState('10');
  const [customAmount, setCustomAmount] = useState('');
  const [message, setMessage] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  
  const handleAmountSelect = (value: string) => {
    setAmount(value);
    setCustomAmount('');
  };
  
  const handleCustomAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value === '' || /^\d+(\.\d{0,2})?$/.test(value)) {
      setCustomAmount(value);
      setAmount('custom');
    }
  };
  
  const finalAmount = amount === 'custom' ? customAmount : amount;
  
  const handleDonate = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!finalAmount || parseFloat(finalAmount) <= 0) {
      return;
    }
    
    setIsProcessing(true);
    
    // Simulate PayPal processing
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      setIsSuccess(true);
    } catch (error) {
      console.error('Donation failed:', error);
    } finally {
      setIsProcessing(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-lg mx-auto text-center">
          <div className="mb-6 text-secondary-600">
            <CheckCircle size={64} className="mx-auto" />
          </div>
          <h1 className="text-3xl font-serif font-bold mb-4">Thank You for Your Donation!</h1>
          <p className="text-lg text-gray-700 mb-8">
            Your contribution of ${parseFloat(finalAmount).toFixed(2)} will help us maintain and grow 
            our book exchange community.
          </p>
          <div className="p-6 bg-cream-50 rounded-lg border border-cream-200 mb-8">
            <p className="text-gray-700 italic">
              "{message || "Support for the BookBridge community"}"
            </p>
            <p className="text-sm text-gray-500 mt-2">
              — {user?.name}
            </p>
          </div>
          <button 
            onClick={() => setIsSuccess(false)} 
            className="btn-primary px-6 py-3"
          >
            Make Another Donation
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-serif font-bold mb-6 text-center">Support Our Community</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <div className="bg-white rounded-lg shadow-md overflow-hidden border border-cream-200">
            <div className="p-6">
              <h2 className="text-xl font-serif font-bold mb-4">Why Donate?</h2>
              <p className="text-gray-700 mb-6">
                Your donations help us maintain and grow the BookBridge community. Here's how your contribution makes a difference:
              </p>
              
              <ul className="space-y-4">
                <li className="flex">
                  <span className="mr-3 text-primary-600">
                    <BookOpen size={20} />
                  </span>
                  <div>
                    <h3 className="font-medium mb-1">Expand Our Reach</h3>
                    <p className="text-gray-600 text-sm">
                      Help us bring the joy of book sharing to more communities and readers around the world.
                    </p>
                  </div>
                </li>
                <li className="flex">
                  <span className="mr-3 text-primary-600">
                    <Coffee size={20} />
                  </span>
                  <div>
                    <h3 className="font-medium mb-1">Maintain The Platform</h3>
                    <p className="text-gray-600 text-sm">
                      Keep our servers running and support ongoing development of new features.
                    </p>
                  </div>
                </li>
                <li className="flex">
                  <span className="mr-3 text-primary-600">
                    <Heart size={20} />
                  </span>
                  <div>
                    <h3 className="font-medium mb-1">Community Programs</h3>
                    <p className="text-gray-600 text-sm">
                      Fund book drives, literacy initiatives, and special events for our community.
                    </p>
                  </div>
                </li>
              </ul>
            </div>
            
            <div className="bg-cream-50 p-6 border-t border-cream-200">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-medium">Our Progress</h3>
                <span className="text-sm text-gray-600">67% of monthly goal</span>
              </div>
              <div className="w-full h-3 bg-cream-200 rounded-full overflow-hidden">
                <div className="bg-secondary-500 h-full rounded-full" style={{ width: '67%' }}></div>
              </div>
              <p className="text-sm text-gray-600 mt-2">
                $670 raised of $1,000 monthly goal
              </p>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-md overflow-hidden border border-cream-200">
            <div className="p-6">
              <h2 className="text-xl font-serif font-bold mb-4">Make a Donation</h2>
              <form onSubmit={handleDonate}>
                <div className="mb-6">
                  <label className="block text-gray-700 font-medium mb-2">
                    Select Amount
                  </label>
                  <div className="grid grid-cols-3 gap-2 mb-2">
                    {['5', '10', '25', '50', '100', 'custom'].map((value) => (
                      <button
                        key={value}
                        type="button"
                        onClick={() => handleAmountSelect(value)}
                        className={cn(
                          "py-2 px-4 rounded-md border text-center transition-colors",
                          amount === value
                            ? "border-primary-600 bg-primary-50 text-primary-700"
                            : "border-cream-300 hover:border-primary-300"
                        )}
                      >
                        {value === 'custom' ? 'Custom' : `$${value}`}
                      </button>
                    ))}
                  </div>
                  
                  {amount === 'custom' && (
                    <div className="mt-3">
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <DollarSign size={18} className="text-gray-500" />
                        </div>
                        <input
                          type="text"
                          value={customAmount}
                          onChange={handleCustomAmountChange}
                          placeholder="Enter amount"
                          className="w-full pl-10 input"
                        />
                      </div>
                    </div>
                  )}
                </div>
                
                <div className="mb-6">
                  <label htmlFor="message" className="block text-gray-700 font-medium mb-2">
                    Leave a Message (Optional)
                  </label>
                  <textarea
                    id="message"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Share why you're donating..."
                    className="input min-h-[100px]"
                  ></textarea>
                </div>
                
                <div className="bg-cream-50 p-4 rounded-md mb-6">
                  <div className="flex justify-between mb-2">
                    <span>Donation Amount:</span>
                    <span className="font-medium">${parseFloat(finalAmount || '0').toFixed(2)}</span>
                  </div>
                  <div className="text-sm text-gray-600">
                    100% of your donation goes directly to supporting the BookBridge community.
                  </div>
                </div>
                
                <button
                  type="submit"
                  disabled={isProcessing || !finalAmount || parseFloat(finalAmount) <= 0}
                  className="w-full btn-accent py-3 flex items-center justify-center"
                >
                  {isProcessing ? (
                    <>
                      <div className="animate-spin mr-2 h-5 w-5 border-2 border-white border-t-transparent rounded-full"></div>
                      Processing...
                    </>
                  ) : (
                    <>
                      <CreditCard size={18} className="mr-2" />
                      Donate with PayPal
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
        
        {/* Recent Donors */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden border border-cream-200 p-6">
          <h2 className="text-xl font-serif font-bold mb-6">Recent Supporters</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { name: 'Sarah Johnson', amount: 25, message: 'I love this community!', date: '2 days ago' },
              { name: 'Michael Chen', amount: 50, message: 'Keep up the great work!', date: '3 days ago' },
              { name: 'Emma Rodriguez', amount: 15, message: 'Books change lives.', date: '5 days ago' },
              { name: 'David Lee', amount: 100, message: 'Happy to support literacy.', date: '1 week ago' },
              { name: 'Olivia Taylor', amount: 10, message: 'For the love of reading!', date: '1 week ago' },
              { name: 'Anonymous', amount: 30, message: 'Thank you for creating this platform.', date: '2 weeks ago' },
            ].map((donor, index) => (
              <div key={index} className="p-4 bg-cream-50 rounded-md border border-cream-200">
                <div className="flex justify-between items-start mb-2">
                  <span className="font-medium">{donor.name}</span>
                  <span className="text-secondary-600 font-medium">${donor.amount}</span>
                </div>
                <p className="text-gray-700 text-sm italic mb-2">"{donor.message}"</p>
                <p className="text-xs text-gray-500">{donor.date}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DonationPage;