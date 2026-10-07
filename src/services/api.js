// API Service Client for Sadguru Tyres Backend API with Request Deduplication

const normalizeApiUrl = (url) => {
  if (!url) return "http://localhost:5000/api";
  let cleaned = url.trim().replace(/\/+$/, "");
  if (!cleaned.endsWith("/api")) {
    cleaned += "/api";
  }
  return cleaned;
};

const API_BASE_URL = normalizeApiUrl(import.meta.env.VITE_API_BASE_URL);

if (typeof window !== "undefined") {
  console.log(`[API Service] Configured Base URL: ${API_BASE_URL}`);
}

// In-flight request deduplication map to prevent redundant concurrent network calls
const inflightGetRequests = new Map();

async function deduplicatedGet(url) {
  if (inflightGetRequests.has(url)) {
    return inflightGetRequests.get(url);
  }

  const promise = fetch(url)
    .then(async (res) => {
      if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
      return await res.json();
    })
    .catch((err) => {
      console.warn(`[API GET Warning] Failed fetching ${url}:`, err.message);
      throw err;
    })
    .finally(() => {
      // Clear after the current microtask to allow future refresh fetches when needed
      setTimeout(() => inflightGetRequests.delete(url), 300);
    });

  inflightGetRequests.set(url, promise);
  return promise;
}

