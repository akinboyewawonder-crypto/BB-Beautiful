import React, { createContext, useContext, useEffect, useState } from 'react';
import {
  initialArtistProfile,
  initialBookingQuestions,
  initialBookingRequests,
  initialPortfolio,
  initialProducts,
  initialServices,
  initialShopOrders,
  suggestedQuestionsLibrary,
} from '../data/initialData';
import {
  ArtistProfile,
  BookingQuestion,
  BookingRequest,
  BookingStatus,
  CartItem,
  Currency,
  LipglossProduct,
  PackageTier,
  PortfolioItem,
  ServiceItem,
  ShopOrder,
} from '../types';

interface ToastState {
  id: string;
  message: string;
  type: 'success' | 'info' | 'error';
}

interface AppContextType {
  artistProfile: ArtistProfile;
  updateArtistProfile: (profile: Partial<ArtistProfile>) => void;

  services: ServiceItem[];
  addService: (service: Omit<ServiceItem, 'id'>) => void;
  updateService: (id: string, updates: Partial<ServiceItem>) => void;
  deleteService: (id: string) => void;
  toggleServiceActive: (id: string) => void;

  portfolio: PortfolioItem[];
  addPortfolioItem: (item: Omit<PortfolioItem, 'id'>) => void;
  updatePortfolioItem: (id: string, updates: Partial<PortfolioItem>) => void;
  deletePortfolioItem: (id: string) => void;
  togglePortfolioFeatured: (id: string) => void;

  // E-Commerce Lipgloss Products
  products: LipglossProduct[];
  addProduct: (product: Omit<LipglossProduct, 'id'>) => void;
  updateProduct: (id: string, updates: Partial<LipglossProduct>) => void;
  deleteProduct: (id: string) => void;
  toggleProductActive: (id: string) => void;

  // Shopping Cart
  cart: CartItem[];
  addToCart: (product: LipglossProduct, quantity?: number, shade?: string) => void;
  removeFromCart: (productId: string) => void;
  updateCartQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  cartCount: number;
  cartTotal: number;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  openCart: () => void;
  closeCart: () => void;

  // Quick View Modal
  quickViewProduct: LipglossProduct | null;
  setQuickViewProduct: (product: LipglossProduct | null) => void;

  // Store Orders
  shopOrders: ShopOrder[];
  createShopOrder: (orderData: Omit<ShopOrder, 'id' | 'createdAt' | 'status'>) => ShopOrder;
  updateOrderStatus: (orderId: string, status: ShopOrder['status'], trackingNumber?: string) => void;
  deleteShopOrder: (orderId: string) => void;

  // Checkout Drawer / Modal
  isCheckoutOpen: boolean;
  setIsCheckoutOpen: (open: boolean) => void;
  openCheckout: () => void;
  closeCheckout: () => void;
  lastCompletedOrder: ShopOrder | null;
  setLastCompletedOrder: (order: ShopOrder | null) => void;

  bookingQuestions: BookingQuestion[];
  addBookingQuestion: (q: Omit<BookingQuestion, 'id' | 'order'>) => void;
  updateBookingQuestion: (id: string, updates: Partial<BookingQuestion>) => void;
  deleteBookingQuestion: (id: string) => void;
  toggleBookingQuestionEnabled: (id: string) => void;
  reorderBookingQuestion: (id: string, direction: 'up' | 'down') => void;
  addSuggestedQuestion: (index: number) => void;

  bookingRequests: BookingRequest[];
  createBookingRequest: (req: Omit<BookingRequest, 'id' | 'referenceCode' | 'createdAt'>) => BookingRequest;
  updateBookingStatus: (id: string, status: BookingStatus, notes?: string) => void;
  deleteBookingRequest: (id: string) => void;

  packageTier: PackageTier;
  setPackageTier: (tier: PackageTier) => void;

  currency: Currency;
  setCurrency: (c: Currency) => void;
  formatPrice: (usd: number, ngn?: number) => string;

  activeView: 'public' | 'dashboard' | 'status-tracker' | 'shop';
  setActiveView: (view: 'public' | 'dashboard' | 'status-tracker' | 'shop') => void;

  dashboardTab: 'overview' | 'requests' | 'orders' | 'shop_cms' | 'calendar' | 'portfolio' | 'services' | 'questions' | 'content' | 'analytics' | 'package_preview';
  setDashboardTab: (tab: 'overview' | 'requests' | 'orders' | 'shop_cms' | 'calendar' | 'portfolio' | 'services' | 'questions' | 'content' | 'analytics' | 'package_preview') => void;

