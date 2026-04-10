const BASE_URL = "http://localhost:5000/api";

// 🔐 Helper: Get headers with token
const getAuthHeaders = () => {
  const token = localStorage.getItem("token");

  return {
    Authorization: token ? `Bearer ${token}` : "",
  };
};

// ================= LOGIN =================
export const loginUser = async (data) => {
  try {
    const res = await fetch(`${BASE_URL}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const result = await res.json();

    if (!res.ok) throw result;

    return result;
  } catch (error) {
    throw error;
  }
};

// ================= REGISTER =================
export const registerUser = async (data) => {
  try {
    const res = await fetch(`${BASE_URL}/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const result = await res.json();

    if (!res.ok) throw result;

    return result;
  } catch (error) {
    throw error;
  }
};

// ================= VERIFY OTP =================
export const verifyOtp = async (data) => {
  try {
    const res = await fetch(`${BASE_URL}/verify-otp`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const result = await res.json();

    if (!res.ok) throw result;

    return result;
  } catch (error) {
    throw error;
  }
};

// ================= RESEND OTP =================
export const resendOtp = async (data) => {
  try {
    const res = await fetch(`${BASE_URL}/resend-otp`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const result = await res.json();

    if (!res.ok) throw result;

    return result;
  } catch (error) {
    throw error;
  }
};

// ================= MATCH RESUME =================
export const matchResume = async (formData) => {
  try {
    const res = await fetch(`${BASE_URL}/match`, {
      method: "POST",
      headers: {
        ...getAuthHeaders(),
      },
      body: formData,
    });

    const result = await res.json();

    if (!res.ok) throw result;

    return result;
  } catch (error) {
    throw error;
  }
};

// ================= PROFILE =================
export const getProfile = async () => {
  try {
    const res = await fetch(`${BASE_URL}/profile`, {
      headers: {
        ...getAuthHeaders(),
      },
    });

    const result = await res.json();

    if (!res.ok) throw result;

    return result;
  } catch (error) {
    throw error;
  }
};