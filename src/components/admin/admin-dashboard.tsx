'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  BarChart3,
  Users,
  Store,
  MessageSquare,
  TrendingUp,
  Calendar,
  Search,
  Download,
  ExternalLink,
  Copy,
  CheckCircle2,
  Clock,
  Phone,
  DollarSign,
  AlertCircle,
  Edit2,
  Save,
  X,
  CreditCard,
  Activity,
  UserCheck,
  ShoppingBag,
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface DemoRequest {
  id: string;
  name: string;
  whatsapp: string;
  created_at: string;
  notified: boolean;
}

interface ContactSubmission {
  id: string;
  name: string;
  email: string;
  whatsapp: string;
  subject: string;
  message: string;
  created_at: string;
  status: string;
}

interface UserProfile {
  id: string;
  email: string;
  full_name: string;
  restaurant_name?: string;
  phone: string;
  created_at: string;
  onboarding_completed: boolean;
}

interface Restaurant {
  id: string;
  name: string;
  owner_id: string;
  address: string;
  phone: string;
  created_at: string;
  subscription_plan?: string;
  subscription_status?: string;
  subscription_ends_at?: string | null;
  trial_ends_at?: string | null;
  owner?: {
    full_name: string;
    email: string;
  };
}

interface Props {
  demoRequests: DemoRequest[];
  contactSubmissions: ContactSubmission[];
  users: UserProfile[];
  restaurants: Restaurant[];
  recentUsers: UserProfile[];
}