  isBookingModalOpen: boolean;
  openBookingModal: (preselectServiceId?: string) => void;
  closeBookingModal: () => void;
  preselectedServiceId: string | null;

  lookupReference: string;
  setLookupReference: (code: string) => void;

  selectedRequestForDrawer: BookingRequest | null;
  setSelectedRequestForDrawer: (req: BookingRequest | null) => void;

  lightboxItem: PortfolioItem | null;
  openLightbox: (item: PortfolioItem) => void;
  closeLightbox: () => void;

  toasts: ToastState[];
  showToast: (message: string, type?: 'success' | 'info' | 'error') => void;
  removeToast: (id: string) => void;

  resetToDemoData: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Local storage hydrated states with safe fallbacks
  const [artistProfile, setArtistProfile] = useState<ArtistProfile>(() => {
    try {
      const saved = localStorage.getItem('bb_artist_profile');
      return saved ? JSON.parse(saved) : initialArtistProfile;
    } catch {
      return initialArtistProfile;
    }
  });

  const [services, setServices] = useState<ServiceItem[]>(() => {
    try {
      const saved = localStorage.getItem('bb_services');
      return saved ? JSON.parse(saved) : initialServices;
    } catch {
      return initialServices;
    }
  });

  const [portfolio, setPortfolio] = useState<PortfolioItem[]>(() => {
    try {
      const saved = localStorage.getItem('bb_portfolio');
      return saved ? JSON.parse(saved) : initialPortfolio;
    } catch {
      return initialPortfolio;
    }
  });

  // Products state (Lipgloss collection)
  const [products, setProducts] = useState<LipglossProduct[]>(() => {
    try {
      const saved = localStorage.getItem('bb_products');
      return saved ? JSON.parse(saved) : initialProducts;
    } catch {
      return initialProducts;
    }
  });

