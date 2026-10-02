/**
 * Centralized Application Constants & Configuration
 * Sadguru Tyres & Mobility Solutions
 */

export const APP_INFO = {
  name: "Sadguru Tyres & Mobility Solutions",
  shortName: "Sadguru Tyres",
  tagline: "India's Premier Multi-Brand Tyre Specialist",
  phone: "+91 98220 44556",
  email: "contact@sadgurutyres.com",
  location: "Sadguru Tyres Hub, Main Ring Road, Pune, Maharashtra 411001",
  workingHours: "Mon - Sat: 9:00 AM - 9:00 PM | Sun: 10:00 AM - 6:00 PM",
};

export const API_ENDPOINTS = {
  TYRES: "/tyres",
  BOOKINGS: "/bookings",
  QUOTES: "/quotes",
  BRANDS: "/brands",
  AUTH_LOGIN: "/auth/login",
};

export const BOOKING_STATUS = {
  PENDING: "Pending",
  CONFIRMED: "Confirmed",
  IN_PROGRESS: "In Progress",
  COMPLETED: "Completed",
  CANCELLED: "Cancelled",
};

export const CURRENCIES = {
  INR: { symbol: "₹", code: "INR", rateVsUSD: 84.0 },
  USD: { symbol: "$", code: "USD", rateVsUSD: 1.0 },
};

export const NAV_ITEMS = [
  { id: "home", label: "Home" },
  { id: "catalog", label: "Tyre Catalog" },
  { id: "services", label: "Services" },
  { id: "why-us", label: "Why Choose Us" },
  { id: "about", label: "Brand Heritage" },
  { id: "testimonials", label: "Reviews" },
];
