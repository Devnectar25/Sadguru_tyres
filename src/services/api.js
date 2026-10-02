// API Service Client for Sadguru Tyres Backend API

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api";

export const apiService = {
  // Check backend server availability
  async checkHealth() {
    try {
      const res = await fetch(`${API_BASE_URL}/health`);
      return res.ok;
    } catch (err) {
      return false;
    }
  },

  // Admin Authentication
  async loginAdmin(email, password) {
    try {
      const res = await fetch(`${API_BASE_URL}/admin/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      return await res.json();
    } catch (err) {
      return { success: false, message: "Could not connect to API server." };
    }
  },

  // Tyres API
  async getTyres() {
    try {
      const res = await fetch(`${API_BASE_URL}/tyres`);
      const json = await res.json();
      return json.data || [];
    } catch (err) {
      return null;
    }
  },

  async addTyre(tyreData) {
    try {
      const res = await fetch(`${API_BASE_URL}/tyres`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(tyreData),
      });
      return await res.json();
    } catch (err) {
      return null;
    }
  },

  async updateTyre(id, tyreData) {
    try {
      const res = await fetch(`${API_BASE_URL}/tyres/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(tyreData),
      });
      return await res.json();
    } catch (err) {
      return null;
    }
  },

  async deleteTyre(id) {
    try {
      const res = await fetch(`${API_BASE_URL}/tyres/${id}`, { method: "DELETE" });
      return await res.json();
    } catch (err) {
      return null;
    }
  },

  // Brands API
  async getBrands() {
    try {
      const res = await fetch(`${API_BASE_URL}/brands`);
      const json = await res.json();
      return json.data || [];
    } catch (err) {
      return null;
    }
  },

  async addBrand(brandData) {
    try {
      const res = await fetch(`${API_BASE_URL}/brands`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(brandData),
      });
      return await res.json();
    } catch (err) {
      return null;
    }
  },

  async updateBrand(id, brandData) {
    try {
      const res = await fetch(`${API_BASE_URL}/brands/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(brandData),
      });
      return await res.json();
    } catch (err) {
      return null;
    }
  },

  async deleteBrand(id) {
    try {
      const res = await fetch(`${API_BASE_URL}/brands/${id}`, { method: "DELETE" });
      return await res.json();
    } catch (err) {
      return null;
    }
  },

  // Bookings API
  async getBookings() {
    try {
      const res = await fetch(`${API_BASE_URL}/bookings`);
      const json = await res.json();
      return json.data || [];
    } catch (err) {
      return null;
    }
  },

  async createBooking(bookingData) {
    try {
      const res = await fetch(`${API_BASE_URL}/bookings`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(bookingData),
      });
      return await res.json();
    } catch (err) {
      return null;
    }
  },

  async updateBookingStatus(id, status) {
    try {
      const res = await fetch(`${API_BASE_URL}/bookings/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });
      return await res.json();
    } catch (err) {
      return null;
    }
  },

  // Quotes API
  async getQuotes() {
    try {
      const res = await fetch(`${API_BASE_URL}/quotes`);
      const json = await res.json();
      return json.data || [];
    } catch (err) {
      return null;
    }
  },

  async createQuote(quoteData) {
    try {
      const res = await fetch(`${API_BASE_URL}/quotes`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(quoteData),
      });
      return await res.json();
    } catch (err) {
      return null;
    }
  },
};
