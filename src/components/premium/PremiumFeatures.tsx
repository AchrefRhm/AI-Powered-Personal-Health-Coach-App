import React, { useState } from 'react';
import { Crown, Check, Star, TrendingUp, Users, Shield, Smartphone } from 'lucide-react';
import Button from '../ui/Button';
import Card from '../ui/Card';
import Badge from '../ui/Badge';
import Modal from '../ui/Modal';
import { subscriptionApi } from '../../services/api';

const PremiumFeatures: React.FC = () => {
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<'premium' | 'pro'>('premium');
  const [upgrading, setUpgrading] = useState(false);

  const handleUpgrade = async () => {
    setUpgrading(true);
    try {
      const result = await subscriptionApi.upgradeSubscription(selectedPlan);
      if (result.success) {
        // Redirect to payment or show success message
        console.log('Upgrade successful:', result);
        setShowUpgradeModal(false);
      }
    } catch (error) {
      console.error('Upgrade failed:', error);
    } finally {
      setUpgrading(false);
    }
  };

  const plans = {
    free: {
      name: 'Free',
      price: 0,
      period: 'forever',
      features: [
        'Basic meal tracking',
        'Simple workout plans',
        'Daily step counter',
        'Basic progress tracking',
        'Community support'
      ]
    },
    premium: {
      name: 'Premium',
      price: 9.99,
      period: 'month',
      features: [
        'Everything in Free',
        'AI-powered meal recognition',
        'Personalized workout plans',
        'Advanced analytics dashboard',
        'Nutritionist consultations',
        'Custom meal plans',
        'Wearable device integration',
        'Priority customer support'
      ]
    },
    pro: {
      name: 'Pro',
      price: 19.99,
      period: 'month',
      features: [
        'Everything in Premium',
        'Personal fitness coach',
        'Medical professional consultations',
        'Advanced biometric tracking',
        'Custom supplement recommendations',
        'Genetic analysis integration',
        'White-glove onboarding',
        '24/7 health monitoring'
      ]
    }
  };

  const premiumFeatures = [
    {
      icon: TrendingUp,
      title: 'Advanced Analytics',
      description: 'Detailed health insights with predictive analytics and personalized recommendations based on your data trends.',
      isPro: false
    },
    {
      icon: Users,
      title: 'Expert Consultations',
      description: 'One-on-one sessions with certified nutritionists and fitness experts to accelerate your progress.',
      isPro: false
    },
    {
      icon: Smartphone,
      title: 'Wearable Integration',
      description: 'Seamlessly connect with Apple Watch, Fitbit, and other devices for comprehensive health monitoring.',
      isPro: false
    },
    {
      icon: Shield,
      title: 'Medical Integration',
      description: 'Connect with healthcare providers and sync medical records for a complete health picture.',
      isPro: true
    },
    {
      icon: Crown,
      title: 'Personal Health Coach',
      description: 'Dedicated certified health professional providing personalized guidance and accountability.',
      isPro: true
    },
    {
      icon: Star,
      title: 'Genetic Analysis',
      description: 'Personalized nutrition and fitness recommendations based on your genetic profile and predispositions.',
      isPro: true
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <Crown className="h-10 w-10 text-yellow-500" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Unlock Your Health Potential
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Take your wellness journey to the next level with AI-powered insights, 
            expert guidance, and comprehensive health tracking.
          </p>
        </div>

        {/* Pricing Plans */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          {Object.entries(plans).map(([key, plan]) => (
            <Card 
              key={key} 
              className={`relative text-center ${
                key === 'premium' ? 'ring-2 ring-blue-500 transform scale-105' : ''
              }`}
            >
              {key === 'premium' && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <Badge variant="primary" className="px-3 py-1">
                    Most Popular
                  </Badge>
                </div>
              )}
              
              <div className="mb-6">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                <div className="flex items-center justify-center">
                  <span className="text-4xl font-bold text-gray-900">
                    ${plan.price}
                  </span>
                  {plan.period !== 'forever' && (
                    <span className="text-gray-600 ml-1">/{plan.period}</span>
                  )}
                </div>
              </div>

              <ul className="space-y-3 mb-8">
                {plan.features.map((feature, index) => (
                  <li key={index} className="flex items-center text-sm">
                    <Check className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                    <span className="text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>

              <Button
                onClick={() => {
                  if (key !== 'free') {
                    setSelectedPlan(key as 'premium' | 'pro');
                    setShowUpgradeModal(true);
                  }
                }}
                variant={key === 'premium' ? 'primary' : key === 'pro' ? 'secondary' : 'outline'}
                className="w-full"
                disabled={key === 'free'}
              >
                {key === 'free' ? 'Current Plan' : `Upgrade to ${plan.name}`}
              </Button>
            </Card>
          ))}
        </div>

        {/* Feature Showcase */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Premium Features That Transform Your Health
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {premiumFeatures.map((feature, index) => (
              <Card key={index} className="text-center relative" hover>
                {feature.isPro && (
                  <div className="absolute top-4 right-4">
                    <Badge variant="secondary" size="sm">Pro</Badge>
                  </div>
                )}
                
                <div className="p-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                  <feature.icon className="h-8 w-8 text-white" />
                </div>
                
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {feature.description}
                </p>
              </Card>
            ))}
          </div>
        </div>

        {/* Social Proof */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-16">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Trusted by 50,000+ Health Enthusiasts
            </h3>
            <div className="flex items-center justify-center space-x-1 mb-4">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="h-6 w-6 text-yellow-400 fill-current" />
              ))}
              <span className="ml-2 text-gray-600">4.9/5 average rating</span>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: 'Sarah M.',
                role: 'Marketing Manager',
                testimonial: 'The AI meal recognition saved me hours every week. I lost 15 pounds in 3 months!',
                avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop'
              },
              {
                name: 'James R.',
                role: 'Software Engineer',
                testimonial: 'The personalized workout plans adapted perfectly to my schedule and fitness level.',
                avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop'
              },
              {
                name: 'Emily K.',
                role: 'Teacher',
                testimonial: 'Having a nutritionist consultation through the app was a game-changer for my diet.',
                avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop'
              }
            ].map((testimonial, index) => (
              <div key={index} className="text-center">
                <img 
                  src={testimonial.avatar} 
                  alt={testimonial.name}
                  className="w-16 h-16 rounded-full mx-auto mb-4"
                />
                <p className="text-gray-700 italic mb-3">
                  "{testimonial.testimonial}"
                </p>
                <div>
                  <p className="font-semibold text-gray-900">{testimonial.name}</p>
                  <p className="text-sm text-gray-600">{testimonial.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <Card className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
            <h2 className="text-3xl font-bold mb-4">Ready to Transform Your Health?</h2>
            <p className="text-xl mb-6 opacity-90">
              Join thousands who have already upgraded their wellness journey
            </p>
            <Button
              onClick={() => setShowUpgradeModal(true)}
              size="lg"
              className="bg-white text-blue-600 hover:bg-gray-100"
            >
              Start Your Premium Journey
            </Button>
          </Card>
        </div>

        {/* Upgrade Modal */}
        <Modal
          isOpen={showUpgradeModal}
          onClose={() => setShowUpgradeModal(false)}
          title="Choose Your Premium Plan"
          size="lg"
        >
          <div className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {(['premium', 'pro'] as const).map((planKey) => {
                const plan = plans[planKey];
                return (
                  <button
                    key={planKey}
                    onClick={() => setSelectedPlan(planKey)}
                    className={`p-4 border-2 rounded-lg transition-colors ${
                      selectedPlan === planKey
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <h4 className="font-semibold text-lg mb-2">{plan.name}</h4>
                    <p className="text-2xl font-bold mb-2">
                      ${plan.price}
                      <span className="text-sm font-normal text-gray-600">/{plan.period}</span>
                    </p>
                    <p className="text-sm text-gray-600">
                      {planKey === 'premium' ? 'Perfect for individuals' : 'For serious health enthusiasts'}
                    </p>
                  </button>
                );
              })}
            </div>

            <div className="bg-gray-50 rounded-lg p-4">
              <h4 className="font-medium mb-2">What you'll get:</h4>
              <ul className="text-sm space-y-1">
                {plans[selectedPlan].features.slice(-4).map((feature, index) => (
                  <li key={index} className="flex items-center">
                    <Check className="h-4 w-4 text-green-500 mr-2" />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex space-x-3">
              <Button
                onClick={handleUpgrade}
                loading={upgrading}
                className="flex-1"
              >
                {upgrading ? 'Processing...' : `Upgrade to ${plans[selectedPlan].name}`}
              </Button>
              <Button
                variant="outline"
                onClick={() => setShowUpgradeModal(false)}
                disabled={upgrading}
              >
                Cancel
              </Button>
            </div>
          </div>
        </Modal>
      </div>
    </div>
  );
};

export default PremiumFeatures;