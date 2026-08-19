import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Package,
  Truck,
  CheckCircle2,
  Clock,
  Search,
  Filter,
  ExternalLink,
  MessageCircle,
  Trash2,
  Edit,
  DollarSign,
  User,
  MapPin,
  Calendar,
} from 'lucide-react';
import { ShopOrder } from '../../types';

export const StoreOrdersTab: React.FC = () => {
  const {
    shopOrders,
    updateOrderStatus,
    deleteShopOrder,
    artistProfile,
    showToast,
  } = useApp();

  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedOrder, setSelectedOrder] = useState<ShopOrder | null>(null);
  const [editingTrackingId, setEditingTrackingId] = useState<string | null>(null);
  const [trackingInput, setTrackingInput] = useState('');

  const filteredOrders = shopOrders.filter((order) => {
    if (filterStatus !== 'all' && order.status !== filterStatus) return false;
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      return (
        order.id.toLowerCase().includes(term) ||
        order.customerName.toLowerCase().includes(term) ||
        order.customerEmail.toLowerCase().includes(term)
      );
    }
    return true;
  });

  const totalStoreRevenue = shopOrders.reduce((sum, o) => sum + o.total, 0);
  const pendingOrdersCount = shopOrders.filter((o) => o.status === 'processing').length;
  const shippedOrdersCount = shopOrders.filter((o) => o.status === 'shipped').length;

  const handleUpdateTracking = (orderId: string) => {
    if (!trackingInput) return;
    updateOrderStatus(orderId, 'shipped', trackingInput);
    setEditingTrackingId(null);
    setTrackingInput('');
    showToast(`Tracking saved & order marked as SHIPPED!`, 'success');
  };

  const handleMessageCustomer = (order: ShopOrder) => {
    const msg = `Hello ${order.customerName},

This is ${artistProfile.name} from BB Beauty Pro regarding your lipgloss order ${order.id}. 
Status: ${order.status.toUpperCase()}
Tracking: ${order.trackingNumber || 'In fulfillment'}

Thank you for shopping with us!`;

    const cleanPhone = order.customerPhone.replace(/[^0-9]/g, '');
    window.open(`https://wa.me/${cleanPhone || artistProfile.whatsappNumber.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(msg)}`, '_blank');
  };

  return (
    <div className="space-y-8">
      {/* Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-[#E2C9B0]/40 shadow-xs space-y-1">
          <span className="text-[10px] uppercase tracking-wider font-bold text-[#A68F7A]">
            Total Store Sales
          </span>
          <div className="font-serif-editorial text-2xl sm:text-3xl font-bold text-[#1A1A1A]">
            ${totalStoreRevenue.toFixed(2)}
          </div>
          <div className="text-[11px] text-[#1A1A1A]/60">{shopOrders.length} Completed Orders</div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-[#E2C9B0]/40 shadow-xs space-y-1">
          <span className="text-[10px] uppercase tracking-wider font-bold text-amber-600">
            Awaiting Fulfillment
          </span>
          <div className="font-serif-editorial text-2xl sm:text-3xl font-bold text-[#1A1A1A]">
            {pendingOrdersCount}
          </div>
          <div className="text-[11px] text-[#1A1A1A]/60">Processing in boutique studio</div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-[#E2C9B0]/40 shadow-xs space-y-1">
          <span className="text-[10px] uppercase tracking-wider font-bold text-emerald-600">
            Dispatched & Delivered
          </span>
          <div className="font-serif-editorial text-2xl sm:text-3xl font-bold text-[#1A1A1A]">
            {shippedOrdersCount}
          </div>
          <div className="text-[11px] text-[#1A1A1A]/60">In transit via USPS / DHL</div>
        </div>
      </div>

      {/* Main Order List Section */}
      <div className="bg-white rounded-2xl border border-[#E2C9B0]/40 shadow-xs overflow-hidden">
        {/* Filter bar */}
        <div className="p-5 border-b border-[#E2C9B0]/30 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 text-[#A68F7A] absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by Order ID or Client..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-3 py-2 bg-[#FAF9F6] border border-[#E2C9B0]/50 rounded-lg text-xs focus:outline-none focus:border-[#1A1A1A]"
            />
          </div>

          <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto">
            {['all', 'processing', 'shipped', 'delivered'].map((status) => (
              <button
                key={status}
                onClick={() => setFilterStatus(status)}
                className={`px-3 py-1.5 rounded-lg text-xs uppercase tracking-wider font-semibold capitalize transition-all cursor-pointer ${
                  filterStatus === status
                    ? 'bg-[#1A1A1A] text-white shadow-xs'
                    : 'bg-[#FAF9F6] text-[#1A1A1A]/70 hover:bg-[#F2EDE7]'
                }`}
              >
                {status}
              </button>
            ))}
          </div>
        </div>

        {/* Orders Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#FAF9F6] text-[#A68F7A] uppercase tracking-wider text-[10px] font-bold border-b border-[#E2C9B0]/30">
              <tr>
                <th className="p-4">Order ID & Date</th>
                <th className="p-4">Customer</th>
                <th className="p-4">Products</th>
                <th className="p-4">Total</th>
                <th className="p-4">Status & Tracking</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E2C9B0]/20 text-[#1A1A1A]">
              {filteredOrders.length === 0 ? (
                <tr>
                  <td colSpan={6} className="p-8 text-center text-[#1A1A1A]/60">
                    No orders matching your criteria.
                  </td>
                </tr>
              ) : (
                filteredOrders.map((order) => (
                  <tr key={order.id} className="hover:bg-[#FAF9F6]/60 transition-colors">
                    {/* Order ID */}
                    <td className="p-4">
                      <span className="font-mono font-bold text-[#1A1A1A] block">{order.id}</span>
                      <span className="text-[11px] text-[#A68F7A]">{order.createdAt}</span>
                    </td>

                    {/* Customer */}
                    <td className="p-4">
                      <div className="font-bold text-[#1A1A1A]">{order.customerName}</div>
                      <div className="text-[11px] text-[#1A1A1A]/60">{order.customerEmail}</div>
                      <div className="text-[10px] text-[#A68F7A]">{order.shippingAddress.city}, {order.shippingAddress.state}</div>
                    </td>

                    {/* Products */}
                    <td className="p-4">
                      <div className="space-y-1 max-w-xs">
                        {order.items.map((item, idx) => (
                          <div key={idx} className="flex items-center gap-2">
                            <span className="w-4 h-4 rounded-full bg-[#1A1A1A] text-white flex items-center justify-center text-[9px] font-bold shrink-0">
                              {item.quantity}
                            </span>
                            <span className="font-medium truncate">{item.productName} ({item.shadeName})</span>
                          </div>
                        ))}
                      </div>
                    </td>

                    {/* Total */}
                    <td className="p-4">
                      <span className="font-serif-editorial text-base font-bold text-[#1A1A1A]">
                        ${order.total.toFixed(2)}
                      </span>
                      <span className="block text-[10px] text-[#A68F7A]">{order.paymentMethod}</span>
                    </td>

                    {/* Status & Tracking */}
                    <td className="p-4 space-y-1">
                      <select
                        value={order.status}
                        onChange={(e) => updateOrderStatus(order.id, e.target.value as any)}
                        className={`text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-md border cursor-pointer ${
                          order.status === 'delivered'
                            ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                            : order.status === 'shipped'
                            ? 'bg-blue-50 text-blue-800 border-blue-200'
                            : 'bg-amber-50 text-amber-800 border-amber-200'
                        }`}
                      >
                        <option value="processing">Processing</option>
                        <option value="shipped">Shipped</option>
                        <option value="delivered">Delivered</option>
                      </select>

                      <div className="text-[11px] text-[#A68F7A] flex items-center gap-1 font-mono">
                        <Truck className="w-3 h-3 text-[#A68F7A]" />
                        <span>{order.trackingNumber || 'Unassigned'}</span>
                      </div>
                    </td>

                    {/* Actions */}
                    <td className="p-4 text-right space-x-1">
                      <button
                        onClick={() => handleMessageCustomer(order)}
                        className="p-1.5 text-emerald-600 hover:text-emerald-800 hover:bg-emerald-50 rounded-md transition-colors"
                        title="WhatsApp Client"
                      >
                        <MessageCircle className="w-4 h-4" />
                      </button>

                      <button
                        onClick={() => {
                          setEditingTrackingId(order.id);
                          setTrackingInput(order.trackingNumber || '');
                        }}
                        className="p-1.5 text-[#1A1A1A]/70 hover:text-[#1A1A1A] hover:bg-black/5 rounded-md transition-colors"
                        title="Assign Tracking ID"
                      >
                        <Edit className="w-4 h-4" />
                      </button>

                      <button
                        onClick={() => deleteShopOrder(order.id)}
                        className="p-1.5 text-rose-600 hover:text-rose-800 hover:bg-rose-50 rounded-md transition-colors"
                        title="Delete Order"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Tracking Edit Popup */}
      {editingTrackingId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-white rounded-2xl p-6 w-full max-w-md shadow-2xl border border-[#E2C9B0]/40 space-y-4">
            <h3 className="font-serif-editorial text-lg text-[#1A1A1A]">
              Add Shipping Tracking Number
            </h3>
            <p className="text-xs text-[#1A1A1A]/70">
              Enter courier tracking ID (USPS, FedEx, DHL, GIGL) for order <strong>{editingTrackingId}</strong>
            </p>
            <input
              type="text"
              placeholder="e.g. USPS-94001000000000000000"
              value={trackingInput}
              onChange={(e) => setTrackingInput(e.target.value)}
              className="w-full px-3 py-2 bg-[#FAF9F6] border border-[#E2C9B0]/60 rounded-lg text-xs font-mono focus:outline-none focus:border-[#1A1A1A]"
            />
            <div className="flex justify-end gap-2 pt-2">
              <button
                onClick={() => setEditingTrackingId(null)}
                className="px-4 py-2 border border-gray-200 rounded-lg text-xs text-[#1A1A1A]"
              >
                Cancel
              </button>
              <button
                onClick={() => handleUpdateTracking(editingTrackingId)}
                className="px-4 py-2 bg-[#1A1A1A] text-white rounded-lg text-xs uppercase tracking-wider font-bold"
              >
                Save & Mark Shipped
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
