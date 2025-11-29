export interface Product {
  id: string;
  name: string;
  description: string;
  fullDescription?: string;
  features?: string[];
  priceRetail: number;
  priceWholesale: number;
  images: string[];
  category?: string;
}

export interface Bundle {
  id: string;
  name: string;
  description: string;
  fullDescription?: string;
  items: string[];
  priceRetail: number;
  priceWholesale: number;
  images: string[];
}

export interface Partner {
  id: string;
  name: string;
  logo?: string;
  logoPlaceholder: string;
}

export interface Benefit {
  id: string;
  title: string;
  description: string;
  icon: string;
}

export interface ContactInfo {
  company: string;
  address: string;
  phones: string[];
  email: string;
  instagram: string;
  whatsapp: string;
}
