import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const dependencies = [
  { id: 1, label: "httpx", isChecked: false },
  { id: 2, label: "product_client", isChecked: false },
  { id: 3, label: "sqlalchemy.orm", isChecked: false },
  { id: 4, label: "cart_crud", isChecked: false },
  { id: 5, label: "cartModel", isChecked: false }
]

export const databases = [
  { id: 1, label: "I want to mock databases", isChecked: false },
  { id: 2, label: "I don’t want to mock database", isChecked: false }
]
