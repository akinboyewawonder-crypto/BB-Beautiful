export type PackageTier = 'basic' | 'signature';

export type Currency = 'USD' | 'NGN';

export type BookingStatus = 'pending' | 'payment_submitted' | 'approved' | 'rejected' | 'completed';

export type DashboardTab =
  | 'overview'
  | 'requests'
  | 'orders'
  | 'shop_cms'
  | 'calendar'
  | 'portfolio'
  | 'services'
  | 'questions'
  | 'content'
  | 'analytics'
  | 'package_preview';

export interface LipglossProduct {
  id: string;
  name: string;
  subtitle: string;
  shadeName: string;
  shadeHex: string;
  category: 'all' | 'hydrating' | 'plumping' | 'shimmer' | 'velvet' | 'sets';
  price: number;
  originalPrice?: number;
  rating: number;
  reviewCount: number;
  description: string;
  formulaHighlights: string[];
  finish: 'High-Shine Glass' | 'Lustre Shimmer' | 'Velvet Cushion' | 'Ultra-Glaze' | 'Complete Vault';
  scent: string;
  volume: string;
  image: string;
  galleryImages?: string[];
  inStock: boolean;
  stockCount: number;
  badge?: 'Best Seller' | 'Bridal Pick' | 'New Formula' | 'Limited Edition' | 'Vault Set';
  active: boolean;
}

export interface CartItem {
  product: LipglossProduct;
  quantity: number;
  selectedShade?: string;
}

export interface ShopOrder {
  id: string; // e.g. #BB-GLOSS-1049
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  shippingAddress: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
  items: {
    productId: string;
    productName: string;
    shadeName: string;
    quantity: number;
    price: number;
    image: string;
  }[];
  subtotal: number;
  shippingFee: number;
  discountAmount: number;
  promoCode?: string;
  total: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered';
  paymentMethod: 'Credit Card' | 'Apple Pay' | 'PayPal' | 'WhatsApp Direct';
  createdAt: string;
  trackingNumber?: string;
}

export interface ServiceItem {
  id: string;
  name: string;
  category: 'Bridal' | 'Traditional' | 'Glam' | 'Editorial' | 'Special Event';
  description: string;
  durationMinutes: number;
  priceUSD: number;
  priceNGN: number;
  includes: string[];
  image: string;
  popular?: boolean;
  active: boolean;
}

export interface PortfolioItem {
  id: string;
  title: string;
  category: 'Bridal' | 'Traditional' | 'Soft Glam' | 'Full Glam' | 'Photoshoot';
  image: string;
  clientName?: string;
  occasion?: string;
  featured: boolean;
  aspectRatio?: 'portrait' | 'square' | 'tall';
}

export type QuestionType = 'text' | 'select' | 'radio' | 'textarea' | 'number';

export interface BookingQuestion {
  id: string;
  question: string;
  placeholder?: string;
  type: QuestionType;
  options?: string[];
  required: boolean;
  enabled: boolean;
  category: 'event' | 'look' | 'logistics' | 'budget';
  order: number;
}

export interface BookingRequest {
  id: string;
  referenceCode: string; // e.g. #MG-20481
  clientName: string;
  clientEmail: string;
  clientPhone: string;
  serviceId: string;
  serviceName: string;
  eventType: string;
  eventDate: string; // YYYY-MM-DD
  timeSlot: string; // e.g. "09:00 AM"
  location: string;
  numberOfPeople: number;
  makeupStyle: string;
  inspirationNote?: string;
  customAnswers: Record<string, string>;
  totalAmountUSD: number;
  totalAmountNGN: number;
  depositPaidUSD: number;
  depositPaidNGN: number;
  status: BookingStatus;
  paymentProofUrl?: string;
  paymentSubmittedAt?: string;
  createdAt: string;
  adminNotes?: string;
}

export interface ArtistProfile {
  name: string;
  brandName: string;
  tagline: string;
  heroHeadline: string;
  heroSubheadline: string;
  yearsExperience: number;
  clientCount: number;
  rating: number;
  bio: string;
  philosophy: string;
  locationCity: string;
  studioAddress: string;
  phone: string;
  whatsappNumber: string;
  email: string;
  instagram: string;
  tiktok: string;
  portraitUrl: string;
  aboutImageUrl: string;
  customDomain: string;
  bankDetails: {
    bankName: string;
    accountName: string;
    accountNumber: string;
    depositPercentage: number;
    currency: Currency;
  };
}

export interface Testimonial {
  id: string;
  clientName: string;
  roleOrEvent: string;
  location: string;
  quote: string;
  rating: number;
  avatarUrl: string;
  date: string;
}

export interface CalendarSlot {
  date: string; // YYYY-MM-DD
  time: string; // e.g. "09:00 AM"
  status: 'available' | 'booked' | 'blocked';
  bookingId?: string;
}