export const apiService = {
  // Check backend server availability
  async checkHealth() {
    try {
      const res = await fetch(`${API_BASE_URL}/health`);
      return res.ok;
    } catch (err) {
      console.warn("[API Health Check] Backend server unreachable:", err.message);
      return false;
    }
  },

  // Admin Authentication
  async loginAdmin(credentials) {
    try {
      const res = await fetch(`${API_BASE_URL}/admin/subadmins/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(credentials),
      });
      return await res.json();
    } catch (err) {
      return null;
    }
  },

  // Tyres API
  async getTyres() {
    try {
      const json = await deduplicatedGet(`${API_BASE_URL}/tyres`);
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
      const json = await deduplicatedGet(`${API_BASE_URL}/brands`);
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
      const json = await deduplicatedGet(`${API_BASE_URL}/bookings`);
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
      const json = await deduplicatedGet(`${API_BASE_URL}/quotes`);
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

  // Sub-Admins API
  async getSubadmins() {
    try {
      const json = await deduplicatedGet(`${API_BASE_URL}/admin/subadmins`);
      return json;
    } catch (err) {
      return null;
    }
  },

  async createSubadmin(subadminData) {
    try {
      const res = await fetch(`${API_BASE_URL}/admin/subadmins`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(subadminData),
      });
      return await res.json();
    } catch (err) {
      return null;
    }
  },

  async updateSubadmin(id, subadminData) {
    try {
      const res = await fetch(`${API_BASE_URL}/admin/subadmins/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(subadminData),
      });
      return await res.json();
    } catch (err) {
      return null;
    }
  },

  async deleteSubadmin(id) {
    try {
      const res = await fetch(`${API_BASE_URL}/admin/subadmins/${id}`, { method: "DELETE" });
      return await res.json();
    } catch (err) {
      return null;
    }
  },

  // Error Monitoring API
  async getErrors() {
    try {
      const json = await deduplicatedGet(`${API_BASE_URL}/admin/errors`);
      return json;
    } catch (err) {
      return null;
    }
  },

  async createErrorLog(errorData) {
    try {
      const res = await fetch(`${API_BASE_URL}/admin/errors`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(errorData),
      });
      return await res.json();
    } catch (err) {
      return null;
    }
  },

  async updateErrorStatus(id, status) {
    try {
      const res = await fetch(`${API_BASE_URL}/admin/errors/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });
      return await res.json();
    } catch (err) {
      return null;
    }
  },

  async clearResolvedErrors() {
    try {
      const res = await fetch(`${API_BASE_URL}/admin/errors/resolved`, { method: "DELETE" });
      return await res.json();
    } catch (err) {
      return null;
    }
  },

  async deleteErrorLog(id) {
    try {
      const res = await fetch(`${API_BASE_URL}/admin/errors/${id}`, { method: "DELETE" });
      return await res.json();
    } catch (err) {
      return null;
    }
  },

  // Analytics API
  async getAnalytics(period = "30d") {
    try {
      const json = await deduplicatedGet(`${API_BASE_URL}/admin/analytics?period=${period}`);
      return json.data || null;
    } catch (err) {
      return null;
    }
  },

  // FAQs API
  async getFaqs() {
    try {
      const json = await deduplicatedGet(`${API_BASE_URL}/faqs`);
      return json.data || [];
    } catch (err) {
      return null;
    }
  },

  async createFaq(faqData) {
    try {
      const res = await fetch(`${API_BASE_URL}/faqs`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(faqData),
      });
      return await res.json();
    } catch (err) {
      return null;
    }
  },

  async updateFaq(id, faqData) {
    try {
      const res = await fetch(`${API_BASE_URL}/faqs/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(faqData),
      });
      return await res.json();
    } catch (err) {
      return null;
    }
  },

  async deleteFaq(id) {
    try {
      const res = await fetch(`${API_BASE_URL}/faqs/${id}`, { method: "DELETE" });
      return await res.json();
    } catch (err) {
      return null;
    }
  },

  // Services API
  async getServices() {
    try {
      const json = await deduplicatedGet(`${API_BASE_URL}/services`);
      return json.data || [];
    } catch (err) {
      return null;
    }
  },

  async addService(serviceData) {
    try {
      const res = await fetch(`${API_BASE_URL}/services`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(serviceData),
      });
      return await res.json();
    } catch (err) {
      return null;
    }
  },

  async updateService(id, serviceData) {
    try {
      const res = await fetch(`${API_BASE_URL}/services/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(serviceData),
      });
      return await res.json();
    } catch (err) {
      return null;
    }
  },

  async deleteService(id) {
    try {
      const res = await fetch(`${API_BASE_URL}/services/${id}`, { method: "DELETE" });
      return await res.json();
    } catch (err) {
      return null;
    }
  },

  // Leads API
  async getLeads() {
    try {
      const json = await deduplicatedGet(`${API_BASE_URL}/leads`);
      return json.data || [];
    } catch (err) {
      return null;
    }
  },

  async createLead(leadData) {
    try {
      const res = await fetch(`${API_BASE_URL}/leads`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(leadData),
      });
      return await res.json();
    } catch (err) {
      return null;
    }
  },

  async updateLeadStatus(id, status) {
    try {
      const res = await fetch(`${API_BASE_URL}/leads/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });
      return await res.json();
    } catch (err) {
      return null;
    }
  },

  async deleteLead(id) {
    try {
      const res = await fetch(`${API_BASE_URL}/leads/${id}`, { method: "DELETE" });
      return await res.json();
    } catch (err) {
      return null;
    }
  },

  // Payments API (Razorpay Verification)
  async verifyPayment(paymentData) {
    try {
      const res = await fetch(`${API_BASE_URL}/admin/payments/verify`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(paymentData),
      });
      return await res.json();
    } catch (err) {
      return { success: false, message: "Could not connect to payment verification server." };
    }
  },

  async getPaymentHistory() {
    try {
      const json = await deduplicatedGet(`${API_BASE_URL}/admin/payments/history`);
      return json || { success: false, data: [] };
    } catch (err) {
      return { success: false, data: [] };
    }
  },

  // Shop Settings API
  async getSettings() {
    try {
      const json = await deduplicatedGet(`${API_BASE_URL}/settings`);
      return json.data || null;
    } catch (err) {
      return null;
    }
  },

  async updateSettings(settingsData) {
    try {
      const res = await fetch(`${API_BASE_URL}/settings`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(settingsData),
      });
      return await res.json();
    } catch (err) {
      return null;
    }
  },

  async resetSettings() {
    try {
      const res = await fetch(`${API_BASE_URL}/settings/reset`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      });
      return await res.json();
    } catch (err) {
      return null;
    }
  },
};
