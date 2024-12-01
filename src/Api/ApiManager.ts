import { Product } from "../ApiData";
import { Endpoints } from "./Endpoints";

const baseUrl = "https://fakestoreapi.com/";

export class ApiManager {
  static getProducts(selectedCategories: []): Promise<Product[]> {
    let url = Endpoints.PRODUCTS;
    if (selectedCategories.length > 0) {
      const items = selectedCategories.join("/");
      url = url + `/category/${items}`;
    }
    return GET(url);
  }

  static getProduct(id: number | string): Promise<Product> {
    const url = Endpoints.PRODUCT(id);
    return GET(url);
  }

  static getCategories(): Promise<[]> {
    const url = Endpoints.CATEGORIES;
    return GET(url);
  }
}

class Api {
  static apiHandler<T>(
    url: string,
    method: string,
    body?: FormData | Record<string, unknown>
  ): Promise<T> {
    const URL = baseUrl + url;
    return new Promise((resolve, reject) => {
      fetch(URL, {
        method,
        body: body instanceof FormData ? body : JSON.stringify(body),
        headers:
          body instanceof FormData
            ? {}
            : { "Content-Type": "application/json" },
      })
        .then((res) => {
          if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
          return res.json();
        })
        .then((res) => resolve(res as T))
        .catch((err) => reject(err));
    });
  }
}

function GET<T>(url: string): Promise<T> {
  return Api.apiHandler<T>(url, "GET");
}

function POST<T>(
  url: string,
  data: FormData | Record<string, unknown>
): Promise<T> {
  return Api.apiHandler<T>(url, "POST", data);
}

function PUT<T>(
  url: string,
  data: FormData | Record<string, unknown>
): Promise<T> {
  return Api.apiHandler<T>(url, "PUT", data);
}

function DELETE<T>(url: string): Promise<T> {
  return Api.apiHandler<T>(url, "DELETE");
}
