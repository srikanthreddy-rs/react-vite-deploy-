import { useState } from 'react';
import { Search, MapPin, Star, Filter, Clock, Phone, Globe, Heart, ThumbsUp, MessageSquare } from 'lucide-react';
import { mockStores, mockRatings, mockUsers, type Store, type Rating } from '@/lib/auth';
import { useAuth } from '@/components/AuthGuard';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Rating as RatingComponent } from '@/components/ui/rating';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Separator } from '@/components/ui/separator';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';

export const EnhancedUserDashboard = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [ratingFilter, setRatingFilter] = useState('all');
  const [sortBy, setSortBy] = useState('rating');
  const [selectedStore, setSelectedStore] = useState<Store | null>(null);
  const [newRating, setNewRating] = useState(0);
  const [newComment, setNewComment] = useState('');
  const [favorites, setFavorites] = useState<string[]>([]);
  
  const { user } = useAuth();
  const { toast } = useToast();

  const categories = ['all', 'Grocery', 'Electronics', 'Food & Beverage', 'Fashion', 'Home & Garden'];

  const filteredStores = mockStores
    .filter(store => {
      const matchesSearch = store.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           store.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           store.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = categoryFilter === 'all' || store.category === categoryFilter;
      const matchesRating = ratingFilter === 'all' || 
                           (ratingFilter === '4+' && store.averageRating >= 4) ||
                           (ratingFilter === '3+' && store.averageRating >= 3);
      return matchesSearch && matchesCategory && matchesRating;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'rating': return b.averageRating - a.averageRating;
        case 'reviews': return b.totalRatings - a.totalRatings;
        case 'name': return a.name.localeCompare(b.name);
        default: return 0;
      }
    });

  const getUserRating = (storeId: string) => {
    return mockRatings.find(r => r.storeId === storeId && r.userId === user?.id)?.rating || 0;
  };

  const getStoreReviews = (storeId: string) => {
    return mockRatings.filter(r => r.storeId === storeId);
  };

  const isOpen = (businessHours: Store['businessHours']) => {
    const now = new Date();
    const dayNames = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
    const currentDay = dayNames[now.getDay()];
    const currentTime = now.toTimeString().slice(0, 5);
    
    const todayHours = businessHours[currentDay];
    if (!todayHours || todayHours.closed) return false;
    
    return currentTime >= todayHours.open && currentTime <= todayHours.close;
  };

  const toggleFavorite = (storeId: string) => {
    setFavorites(prev => 
      prev.includes(storeId) 
        ? prev.filter(id => id !== storeId)
        : [...prev, storeId]
    );
  };

  const submitRating = () => {
    if (!selectedStore || newRating === 0) return;
    
    // In a real app, this would be an API call
    toast({
      title: "Rating submitted!",
      description: `Thank you for rating ${selectedStore.name}`,
    });
    
    setNewRating(0);
    setNewComment('');
    setSelectedStore(null);
  };

  const StoreCard = ({ store }: { store: Store }) => {
    const userRating = getUserRating(store.id);
    const storeIsOpen = isOpen(store.businessHours);
    const isFavorite = favorites.includes(store.id);

    return (
      <Card className="hover:shadow-lg transition-all duration-300 group">
        <div className="relative">
          <img 
            src={`https://images.unsplash.com/${store.images[0]}?w=400&h=200&fit=crop`}
            alt={store.name}
            className="w-full h-48 object-cover rounded-t-lg"
          />
          <Button
            variant="ghost"
            size="sm"
            className="absolute top-2 right-2 bg-white/80 hover:bg-white"
            onClick={() => toggleFavorite(store.id)}
          >
            <Heart className={`h-4 w-4 ${isFavorite ? 'fill-red-500 text-red-500' : ''}`} />
          </Button>
          <Badge 
            variant={storeIsOpen ? "default" : "secondary"}
            className="absolute bottom-2 left-2"
          >
            <Clock className="h-3 w-3 mr-1" />
            {storeIsOpen ? 'Open' : 'Closed'}
          </Badge>
        </div>
        
        <CardHeader>
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <CardTitle className="text-xl">{store.name}</CardTitle>
              <Badge variant="outline" className="mt-2">{store.category}</Badge>
              <div className="flex items-center mt-2 text-sm text-muted-foreground">
                <MapPin className="h-4 w-4 mr-1" />
                {store.address}
              </div>
            </div>
          </div>
        </CardHeader>
        
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground line-clamp-2">{store.description}</p>
          
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium">Overall Rating</p>
              <div className="flex items-center space-x-2">
                <RatingComponent value={store.averageRating} readonly size="sm" />
                <span className="text-sm text-muted-foreground">
                  {store.averageRating.toFixed(1)} ({store.totalRatings} reviews)
                </span>
              </div>
            </div>
          </div>

          {userRating > 0 ? (
            <div className="space-y-2">
              <p className="text-sm font-medium">Your Rating</p>
              <div className="flex items-center space-x-2">
                <RatingComponent value={userRating} readonly size="sm" />
                <Badge variant="secondary">Rated</Badge>
              </div>
            </div>
          ) : (
            <div className="space-y-2">
              <p className="text-sm font-medium">Rate this store</p>
              <RatingComponent 
                value={0} 
                onChange={(rating) => {
                  setSelectedStore(store);
                  setNewRating(rating);
                }} 
                size="sm" 
              />
            </div>
          )}

          <div className="flex gap-2">
            <Dialog>
              <DialogTrigger asChild>
                <Button className="flex-1" variant="outline">
                  View Details
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
                <StoreDetails store={store} />
              </DialogContent>
            </Dialog>
          </div>
        </CardContent>
      </Card>
    );
  };

  const StoreDetails = ({ store }: { store: Store }) => {
    const reviews = getStoreReviews(store.id);
    const storeIsOpen = isOpen(store.businessHours);

    return (
      <div className="space-y-6">
        <DialogHeader>
          <DialogTitle className="text-2xl">{store.name}</DialogTitle>
        </DialogHeader>

        <div className="grid gap-4">
          <img 
            src={`https://images.unsplash.com/${store.images[0]}?w=600&h=300&fit=crop`}
            alt={store.name}
            className="w-full h-64 object-cover rounded-lg"
          />
          
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold mb-2">About</h3>
                <p className="text-sm text-muted-foreground">{store.description}</p>
              </div>
              
              <div>
                <h3 className="font-semibold mb-2">Contact</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center">
                    <MapPin className="h-4 w-4 mr-2" />
                    {store.address}
                  </div>
                  <div className="flex items-center">
                    <Phone className="h-4 w-4 mr-2" />
                    {store.phone}
                  </div>
                  {store.website && (
                    <div className="flex items-center">
                      <Globe className="h-4 w-4 mr-2" />
                      <a href={store.website} className="text-primary hover:underline">
                        Visit Website
                      </a>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <h3 className="font-semibold mb-2">Business Hours</h3>
                <div className="space-y-1 text-sm">
                  {Object.entries(store.businessHours).map(([day, hours]) => {
                    const dayNames = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
                    const currentDay = dayNames[new Date().getDay()];
                    return (
                      <div key={day} className="flex justify-between">
                        <span className="capitalize">{day}</span>
                        <span className={day === currentDay ? 'font-semibold' : ''}>
                          {hours.closed ? 'Closed' : `${hours.open} - ${hours.close}`}
                        </span>
                      </div>
                    );
                  })}
                </div>
                <Badge variant={storeIsOpen ? "default" : "secondary"} className="mt-2">
                  {storeIsOpen ? 'Open Now' : 'Closed'}
                </Badge>
              </div>

              <div>
                <h3 className="font-semibold mb-2">Rating</h3>
                <div className="flex items-center space-x-2">
                  <RatingComponent value={store.averageRating} readonly />
                  <span className="font-semibold">{store.averageRating.toFixed(1)}</span>
                  <span className="text-muted-foreground">({store.totalRatings} reviews)</span>
                </div>
              </div>
            </div>
          </div>

          <Separator />

          <div>
            <h3 className="font-semibold mb-4">Customer Reviews</h3>
            <div className="space-y-4 max-h-64 overflow-y-auto">
              {reviews.map((review) => {
                const reviewer = mockUsers.find(u => u.id === review.userId);
                return (
                  <div key={review.id} className="border rounded-lg p-4">
                    <div className="flex items-start space-x-3">
                      <Avatar className="h-8 w-8">
                        <AvatarFallback>{reviewer?.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-1">
                          <span className="font-medium text-sm">{reviewer?.name}</span>
                          <RatingComponent value={review.rating} readonly size="sm" />
                        </div>
                        {review.comment && (
                          <p className="text-sm text-muted-foreground mb-2">{review.comment}</p>
                        )}
                        <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                          <span>{review.createdAt.toLocaleDateString()}</span>
                          <button className="flex items-center space-x-1 hover:text-foreground">
                            <ThumbsUp className="h-3 w-3" />
                            <span>{review.helpful}</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-heading font-bold">Browse Stores</h1>
          <p className="text-muted-foreground">Discover and rate amazing local businesses</p>
        </div>
        <Badge variant="outline" className="text-sm">
          {filteredStores.length} stores found
        </Badge>
      </div>

      {/* Enhanced Search and Filters */}
      <Card className="p-4">
        <div className="grid gap-4 md:grid-cols-5">
          <div className="relative md:col-span-2">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search stores, categories, or descriptions..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          
          <Select value={categoryFilter} onValueChange={setCategoryFilter}>
            <SelectTrigger>
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              {categories.map(category => (
                <SelectItem key={category} value={category}>
                  {category === 'all' ? 'All Categories' : category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={ratingFilter} onValueChange={setRatingFilter}>
            <SelectTrigger>
              <SelectValue placeholder="Rating" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Ratings</SelectItem>
              <SelectItem value="4+">4+ Stars</SelectItem>
              <SelectItem value="3+">3+ Stars</SelectItem>
            </SelectContent>
          </Select>

          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger>
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="rating">Highest Rated</SelectItem>
              <SelectItem value="reviews">Most Reviews</SelectItem>
              <SelectItem value="name">Name A-Z</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </Card>

      {/* Store Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredStores.map((store) => (
          <StoreCard key={store.id} store={store} />
        ))}
      </div>

      {filteredStores.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No stores found matching your criteria.</p>
          <Button 
            variant="outline" 
            onClick={() => {
              setSearchTerm('');
              setCategoryFilter('all');
              setRatingFilter('all');
            }}
            className="mt-2"
          >
            Clear Filters
          </Button>
        </div>
      )}

      {/* Rating Modal */}
      {selectedStore && (
        <Dialog open={!!selectedStore} onOpenChange={() => setSelectedStore(null)}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Rate {selectedStore.name}</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium">Your Rating</label>
                <RatingComponent 
                  value={newRating} 
                  onChange={setNewRating}
                />
              </div>
              <div>
                <label className="text-sm font-medium">Comment (optional)</label>
                <Textarea 
                  placeholder="Share your experience..."
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                />
              </div>
              <div className="flex justify-end space-x-2">
                <Button variant="outline" onClick={() => setSelectedStore(null)}>
                  Cancel
                </Button>
                <Button onClick={submitRating} disabled={newRating === 0}>
                  Submit Rating
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};