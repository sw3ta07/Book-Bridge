import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Link } from 'react-router-dom';
import { Check, X, CreditCard, Shield, BookOpen, Users, Star } from 'lucide-react';
import { SubscriptionPlan } from '../types';
import { cn } from '../utils/cn';

const plans = [
  {
    name: SubscriptionPlan.FREE,
    price: 0,
    description: 'Basic features for casual readers',
    features: [
      'Up to 5 book listings',
      'Basic search functionality',
      'Community forum access',
      'Email support'
    ]
  },
  {
    name: SubscriptionPlan.STANDARD,
    price: 4.99,
    description: 'Perfect for active book exchangers',
    features: [
      'Up to 25 book listings',
      'Advanced search filters',
      'Priority book requests',
      'Reading groups access',
      'Chat with other members',
      'Priority email support'
    ]
  },
  {
    name: SubscriptionPlan.PREMIUM,
    price: 9.99,
    description: 'For dedicated bibliophiles',
    features: [
      'Unlimited book listings',
      'Early access to new features',
      'Create reading groups',
      'Personal librarian service',
      'Video chat consultations',
      '24/7 priority support',
      'Ad-free experience'
    ]
  }
];

const SubscriptionPage: React.FC = () => {
  const { user } = useAuth();
  const [selectedPlan, setSelectedPlan] = useState<SubscriptionPlan>(
    user?.subscription?.plan || SubscriptionPlan.FREE
  );
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSubscribe = async (plan: SubscriptionPlan) => {
    if (plan === SubscriptionPlan.FREE) return;
    
    setIsProcessing(true);
    try {
      // PayPal integration would go here
      await new Promise(resolve => setTimeout(resolve, 2000));
      // Update subscription in backend
    } catch (error) {
      console.error('Subscription failed:', error);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-serif font-bold mb-4">Choose Your Reading Journey</h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Select the plan that best fits your reading lifestyle and unlock enhanced features
          to make the most of your BookBridge experience.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {plans.map((plan) => (
          <div
            key={plan.name}
            className={cn(
              "bg-white rounded-lg shadow-lg border-2 transition-all duration-300 transform hover:-translate-y-1",
              selectedPlan === plan.name
                ? "border-accent-500 shadow-accent-100"
                : "border-cream-200"
            )}
          >
            <div className="p-8">
              <div className="text-center mb-8">
                {plan.name === SubscriptionPlan.FREE && (
                  <BookOpen className="w-12 h-12 mx-auto mb-4 text-primary-600" />
                )}
                {plan.name === SubscriptionPlan.STANDARD && (
                  <Users className="w-12 h-12 mx-auto mb-4 text-secondary-600" />
                )}
                {plan.name === SubscriptionPlan.PREMIUM && (
                  <Star className="w-12 h-12 mx-auto mb-4 text-accent-600" />
                )}
                <h2 className="text-2xl font-serif font-bold mb-2">{plan.name}</h2>
                <div className="text-3xl font-bold mb-2">
                  ${plan.price}
                  <span className="text-sm text-gray-600 font-normal">/month</span>
                </div>
                <p className="text-gray-600">{plan.description}</p>
              </div>

              <ul className="space-y-4 mb-8">
                {plan.features.map((feature, index) => (
                  <li key={index} className="flex items-start">
                    <Check className="w-5 h-5 text-secondary-600 mt-0.5 mr-2 flex-shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              <button
                onClick={() => handleSubscribe(plan.name)}
                disabled={isProcessing || (user?.subscription?.plan === plan.name)}
                className={cn(
                  "w-full py-3 rounded-md font-medium transition-colors",
                  plan.name === SubscriptionPlan.FREE
                    ? "bg-primary-100 text-primary-700 hover:bg-primary-200"
                    : "btn-accent"
                )}
              >
                {isProcessing ? (
                  <div className="flex items-center justify-center">
                    <div className="animate-spin mr-2 h-5 w-5 border-2 border-white border-t-transparent rounded-full"></div>
                    Processing...
                  </div>
                ) : user?.subscription?.plan === plan.name ? (
                  "Current Plan"
                ) : (
                  <>
                    <CreditCard className="w-5 h-5 inline-block mr-2" />
                    {plan.name === SubscriptionPlan.FREE ? "Get Started" : "Subscribe Now"}
                  </>
                )}
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-12 max-w-3xl mx-auto">
        <div className="bg-cream-50 rounded-lg p-6 border border-cream-200">
          <div className="flex items-start">
            <Shield className="w-6 h-6 text-secondary-600 mt-1 mr-3" />
            <div>
              <h3 className="font-medium text-lg mb-2">Secure Subscription</h3>
              <p className="text-gray-600">
                Your subscription is protected by our secure payment system. You can cancel
                or change your plan at any time. All subscriptions come with a 30-day
                money-back guarantee.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubscriptionPage;