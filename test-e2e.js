const {
  getProducts,
  getProductBySlug,
  getProductById,
  createOrder,
  getOrderById,
  getOrderByRef,
  getAllOrders,
  updateOrderStatus,
  getSettings,
  updateSettings,
  verifyAdminCredentials,
  getStats,
} = require('./src/lib/db.ts');
const { signToken, verifyToken } = require('./src/lib/auth.ts');
const fs = require('fs');

console.log('====================================================');
console.log('🧪 RUNNING RAJSHREE SWEETS & SNACKS SUITE TESTS');
console.log('====================================================\n');

let passedTests = 0;
let totalTests = 0;

function assert(condition, testName) {
  totalTests++;
  if (condition) {
    console.log(`✅ PASS: ${testName}`);
    passedTests++;
  } else {
    console.error(`❌ FAIL: ${testName}`);
    process.exitCode = 1;
  }
}

// TEST 1: Catalogue Import Against PDF Source
const products = getProducts();
assert(products.length === 133, `Catalogue has exactly 133 products (Found: ${products.length})`);

const sweets = products.filter(p => p.category === 'SWEETS');
const namkeen = products.filter(p => p.category === 'NAMKEEN');
const accompaniments = products.filter(p => p.category === 'ACCOMPANIMENTS');
const snacks = products.filter(p => p.category === 'SNACKS');

assert(sweets.length === 98, `Sweets category count is 98 (Found: ${sweets.length})`);
assert(namkeen.length === 24, `Namkeen category count is 24 (Found: ${namkeen.length})`);
assert(accompaniments.length === 2, `Accompaniments category count is 2 (Found: ${accompaniments.length})`);
assert(snacks.length === 9, `Snacks category count is 9 (Found: ${snacks.length})`);

// TEST 2: Price Fidelity against PDF Source
const kajuKatli = products.find(p => p.name === 'KAJU KATLI');
assert(kajuKatli && kajuKatli.price === 1300 && kajuKatli.unit === 'KG', 'Kaju Katli verified at ₹1,300/kg');

const samosa = products.find(p => p.name === 'SAMOSA');
assert(samosa && samosa.price === 25 && samosa.unit === 'PCS', 'Samosa verified at ₹25/pc');

const cholaBhatura = products.find(p => p.name === 'CHOLA BHATURA');
assert(cholaBhatura && cholaBhatura.price === 125 && cholaBhatura.unit === 'PLATE', 'Chola Bhatura verified at ₹125/plate');

const sweetRedChatni = products.find(p => p.name === 'SWEET RED CHATNI');
assert(sweetRedChatni && sweetRedChatni.price === 125 && sweetRedChatni.unit === 'KG', 'Sweet Red Chatni verified at ₹125/kg');

// TEST 3: Variant & Weight Multiplier Calculations
const kaju500gPrice = Math.round(kajuKatli.price * 0.5);
assert(kaju500gPrice === 650, `500g Kaju Katli price calculation is ₹650 (Got: ₹${kaju500gPrice})`);

const kaju250gPrice = Math.round(kajuKatli.price * 0.25);
assert(kaju250gPrice === 325, `250g Kaju Katli price calculation is ₹325 (Got: ₹${kaju250gPrice})`);

// TEST 4: Store Fulfilment Defaults
const settings = getSettings();
assert(settings.deliveryFee === 50, `Configured delivery fee is ₹50 (Got: ₹${settings.deliveryFee})`);
assert(settings.minOrderValue === 500, `Configured min order is ₹500 (Got: ₹${settings.minOrderValue})`);
assert(settings.upiId === 'vyapar.171295050225@hdfcbank', `Configured UPI ID is exact SmartHub VPA (Got: ${settings.upiId})`);
assert(settings.phone === '+91 8050832752', `Configured phone matches verified shop contact (Got: ${settings.phone})`);

// TEST 5: Order Creation & Persistence
const testItems = [
  {
    productId: kajuKatli.id,
    productName: kajuKatli.name,
    variantLabel: '500g',
    unitPrice: 650,
    quantity: 1,
    itemTotal: 650,
  },
  {
    productId: samosa.id,
    productName: samosa.name,
    variantLabel: '1 Pc',
    unitPrice: 25,
    quantity: 4,
    itemTotal: 100,
  },
];

const subtotal = 750;
const deliveryFee = 50;
const totalAmount = 800;

const createdOrder = createOrder(
  {
    customerName: 'Test Customer Anekal',
    customerPhone: '9876543210',
    customerEmail: 'test.customer@example.com',
    fulfilmentType: 'DELIVERY',
    address: 'Near Jigani APC Circle, Bengaluru',
    landmark: 'Vishal Mega Mart',
    pincode: '560105',
    notes: 'Please pack sweets carefully',
    subtotal,
    deliveryFee,
    totalAmount,
    status: 'Pending Payment',
    paymentStatus: 'PENDING',
    paymentUtr: '428901998877',
  },
  testItems
);

assert(createdOrder && createdOrder.id.startsWith('ord-'), 'Order created with persistent ID');
assert(createdOrder.orderRef.startsWith('RSS-'), `Order ref has RSS prefix: ${createdOrder.orderRef}`);
assert(createdOrder.items.length === 2, 'Order items persisted correctly');
assert(createdOrder.totalAmount === 800, 'Total amount persisted correctly');

// TEST 6: Order Retrieval by OrderRef
const fetchedOrder = getOrderByRef(createdOrder.orderRef);
assert(fetchedOrder && fetchedOrder.id === createdOrder.id, 'Order successfully fetched by Order Reference');

// TEST 7: Admin Authentication & Security
const invalidLogin = verifyAdminCredentials('admin', 'wrong-pass');
assert(invalidLogin === false, 'Invalid admin password correctly rejected');

const validLogin = verifyAdminCredentials('admin', 'rajshree-admin-2026');
assert(validLogin === true, 'Default admin password successfully authenticated');

const sessionToken = signToken('admin');
const verifiedUser = verifyToken(sessionToken);
assert(verifiedUser === 'admin', 'Admin session token signed and verified with HMAC');

const tamperedToken = sessionToken.slice(0, -4) + 'abcd';
assert(verifyToken(tamperedToken) === null, 'Tampered session token safely rejected');

// TEST 8: Admin Payment Verification Workflow
const verifiedOrder = updateOrderStatus(
  createdOrder.id,
  'Confirmed',
  'VERIFIED',
  'HDFC-TERMINAL-REF-887766'
);
assert(verifiedOrder.status === 'Confirmed', 'Order status updated to Confirmed');
assert(verifiedOrder.paymentStatus === 'VERIFIED', 'Payment status updated to VERIFIED');
assert(verifiedOrder.paymentUtr === 'HDFC-TERMINAL-REF-887766', 'Payment verification reference recorded');
assert(verifiedOrder.paymentVerifiedAt !== null, 'Payment verification timestamp recorded');

// TEST 9: Store Settings Updates
const updatedSettings = updateSettings({ deliveryFee: 55 });
assert(updatedSettings.deliveryFee === 55, 'Admin can update delivery fee dynamically');
updateSettings({ deliveryFee: 50 }); // revert

// TEST 10: QR Code Asset Verification
const qrExists = fs.existsSync('/Users/niketkumar/.gemini/antigravity/scratch/rajshree-sweets/public/images/hdfc-upi-qr.jpg');
assert(qrExists, 'Authentic HDFC SmartHub Vyapar QR image present in public assets');

console.log('\n====================================================');
console.log(`🎉 TEST SUMMARY: ${passedTests}/${totalTests} TESTS PASSED`);
console.log('====================================================');
