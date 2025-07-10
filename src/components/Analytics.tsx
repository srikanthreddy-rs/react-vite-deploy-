import { useState } from 'react';
import { useAuth } from '@/components/AuthGuard';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { 
  TrendingUp, 
  Users, 
  Star, 
  MessageSquare, 
  Bell,
  Calendar,
  BarChart3,
  Target,
  Zap,
  Clock,
  Award,
  AlertTriangle,
  CheckCircle,
  Download,
  Share2
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const Analytics = () => {
  const { toast } = useToast();

  const analyticsData = {
    totalViews: 15247,
    totalReviews: 128,
    averageRating: 4.5,
    responseRate: 98,
    monthlyGrowth: 12.5,
    weeklyStats: [
      { day: 'Mon', views: 234, reviews: 5 },
      { day: 'Tue', views: 456, reviews: 8 },
      { day: 'Wed', views: 123, reviews: 3 },
      { day: 'Thu', views: 567, reviews: 12 },
      { day: 'Fri', views: 890, reviews: 15 },
      { day: 'Sat', views: 1234, reviews: 18 },
      { day: 'Sun', views: 678, reviews: 9 }
    ],
    topKeywords: ['fresh produce', 'organic', 'customer service', 'quality', 'prices'],
    sentimentAnalysis: {
      positive: 75,
      neutral: 20,
      negative: 5
    }
  };

  const recentActivity = [
    { id: 1, type: 'review', user: 'Mike Chen', rating: 5, time: '2 hours ago', content: 'Amazing fresh produce!' },
    { id: 2, type: 'view', user: 'Anonymous', time: '3 hours ago', content: 'Viewed store profile' },
    { id: 3, type: 'photo', user: 'Sarah J.', time: '5 hours ago', content: 'Added store photo' },
    { id: 4, type: 'response', user: 'Store Owner', time: '6 hours ago', content: 'Responded to review' }
  ];

  const handleExportData = () => {
    toast({
      title: "Export Started",
      description: "Your analytics data is being prepared for download.",
    });
  };

  return (
    <div className="space-y-6">
      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Views</p>
                <p className="text-2xl font-bold">{analyticsData.totalViews.toLocaleString()}</p>
              </div>
              <TrendingUp className="h-8 w-8 text-primary" />
            </div>
            <div className="flex items-center mt-2">
              <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
              <span className="text-sm text-green-600">+{analyticsData.monthlyGrowth}%</span>
              <span className="text-sm text-muted-foreground ml-1">from last month</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Reviews</p>
                <p className="text-2xl font-bold">{analyticsData.totalReviews}</p>
              </div>
              <MessageSquare className="h-8 w-8 text-primary" />
            </div>
            <div className="flex items-center mt-2">
              <Star className="h-4 w-4 text-yellow-500 mr-1" />
              <span className="text-sm">{analyticsData.averageRating}/5 average</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Response Rate</p>
                <p className="text-2xl font-bold">{analyticsData.responseRate}%</p>
              </div>
              <CheckCircle className="h-8 w-8 text-green-500" />
            </div>
            <div className="flex items-center mt-2">
              <Clock className="h-4 w-4 text-blue-500 mr-1" />
              <span className="text-sm text-muted-foreground">2.3h avg response time</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Sentiment</p>
                <p className="text-2xl font-bold text-green-600">{analyticsData.sentimentAnalysis.positive}%</p>
              </div>
              <Award className="h-8 w-8 text-green-500" />
            </div>
            <div className="flex items-center mt-2">
              <div className="flex space-x-2 text-sm">
                <span className="text-green-600">{analyticsData.sentimentAnalysis.positive}% Positive</span>
                <span className="text-gray-500">{analyticsData.sentimentAnalysis.neutral}% Neutral</span>
                <span className="text-red-500">{analyticsData.sentimentAnalysis.negative}% Negative</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts and Detailed Analytics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Weekly Performance */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <BarChart3 className="h-5 w-5 mr-2" />
              Weekly Performance
            </CardTitle>
            <CardDescription>Views and reviews over the past week</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {analyticsData.weeklyStats.map((stat, index) => (
                <div key={index} className="flex items-center justify-between">
                  <span className="text-sm font-medium">{stat.day}</span>
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center">
                      <div className="w-20 bg-muted rounded-full h-2 mr-2">
                        <div 
                          className="bg-primary h-2 rounded-full" 
                          style={{ width: `${(stat.views / 1234) * 100}%` }}
                        ></div>
                      </div>
                      <span className="text-sm text-muted-foreground">{stat.views} views</span>
                    </div>
                    <Badge variant="secondary">{stat.reviews} reviews</Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Top Keywords */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Target className="h-5 w-5 mr-2" />
              Top Review Keywords
            </CardTitle>
            <CardDescription>Most mentioned words in your reviews</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {analyticsData.topKeywords.map((keyword, index) => (
                <div key={index} className="flex items-center justify-between">
                  <span className="text-sm font-medium">#{keyword}</span>
                  <Badge variant="outline">{Math.floor(Math.random() * 50) + 10} mentions</Badge>
                </div>
              ))}
            </div>
            <Button variant="outline" size="sm" className="w-full mt-4">
              View Full Keyword Analysis
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity Feed */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center">
                <Bell className="h-5 w-5 mr-2" />
                Recent Activity
              </CardTitle>
              <CardDescription>Latest interactions with your store</CardDescription>
            </div>
            <div className="flex space-x-2">
              <Button variant="outline" size="sm" onClick={handleExportData}>
                <Download className="h-4 w-4 mr-2" />
                Export Data
              </Button>
              <Button variant="outline" size="sm">
                <Share2 className="h-4 w-4 mr-2" />
                Share Report
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentActivity.map((activity) => (
              <div key={activity.id} className="flex items-start space-x-4 p-4 border rounded-lg">
                <div className="flex-shrink-0">
                  {activity.type === 'review' && <Star className="h-5 w-5 text-yellow-500" />}
                  {activity.type === 'view' && <TrendingUp className="h-5 w-5 text-blue-500" />}
                  {activity.type === 'photo' && <Users className="h-5 w-5 text-green-500" />}
                  {activity.type === 'response' && <MessageSquare className="h-5 w-5 text-purple-500" />}
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium">{activity.user}</p>
                    <span className="text-xs text-muted-foreground">{activity.time}</span>
                  </div>
                  <p className="text-sm text-muted-foreground">{activity.content}</p>
                  {activity.rating && (
                    <div className="flex items-center mt-1">
                      {[...Array(activity.rating)].map((_, i) => (
                        <Star key={i} className="h-3 w-3 text-yellow-500 fill-current" />
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Zap className="h-5 w-5 mr-2" />
            Quick Actions
          </CardTitle>
          <CardDescription>Manage your store efficiently</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button variant="outline" className="h-20 flex-col">
              <Calendar className="h-6 w-6 mb-2" />
              Schedule Promotion
            </Button>
            <Button variant="outline" className="h-20 flex-col">
              <MessageSquare className="h-6 w-6 mb-2" />
              Bulk Reply to Reviews
            </Button>
            <Button variant="outline" className="h-20 flex-col">
              <AlertTriangle className="h-6 w-6 mb-2" />
              Report Issue
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Analytics;