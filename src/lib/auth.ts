// Mock authentication system for realistic demo
export type UserRole = 'admin' | 'user' | 'store_owner';

export interface User {
  id: string;
  name: string;
  email: string;
  address: string;
  role: UserRole;
  createdAt: Date;
  storeId?: string; // For store owners
}

export interface Store {
  id: string;
  name: string;
  email: string;
  address: string;
  ownerId: string;
  averageRating: number;
  totalRatings: number;
  createdAt: Date;
  category: string;
  description: string;
  phone: string;
  website?: string;
  businessHours: {
    [key: string]: { open: string; close: string; closed?: boolean };
  };
  images: string[];
}

export interface Rating {
  id: string;
  userId: string;
  storeId: string;
  rating: number;
  comment?: string;
  createdAt: Date;
  helpful: number;
}

export interface Review {
  id: string;
  userId: string;
  storeId: string;
  rating: number;
  comment: string;
  createdAt: Date;
  helpful: number;
  images?: string[];
}

// Mock data for demonstration
export const mockUsers: User[] = [
  {
    id: '1',
    name: 'Sarah Johnson',
    email: 'admin@storerating.com',
    address: '123 Admin Street, New York, NY 10001',
    role: 'admin',
    createdAt: new Date('2024-01-15')
  },
  {
    id: '2',
    name: 'Mike Chen',
    email: 'mike.chen@email.com',
    address: '456 Oak Avenue, Los Angeles, CA 90210',
    role: 'user',
    createdAt: new Date('2024-02-10')
  },
  {
    id: '3',
    name: 'Srikanth Reddy',
    email: 'srikanth@freshmarket.com',
    address: '789 Market Street, San Francisco, CA 94102',
    role: 'store_owner',
    storeId: '1',
    createdAt: new Date('2024-01-20')
  },
  {
    id: '4',
    name: 'David Kim',
    email: 'david.kim@email.com',
    address: '321 Pine Road, Seattle, WA 98101',
    role: 'user',
    createdAt: new Date('2024-02-15')
  },
  {
    id: '5',
    name: 'Lisa Thompson',
    email: 'lisa@techstore.com',
    address: '654 Tech Boulevard, Austin, TX 78701',
    role: 'store_owner',
    storeId: '2',
    createdAt: new Date('2024-01-25')
  }
];

export const mockStores: Store[] = [
  {
    id: '1',
    name: 'Fresh Market Grocery',
    email: 'contact@freshmarket.com',
    address: '789 Market Street, San Francisco, CA 94102',
    ownerId: '3',
    averageRating: 4.5,
    totalRatings: 128,
    createdAt: new Date('2024-01-20'),
    category: 'Grocery',
    description: 'Premium organic groceries and fresh produce with locally sourced ingredients',
    phone: '+1 (415) 555-0123',
    website: 'https://freshmarket.com',
    businessHours: {
      monday: { open: '08:00', close: '22:00' },
      tuesday: { open: '08:00', close: '22:00' },
      wednesday: { open: '08:00', close: '22:00' },
      thursday: { open: '08:00', close: '22:00' },
      friday: { open: '08:00', close: '23:00' },
      saturday: { open: '09:00', close: '23:00' },
      sunday: { open: '09:00', close: '21:00' }
    },
    images: ['photo-1500673922987-e212871fec22', 'photo-1518495973542-4542c06a5843']
  },
  {
    id: '2',
    name: 'Tech Zone Electronics',
    email: 'info@techstore.com',
    address: '654 Tech Boulevard, Austin, TX 78701',
    ownerId: '5',
    averageRating: 4.2,
    totalRatings: 89,
    createdAt: new Date('2024-01-25'),
    category: 'Electronics',
    description: 'Latest gadgets, computers, and tech accessories with expert support',
    phone: '+1 (512) 555-0456',
    website: 'https://techzone.com',
    businessHours: {
      monday: { open: '10:00', close: '21:00' },
      tuesday: { open: '10:00', close: '21:00' },
      wednesday: { open: '10:00', close: '21:00' },
      thursday: { open: '10:00', close: '21:00' },
      friday: { open: '10:00', close: '22:00' },
      saturday: { open: '10:00', close: '22:00' },
      sunday: { open: '12:00', close: '19:00' }
    },
    images: ['photo-1488590528505-98d2b5aba04b', 'photo-1581091226825-a6a2a5aee158']
  },
  {
    id: '3',
    name: 'Downtown Coffee House',
    email: 'hello@downtowncoffee.com',
    address: '123 Main Street, Chicago, IL 60601',
    ownerId: '6',
    averageRating: 4.8,
    totalRatings: 256,
    createdAt: new Date('2024-02-01'),
    category: 'Food & Beverage',
    description: 'Artisan coffee, fresh pastries, and cozy atmosphere in the heart of downtown',
    phone: '+1 (312) 555-0789',
    businessHours: {
      monday: { open: '06:00', close: '20:00' },
      tuesday: { open: '06:00', close: '20:00' },
      wednesday: { open: '06:00', close: '20:00' },
      thursday: { open: '06:00', close: '20:00' },
      friday: { open: '06:00', close: '21:00' },
      saturday: { open: '07:00', close: '21:00' },
      sunday: { open: '07:00', close: '19:00' }
    },
    images: ['photo-1649972904349-6e44c42644a7']
  },
  {
    id: '4',
    name: 'Fashion Forward Boutique',
    email: 'style@fashionforward.com',
    address: '987 Fashion Ave, Miami, FL 33101',
    ownerId: '7',
    averageRating: 4.3,
    totalRatings: 167,
    createdAt: new Date('2024-02-05'),
    category: 'Fashion',
    description: 'Trendy fashion and designer clothing for the modern lifestyle',
    phone: '+1 (305) 555-0321',
    businessHours: {
      monday: { open: '11:00', close: '20:00' },
      tuesday: { open: '11:00', close: '20:00' },
      wednesday: { open: '11:00', close: '20:00' },
      thursday: { open: '11:00', close: '21:00' },
      friday: { open: '11:00', close: '21:00' },
      saturday: { open: '10:00', close: '21:00' },
      sunday: { open: '12:00', close: '18:00' }
    },
    images: ['photo-1721322800607-8c38375eef04']
  },
  {
    id: '5',
    name: 'Garden Center & Nursery',
    email: 'grow@gardencenter.com',
    address: '555 Green Lane, Portland, OR 97201',
    ownerId: '8',
    averageRating: 4.6,
    totalRatings: 94,
    createdAt: new Date('2024-02-08'),
    category: 'Home & Garden',
    description: 'Beautiful plants, gardening supplies, and expert landscaping advice',
    phone: '+1 (503) 555-0654',
    businessHours: {
      monday: { open: '08:00', close: '18:00' },
      tuesday: { open: '08:00', close: '18:00' },
      wednesday: { open: '08:00', close: '18:00' },
      thursday: { open: '08:00', close: '18:00' },
      friday: { open: '08:00', close: '19:00' },
      saturday: { open: '08:00', close: '19:00' },
      sunday: { open: '09:00', close: '17:00' }
    },
    images: ['photo-1501854140801-50d01698950b']
  }
];

