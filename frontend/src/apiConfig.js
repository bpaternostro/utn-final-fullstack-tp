const ENV = process.env.NODE_ENV
const API_BASE_URL = ENV == "prod" ? 'https://bpaternostro.site/ecommerce/api' : "http://localhost:4010/ecommerce/api";

export const ROOT = "/ecommerce"
export const ADMIN_ROLE = "admin"
export const IMAGE_LOCATION = "img"
export const API_ENDPOINTS = {
  uploadImage: `${API_BASE_URL}/products/image-upload`,
  images:`${API_BASE_URL}`,
  products: `${API_BASE_URL}/products`,
  auth: `${API_BASE_URL}/auth`,
  login: `${API_BASE_URL}/auth/login`,
  logout: `${API_BASE_URL}/auth/logout`,
  register: `${API_BASE_URL}/auth/register`,
  verify: `${API_BASE_URL}/auth/verify`,
  // Add more endpoints as needed
};