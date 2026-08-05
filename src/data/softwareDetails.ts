export interface SoftwareDetailSection {
  title: string;
  emoji: string;
  features: { name: string; description: string }[];
}

export interface SoftwareDetailData {
  id: string;
  name: string;
  tagline: string;
  description: string;
  gradient: string;
  sections: SoftwareDetailSection[];
  gallery: string[];
}

export const SOFTWARE_DETAILS: Record<string, SoftwareDetailData> = {
  'apexpure-pos': {
    id: 'apexpure-pos',
    name: 'ApexPure POS',
    tagline: 'Comprehensive Point of Sale & Inventory Management for Water Delivery.',
    description: 'Designed specifically for water delivery and retail businesses. ApexPure handles everything from walk-in sales to route deliveries, stock tracking, and customer credit—all with 100% offline capability.',
    gradient: 'from-blue-600 to-[#06b6d4]',
    gallery: [
      // Fallback/Placeholders until real ones are connected
      '/placeholder-pos-1.jpg',
      '/placeholder-pos-2.jpg',
      '/placeholder-pos-3.jpg',
    ],
    sections: [
      {
        title: 'Sales & Invoicing',
        emoji: '🛒',
        features: [
          { name: 'Counter Sales', description: 'Fast checkout for both walk-in customers and registered account customers.' },
          { name: 'Delivery Sales', description: 'Route-based delivery screen to bulk-process deliveries for all customers on that route at once (tracking empties returned, cash collected, and credit given).' },
          { name: 'Digital Receipts', description: 'Automatically generates itemized digital receipts showing subtotals, custom additional charges, and discounts. Share via WhatsApp or PDF.' }
        ]
      },
      {
        title: 'Customer & Accounts Management',
        emoji: '👥',
        features: [
          { name: 'Credit & Dues Tracking', description: 'Automatically tracks balances. If a customer pays less than the total, the remaining amount is added to their dues.' },
          { name: 'Bottle Tracking', description: 'Keeps an exact count of how many physical company bottles (empties) are currently being held by each customer.' },
          { name: 'Transaction History', description: 'Detailed ledger for every customer showing past sales and payments. Mistakes are easily corrected with an auto-adjusting Delete function.' }
        ]
      },
      {
        title: 'Inventory & Stock Control',
        emoji: '📦',
        features: [
          { name: 'Full & Empty Tracking', description: 'Distinctly tracks full bottles ready for sale and empty bottles returned from customers.' },
          { name: 'Low Stock Alerts', description: 'Set custom threshold warnings (e.g., alert when 19L bottles fall below 10 units).' },
          { name: 'Multi-Tier Pricing', description: 'Each item can have three different prices: Counter Price, Delivery Price, and Cost Price.' },
          { name: 'Stock Adjustments', description: 'Allows managers to manually add new stock or write off damaged bottles.' }
        ]
      },
      {
        title: 'Cash & Expense Management',
        emoji: '💵',
        features: [
          { name: 'Daily Closing', description: 'Tally up the physical cash drawer at the end of the day, compare it against system sales, subtract daily expenses, and close the shift.' },
          { name: 'Expense Tracking', description: 'Record daily business expenses (fuel, vehicle maintenance, meals) so they accurately reflect against your daily profit.' }
        ]
      },
      {
        title: 'Advanced Reporting (Owner Only)',
        emoji: '📊',
        features: [
          { name: 'Sales & Profit Reports', description: 'Visual charts and breakdowns of total revenue versus actual profit (calculated using the Cost Price).' },
          { name: 'Dues Report', description: 'A master list of all outstanding customer balances to help with debt collection.' },
          { name: 'Rider Performance', description: 'Tracks how many deliveries were completed by specific routes/staff to measure employee efficiency.' },
          { name: 'Inventory Value', description: 'Calculates the total monetary value of your current stock on hand.' }
        ]
      },
      {
        title: 'Administration & Offline Capabilities',
        emoji: '⚙️',
        features: [
          { name: 'PIN-Based Login', description: 'Fast, secure login using a 4-digit PIN for staff, with role-based access control (Owners can see reports, Cashiers cannot).' },
          { name: 'Route Management', description: 'Group customers into geographical routes to make delivery dispatches easier.' },
          { name: '100% Offline Capable', description: 'The entire database runs locally on the computer. It does not require an active internet connection to process sales, check inventory, or view reports.' }
        ]
      }
    ]
  },
  'veloce': {
    id: 'veloce',
    name: 'Veloce Car Rental',
    tagline: 'Comprehensive car rental management and booking system.',
    description: 'Veloce is a robust, 100% offline-capable software designed to streamline car rental businesses. From fleet tracking and customer profiles to automated invoicing and dynamic PDF generation, Veloce puts you in complete control.',
    gradient: 'from-orange-600 to-[#FF5722]',
    gallery: [
      '/placeholder-veloce-1.jpg',
      '/placeholder-veloce-2.jpg',
      '/placeholder-veloce-3.jpg',
    ],
    sections: [
      {
        title: 'Fleet Management',
        emoji: '🚗',
        features: [
          { name: 'Full CRUD', description: 'Add, Edit, Delete, and View vehicles with ease.' },
          { name: 'Customizable Details', description: 'Easily type or select the Category, Fuel Type, Transmission, Make, Model, Year, Seats, Daily Rate, and Mileage.' },
          { name: 'Live Status Tracking', description: 'Mark vehicles as Available, Rented, or Under Maintenance.' },
          { name: 'Search & Filtering', description: 'Instantly filter your fleet by name, make, or status.' }
        ]
      },
      {
        title: 'Customer Management',
        emoji: '👥',
        features: [
          { name: 'Customer Profiles', description: 'Add, Edit, and Delete clients. Store Name, Email, Phone Number, and Address.' },
          { name: 'Profile Photos', description: 'Upload profile photos (avatars) for your clients, or let the system generate colorful initials automatically.' },
          { name: 'History Tracking', description: 'View their total rentals and total money spent.' }
        ]
      },
      {
        title: 'Payments & Invoicing',
        emoji: '💳',
        features: [
          { name: 'Invoice Creation', description: 'Create, Edit, and Delete bills/invoices directly in the app.' },
          { name: 'Custom Statuses', description: 'Track whether an invoice is Paid, Pending, Refunded, or Overdue.' },
          { name: 'Dynamic PDF Generation', description: 'One-click export to a professional PDF invoice. The PDF automatically reads your company name, address, contact info, and custom logo from your settings!' }
        ]
      },
      {
        title: 'Admin Settings & Customization',
        emoji: '⚙️',
        features: [
          { name: 'Company Profile', description: 'Update your company name, email, phone number, operating hours, and address.' },
          { name: 'Logo Uploader', description: 'Upload your own company logo which will automatically stamp onto your generated PDFs.' },
          { name: 'Dynamic Color Themes', description: 'Change the look and feel of the entire software on the fly! Choose from Veloce Orange, Ocean Blue, Emerald Green, Royal Purple, or Crimson Red.' },
          { name: 'Data Backups', description: 'Toggle automated local database backups to prevent data loss.' }
        ]
      },
      {
        title: 'Architecture & Security',
        emoji: '🏗️',
        features: [
          { name: 'Fully Offline Capable', description: 'The software runs 100% locally on your Windows machine without needing an internet connection.' },
          { name: 'Robust Local Database', description: 'Powered by a local SQLite engine that saves directly to your user folder, ensuring lightning-fast load times and extreme privacy.' },
          { name: 'Standalone Installer', description: 'Delivered as a standard .exe file that can be easily installed on any modern Windows PC.' }
        ]
      }
    ]
  }
};
