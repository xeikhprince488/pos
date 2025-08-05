'use client';

import { useEffect, useState } from 'react';
import { Settings, User, Palette, Lock, Save } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';

export default function SettingsPage() {
  const [darkMode, setDarkMode] = useState(false);
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [businessName, setBusinessName] = useState('POS Inc.');
  const [ownerName, setOwnerName] = useState('John Doe');
  const [email, setEmail] = useState('admin@pos.com');
  const [password, setPassword] = useState('');
  const [saveMessage, setSaveMessage] = useState('');

  useEffect(() => {
    const savedDark = localStorage.getItem('darkMode') === 'true';
    const savedEmailNotify = localStorage.getItem('emailNotifications') === 'true';
    setDarkMode(savedDark);
    setEmailNotifications(savedEmailNotify);

    if (savedDark) {
      document.documentElement.classList.add('dark');
    }
  }, []);

  const handleDarkModeToggle = () => {
    const newValue = !darkMode;
    setDarkMode(newValue);
    localStorage.setItem('darkMode', String(newValue));
    document.documentElement.classList.toggle('dark', newValue);
  };

  const handleSave = () => {
    localStorage.setItem('emailNotifications', String(emailNotifications));
    localStorage.setItem('darkMode', String(darkMode));
    setSaveMessage('✅ Settings saved successfully!');
    setTimeout(() => setSaveMessage(''), 3000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 p-4 space-y-4">
      {/* Header */}
      <div className="bg-gradient-to-br from-green-50 to-emerald-100 dark:from-green-950/20 dark:to-emerald-950/20 p-4 rounded-xl border border-green-200/50 dark:border-green-800/50">
        <div className="flex items-center gap-2 mb-1">
          <Settings className="h-5 w-5 text-green-600 dark:text-green-400" />
          <h1 className="text-xl font-bold text-gray-900 dark:text-gray-100">Settings</h1>
        </div>
        <p className="text-sm text-gray-600 dark:text-gray-400">Manage your account preferences and system configuration</p>
      </div>

      {/* General Settings */}
      <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-white/20 dark:border-gray-600/20 shadow-lg">
        <CardHeader className="p-4 pb-2">
          <CardTitle className="text-lg font-semibold text-gray-900 dark:text-gray-100 flex items-center gap-2">
            <User className="h-4 w-4 text-blue-600 dark:text-blue-400" />
            General
          </CardTitle>
        </CardHeader>
        <CardContent className="p-4 pt-0">
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-1">
              <Label htmlFor="businessName" className="text-xs font-medium text-gray-700 dark:text-gray-300">Business Name</Label>
              <Input
                id="businessName"
                type="text"
                value={businessName}
                onChange={(e) => setBusinessName(e.target.value)}
                className="h-8 text-sm"
              />
            </div>
            <div className="space-y-1">
              <Label htmlFor="ownerName" className="text-xs font-medium text-gray-700 dark:text-gray-300">Owner Name</Label>
              <Input
                id="ownerName"
                type="text"
                value={ownerName}
                onChange={(e) => setOwnerName(e.target.value)}
                className="h-8 text-sm"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Preferences */}
      <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-white/20 dark:border-gray-600/20 shadow-lg">
        <CardHeader className="p-4 pb-2">
          <CardTitle className="text-lg font-semibold text-gray-900 dark:text-gray-100 flex items-center gap-2">
            <Palette className="h-4 w-4 text-green-600 dark:text-green-400" />
            Preferences
          </CardTitle>
        </CardHeader>
        <CardContent className="p-4 pt-0">
          <div className="space-y-4">
            <div className="flex items-center justify-between py-2">
              <div className="space-y-0.5">
                <Label className="text-sm font-medium text-gray-900 dark:text-gray-100">Enable Dark Mode</Label>
                <p className="text-xs text-gray-600 dark:text-gray-400">Switch between light and dark themes</p>
              </div>
              <Switch
                checked={darkMode}
                onCheckedChange={handleDarkModeToggle}
              />
            </div>
            <div className="flex items-center justify-between py-2">
              <div className="space-y-0.5">
                <Label className="text-sm font-medium text-gray-900 dark:text-gray-100">Email Notifications</Label>
                <p className="text-xs text-gray-600 dark:text-gray-400">Receive updates via email</p>
              </div>
              <Switch
                checked={emailNotifications}
                onCheckedChange={setEmailNotifications}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Account Security */}
      <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-white/20 dark:border-gray-600/20 shadow-lg">
        <CardHeader className="p-4 pb-2">
          <CardTitle className="text-lg font-semibold text-gray-900 dark:text-gray-100 flex items-center gap-2">
            <Lock className="h-4 w-4 text-red-600 dark:text-red-400" />
            Account & Security
          </CardTitle>
        </CardHeader>
        <CardContent className="p-4 pt-0">
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-1">
              <Label htmlFor="email" className="text-xs font-medium text-gray-700 dark:text-gray-300">Email</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="h-8 text-sm"
              />
            </div>
            <div className="space-y-1">
              <Label htmlFor="password" className="text-xs font-medium text-gray-700 dark:text-gray-300">Password</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter new password"
                className="h-8 text-sm"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Save Button */}
      <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-white/20 dark:border-gray-600/20 shadow-lg">
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-medium text-gray-900 dark:text-gray-100">Save Changes</h3>
              <p className="text-xs text-gray-600 dark:text-gray-400">Apply your settings and preferences</p>
            </div>
            <Button
              onClick={handleSave}
              className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white h-8 px-4 text-sm font-medium"
            >
              <Save className="h-3 w-3 mr-1" />
              Save Changes
            </Button>
          </div>
          {saveMessage && (
            <div className="mt-3 p-2 bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800 rounded-lg">
              <p className="text-xs text-green-700 dark:text-green-400">{saveMessage}</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
