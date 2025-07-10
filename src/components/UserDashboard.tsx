import { useState } from 'react';
import { Search, MapPin, Star } from 'lucide-react';
import { mockStores, mockRatings } from '@/lib/auth';
import { useAuth } from '@/components/AuthGuard';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Rating } from '@/components/ui/rating';
import { Badge } from '@/components/ui/badge';

export const UserDashboard = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const { user } = useAuth();

  const filteredStores = mockStores.filter(store => 
    store.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    store.address.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getUserRating = (storeId: string) => {
    return mockRatings.find(r => r.storeId === storeId && r.userId === user?.id)?.rating || 0;
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-heading font-bold">Browse Stores</h1>
          <p className="text-muted-foreground">Discover and rate amazing local businesses</p>
        </div>
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search stores by name or address..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10"
        />
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredStores.map((store) => {
          const userRating = getUserRating(store.id);
          return (
            <Card key={store.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-xl">{store.name}</CardTitle>
                    <div className="flex items-center mt-2 text-sm text-muted-foreground">
                      <MapPin className="h-4 w-4 mr-1" />
                      {store.address}
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium">Overall Rating</p>
                    <div className="flex items-center space-x-2">
                      <Rating value={store.averageRating} readonly size="sm" />
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
                      <Rating value={userRating} readonly size="sm" />
                      <Badge variant="secondary">Rated</Badge>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <p className="text-sm font-medium">Rate this store</p>
                    <Rating value={0} onChange={() => {}} size="sm" />
                  </div>
                )}

                <Button className="w-full" variant="outline">
                  View Details
                </Button>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
};