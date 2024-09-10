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
  { id: 111, label: "I want to mock databases", isChecked: true },
  { id: 112, label: "I don’t want to mock database", isChecked: false }
]

export const dummyResponseData = [
  {
    function: "cart_router.py",
    params: [
      {
        identifier: "“DependentLibs”",
        type: "[“sqlalchemy”]",
      },
      {
        identifier: "“Params”",
        type: "[“user_id”, “item”, “db”]",
      },
      {
        identifier: "“ResponseObject”",
        type: "“JSONResponse”",
      },
    ],
    response_object: "add_item_to_cart",
    children: [
      {
        function: "cart_service.py",
        params: [
          {
            identifier: "“DependentLibs”",
            type: "[“sqlalchemy”]",
          },
          {
            identifier: "“Params”",
            type: "[“user_id”, “item”, “db”, “quantity”]",
          },
          {
            identifier: "“ResponseObject”",
            type: "“CartItem””",
          },
        ],
        response_object: "add_item_to_cart",
        children: [
          {
            function: "cart_crud.py",
            params: [
              {
                identifier: "“DependentLibs”",
                type: "[“sqlalchemy”]",
              },
              {
                identifier: "“Params”",
                type: "[“product_id”, “quantity”]",
              },
              {
                identifier: "“ResponseObject”",
                type: "None",
              },
            ],
            response_object: "update_inventory",
            children: [],
          },
          {
            function: "cart_crud.py",
            params: [
              {
                identifier: "“DependentLibs”",
                type: "[“sqlalchemy”]",
              },
              {
                identifier: "“Params”",
                type: "[“product_id”, “quantity”]",
              },
              {
                identifier: "“ResponseObject”",
                type: "bool",
              },
            ],
            response_object: "update_inventory",
            children: [],
          },
          {
            function: "product_client.py",
            params: [
              {
                identifier: "“DependentLibs”",
                type: "[“sqlalchemy”]",
              },
              {
                identifier: "“Params”",
                type: " [“cart_id”, “product_id”, “db”, “quantity”",
              },
              {
                identifier: "“ResponseObject”",
                type: "“CartItem”",
              },
            ],
            response_object: "add_freebie_if_applicable",
            children: [],
          },
        ],
      },
      {
        function: "cart_service.py",
        params: [
          {
            identifier: "“DependentLibs”",
            type: "[“sqlalchemy”]",
          },
          {
            identifier: "“Params”",
            type: "[“cart_id”, “product_id”, “db”]",
          },
          {
            identifier: "“ResponseObject”",
            type: "null",
          },
        ],
        response_object: "add_freebie_if_applicable",
        children: [
          {
            function: "cart_crud.py",
            params: [
              {
                identifier: "“DependentLibs”",
                type: "[“sqlalchemy”]",
              },
              {
                identifier: "“Params”",
                type: "[“product_id”, “db”]",
              },
              {
                identifier: "“ResponseObject”",
                type: "“FreebieMapping”",
              },
            ],
            response_object: "get_freebie_mapping",
            children: [],
          },
          {
            function: "product_client.py",
            params: [
              {
                identifier: "“DependentLibs”",
                type: "[“httpx”]",
              },
              {
                identifier: "“Params”",
                type: "[“product_id”, “quantity”]",
              },
              {
                identifier: "“ResponseObject”",
                type: "“null”",
              },
            ],
            response_object: "check_inventory",
            children: [],
          },
          {
            function: "product_client.py",
            params: [
              {
                identifier: "“DependentLibs”",
                type: "[“httpx”]",
              },
              {
                identifier: "“Params”",
                type: "[“product_id”, “quantity”]",
              },
              {
                identifier: "“ResponseObject”",
                type: "“null”",
              },
            ],
            response_object: "check_inventory",
            children: [],
          },
        ],
      },
    ],
  },
];

export const flows = [
  {id: 1, label: "POST /carts/{carts_id}", isEnabled: true},
  {id: 2, label: "POST /page/{page_id}", isEnabled: false},
  {id: 3, label: "POST /item/{item_id}", isEnabled: false},
]