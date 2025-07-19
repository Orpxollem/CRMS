import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Sparkles, Shield, Eye, Database, Lock, Users, Globe, Clock, Mail } from 'lucide-react';
import Button from '../components/common/Button';

const PrivacyPolicy: React.FC = () => {
  const sections = [
    {
      id: 'information-collection',
      title: 'Information We Collect',
      icon: Database,
      content: `We collect information you provide directly to us, such as when you create an account, use our services, or contact us for support. This includes your name, email address, company information, and any data you input into our CRM system.`
    },
    {
      id: 'how-we-use',
      title: 'How We Use Your Information',
      icon: Eye,
      content: `We use the information we collect to provide, maintain, and improve our services, process transactions, send you technical notices and support messages, and communicate with you about products, services, and promotional offers.`
    },
    {
      id: 'information-sharing',
      title: 'Information Sharing',
      icon: Users,
      content: `We do not sell, trade, or otherwise transfer your personal information to third parties without your consent, except as described in this policy. We may share information with trusted service providers who assist us in operating our platform.`
    },
    {
      id: 'data-security',
      title: 'Data Security',
      icon: Shield,
      content: `We implement appropriate technical and organizational security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. We use industry-standard encryption and security protocols.`
    },
    {
      id: 'data-retention',
      title: 'Data Retention',
      icon: Clock,
      content: `We retain your personal information for as long as necessary to provide our services and fulfill the purposes outlined in this policy. When you delete your account, we will delete your personal information within 30 days.`
    },
    {
      id: 'your-rights',
      title: 'Your Privacy Rights',
      icon: Lock,
      content: `You have the right to access, update, or delete your personal information. You can also opt out of certain communications and request a copy of your data. Contact us to exercise these rights.`
    },
    {
      id: 'cookies',
      title: 'Cookies and Tracking',
      icon: Globe,
      content: `We use cookies and similar tracking technologies to enhance your experience, analyze usage patterns, and improve our services. You can control cookie settings through your browser preferences.`
    },
    {
      id: 'international',
      title: 'International Data Transfers',
      icon: Globe,
      content: `Your information may be transferred to and processed in countries other than your own. We ensure appropriate safeguards are in place to protect your information in accordance with this privacy policy.`
    }
  ];

  const dataTypes = [
    { type: 'Account Information', description: 'Name, email, password, company details' },
    { type: 'Contact Data', description: 'Customer contacts, deals, tasks you create' },
    { type: 'Usage Information', description: 'How you interact with our platform' },
    { type: 'Device Information', description: 'Browser type, IP address, device identifiers' },
    { type: 'Communication Data', description: 'Support requests, feedback, correspondence' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-secondary-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-xl shadow-soft border-b border-neutral-100 sticky top-0 z-30">
        <div className="max-w-4xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link to="/login">
                <Button variant="ghost" size="sm">
                  <ArrowLeft size={16} className="mr-2" />
                  Back
                </Button>
              </Link>
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-xl flex items-center justify-center">
                  <Sparkles size={16} className="text-white" />
                </div>
                <span className="text-lg font-bold bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">
                  CRMS Pro
                </span>
              </div>
            </div>
            <div className="flex items-center space-x-2 text-sm text-neutral-500">
              <Clock size={14} />
              <span>Last updated: January 2024</span>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-6 py-12">
        {/* Title Section */}
        <div className="text-center mb-12 animate-fade-in">
          <h1 className="text-4xl font-bold text-neutral-900 mb-4">Privacy Policy</h1>
          <p className="text-xl text-neutral-600 max-w-2xl mx-auto leading-relaxed">
            Your privacy is important to us. This policy explains how we collect, use, and protect your information.
          </p>
        </div>

        {/* Data Types Overview */}
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-soft p-8 border border-neutral-100 mb-8 animate-slide-up">
          <div className="flex items-center mb-6">
            <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-primary-600 rounded-2xl flex items-center justify-center mr-4 shadow-soft">
              <Database size={20} className="text-white" />
            </div>
            <h3 className="text-2xl font-bold text-neutral-900">Types of Data We Collect</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {dataTypes.map((item, index) => (
              <div
                key={index}
                className="p-4 bg-gradient-to-br from-neutral-50 to-neutral-100 rounded-2xl border border-neutral-200 animate-fade-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <h4 className="font-semibold text-neutral-900 mb-2">{item.type}</h4>
                <p className="text-sm text-neutral-600">{item.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Navigation */}
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-soft p-6 border border-neutral-100 mb-8 animate-slide-up">
          <h3 className="text-lg font-bold text-neutral-900 mb-4">Quick Navigation</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {sections.map((section, index) => (
              <a
                key={section.id}
                href={`#${section.id}`}
                className="flex items-center p-3 bg-neutral-50 hover:bg-primary-50 rounded-2xl transition-all duration-200 hover:scale-[1.02] group animate-fade-in"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <section.icon size={16} className="text-neutral-500 group-hover:text-primary-600 mr-2 transition-colors duration-200" />
                <span className="text-sm font-medium text-neutral-700 group-hover:text-primary-700 transition-colors duration-200">
                  {section.title}
                </span>
              </a>
            ))}
          </div>
        </div>

        {/* Privacy Content */}
        <div className="space-y-8">
          {sections.map((section, index) => (
            <div
              key={section.id}
              id={section.id}
              className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-soft p-8 border border-neutral-100 hover:shadow-medium transition-all duration-300 animate-fade-in"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-secondary-500 to-secondary-600 rounded-2xl flex items-center justify-center mr-4 shadow-soft">
                  <section.icon size={20} className="text-white" />
                </div>
                <h2 className="text-2xl font-bold text-neutral-900">{section.title}</h2>
              </div>
              <p className="text-neutral-700 leading-relaxed text-lg">{section.content}</p>
            </div>
          ))}
        </div>

        {/* GDPR Compliance */}
        <div className="mt-12 bg-gradient-to-br from-success-500 to-success-600 rounded-3xl p-8 text-white shadow-large animate-fade-in">
          <div className="flex items-center mb-6">
            <Shield size={32} className="mr-4" />
            <div>
              <h3 className="text-2xl font-bold">GDPR Compliant</h3>
              <p className="text-success-100">We comply with EU General Data Protection Regulation</p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-4">
              <h4 className="font-semibold mb-2">Right to Access</h4>
              <p className="text-success-100 text-sm">Request a copy of your personal data</p>
            </div>
            <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-4">
              <h4 className="font-semibold mb-2">Right to Deletion</h4>
              <p className="text-success-100 text-sm">Request deletion of your personal data</p>
            </div>
            <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-4">
              <h4 className="font-semibold mb-2">Data Portability</h4>
              <p className="text-success-100 text-sm">Export your data in a structured format</p>
            </div>
          </div>
        </div>

        {/* Contact Section */}
        <div className="mt-12 bg-gradient-to-br from-primary-500 to-secondary-600 rounded-3xl p-8 text-white shadow-large animate-fade-in">
          <div className="text-center">
            <Mail size={32} className="mx-auto mb-4" />
            <h3 className="text-2xl font-bold mb-4">Privacy Questions?</h3>
            <p className="text-primary-100 mb-6 text-lg">
              If you have any questions about this Privacy Policy or our data practices, we're here to help.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                variant="outline" 
                className="bg-white/20 border-white/30 text-white hover:bg-white/30"
                size="lg"
              >
                Contact Privacy Team
              </Button>
              <Button 
                variant="ghost" 
                className="text-white hover:bg-white/20"
                size="lg"
              >
                privacy@crms-pro.com
              </Button>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-12 pt-8 border-t border-neutral-200">
          <p className="text-neutral-500">
            © 2024 CRMS Pro. All rights reserved. |{' '}
            <Link to="/terms" className="text-primary-600 hover:text-primary-700 transition-colors duration-200">
              Terms of Service
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;