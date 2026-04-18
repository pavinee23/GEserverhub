// In-memory order store (resets on server restart; swap for DB later)
const orders = new Map();
let orderSeq = 1000;

export function createOrder(data) {
  const id = `MG-${++orderSeq}`;
  const order = {
    id,
    ...data,
    status: "pending_payment",
    createdAt: new Date().toISOString(),
    paymentSlip: null,
    paidAt: null,
  };
  orders.set(id, order);
  return order;
}

export function getOrder(id) {
  return orders.get(id) || null;
}

export function updateOrder(id, patch) {
  const o = orders.get(id);
  if (!o) return null;
  const updated = { ...o, ...patch };
  orders.set(id, updated);
  return updated;
}

export function getAllOrders() {
  return Array.from(orders.values());
}