export const mockRatings: Rating[] = [
  { 
    id: '1', 
    userId: '2', 
    storeId: '1', 
    rating: 5, 
    comment: 'Amazing fresh produce and excellent customer service! The organic section is fantastic.',
    createdAt: new Date('2024-02-20'),
    helpful: 12
  },
  { 
    id: '2', 
    userId: '4', 
    storeId: '1', 
    rating: 4, 
    comment: 'Great selection but can get crowded during peak hours. Still my go-to grocery store.',
    createdAt: new Date('2024-02-18'),
    helpful: 8
  },
  { 
    id: '3', 
    userId: '2', 
    storeId: '2', 
    rating: 4, 
    comment: 'Knowledgeable staff helped me find the perfect laptop. Competitive prices too!',
    createdAt: new Date('2024-02-22'),
    helpful: 15
  },
  { 
    id: '4', 
    userId: '4', 
    storeId: '3', 
    rating: 5, 
    comment: 'Best coffee in downtown! Love the cozy atmosphere and friendly baristas.',
    createdAt: new Date('2024-02-25'),
    helpful: 23
  },
  { 
    id: '5', 
    userId: '2', 
    storeId: '4', 
    rating: 4, 
    comment: 'Trendy clothes and unique pieces. A bit pricey but worth it for special occasions.',
    createdAt: new Date('2024-02-28'),
    helpful: 6
  },
];

// Authentication state management
let currentUser: User | null = null;

export const authService = {
  getCurrentUser: () => currentUser,
  
  login: async (email: string, password: string): Promise<User> => {
    // Mock login validation
    const user = mockUsers.find(u => u.email === email);
    if (!user) {
      throw new Error('Invalid email or password');
    }
    
    // In a real app, you'd validate the password
    currentUser = user;
    localStorage.setItem('currentUser', JSON.stringify(user));
    return user;
  },
  
  signup: async (userData: Omit<User, 'id' | 'createdAt' | 'role'>): Promise<User> => {
    const newUser: User = {
      ...userData,
      id: (mockUsers.length + 1).toString(),
      role: 'user',
      createdAt: new Date()
    };
    
    mockUsers.push(newUser);
    currentUser = newUser;
    localStorage.setItem('currentUser', JSON.stringify(newUser));
    return newUser;
  },
  
  logout: () => {
    currentUser = null;
    localStorage.removeItem('currentUser');
  },
  
  initializeAuth: () => {
    const stored = localStorage.getItem('currentUser');
    if (stored) {
      currentUser = JSON.parse(stored);
    }
  }
};

// Initialize auth on load
authService.initializeAuth();