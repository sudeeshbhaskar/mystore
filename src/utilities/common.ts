import allProducts from "../data/items.json";
import country from "../data/country.json";
import axios from "axios";

const {
  REACT_APP_SECRET_MYR,
  REACT_APP_SECRET_SGD,
  REACT_APP_CHECKOUT_BASE_URL,
  REACT_APP_CHECKOUT_REDIRECTION,
} = process.env;

const instance = axios.create({
  baseURL: REACT_APP_CHECKOUT_BASE_URL,
  headers: {
    accept: "application/json",
    "content-type": "application/json",
  },
});

export function getPrice(price: number, countryCode: string) {
  const selectedCountry = country.find((item) => item.code === countryCode);
  const currencyValue = selectedCountry ? selectedCountry.value : 1;
  return parseFloat((price * currencyValue).toFixed(2));
}

export function formatCurrency(price: number, countryCode: string) {
  return new Intl.NumberFormat(undefined, {
    style: "currency",
    currency: countryCode,
  }).format(getPrice(price, countryCode));
}

export function findProductById(productId: any) {
  return allProducts.find((item) => item.id.toString() === productId) || null;
}

export function getStoreIdAndSecretKey(countryCode: string) {
  const selectedCountry = country.find((item) => item.code === countryCode);

  if (selectedCountry) {
    return {
      storeId: selectedCountry.storeId,
      secret_api_key:
        countryCode === "MYR" ? REACT_APP_SECRET_MYR : REACT_APP_SECRET_SGD,
    };
  }

  return null;
}

export function checkout(amount: number, countryCode: string) {
  const selectedCountry = country.find((item) => item.code === countryCode);
  return instance.post(
    "checkout/",
    {
      store_id: selectedCountry?.storeId,
      amount: getPrice(amount, countryCode),
      redirect_url: REACT_APP_CHECKOUT_REDIRECTION,
    },
    {
      headers: {
        Authorization: `Bearer ${
          countryCode === "MYR" ? REACT_APP_SECRET_MYR : REACT_APP_SECRET_SGD
        }`,
      },
    }
  );
}

export function closeLoader() {
  const el = document.getElementById("loader") as HTMLElement;
  el.style.display = "none";
}

export function openLoader() {
  const el = document.getElementById("loader") as HTMLElement;
  el.style.display = "block";
}
