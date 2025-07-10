import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { 
  MessageSquare, 
  Send, 
  Clock, 
  CheckCircle,
  AlertCircle,
  Star,
  User,
  Filter,
  Search,
  Reply,
  Heart,
  Flag,
  Archive
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const ReviewManagement = () => {
  const { toast } = useToast();
  const [selectedReviews, setSelectedReviews] = useState<string[]>([]);
  const [bulkReply, setBulkReply] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const reviews = [
    {
      id: '1',
      user: 'Mike Chen',
      avatar: 'MC',
      rating: 5,
      comment: 'Amazing fresh produce and excellent customer service! The organic section is fantastic.',
      date: '2024-02-20',
      status: 'responded',
      helpful: 12,
      response: 'Thank you so much for your kind words! We\'re thrilled you enjoyed our organic selection.',
      sentiment: 'positive'
    },
    {
      id: '2',
      user: 'Sarah Johnson',
      avatar: 'SJ',
      rating: 4,
      comment: 'Great selection but can get crowded during peak hours. Still my go-to grocery store.',
      date: '2024-02-18',
      status: 'pending',
      helpful: 8,
      sentiment: 'positive'
    },
    {
      id: '3',
      user: 'David Kim',
      avatar: 'DK',
      rating: 2,
      comment: 'Disappointed with the checkout wait times. Staff seemed overwhelmed.',
      date: '2024-02-15',
      status: 'pending',
      helpful: 3,
      sentiment: 'negative'
    },
    {
      id: '4',
      user: 'Lisa Thompson',
      avatar: 'LT',
      rating: 5,
      comment: 'Love the new self-checkout stations! Makes shopping so much faster.',
      date: '2024-02-12',
      status: 'responded',
      helpful: 15,
      response: 'We\'re so glad you\'re enjoying the new self-checkout stations!',
      sentiment: 'positive'
    },
    {
      id: '5',
      user: 'Anonymous User',
      avatar: 'AU',
      rating: 3,
      comment: 'Decent prices but limited parking. Would be nice to have more spots.',
      date: '2024-02-10',
      status: 'pending',
      helpful: 5,
      sentiment: 'neutral'
    }
  ];

  const handleBulkReply = () => {
    if (selectedReviews.length === 0) {
      toast({
        title: "No Reviews Selected",
        description: "Please select reviews to reply to.",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Bulk Reply Sent",
      description: `Replied to ${selectedReviews.length} reviews successfully.`,
    });
    setSelectedReviews([]);
    setBulkReply('');
  };

  const handleSelectReview = (reviewId: string) => {
    setSelectedReviews(prev => 
      prev.includes(reviewId) 
        ? prev.filter(id => id !== reviewId)
        : [...prev, reviewId]
    );
  };

  const getSentimentColor = (sentiment: string) => {
    switch (sentiment) {
      case 'positive': return 'text-green-600 bg-green-50';
      case 'negative': return 'text-red-600 bg-red-50';
      default: return 'text-yellow-600 bg-yellow-50';
    }
  };

  const getStatusIcon = (status: string) => {
    return status === 'responded' 
      ? <CheckCircle className="h-4 w-4 text-green-500" />
      : <Clock className="h-4 w-4 text-yellow-500" />;
  };

  const filteredReviews = reviews.filter(review => {
    const matchesStatus = filterStatus === 'all' || review.status === filterStatus;
    const matchesSearch = review.comment.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         review.user.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  return (
    <div className="space-y-6">
      {/* Review Management Header */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <MessageSquare className="h-5 w-5 mr-2" />
            Review Management
          </CardTitle>
          <CardDescription>Manage and respond to customer reviews efficiently</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search and Filters */}
            <div className="flex-1 space-y-4">
              <div className="flex space-x-4">
                <div className="flex-1">
                  <Label htmlFor="search">Search Reviews</Label>
                  <div className="relative">
                    <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="search"
                      placeholder="Search by content or user..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="filter">Filter by Status</Label>
                  <select
                    id="filter"
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value)}
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                  >
                    <option value="all">All Reviews</option>
                    <option value="pending">Pending Response</option>
                    <option value="responded">Responded</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Bulk Actions */}
      {selectedReviews.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Bulk Actions ({selectedReviews.length} selected)</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <Label htmlFor="bulk-reply">Bulk Reply Message</Label>
                <Textarea
                  id="bulk-reply"
                  placeholder="Type your response to selected reviews..."
                  value={bulkReply}
                  onChange={(e) => setBulkReply(e.target.value)}
                  rows={3}
                />
              </div>
              <div className="flex space-x-2">
                <Button onClick={handleBulkReply}>
                  <Send className="h-4 w-4 mr-2" />
                  Send Bulk Reply
                </Button>
                <Button variant="outline">
                  <Archive className="h-4 w-4 mr-2" />
                  Archive Selected
                </Button>
                <Button variant="outline" onClick={() => setSelectedReviews([])}>
                  Clear Selection
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Reviews List */}
      <div className="space-y-4">
        {filteredReviews.map((review) => (
          <Card key={review.id} className={selectedReviews.includes(review.id) ? 'ring-2 ring-primary' : ''}>
            <CardContent className="p-6">
              <div className="space-y-4">
                {/* Review Header */}
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-4">
                    <input
                      type="checkbox"
                      checked={selectedReviews.includes(review.id)}
                      onChange={() => handleSelectReview(review.id)}
                      className="mt-1"
                    />
                    <div className="flex items-center space-x-3">
                      <div className="h-10 w-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-medium">
                        {review.avatar}
                      </div>
                      <div>
                        <p className="font-medium">{review.user}</p>
                        <div className="flex items-center space-x-2">
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
                          <span className="text-sm text-muted-foreground">{review.date}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge className={getSentimentColor(review.sentiment)}>
                      {review.sentiment}
                    </Badge>
                    {getStatusIcon(review.status)}
                  </div>
                </div>

                {/* Review Content */}
                <div className="ml-14">
                  <p className="text-sm leading-relaxed">{review.comment}</p>
                  
                  {/* Review Actions */}
                  <div className="flex items-center justify-between mt-4">
                    <div className="flex items-center space-x-4">
                      <Button variant="ghost" size="sm">
                        <Heart className="h-4 w-4 mr-1" />
                        {review.helpful} helpful
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Flag className="h-4 w-4 mr-1" />
                        Report
                      </Button>
                    </div>
                    <div className="flex space-x-2">
                      {review.status === 'pending' && (
                        <Button size="sm">
                          <Reply className="h-4 w-4 mr-2" />
                          Reply
                        </Button>
                      )}
                    </div>
                  </div>

                  {/* Existing Response */}
                  {review.response && (
                    <div className="mt-4 p-4 bg-muted rounded-lg">
                      <div className="flex items-center space-x-2 mb-2">
                        <User className="h-4 w-4" />
                        <span className="text-sm font-medium">Store Owner Response</span>
                        <CheckCircle className="h-4 w-4 text-green-500" />
                      </div>
                      <p className="text-sm">{review.response}</p>
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Quick Response Templates */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Response Templates</CardTitle>
          <CardDescription>Save time with pre-written response templates</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <Card className="cursor-pointer hover:bg-muted/50 transition-colors">
              <CardContent className="p-4">
                <h4 className="font-medium mb-2">Thank You (Positive)</h4>
                <p className="text-sm text-muted-foreground">
                  "Thank you for your wonderful review! We're thrilled you had a great experience..."
                </p>
              </CardContent>
            </Card>
            <Card className="cursor-pointer hover:bg-muted/50 transition-colors">
              <CardContent className="p-4">
                <h4 className="font-medium mb-2">Apologize & Improve</h4>
                <p className="text-sm text-muted-foreground">
                  "We sincerely apologize for your experience. We're taking steps to improve..."
                </p>
              </CardContent>
            </Card>
            <Card className="cursor-pointer hover:bg-muted/50 transition-colors">
              <CardContent className="p-4">
                <h4 className="font-medium mb-2">Request Clarification</h4>
                <p className="text-sm text-muted-foreground">
                  "Thank you for your feedback. Could you help us understand more about..."
                </p>
              </CardContent>
            </Card>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ReviewManagement;
