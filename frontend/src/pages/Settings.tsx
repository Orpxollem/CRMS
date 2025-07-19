import React, { useState, useEffect } from 'react';
import { User, Bell, Shield, Palette, Globe, Smartphone, Mail, Eye, Moon, Sun, Monitor, Save, Camera, Edit3, X } from 'lucide-react';
import { useApp } from '../context/AppContext';
import Input from '../components/common/Input';
import Button from '../components/common/Button';

const Settings: React.FC = () => {
  const { user, refetchUser } = useApp();

  const [isEditing, setIsEditing] = useState(false);
  const [activeTab, setActiveTab] = useState('profile');
  const [theme, setTheme] = useState('light');
  const [notifications, setNotifications] = useState({
    email: true,
    push: true,
    tasks: true,
    deals: false,
    marketing: false
  });

  const [formData, setFormData] = useState({
    firstname: '',
    lastname: '',
    email: '',
    phone: '',
    job_title: '',
    company: '',
    department: ''
  });

  const [changedFields, setChangedFields] = useState<{ [key: string]: boolean }>({});

  useEffect(() => {
    if (user) {
      setFormData({
        firstname: user.firstname || '',
        lastname: user.lastname || '',
        email: user.email || '',
        phone: user.phone || '',
        job_title: user.job_title || user.role || '',
        company: user.company || '',
        department: user.department || ''
      });
      setChangedFields({});
      setIsEditing(false);
    }
  }, [user]);

  if (!user) {
    return null;
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    setChangedFields(prev => ({ ...prev, [field]: true }));
  };

  const handleEditToggle = () => {
    if (isEditing) {
      if (user) {
        setFormData({
          firstname: user.firstname || '',
          lastname: user.lastname || '',
          email: user.email || '',
          phone: user.phone || '',
          job_title: user.job_title || user.role || '',
          company: user.company || '',
          department: user.department || ''
        });
      }
      setChangedFields({});
      setIsEditing(false);
    } else {
      setIsEditing(true);
    }
  };

  const tabs = [
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'security', label: 'Security', icon: Shield },
    { id: 'appearance', label: 'Appearance', icon: Palette },
    { id: 'privacy', label: 'Privacy', icon: Eye }
  ];

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-neutral-900">Settings</h1>
          <p className="text-neutral-600 mt-1">Manage your account preferences and security</p>
        </div>
        <div className="flex space-x-2">
          <Button
            icon={isEditing ? <X size={18} /> : <Edit3 size={18} />}
            size="lg"
            className="shadow-glow hover:shadow-glow-lg"
            onClick={handleEditToggle}
          >
            {isEditing ? 'Cancel' : 'Edit'}
          </Button>
          {isEditing && (
            <Button
              icon={<Save size={18} />}
              size="lg"
              className="shadow-glow hover:shadow-glow-lg"
              onClick={async () => {
                try {
                  const apiBaseUrl = (import.meta as any).env.VITE_API_BASE_URL || 'http://localhost:8000';
                  const response = await fetch(`${apiBaseUrl}/users/me`, {
                    method: 'PUT',
                    headers: {
                      'Content-Type': 'application/json',
                      Authorization: `Bearer ${localStorage.getItem('token')}`
                    },
                    body: JSON.stringify(formData)
                  });
                  if (!response.ok) {
                    throw new Error('Failed to update user data');
                  }
                  await response.json();
                  alert('User data updated successfully');
                  setChangedFields({});
                  setIsEditing(false);
                  localStorage.setItem('user', JSON.stringify(formData));
                  refetchUser();
                } catch (error: any) {
                  alert('Error updating user data: ' + error.message);
                }
              }}
            >
              Save Changes
            </Button>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <div className="lg:col-span-1">
          <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-soft border border-neutral-100 p-2 sticky top-6">
            <nav className="space-y-1">
              {tabs.map((tab, index) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center px-4 py-3 text-sm font-medium rounded-2xl transition-all duration-200 animate-fade-in hover:scale-[1.02] active:scale-[0.98] ${
                      activeTab === tab.id
                        ? 'bg-gradient-to-r from-primary-500 to-primary-600 text-white shadow-soft'
                        : 'text-neutral-700 hover:bg-neutral-100'
                    }`}
                    style={{ animationDelay: `${index * 50}ms` as unknown as React.CSSProperties['animationDelay'] }}
                  >
                    <Icon size={18} className="mr-3" />
                    {tab.label}
                  </button>
                );
              })}
            </nav>
          </div>
        </div>

        <div className="lg:col-span-3 space-y-6">
          {activeTab === 'profile' && (
            <div className="space-y-6 animate-fade-in">
              <div className="bg-gradient-to-br from-primary-500 to-secondary-600 rounded-3xl p-8 text-white shadow-soft">
                <div className="flex items-center space-x-6">
                  <div className="relative">
                    <img
                      className="w-24 h-24 rounded-3xl object-cover border-4 border-white/20 shadow-soft"
                      src={user.avatar && user.avatar.trim() !== '' ? user.avatar : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRKSvz-pQ_DnjayP8dqG8Y5FcoQ439f_X4AAgxARdFyjNhin5z2G2Ro-hsWCWtUspamFpo&usqp=CAU'}
                      alt={user.firstname && user.lastname ? `${user.firstname} ${user.lastname}` : 'User'}
                    />
                    <button className="absolute -bottom-2 -right-2 w-10 h-10 bg-white text-primary-600 rounded-2xl flex items-center justify-center shadow-soft hover:shadow-medium transition-all duration-200 hover:scale-110">
                      <Camera size={16} />
                    </button>
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold mb-1">{user.firstname && user.lastname ? `${user.firstname} ${user.lastname}` : 'User'}</h2>
                    <p className="text-primary-100 mb-2">{user.job_title || user.role}</p>
                    <p className="text-primary-200 text-sm">{user.email}</p>
                  </div>
                </div>
              </div>

              <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-soft p-8 border border-neutral-100">
                <div className="flex items-center mb-6">
                  <User className="mr-3 text-primary-600" size={24} />
                  <h3 className="text-xl font-bold text-neutral-900">Personal Information</h3>
                </div>

                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Input
                      label="First Name"
                      value={formData.firstname}
                      icon={<User size={18} />}
                      className={changedFields['firstname'] ? 'border-orange-500' : ''}
                      onChange={(e) => handleInputChange('firstname', e.target.value)}
                      disabled={!isEditing}
                    />
                    <Input
                      label="Last Name"
                      value={formData.lastname}
                      icon={<User size={18} />}
                      className={changedFields['lastname'] ? 'border-orange-500' : ''}
                      onChange={(e) => handleInputChange('lastname', e.target.value)}
                      disabled={!isEditing}
                    />
                  </div>
                  <Input
                    label="Email Address"
                    value={formData.email}
                    type="email"
                    icon={<Mail size={18} />}
                    className={changedFields['email'] ? 'border-orange-500' : ''}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    disabled={!isEditing}
                  />
                  <Input
                    label="Phone Number"
                    value={formData.phone}
                    icon={<Smartphone size={18} />}
                    className={changedFields['phone'] ? 'border-orange-500' : ''}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    disabled={!isEditing}
                  />
                  <Input
                    label="Job Title"
                    value={formData.job_title}
                    icon={<Edit3 size={18} />}
                    className={changedFields['job_title'] ? 'border-orange-500' : ''}
                    onChange={(e) => handleInputChange('job_title', e.target.value)}
                    disabled={!isEditing}
                  />
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Input
                      label="Company"
                      value={formData.company}
                      icon={<Globe size={18} />}
                      className={changedFields['company'] ? 'border-orange-500' : ''}
                      onChange={(e) => handleInputChange('company', e.target.value)}
                      disabled={!isEditing}
                    />
                    <Input
                      label="Department"
                      value={formData.department}
                      icon={<User size={18} />}
                      className={changedFields['department'] ? 'border-orange-500' : ''}
                      onChange={(e) => handleInputChange('department', e.target.value)}
                      disabled={!isEditing}
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'notifications' && (
            <div className="space-y-6 animate-fade-in">
              <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-soft p-8 border border-neutral-100">
                <div className="flex items-center mb-6">
                  <Bell className="mr-3 text-primary-600" size={24} />
                  <h3 className="text-xl font-bold text-neutral-900">Notification Preferences</h3>
                </div>

                <div className="space-y-6">
                  {[
                    { key: 'email', label: 'Email Notifications', desc: 'Receive email updates about your account' },
                    { key: 'push', label: 'Push Notifications', desc: 'Get push notifications on your devices' },
                    { key: 'tasks', label: 'Task Reminders', desc: 'Reminders about upcoming tasks and deadlines' },
                    { key: 'deals', label: 'Deal Updates', desc: 'Notifications about deal progress and changes' },
                    { key: 'marketing', label: 'Marketing Updates', desc: 'Product updates and marketing communications' }
                  ].map((item, index) => (
                    <div
                      key={item.key}
                      className="flex items-center justify-between p-4 bg-neutral-50 rounded-2xl hover:bg-neutral-100 transition-colors duration-200 animate-fade-in"
                      style={{ animationDelay: `${index * 100}ms` }}
                    >
                      <div>
                        <p className="font-semibold text-neutral-900">{item.label}</p>
                        <p className="text-sm text-neutral-600">{item.desc}</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={notifications[item.key as keyof typeof notifications]}
                          onChange={(e) => setNotifications(prev => ({ ...prev, [item.key]: e.target.checked }))}
                          className="sr-only peer"
                        />
                        <div className="relative w-11 h-6 bg-neutral-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-gradient-to-r peer-checked:from-primary-500 peer-checked:to-primary-600"></div>
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'security' && (
            <div className="space-y-6 animate-fade-in">
              <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-soft p-8 border border-neutral-100">
                <div className="flex items-center mb-6">
                  <Shield className="mr-3 text-primary-600" size={24} />
                  <h3 className="text-xl font-bold text-neutral-900">Security Settings</h3>
                </div>

                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Button variant="outline" className="h-16 flex-col">
                      Change Password
                    </Button>
                    <Button variant="outline" className="h-16 flex-col">
                      Enable 2FA
                    </Button>
                  </div>

                  <div className="bg-gradient-to-br from-success-50 to-success-100 rounded-2xl p-6 border border-success-200">
                    <div className="flex items-center mb-4">
                      <Shield className="mr-3 text-success-600" size={20} />
                      <h4 className="font-semibold text-success-900 mb-2">Security Status</h4>
                    </div>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-success-700">Password Strength</span>
                        <span className="text-sm font-semibold text-success-800">Strong</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-success-700">Two-Factor Authentication</span>
                        <span className="text-sm font-semibold text-success-800">Enabled</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-success-700">Last Login</span>
                        <span className="text-sm font-semibold text-success-800">Today, 9:30 AM</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'appearance' && (
            <div className="space-y-6 animate-fade-in">
              <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-soft p-8 border border-neutral-100">
                <div className="flex items-center mb-6">
                  <Palette className="mr-3 text-primary-600" size={24} />
                  <h3 className="text-xl font-bold text-neutral-900">Appearance Settings</h3>
                </div>

                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-semibold text-neutral-700 mb-4">Theme</label>
                    <div className="grid grid-cols-3 gap-4">
                      <button
                        key="light"
                        onClick={() => setTheme('light')}
                        className={`p-4 rounded-2xl border-2 transition-all duration-200 animate-fade-in hover:scale-[1.02] ${
                          theme === 'light'
                            ? 'border-primary-500 bg-primary-50'
                            : 'border-neutral-200 hover:border-neutral-300'
                        }`}
                        style={{ animationDelay: 0 as unknown as React.CSSProperties['animationDelay'] }}
                      >
                        <Sun size={24} className={`mx-auto mb-2 ${theme === 'light' ? 'text-primary-600' : 'text-neutral-600'}`} />
                        <p className={`text-sm font-medium ${theme === 'light' ? 'text-primary-700' : 'text-neutral-700'}`}>Light</p>
                      </button>
                      <button
                        key="dark"
                        onClick={() => setTheme('dark')}
                        className={`p-4 rounded-2xl border-2 transition-all duration-200 animate-fade-in hover:scale-[1.02] ${
                          theme === 'dark'
                            ? 'border-primary-500 bg-primary-50'
                            : 'border-neutral-200 hover:border-neutral-300'
                        }`}
                        style={{ animationDelay: 100 as unknown as React.CSSProperties['animationDelay'] }}
                      >
                        <Moon size={24} className={`mx-auto mb-2 ${theme === 'dark' ? 'text-primary-600' : 'text-neutral-600'}`} />
                        <p className={`text-sm font-medium ${theme === 'dark' ? 'text-primary-700' : 'text-neutral-700'}`}>Dark</p>
                      </button>
                      <button
                        key="system"
                        onClick={() => setTheme('system')}
                        className={`p-4 rounded-2xl border-2 transition-all duration-200 animate-fade-in hover:scale-[1.02] ${
                          theme === 'system'
                            ? 'border-primary-500 bg-primary-50'
                            : 'border-neutral-200 hover:border-neutral-300'
                        }`}
                        style={{ animationDelay: 200 as unknown as React.CSSProperties['animationDelay'] }}
                      >
                        <Monitor size={24} className={`mx-auto mb-2 ${theme === 'system' ? 'text-primary-600' : 'text-neutral-600'}`} />
                        <p className={`text-sm font-medium ${theme === 'system' ? 'text-primary-700' : 'text-neutral-700'}`}>System</p>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'privacy' && (
            <div className="space-y-6 animate-fade-in">
              <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-soft p-8 border border-neutral-100">
                <div className="flex items-center mb-6">
                  <Eye className="mr-3 text-primary-600" size={24} />
                  <h3 className="text-xl font-bold text-neutral-900">Privacy Settings</h3>
                </div>

                <div className="space-y-6">
                  <div className="bg-gradient-to-br from-warning-50 to-warning-100 rounded-2xl p-6 border border-warning-200">
                    <h4 className="font-semibold text-warning-900 mb-2">Data Collection</h4>
                    <p className="text-sm text-warning-700 mb-4">
                      We collect data to improve your experience. You can control what data we collect.
                    </p>
                    <Button variant="outline" size="sm">
                      Manage Data Preferences
                    </Button>
                  </div>

                  <div className="space-y-4">
                    {[
                      'Allow analytics tracking',
                      'Share usage data for improvements',
                      'Enable location services',
                      'Allow marketing communications'
                    ].map((item, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between p-4 bg-neutral-50 rounded-2xl animate-fade-in"
                      style={{ animationDelay: `${index * 100}ms` }}
                    >
                      <span className="font-medium text-neutral-900">{item}</span>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" className="sr-only peer" />
                        <div className="relative w-11 h-6 bg-neutral-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-gradient-to-r peer-checked:from-primary-500 peer-checked:to-primary-600"></div>
                      </label>
                    </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Settings;