  // Shopping Cart state
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('bb_cart');
      return saved ? JSON.parse(saved) : [
        { product: initialProducts[0], quantity: 1, selectedShade: initialProducts[0].shadeName },
        { product: initialProducts[1], quantity: 1, selectedShade: initialProducts[1].shadeName },
      ];
    } catch {
      return [];
    }
  });

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState<LipglossProduct | null>(null);

  // Shop Orders state
  const [shopOrders, setShopOrders] = useState<ShopOrder[]>(() => {
    try {
      const saved = localStorage.getItem('bb_shop_orders');
      return saved ? JSON.parse(saved) : initialShopOrders;
    } catch {
      return initialShopOrders;
    }
  });

  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [lastCompletedOrder, setLastCompletedOrder] = useState<ShopOrder | null>(null);

  const [bookingQuestions, setBookingQuestions] = useState<BookingQuestion[]>(() => {
    try {
      const saved = localStorage.getItem('bb_booking_questions');
      return saved ? JSON.parse(saved) : initialBookingQuestions;
    } catch {
      return initialBookingQuestions;
    }
  });

  const [bookingRequests, setBookingRequests] = useState<BookingRequest[]>(() => {
    try {
      const saved = localStorage.getItem('bb_booking_requests');
      return saved ? JSON.parse(saved) : initialBookingRequests;
    } catch {
      return initialBookingRequests;
    }
  });

  const [packageTier, setPackageTier] = useState<PackageTier>('signature');
  const [currency, setCurrency] = useState<Currency>('USD');
  const [activeView, setActiveView] = useState<'public' | 'dashboard' | 'status-tracker' | 'shop'>('public');
  const [dashboardTab, setDashboardTab] = useState<'overview' | 'requests' | 'orders' | 'shop_cms' | 'calendar' | 'portfolio' | 'services' | 'questions' | 'content' | 'analytics' | 'package_preview'>('overview');

  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [preselectedServiceId, setPreselectedServiceId] = useState<string | null>(null);

  const [lookupReference, setLookupReference] = useState<string>('#MG-20481');
  const [selectedRequestForDrawer, setSelectedRequestForDrawer] = useState<BookingRequest | null>(null);
  const [lightboxItem, setLightboxItem] = useState<PortfolioItem | null>(null);

  const [toasts, setToasts] = useState<ToastState[]>([]);

  // Sync to localStorage
  useEffect(() => {
    localStorage.setItem('bb_artist_profile', JSON.stringify(artistProfile));
  }, [artistProfile]);

  useEffect(() => {
    localStorage.setItem('bb_services', JSON.stringify(services));
  }, [services]);

  useEffect(() => {
    localStorage.setItem('bb_portfolio', JSON.stringify(portfolio));
  }, [portfolio]);

  useEffect(() => {
    localStorage.setItem('bb_products', JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    localStorage.setItem('bb_cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('bb_shop_orders', JSON.stringify(shopOrders));
  }, [shopOrders]);

  useEffect(() => {
    localStorage.setItem('bb_booking_questions', JSON.stringify(bookingQuestions));
  }, [bookingQuestions]);

  useEffect(() => {
    localStorage.setItem('bb_booking_requests', JSON.stringify(bookingRequests));
  }, [bookingRequests]);

  const showToast = (message: string, type: 'success' | 'info' | 'error' = 'success') => {
    const id = Date.now().toString() + Math.random().toString(36).substring(2, 5);
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      removeToast(id);
    }, 4000);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const updateArtistProfile = (updates: Partial<ArtistProfile>) => {
    setArtistProfile((prev) => ({ ...prev, ...updates }));
    showToast('Studio profile updated successfully');
  };

  // Service Management
  const addService = (newService: Omit<ServiceItem, 'id'>) => {
    const id = `srv-${Date.now()}`;
    setServices((prev) => [...prev, { ...newService, id }]);
    showToast('Service added to menu');
  };

  const updateService = (id: string, updates: Partial<ServiceItem>) => {
    setServices((prev) => prev.map((s) => (s.id === id ? { ...s, ...updates } : s)));
    showToast('Service updated');
  };

  const deleteService = (id: string) => {
    setServices((prev) => prev.filter((s) => s.id !== id));
    showToast('Service removed from menu', 'info');
  };

  const toggleServiceActive = (id: string) => {
    setServices((prev) =>
      prev.map((s) => (s.id === id ? { ...s, active: !s.active } : s))
    );
  };

  // Portfolio Management
  const addPortfolioItem = (item: Omit<PortfolioItem, 'id'>) => {
    const id = `port-${Date.now()}`;
    setPortfolio((prev) => [{ ...item, id }, ...prev]);
    showToast('Image published to portfolio');
  };

  const updatePortfolioItem = (id: string, updates: Partial<PortfolioItem>) => {
    setPortfolio((prev) => prev.map((p) => (p.id === id ? { ...p, ...updates } : p)));
    showToast('Portfolio item updated');
  };

  const deletePortfolioItem = (id: string) => {
    setPortfolio((prev) => prev.filter((p) => p.id !== id));
    showToast('Image removed from portfolio', 'info');
  };

  const togglePortfolioFeatured = (id: string) => {
    setPortfolio((prev) =>
      prev.map((p) => (p.id === id ? { ...p, featured: !p.featured } : p))
    );
    showToast('Featured status updated');
  };

  // E-Commerce Product Management
  const addProduct = (prodData: Omit<LipglossProduct, 'id'>) => {
    const id = `prod-${Date.now()}`;
    setProducts((prev) => [{ ...prodData, id }, ...prev]);
    showToast(`Added "${prodData.name}" to Lip Glaze Collection`);
  };

  const updateProduct = (id: string, updates: Partial<LipglossProduct>) => {
    setProducts((prev) => prev.map((p) => (p.id === id ? { ...p, ...updates } : p)));
    showToast('Product details updated');
  };

  const deleteProduct = (id: string) => {
    setProducts((prev) => prev.filter((p) => p.id !== id));
    showToast('Product removed from shop', 'info');
  };

  const toggleProductActive = (id: string) => {
    setProducts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, active: !p.active } : p))
    );
  };

  // Shopping Cart Handlers
  const addToCart = (product: LipglossProduct, quantity = 1, shade?: string) => {
    setCart((prev) => {
      const existingIndex = prev.findIndex((item) => item.product.id === product.id);
      if (existingIndex > -1) {
        const next = [...prev];
        next[existingIndex] = {
          ...next[existingIndex],
          quantity: next[existingIndex].quantity + quantity,
          selectedShade: shade || next[existingIndex].selectedShade || product.shadeName,
        };
        return next;
      }
      return [...prev, { product, quantity, selectedShade: shade || product.shadeName }];
    });
    showToast(`Added ${quantity}x ${product.name} to your bag`, 'success');
    setIsCartOpen(true);
  };

  const removeFromCart = (productId: string) => {
    setCart((prev) => prev.filter((item) => item.product.id !== productId));
    showToast('Item removed from bag', 'info');
  };

  const updateCartQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart((prev) =>
      prev.map((item) => (item.product.id === productId ? { ...item, quantity } : item))
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const cartTotal = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

  const openCart = () => setIsCartOpen(true);
  const closeCart = () => setIsCartOpen(false);

  const openCheckout = () => {
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  const closeCheckout = () => {
    setIsCheckoutOpen(false);
  };

  // Shop Orders Handlers
  const createShopOrder = (orderData: Omit<ShopOrder, 'id' | 'createdAt' | 'status'>) => {
    const randomNum = Math.floor(1000 + Math.random() * 9000);
    const orderId = `#BB-GLOSS-${randomNum}`;
    const newOrder: ShopOrder = {
      ...orderData,
      id: orderId,
      status: 'processing',
      createdAt: new Date().toISOString().replace('T', ' ').substring(0, 16),
      trackingNumber: `USPS-${Math.floor(100000000000 + Math.random() * 900000000000)}`,
    };

    setShopOrders((prev) => [newOrder, ...prev]);
    setLastCompletedOrder(newOrder);
    clearCart();
    setIsCheckoutOpen(false);
    showToast(`Order ${orderId} confirmed! Thank you.`, 'success');
    return newOrder;
  };

  const updateOrderStatus = (orderId: string, status: ShopOrder['status'], trackingNumber?: string) => {
    setShopOrders((prev) =>
      prev.map((o) =>
        o.id === orderId
          ? { ...o, status, trackingNumber: trackingNumber || o.trackingNumber }
          : o
      )
    );
    showToast(`Order ${orderId} status changed to ${status.toUpperCase()}`);
  };

  const deleteShopOrder = (orderId: string) => {
    setShopOrders((prev) => prev.filter((o) => o.id !== orderId));
    showToast(`Order ${orderId} deleted`, 'info');
  };

  // Booking Questions
  const addBookingQuestion = (q: Omit<BookingQuestion, 'id' | 'order'>) => {
    const maxOrder = bookingQuestions.reduce((max, cur) => Math.max(max, cur.order), 0);
    const newQ: BookingQuestion = {
      ...q,
      id: `q-${Date.now()}`,
      order: maxOrder + 1,
    };
    setBookingQuestions((prev) => [...prev, newQ]);
    showToast('Custom booking question added');
  };

  const updateBookingQuestion = (id: string, updates: Partial<BookingQuestion>) => {
    setBookingQuestions((prev) => prev.map((q) => (q.id === id ? { ...q, ...updates } : q)));
    showToast('Question saved');
  };

  const deleteBookingQuestion = (id: string) => {
    setBookingQuestions((prev) => prev.filter((q) => q.id !== id));
    showToast('Question deleted', 'info');
  };

  const toggleBookingQuestionEnabled = (id: string) => {
    setBookingQuestions((prev) =>
      prev.map((q) => (q.id === id ? { ...q, enabled: !q.enabled } : q))
    );
  };

  const reorderBookingQuestion = (id: string, direction: 'up' | 'down') => {
    setBookingQuestions((prev) => {
      const list = [...prev].sort((a, b) => a.order - b.order);
      const index = list.findIndex((q) => q.id === id);
      if (index === -1) return prev;
      if (direction === 'up' && index > 0) {
        const temp = list[index].order;
        list[index].order = list[index - 1].order;
        list[index - 1].order = temp;
      } else if (direction === 'down' && index < list.length - 1) {
        const temp = list[index].order;
        list[index].order = list[index + 1].order;
        list[index + 1].order = temp;
      }
      return [...list].sort((a, b) => a.order - b.order);
    });
  };

  const addSuggestedQuestion = (index: number) => {
    const template = suggestedQuestionsLibrary[index];
    if (!template) return;
    addBookingQuestion({
      question: template.question,
      placeholder: (template as any).placeholder || '',
      type: template.type,
      options: (template as any).options || undefined,
      required: false,
      enabled: true,
      category: template.category,
    });
  };

  const createBookingRequest = (reqData: Omit<BookingRequest, 'id' | 'referenceCode' | 'createdAt'>) => {
    const randomNum = Math.floor(10000 + Math.random() * 90000);
    const referenceCode = `#MG-${randomNum}`;
    const newRequest: BookingRequest = {
      ...reqData,
      id: `req-${Date.now()}`,
      referenceCode,
      createdAt: new Date().toISOString().replace('T', ' ').substring(0, 16),
    };
    setBookingRequests((prev) => [newRequest, ...prev]);
    setLookupReference(referenceCode);
    showToast(`Booking request ${referenceCode} created!`);
    return newRequest;
  };

  const updateBookingStatus = (id: string, status: BookingStatus, notes?: string) => {
    setBookingRequests((prev) =>
      prev.map((r) => {
        if (r.id === id) {
          return {
            ...r,
            status,
            adminNotes: notes !== undefined ? notes : r.adminNotes,
          };
        }
        return r;
      })
    );
    setSelectedRequestForDrawer((prev) => (prev && prev.id === id ? { ...prev, status, adminNotes: notes !== undefined ? notes : prev.adminNotes } : prev));
    showToast(`Booking status updated to ${status.replace('_', ' ').toUpperCase()}`);
  };

  const deleteBookingRequest = (id: string) => {
    setBookingRequests((prev) => prev.filter((r) => r.id !== id));
    if (selectedRequestForDrawer?.id === id) {
      setSelectedRequestForDrawer(null);
    }
    showToast('Booking request removed', 'info');
  };

  const openBookingModal = (serviceId?: string) => {
    setPreselectedServiceId(serviceId || null);
    setIsBookingModalOpen(true);
  };

  const closeBookingModal = () => {
    setIsBookingModalOpen(false);
    setPreselectedServiceId(null);
  };

  const openLightbox = (item: PortfolioItem) => {
    setLightboxItem(item);
  };

  const closeLightbox = () => {
    setLightboxItem(null);
  };

  const formatPrice = (usd: number, _ngn?: number) => {
    return `$${(usd || 0).toLocaleString()}`;
  };

  const resetToDemoData = () => {
    setArtistProfile(initialArtistProfile);
    setServices(initialServices);
    setPortfolio(initialPortfolio);
    setProducts(initialProducts);
    setShopOrders(initialShopOrders);
    setCart([
      { product: initialProducts[0], quantity: 1, selectedShade: initialProducts[0].shadeName },
      { product: initialProducts[1], quantity: 1, selectedShade: initialProducts[1].shadeName },
    ]);
    setBookingQuestions(initialBookingQuestions);
    setBookingRequests(initialBookingRequests);
    setLookupReference('#MG-20481');
    localStorage.removeItem('bb_artist_profile');
    localStorage.removeItem('bb_services');
    localStorage.removeItem('bb_portfolio');
    localStorage.removeItem('bb_products');
    localStorage.removeItem('bb_cart');
    localStorage.removeItem('bb_shop_orders');
    localStorage.removeItem('bb_booking_questions');
    localStorage.removeItem('bb_booking_requests');
    localStorage.removeItem('aura_artist_profile');
    localStorage.removeItem('aura_services');
    localStorage.removeItem('aura_portfolio');
    localStorage.removeItem('aura_booking_questions');
    localStorage.removeItem('aura_booking_requests');
    showToast('Demo data reset to factory pristine state');
  };

  return (
    <AppContext.Provider
      value={{
        artistProfile,
        updateArtistProfile,
        services,
        addService,
        updateService,
        deleteService,
        toggleServiceActive,
        portfolio,
        addPortfolioItem,
        updatePortfolioItem,
        deletePortfolioItem,
        togglePortfolioFeatured,
        products,
        addProduct,
        updateProduct,
        deleteProduct,
        toggleProductActive,
        cart,
        addToCart,
        removeFromCart,
        updateCartQuantity,
        clearCart,
        cartCount,
        cartTotal,
        isCartOpen,
        setIsCartOpen,
        openCart,
        closeCart,
        quickViewProduct,
        setQuickViewProduct,
        shopOrders,
        createShopOrder,
        updateOrderStatus,
        deleteShopOrder,
        isCheckoutOpen,
        setIsCheckoutOpen,
        openCheckout,
        closeCheckout,
        lastCompletedOrder,
        setLastCompletedOrder,
        bookingQuestions,
        addBookingQuestion,
        updateBookingQuestion,
        deleteBookingQuestion,
        toggleBookingQuestionEnabled,
        reorderBookingQuestion,
        addSuggestedQuestion,
        bookingRequests,
        createBookingRequest,
        updateBookingStatus,
        deleteBookingRequest,
        packageTier,
        setPackageTier,
        currency,
        setCurrency,
        formatPrice,
        activeView,
        setActiveView,
        dashboardTab,
        setDashboardTab,
        isBookingModalOpen,
        openBookingModal,
        closeBookingModal,
        preselectedServiceId,
        lookupReference,
        setLookupReference,
        selectedRequestForDrawer,
        setSelectedRequestForDrawer,
        lightboxItem,
        openLightbox,
        closeLightbox,
        toasts,
        showToast,
        removeToast,
        resetToDemoData,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};

