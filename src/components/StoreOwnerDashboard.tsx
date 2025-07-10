import { useState } from 'react';
import { useAuth } from '@/components/AuthGuard';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Analytics from '@/components/Analytics';
import ReviewManagement from '@/components/ReviewManagement';
import { 
  Store, 
  Star, 
  Users, 
  TrendingUp, 
  MessageSquare, 
  Calendar,
  Phone,
  Globe,
  MapPin,
  Clock,
  Camera,
  Settings,
  Bell,
  BarChart3,
  Target,
  Award
} from 'lucide-react';

export const StoreOwnerDashboard = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');

  // Mock store data for the logged-in store owner
  const storeData = {
    id: '1',
    name: 'Fresh Market Grocery',
    address: '789 Market Street, San Francisco, CA 94102',
    phone: '+1 (415) 555-0123',
    website: 'https://freshmarket.com',
    category: 'Grocery',
    averageRating: 4.5,
    totalRatings: 128,
    totalViews: 15247,
    monthlyGrowth: 12.5,
    businessHours: {
      monday: '8:00 AM - 10:00 PM',
      tuesday: '8:00 AM - 10:00 PM',
      wednesday: '8:00 AM - 10:00 PM',
      thursday: '8:00 AM - 10:00 PM',
      friday: '8:00 AM - 11:00 PM',
      saturday: '9:00 AM - 11:00 PM',
      sunday: '9:00 AM - 9:00 PM'
    },
    recentReviews: [
      { id: 1, user: 'Mike Chen', rating: 5, comment: 'Amazing fresh produce!', date: '2024-02-20', responded: true },
      { id: 2, user: 'Sarah J.', rating: 4, comment: 'Great selection, but can get crowded.', date: '2024-02-18', responded: false },
      { id: 3, user: 'David K.', rating: 2, comment: 'Long wait times at checkout.', date: '2024-02-15', responded: false }
    ]
  };

  return (
    <div className="space-y-6">
      {/* Store Header */}
      <Card className="bg-gradient-subtle border-0">
        <CardContent className="p-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
            <div className="flex items-start space-x-4">
              <div className="h-16 w-16 bg-gradient-primary rounded-xl flex items-center justify-center">
                <Store className="h-8 w-8 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-heading font-bold mb-2">{storeData.name}</h1>
                <div className="space-y-1 text-muted-foreground">
                  <div className="flex items-center space-x-2">
                    <MapPin className="h-4 w-4" />
                    <span>{storeData.address}</span>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-2">
                      <Phone className="h-4 w-4" />
                      <span>{storeData.phone}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Globe className="h-4 w-4" />
                      <span>{storeData.website}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-center">
                <div className="flex items-center space-x-1">
                  <Star className="h-5 w-5 text-yellow-500 fill-current" />
                  <span className="text-2xl font-bold">{storeData.averageRating}</span>
                </div>
                <p className="text-sm text-muted-foreground">{storeData.totalRatings} reviews</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold">{storeData.totalViews.toLocaleString()}</p>
                <p className="text-sm text-muted-foreground">total views</p>
              </div>
              <Badge variant="secondary" className="bg-green-100 text-green-700">
                <TrendingUp className="h-3 w-3 mr-1" />
                +{storeData.monthlyGrowth}% this month
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Enhanced Tabs Navigation */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="overview" className="flex items-center space-x-2">
            <Store className="h-4 w-4" />
            <span className="hidden sm:inline">Overview</span>
          </TabsTrigger>
          <TabsTrigger value="analytics" className="flex items-center space-x-2">
            <BarChart3 className="h-4 w-4" />
            <span className="hidden sm:inline">Analytics</span>
          </TabsTrigger>
          <TabsTrigger value="reviews" className="flex items-center space-x-2">
            <MessageSquare className="h-4 w-4" />
            <span className="hidden sm:inline">Reviews</span>
          </TabsTrigger>
          <TabsTrigger value="performance" className="flex items-center space-x-2">
            <Target className="h-4 w-4" />
            <span className="hidden sm:inline">Performance</span>
          </TabsTrigger>
          <TabsTrigger value="insights" className="flex items-center space-x-2">
            <Award className="h-4 w-4" />
            <span className="hidden sm:inline">Insights</span>
          </TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-6">
          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Today's Views</p>
                    <p className="text-2xl font-bold">342</p>
                  </div>
                  <TrendingUp className="h-8 w-8 text-primary" />
                </div>
                <p className="text-xs text-muted-foreground mt-2">+12% from yesterday</p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">New Reviews</p>
                    <p className="text-2xl font-bold">8</p>
                  </div>
                  <MessageSquare className="h-8 w-8 text-primary" />
                </div>
                <p className="text-xs text-muted-foreground mt-2">3 pending responses</p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Response Rate</p>
                    <p className="text-2xl font-bold">98%</p>
                  </div>
                  <Users className="h-8 w-8 text-green-500" />
                </div>
                <p className="text-xs text-muted-foreground mt-2">2.3h avg response time</p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Rating Trend</p>
                    <p className="text-2xl font-bold text-green-600">↗ 4.5</p>
                  </div>
                  <Star className="h-8 w-8 text-yellow-500" />
                </div>
                <p className="text-xs text-muted-foreground mt-2">+0.2 this week</p>
              </CardContent>
            </Card>
          </div>

          {/* Recent Activity & Quick Actions */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Bell className="h-5 w-5 mr-2" />
                  Recent Reviews
                </CardTitle>
                <CardDescription>Latest customer feedback requiring attention</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {storeData.recentReviews.map((review) => (
                  <div key={review.id} className="flex items-start space-x-4 p-4 border rounded-lg">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-4 w-4 ${
                            i < review.rating
                              ? 'text-yellow-500 fill-current'
                              : 'text-gray-300'
                          }`}
                        />
                      ))}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <p className="font-medium">{review.user}</p>
                        <Badge variant={review.responded ? 'default' : 'destructive'}>
                          {review.responded ? 'Responded' : 'Pending'}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">{review.comment}</p>
                      <p className="text-xs text-muted-foreground mt-1">{review.date}</p>
                    </div>
                  </div>
                ))}
                <Button variant="outline" className="w-full">
                  <MessageSquare className="h-4 w-4 mr-2" />
                  View All Reviews
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Settings className="h-5 w-5 mr-2" />
                  Quick Actions
                </CardTitle>
                <CardDescription>Manage your store efficiently</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  <Button variant="outline" className="h-20 flex-col">
                    <Camera className="h-6 w-6 mb-2" />
                    Update Photos
                  </Button>
                  <Button variant="outline" className="h-20 flex-col">
                    <Clock className="h-6 w-6 mb-2" />
                    Edit Hours
                  </Button>
                  <Button variant="outline" className="h-20 flex-col">
                    <Bell className="h-6 w-6 mb-2" />
                    Notifications
                  </Button>
                  <Button variant="outline" className="h-20 flex-col">
                    <Calendar className="h-6 w-6 mb-2" />
                    Schedule Post
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Business Hours */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Clock className="h-5 w-5 mr-2" />
                Business Hours
              </CardTitle>
              <CardDescription>Current operating schedule</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-7 gap-4">
                {Object.entries(storeData.businessHours).map(([day, hours]) => (
                  <div key={day} className="text-center p-3 border rounded-lg">
                    <p className="font-medium capitalize">{day}</p>
                    <p className="text-sm text-muted-foreground">{hours}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Analytics Tab */}
        <TabsContent value="analytics">
          <Analytics />
        </TabsContent>

        {/* Reviews Tab */}
        <TabsContent value="reviews">
          <ReviewManagement />
        </TabsContent>

        {/* Performance Tab */}
        <TabsContent value="performance" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Performance Insights</CardTitle>
              <CardDescription>Track your store's performance metrics and growth</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12">
                <Target className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-medium mb-2">Performance Analytics</h3>
                <p className="text-muted-foreground mb-4">Advanced performance metrics and benchmarking tools</p>
                <Button>Coming Soon</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Insights Tab */}
        <TabsContent value="insights" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Business Insights</CardTitle>
              <CardDescription>AI-powered insights and recommendations for your store</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12">
                <Award className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-medium mb-2">Smart Insights</h3>
                <p className="text-muted-foreground mb-4">Get personalized recommendations to improve your business</p>
                <Button>Coming Soon</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};