export default function AdminDashboard({ 
  demoRequests, 
  contactSubmissions = [], 
  users, 
  restaurants, 
  recentUsers 
}: Props) {
  const [searchQuery, setSearchQuery] = useState('');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [editingRestaurant, setEditingRestaurant] = useState<string | null>(null);
  const [editForm, setEditForm] = useState({
    subscription_plan: '',
    subscription_status: '',
    subscription_ends_at: '',
  });
  const [saving, setSaving] = useState(false);

  // Calculate comprehensive metrics
  const totalUsers = users.length;
  const totalRestaurants = restaurants.length;
  const totalDemoRequests = demoRequests.length;
  const unnotifiedDemos = demoRequests.filter((d) => !d.notified).length;
  const newContacts = contactSubmissions.filter((c) => c.status === 'new').length;

  // Check for expired trials
  const now = new Date();
  const expiredTrials = restaurants.filter(r => {
    if (r.subscription_status !== 'trial' || !r.trial_ends_at) return false;
    return now > new Date(r.trial_ends_at);
  });

  // Revenue metrics (assuming pricing)
  // Exclude expired trials from active count
  const activeSubscriptions = restaurants.filter(r => {
    if (r.subscription_status === 'active') return true;
    // For trials, check if not expired
    if (r.subscription_status === 'trial' && r.trial_ends_at) {
      return now <= new Date(r.trial_ends_at);
    }
    return false;
  }).length;
  
  const trialRestaurants = restaurants.filter(r => {
    if (r.subscription_status !== 'trial' || !r.trial_ends_at) return r.subscription_status === 'trial';
    return now <= new Date(r.trial_ends_at);
  }).length;
  
  const expiredRestaurants = restaurants.filter(r => r.subscription_status === 'expired').length + expiredTrials.length;
  
  // Count active subscriptions by plan (excluding expired trials)
  const activeMonthly = restaurants.filter(r => {
    if (r.subscription_status === 'active' && r.subscription_plan === 'monthly') return true;
    return false;
  }).length;
  
  const activeYearly = restaurants.filter(r => {
    if (r.subscription_status === 'active' && r.subscription_plan === 'yearly') return true;
    return false;
  }).length;
  
  const activeLifetime = restaurants.filter(r => {
    if (r.subscription_status === 'active' && r.subscription_plan === 'lifetime') return true;
    return false;
  }).length;
  
  const monthlyRevenue = restaurants.reduce((sum, r) => {
    if (r.subscription_status === 'active') {
      if (r.subscription_plan === 'monthly') return sum + 149000;
      if (r.subscription_plan === 'yearly') return sum + 1799000 / 12;
      if (r.subscription_plan === 'lifetime') return sum + 0;
    }
    return sum;
  }, 0);

  const yearlyRevenue = monthlyRevenue * 12;

  // Conversion metrics
  const conversionRate = totalDemoRequests > 0 ? (totalUsers / totalDemoRequests * 100).toFixed(1) : '0';
  const activationRate = totalUsers > 0 ? (totalRestaurants / totalUsers * 100).toFixed(1) : '0';
  const paidConversionRate = totalRestaurants > 0 ? (activeSubscriptions / totalRestaurants * 100).toFixed(1) : '0';

  // Get growth data (last 30 days)
  const thirtyDaysAgo = new Date();
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
  
  const recentSignups = users.filter(
    (u) => new Date(u.created_at) > thirtyDaysAgo
  ).length;
  
  const recentRestaurants = restaurants.filter(
    (r) => new Date(r.created_at) > thirtyDaysAgo
  ).length;

  const recentDemos = demoRequests.filter(
    (d) => new Date(d.created_at) > thirtyDaysAgo
  ).length;

  // Expiring soon alerts
  const expiringRestaurants = restaurants.filter(r => {
    if (!r.subscription_ends_at && !r.trial_ends_at) return false;
    const expiryDate = new Date(r.subscription_ends_at || r.trial_ends_at!);
    const daysLeft = Math.ceil((expiryDate.getTime() - Date.now()) / (1000 * 60 * 60 * 24));
    return daysLeft > 0 && daysLeft <= 7;
  }).length;

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const openWhatsApp = (number: string) => {
    const cleanNumber = number.replace(/\D/g, '');
    window.open(`https://wa.me/${cleanNumber}`, '_blank');
  };

  const startEditing = (restaurant: Restaurant) => {
    setEditingRestaurant(restaurant.id);
    setEditForm({
      subscription_plan: restaurant.subscription_plan || 'trial',
      subscription_status: restaurant.subscription_status || 'trial',
      subscription_ends_at: restaurant.subscription_ends_at || '',
    });
  };

  const cancelEditing = () => {
    setEditingRestaurant(null);
    setEditForm({ subscription_plan: '', subscription_status: '', subscription_ends_at: '' });
  };

  const saveSubscription = async (restaurantId: string) => {
    setSaving(true);
    try {
      const response = await fetch('/api/founder/update-subscription', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          restaurantId,
          ...editForm,
        }),
      });

      if (response.ok) {
        window.location.reload();
      } else {
        alert('Failed to update subscription');
      }
    } catch (error) {
      console.error('Error updating subscription:', error);
      alert('Error updating subscription');
    } finally {
      setSaving(false);
    }
  };

  const handleApproveUpgrade = async (lead: ContactSubmission) => {
    // Extract info from message
    const userIdMatch = lead.message.match(/User ID: ([a-z0-9-]+)/i);
    const outletCountMatch = lead.message.match(/Outlet Count: (\d+)/i);
    const businessTypeMatch = lead.message.match(/Business Type: (\w+)/i);

    const userId = userIdMatch ? userIdMatch[1] : null;
    const outletCount = outletCountMatch ? parseInt(outletCountMatch[1]) : 1;
    const businessType = businessTypeMatch ? businessTypeMatch[1].toLowerCase() : 'resto';

    if (!userId) {
      alert('Could not find User ID in the message.');
      return;
    }

    if (!confirm(`Approve upgrade for ${lead.name}?\nUserID: ${userId}\nOutlets: ${outletCount}\nType: ${businessType}`)) {
      return;
    }

    setSaving(true);
    try {
      const response = await fetch('/api/founder/approve-upgrade', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          submissionId: lead.id,
          userId,
          outletCount,
          businessType
        }),
      });

      if (response.ok) {
        alert('Upgrade approved successfully');
        window.location.reload();
      } else {
        const err = await response.json();
        alert(`Failed: ${err.error || 'Unknown error'}`);
      }
    } catch (error) {
      console.error('Error approving upgrade:', error);
      alert('Error approving upgrade');
    } finally {
      setSaving(false);
    }
  };

  const exportData = (data: any[], filename: string) => {
    const csv = [
      Object.keys(data[0]).join(','),
      ...data.map((row) => Object.values(row).join(',')),
    ].join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${filename}-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
  };

  const filteredDemoRequests = demoRequests.filter((d) =>
    d.whatsapp.toLowerCase().includes(searchQuery.toLowerCase()) ||
    d.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredContactSubmissions = contactSubmissions.filter((c) =>
    c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.message.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.whatsapp?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredUsers = users.filter(
    (u) =>
      u.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      u.full_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (u.restaurant_name?.toLowerCase() || '').includes(searchQuery.toLowerCase())
  );

  const filteredRestaurants = restaurants.filter(
    (r) =>
      r.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (r.owner?.email || '').toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-slate-50">
      {/* Header */}
      <div className="border-b bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-slate-900">Founder Command Center</h1>
              <p className="text-sm text-slate-600 mt-1">Real-time business insights & controls</p>
            </div>
            <Badge variant="outline" className="px-4 py-2 bg-green-50 border-green-200">
              <Activity className="w-4 h-4 mr-2 text-green-600" />
              <span className="text-green-700 font-medium">Live</span>
            </Badge>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Critical Alerts */}
        {(unnotifiedDemos > 0 || expiringRestaurants > 0 || expiredTrials.length > 0) && (
          <div className="grid gap-4 md:grid-cols-2 mb-8">
            {unnotifiedDemos > 0 && (
              <Card className="border-orange-200 bg-orange-50">
                <CardContent className="pt-6">
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-orange-100 rounded-full">
                      <AlertCircle className="w-6 h-6 text-orange-600" />
                    </div>
                    <div className="flex-1">
                      <p className="font-semibold text-orange-900">{unnotifiedDemos} Pending Demo Requests</p>
                      <p className="text-sm text-orange-700">Need immediate follow-up</p>
                    </div>
                    <Button variant="outline" size="sm" className="bg-white" onClick={() => document.getElementById('demos-tab')?.click()}>
                      View
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}
            {expiredTrials.length > 0 && (
              <Card className="border-red-200 bg-red-50">
                <CardContent className="pt-6">
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-red-100 rounded-full">
                      <AlertCircle className="w-6 h-6 text-red-600" />
                    </div>
                    <div className="flex-1">
                      <p className="font-semibold text-red-900">{expiredTrials.length} Expired Trials</p>
                      <p className="text-sm text-red-700">Need status update to inactive</p>
                    </div>
                    <Button variant="outline" size="sm" className="bg-white" onClick={() => document.getElementById('restaurants-tab')?.click()}>
                      Update
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}
            {expiringRestaurants > 0 && (
              <Card className="border-orange-200 bg-orange-50">
                <CardContent className="pt-6">
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-orange-100 rounded-full">
                      <Clock className="w-6 h-6 text-orange-600" />
                    </div>
                    <div className="flex-1">
                      <p className="font-semibold text-orange-900">{expiringRestaurants} Subscriptions Expiring Soon</p>
                      <p className="text-sm text-orange-700">Within 7 days</p>
                    </div>
                    <Button variant="outline" size="sm" className="bg-white" onClick={() => document.getElementById('restaurants-tab')?.click()}>
                      Manage
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        )}

        {/* Revenue & Key Metrics */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-8">
          <Card className="border-slate-200 bg-gradient-to-br from-green-50 to-emerald-50 hover:shadow-xl transition-all">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-green-900">Monthly Revenue (MRR)</CardTitle>
              <DollarSign className="h-5 w-5 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-green-900">
                Rp {(monthlyRevenue / 1000).toFixed(0)}K
              </div>
              <p className="text-xs text-green-700 mt-2">
                ARR: Rp {(yearlyRevenue / 1000000).toFixed(1)}M
              </p>
              <div className="mt-3 pt-3 border-t border-green-200">
                <p className="text-xs text-green-800">
                  {activeMonthly} Monthly • {activeYearly} Yearly • {activeLifetime} Lifetime
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="border-slate-200 hover:shadow-xl transition-all">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-slate-600">Active Subscriptions</CardTitle>
              <CreditCard className="h-5 w-5 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-slate-900">{activeSubscriptions}</div>
              <p className="text-xs text-slate-600 mt-2">
                {trialRestaurants} in trial • {expiredRestaurants} expired
              </p>
            </CardContent>
          </Card>

          <Card className="border-slate-200 hover:shadow-xl transition-all">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-slate-600">Conversion Rate</CardTitle>
              <TrendingUp className="h-5 w-5 text-purple-600" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-slate-900">{paidConversionRate}%</div>
              <p className="text-xs text-slate-600 mt-2">
                Trial → Paid conversion
              </p>
            </CardContent>
          </Card>

          <Card className="border-slate-200 hover:shadow-xl transition-all">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-slate-600">Total Users</CardTitle>
              <UserCheck className="h-5 w-5 text-orange-600" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-slate-900">{totalUsers}</div>
              <p className="text-xs text-slate-600 mt-2">
                +{recentSignups} this month
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Business Insights */}
        <div className="grid gap-6 md:grid-cols-3 mb-8">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Funnel Performance</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
                <span className="text-sm font-medium text-blue-900">Demo → Signup</span>
                <span className="text-xl font-bold text-blue-900">{conversionRate}%</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-purple-50 rounded-lg">
                <span className="text-sm font-medium text-purple-900">Signup → Restaurant</span>
                <span className="text-xl font-bold text-purple-900">{activationRate}%</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                <span className="text-sm font-medium text-green-900">Trial → Paid</span>
                <span className="text-xl font-bold text-green-900">{paidConversionRate}%</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Growth (30 Days)</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <MessageSquare className="w-5 h-5 text-orange-600" />
                  <span className="text-sm font-medium">Demo Requests</span>
                </div>
                <span className="text-xl font-bold text-slate-900">+{recentDemos}</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <Users className="w-5 h-5 text-blue-600" />
                  <span className="text-sm font-medium">New Users</span>
                </div>
                <span className="text-xl font-bold text-slate-900">+{recentSignups}</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <Store className="w-5 h-5 text-purple-600" />
                  <span className="text-sm font-medium">New Restaurants</span>
                </div>
                <span className="text-xl font-bold text-slate-900">+{recentRestaurants}</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button variant="outline" className="w-full justify-start" onClick={() => exportData(restaurants, 'all-restaurants')}>
                <Download className="w-4 h-4 mr-2" />
                Export All Data
              </Button>
              <Button variant="outline" className="w-full justify-start" onClick={() => exportData(demoRequests, 'demo-requests')}>
                <Phone className="w-4 h-4 mr-2" />
                Export Demo Requests
              </Button>
              <Button variant="outline" className="w-full justify-start" onClick={() => {
                const activeList = restaurants.filter(r => r.subscription_status === 'active');
                exportData(activeList, 'active-subscribers');
              }}>
                <CreditCard className="w-4 h-4 mr-2" />
                Export Active Subscribers
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Detailed Management Tabs */}
        <Tabs defaultValue="restaurants" className="space-y-6">
          <TabsList className="bg-white border">
            <TabsTrigger value="restaurants" id="restaurants-tab">
              <Store className="w-4 h-4 mr-2" />
              Restaurants & Subscriptions
            </TabsTrigger>
            <TabsTrigger value="demos" id="demos-tab">
              <Phone className="w-4 h-4 mr-2" />
              Demo Requests {unnotifiedDemos > 0 && `(${unnotifiedDemos})`}
            </TabsTrigger>
            <TabsTrigger value="leads" id="leads-tab">
              <MessageSquare className="w-4 h-4 mr-2" />
              Leads {newContacts > 0 && `(${newContacts})`}
            </TabsTrigger>
            <TabsTrigger value="users">
              <Users className="w-4 h-4 mr-2" />
              Users
            </TabsTrigger>
          </TabsList>

          {/* Restaurants Tab - Now First */}
          <TabsContent value="restaurants" className="space-y-4">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Restaurant Management</CardTitle>
                    <CardDescription>Manage subscriptions and view restaurant details</CardDescription>
                  </div>
                  <Button variant="outline" size="sm" onClick={() => exportData(restaurants, 'restaurants')}>
                    <Download className="w-4 h-4 mr-2" />
                    Export
                  </Button>
                </div>
                <div className="relative mt-4">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-4 w-4" />
                  <Input
                    placeholder="Search restaurants..."
                    value={searchQuery}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {filteredRestaurants.map((restaurant) => {
                    const isEditing = editingRestaurant === restaurant.id;
                    const expiryDate = restaurant.subscription_ends_at || restaurant.trial_ends_at;
                    const daysLeft = expiryDate 
                      ? Math.ceil((new Date(expiryDate).getTime() - Date.now()) / (1000 * 60 * 60 * 24))
                      : null;
                    const isExpiringSoon = daysLeft !== null && daysLeft > 0 && daysLeft <= 7;
                    const isTrialExpired = restaurant.subscription_status === 'trial' && restaurant.trial_ends_at && now > new Date(restaurant.trial_ends_at);

                    return (
                      <div
                        key={restaurant.id}
                        className={`p-4 rounded-lg border ${
                          isTrialExpired ? 'border-red-300 bg-red-50' : 
                          isExpiringSoon ? 'border-orange-300 bg-orange-50' : 
                          'border-slate-200'
                        } hover:shadow-md transition-all`}
                      >
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-2">
                              <h3 className="font-semibold text-slate-900">{restaurant.name}</h3>
                              {isTrialExpired && (
                                <Badge variant="destructive">
                                  <AlertCircle className="w-3 h-3 mr-1" />
                                  Trial Expired
                                </Badge>
                              )}
                              {!isTrialExpired && isExpiringSoon && (
                                <Badge variant="outline" className="bg-orange-100 text-orange-700 border-orange-300">
                                  <Clock className="w-3 h-3 mr-1" />
                                  {daysLeft} days left
                                </Badge>
                              )}
                            </div>
                            <p className="text-sm text-slate-600 mb-2">
                              Owner: {restaurant.owner?.full_name || 'Unknown'} • {restaurant.owner?.email || 'N/A'}
                            </p>
                            {restaurant.address && (
                              <p className="text-sm text-slate-500 mb-2">📍 {restaurant.address}</p>
                            )}
                            
                            {isEditing ? (
                              <div className="space-y-3 mt-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
                                <div className="grid grid-cols-2 gap-3">
                                  <div>
                                    <label className="text-xs font-medium text-slate-700 mb-1 block">Plan</label>
                                    <Select value={editForm.subscription_plan} onValueChange={(value: string) => setEditForm({...editForm, subscription_plan: value})}>
                                      <SelectTrigger className="bg-white">
                                        <SelectValue />
                                      </SelectTrigger>
                                      <SelectContent>
                                        <SelectItem value="trial">Trial</SelectItem>
                                        <SelectItem value="monthly">Monthly</SelectItem>
                                        <SelectItem value="yearly">Yearly</SelectItem>
                                        <SelectItem value="lifetime">Lifetime</SelectItem>
                                      </SelectContent>
                                    </Select>
                                  </div>
                                  <div>
                                    <label className="text-xs font-medium text-slate-700 mb-1 block">Status</label>
                                    <Select value={editForm.subscription_status} onValueChange={(value: string) => setEditForm({...editForm, subscription_status: value})}>
                                      <SelectTrigger className="bg-white">
                                        <SelectValue />
                                      </SelectTrigger>
                                      <SelectContent>
                                        <SelectItem value="trial">Trial</SelectItem>
                                        <SelectItem value="active">Active</SelectItem>
                                        <SelectItem value="inactive">Inactive</SelectItem>
                                        <SelectItem value="expired">Expired</SelectItem>
                                        <SelectItem value="cancelled">Cancelled</SelectItem>
                                      </SelectContent>
                                    </Select>
                                  </div>
                                </div>
                                <div>
                                  <label className="text-xs font-medium text-slate-700 mb-1 block">Expiry Date</label>
                                  <Input
                                    type="date"
                                    value={editForm.subscription_ends_at}
                                    onChange={(e) => setEditForm({...editForm, subscription_ends_at: e.target.value})}
                                    className="bg-white"
                                  />
                                </div>
                                <div className="flex gap-2">
                                  <Button size="sm" onClick={() => saveSubscription(restaurant.id)} disabled={saving}>
                                    <Save className="w-4 h-4 mr-1" />
                                    {saving ? 'Saving...' : 'Save'}
                                  </Button>
                                  <Button size="sm" variant="outline" onClick={cancelEditing}>
                                    <X className="w-4 h-4 mr-1" />
                                    Cancel
                                  </Button>
                                </div>
                              </div>
                            ) : (
                              <div className="flex flex-wrap gap-2 mt-2">
                                <Badge variant="outline" className={
                                  restaurant.subscription_plan === 'monthly'
                                    ? 'bg-blue-50 text-blue-700 border-blue-200'
                                    : restaurant.subscription_plan === 'yearly'
                                    ? 'bg-purple-50 text-purple-700 border-purple-200'
                                    : restaurant.subscription_plan === 'lifetime'
                                    ? 'bg-green-50 text-green-700 border-green-200'
                                    : 'bg-gray-50 text-gray-700 border-gray-200'
                                }>
                                  {restaurant.subscription_plan
                                    ? restaurant.subscription_plan.charAt(0).toUpperCase() + restaurant.subscription_plan.slice(1)
                                    : 'Trial'}
                                </Badge>
                                <Badge variant="outline" className={
                                  restaurant.subscription_status === 'active'
                                    ? 'bg-green-50 text-green-700 border-green-200'
                                    : restaurant.subscription_status === 'expired'
                                    ? 'bg-red-50 text-red-700 border-red-200'
                                    : restaurant.subscription_status === 'inactive'
                                    ? 'bg-gray-50 text-gray-700 border-gray-200'
                                    : restaurant.subscription_status === 'cancelled'
                                    ? 'bg-slate-50 text-slate-700 border-slate-200'
                                    : restaurant.subscription_status === 'trial'
                                    ? isTrialExpired
                                      ? 'bg-red-50 text-red-700 border-red-200'
                                      : 'bg-yellow-50 text-yellow-700 border-yellow-200'
                                    : 'bg-gray-50 text-gray-700 border-gray-200'
                                }>
                                  {restaurant.subscription_status === 'trial' && isTrialExpired
                                    ? 'Trial (Expired)'
                                    : restaurant.subscription_status
                                    ? restaurant.subscription_status.charAt(0).toUpperCase() + restaurant.subscription_status.slice(1)
                                    : 'Unknown'}
                                </Badge>
                                {expiryDate && (
                                  <Badge variant="outline" className="bg-slate-50 text-slate-700 border-slate-200">
                                    Expires: {new Date(expiryDate).toLocaleDateString()}
                                  </Badge>
                                )}
                              </div>
                            )}
                          </div>
                          {!isEditing && (
                            <Button variant="outline" size="sm" onClick={() => startEditing(restaurant)}>
                              <Edit2 className="w-4 h-4 mr-1" />
                              Edit
                            </Button>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Demo Requests Tab */}
          <TabsContent value="demos" className="space-y-4">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Demo Requests</CardTitle>
                    <CardDescription>WhatsApp numbers from landing page</CardDescription>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => exportData(demoRequests, 'demo-requests')}
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Export CSV
                  </Button>
                </div>
                <div className="flex items-center gap-3 mt-4">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-4 w-4" />
                    <Input
                      placeholder="Search by name or WhatsApp number..."
                      value={searchQuery}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchQuery(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      const numbers = demoRequests.map((d) => d.whatsapp).join('\n');
                      navigator.clipboard.writeText(numbers);
                    }}
                  >
                    <Copy className="w-4 h-4 mr-2" />
                    Copy All
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {filteredDemoRequests.map((demo) => (
                    <div
                      key={demo.id}
                      className="flex items-center justify-between p-4 rounded-lg border hover:shadow-md transition-all"
                    >
                      <div className="flex items-center gap-4 flex-1">
                        <Phone className="w-5 h-5 text-green-600" />
                        <div>
                          <p className="font-medium text-slate-900">{demo.name}</p>
                          <p className="font-mono text-sm text-slate-700">{demo.whatsapp}</p>
                          <p className="text-xs text-slate-500">
                            {new Date(demo.created_at).toLocaleString()}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        {demo.notified ? (
                          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                            <CheckCircle2 className="w-3 h-3 mr-1" />
                            Contacted
                          </Badge>
                        ) : (
                          <Badge variant="outline" className="bg-orange-50 text-orange-700 border-orange-200">
                            <Clock className="w-3 h-3 mr-1" />
                            Pending
                          </Badge>
                        )}
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => openWhatsApp(demo.whatsapp)}
                        >
                          <ExternalLink className="w-4 h-4 mr-1" />
                          WhatsApp
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleCopy(demo.whatsapp, demo.id)}
                        >
                          {copiedId === demo.id ? (
                            <CheckCircle2 className="w-4 h-4 text-green-600" />
                          ) : (
                            <Copy className="w-4 h-4" />
                          )}
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Contact Submissions (Leads) Tab */}
          <TabsContent value="leads" className="space-y-4">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Contact Submissions (Leads)</CardTitle>
                    <CardDescription>Messages from contact form</CardDescription>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => exportData(contactSubmissions, 'contact-leads')}
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Export CSV
                  </Button>
                </div>
                <div className="relative mt-4">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-4 w-4" />
                  <Input
                    placeholder="Search by name, email, or message content..."
                    value={searchQuery}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {filteredContactSubmissions.length === 0 ? (
                    <div className="text-center py-10 text-slate-500 bg-slate-50 rounded-lg border border-dashed">
                      No matching leads found.
                    </div>
                  ) : (
                    filteredContactSubmissions.map((lead) => (
                      <div
                        key={lead.id}
                        className="p-4 rounded-lg border border-slate-200 hover:shadow-md transition-all bg-white"
                      >
                        <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                          <div className="flex-1 space-y-2">
                            <div className="flex items-center gap-2">
                              <h3 className="font-semibold text-slate-900">{lead.name}</h3>
                              {lead.status === 'new' && (
                                <Badge variant="default" className="bg-blue-600">New</Badge>
                              )}
                              <Badge variant="outline" className="text-[10px] h-5">
                                {new Date(lead.created_at).toLocaleDateString()}
                              </Badge>
                            </div>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-1 text-sm text-slate-600">
                              <div className="flex items-center gap-2">
                                <Activity className="w-3 h-3 text-slate-400" />
                                <span className="font-medium text-slate-700">{lead.email}</span>
                              </div>
                              {lead.whatsapp && (
                                <div className="flex items-center gap-2">
                                  <Phone className="w-3 h-3 text-green-600" />
                                  <span className="font-medium text-green-700">{lead.whatsapp}</span>
                                </div>
                              )}
                            </div>

                            <div className="mt-3 pt-3 border-t border-slate-100">
                              <p className="text-sm font-semibold text-slate-800 mb-1">
                                Subject: {lead.subject}
                              </p>
                              <div className="p-3 bg-slate-50 rounded text-sm text-slate-700 whitespace-pre-wrap italic">
                                &quot;{lead.message}&quot;
                              </div>
                            </div>
                          </div>
                          
                          <div className="flex flex-row md:flex-col gap-2 shrink-0">
                            {lead.whatsapp && (
                              <Button
                                variant="outline"
                                size="sm"
                                className="flex-1"
                                onClick={() => openWhatsApp(lead.whatsapp)}
                              >
                                <ExternalLink className="w-4 h-4 mr-2" />
                                WhatsApp
                              </Button>
                            )}
                            <Button
                              variant="outline"
                              size="sm"
                              className="flex-1"
                              onClick={() => window.location.href = `mailto:${lead.email}?subject=Re: ${lead.subject}`}
                            >
                              <MessageSquare className="w-4 h-4 mr-2" />
                              Email
                            </Button>
                            
                            {lead.subject.includes('Upgrade Request') && lead.status === 'new' && (
                              <Button
                                variant="default"
                                size="sm"
                                className="flex-1 bg-green-600 hover:bg-green-700"
                                onClick={() => handleApproveUpgrade(lead)}
                                disabled={saving}
                              >
                                <CheckCircle2 className="w-4 h-4 mr-2" />
                                Approve Upgrade
                              </Button>
                            )}
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Users Tab */}
          <TabsContent value="users" className="space-y-4">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>All Users</CardTitle>
                    <CardDescription>Registered users on the platform</CardDescription>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => exportData(users, 'users')}
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Export CSV
                  </Button>
                </div>
                <div className="relative mt-4">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-4 w-4" />
                  <Input
                    placeholder="Search by name, email, or restaurant..."
                    value={searchQuery}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {filteredUsers.map((user) => (
                    <div
                      key={user.id}
                      className="flex items-center justify-between p-4 rounded-lg border hover:shadow-md transition-all"
                    >
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <p className="font-medium text-slate-900">{user.full_name}</p>
                          {user.onboarding_completed ? (
                            <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                              Active
                            </Badge>
                          ) : (
                            <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">
                              Setup
                            </Badge>
                          )}
                        </div>
                        <p className="text-sm text-slate-600 truncate">{user.email}</p>
                        {user.restaurant_name && (
                          <p className="text-sm text-slate-500 truncate mt-1">
                            🏪 {user.restaurant_name}
                          </p>
                        )}
                        <p className="text-xs text-slate-400 mt-1">
                          📞 {user.phone} • Joined {new Date(user.created_at).toLocaleDateString()}
                        </p>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleCopy(user.email, user.id)}
                      >
                        {copiedId === user.id ? (
                          <CheckCircle2 className="w-4 h-4 text-green-600" />
                        ) : (
                          <Copy className="w-4 h-4" />
                        )}
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Restaurants Tab */}
          <TabsContent value="restaurants" className="space-y-4">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>All Restaurants</CardTitle>
                    <CardDescription>Active restaurants on the platform</CardDescription>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => exportData(restaurants, 'restaurants')}
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Export CSV
                  </Button>
                </div>
                <div className="relative mt-4">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-4 w-4" />
                  <Input
                    placeholder="Search by restaurant name or owner..."
                    value={searchQuery}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {filteredRestaurants.map((restaurant) => (
                    <div
                      key={restaurant.id}
                      className="flex items-center justify-between p-4 rounded-lg border hover:shadow-md transition-all"
                    >
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-slate-900">{restaurant.name}</p>
                        <p className="text-sm text-slate-600 truncate">
                          Owner: {restaurant.owner?.full_name || 'Unknown'} ({restaurant.owner?.email || 'N/A'})
                        </p>
                        {restaurant.address && (
                          <p className="text-sm text-slate-500 truncate mt-1">
                            📍 {restaurant.address}
                          </p>
                        )}
                        <p className="text-xs text-slate-400 mt-1">
                          📞 {restaurant.phone} • Created {new Date(restaurant.created_at).toLocaleDateString()}
                        </p>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleCopy(restaurant.name, restaurant.id)}
                      >
                        {copiedId === restaurant.id ? (
                          <CheckCircle2 className="w-4 h-4 text-green-600" />
                        ) : (
                          <Copy className="w-4 h-4" />
                        )}
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
