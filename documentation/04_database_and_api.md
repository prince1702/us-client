# Database Design & API Documentation

This document contains the physical database schema (SQL DDL) and the REST API endpoints required for the Diamond & Jewelry platform.

---

## 1. Relational Database Schema (PostgreSQL DDL)

Below is the database schema showing tables, data types, constraints, and index optimizations.

```sql
-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. Diamond Type Table
CREATE TABLE diamond_types (
    id SERIAL PRIMARY KEY,
    name VARCHAR(20) UNIQUE NOT NULL -- 'Natural' or 'Lab-Grown'
);

INSERT INTO diamond_types (name) VALUES ('Natural'), ('Lab-Grown');

-- 2. Categories Table
CREATE TABLE categories (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    slug VARCHAR(100) UNIQUE NOT NULL,
    parent_id INTEGER REFERENCES categories(id) ON DELETE SET NULL,
    image_url VARCHAR(255),
    meta_title VARCHAR(150),
    meta_description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 3. Products Master Table
CREATE TABLE products (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    sku VARCHAR(50) UNIQUE NOT NULL,
    name VARCHAR(255) NOT NULL,
    slug VARCHAR(255) UNIQUE NOT NULL,
    diamond_type_id INTEGER REFERENCES diamond_types(id) NOT NULL,
    category_id INTEGER REFERENCES categories(id) ON DELETE RESTRICT,
    price DECIMAL(12, 2) NOT NULL,
    cost_price DECIMAL(12, 2),
    stock_qty INTEGER NOT NULL DEFAULT 0,
    is_active BOOLEAN DEFAULT TRUE,
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 4. Certified Diamonds Details
CREATE TABLE certified_diamonds (
    product_id UUID PRIMARY KEY REFERENCES products(id) ON DELETE CASCADE,
    shape VARCHAR(50) NOT NULL,
    carat DECIMAL(5, 2) NOT NULL,
    color VARCHAR(10) NOT NULL,
    clarity VARCHAR(10) NOT NULL,
    cut VARCHAR(20) NOT NULL,
    polish VARCHAR(20) NOT NULL,
    symmetry VARCHAR(20) NOT NULL,
    fluorescence VARCHAR(20) NOT NULL,
    lab VARCHAR(20) NOT NULL, -- GIA, IGI
    certificate_number VARCHAR(50) UNIQUE NOT NULL,
    depth_percent DECIMAL(5, 2) NOT NULL,
    table_percent DECIMAL(5, 2) NOT NULL,
    ratio DECIMAL(4, 2),
    length DECIMAL(5, 2),
    width DECIMAL(5, 2),
    certificate_pdf_url VARCHAR(255)
);

-- 5. Melee Diamonds Detail (Loose Packages)
CREATE TABLE melee_diamonds (
    product_id UUID PRIMARY KEY REFERENCES products(id) ON DELETE CASCADE,
    shape VARCHAR(50) NOT NULL,
    pointer_size VARCHAR(50) NOT NULL,
    mm_size VARCHAR(50) NOT NULL,
    color VARCHAR(20) NOT NULL,
    clarity VARCHAR(20) NOT NULL,
    cut VARCHAR(20) NOT NULL,
    polish VARCHAR(20) NOT NULL,
    symmetry VARCHAR(20) NOT NULL,
    fluorescence VARCHAR(20) NOT NULL
);

-- 6. Layouts Detail (Matched Parcels)
CREATE TABLE layouts (
    product_id UUID PRIMARY KEY REFERENCES products(id) ON DELETE CASCADE,
    shape VARCHAR(50) NOT NULL,
    layout_type VARCHAR(50) NOT NULL, -- Matching pair, eternity line
    stone_count INTEGER NOT NULL,
    mm_size VARCHAR(50) NOT NULL,
    carat_weight DECIMAL(5, 2) NOT NULL
);

-- 7. Custom Inquiries Table
CREATE TABLE custom_inquiries (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    inquiry_number VARCHAR(30) UNIQUE NOT NULL, -- INQ-YYYY-XXXXXX
    customer_name VARCHAR(150) NOT NULL,
    customer_email VARCHAR(150) NOT NULL,
    customer_phone VARCHAR(50),
    company_name VARCHAR(150),
    country VARCHAR(100),
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    jewelry_category VARCHAR(50),
    diamond_type_id INTEGER REFERENCES diamond_types(id),
    metal_preference VARCHAR(50),
    quantity INTEGER NOT NULL DEFAULT 1,
    budget_range VARCHAR(50),
    delivery_date DATE,
    status VARCHAR(50) DEFAULT 'Pending Review', -- Pending, Quotation Sent, Approved
    assigned_staff_id INTEGER,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 8. Custom Inquiry Images
CREATE TABLE custom_inquiry_images (
    id SERIAL PRIMARY KEY,
    inquiry_id UUID REFERENCES custom_inquiries(id) ON DELETE CASCADE,
    image_url VARCHAR(255) NOT NULL,
    uploaded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Indexing for high-performance searches
CREATE INDEX idx_products_diamond_type ON products(diamond_type_id);
CREATE INDEX idx_products_category ON products(category_id);
CREATE INDEX idx_certified_carat ON certified_diamonds(carat);
CREATE INDEX idx_certified_certificate ON certified_diamonds(certificate_number);
CREATE INDEX idx_inquiry_number ON custom_inquiries(inquiry_number);
```

---

## 2. API Documentation

### Base URL: `https://api.luxurydiamonds.com/v1`
Authentication is handled via Bearer JWT in the `Authorization` header: `Authorization: Bearer <JWT_TOKEN>`

### Endpoint 1: Authenticate Client / User
`POST /auth/login`

*   **Request Body**:
    ```json
    {
      "email": "customer@premium.com",
      "password": "SecurePassword123"
    }
    ```
*   **Response Payload (200 OK)**:
    ```json
    {
      "status": "success",
      "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
      "user": {
        "id": "8f3b6c20-a61f-4b05-9b21-4f16a04e578c",
        "name": "Jane Doe",
        "role": "Customer"
      }
    }
    ```

### Endpoint 2: Get Catalog Products (Supports Global Toggle)
`GET /products?diamond_type=Natural&category=Rings&limit=12&page=1`

*   **Response Payload (200 OK)**:
    ```json
    {
      "status": "success",
      "pagination": {
        "total": 420,
        "page": 1,
        "pages": 35
      },
      "data": [
        {
          "id": "3f4c6b8d-294b-449e-b9ef-d603a9ad3a77",
          "sku": "RING-NAT-003",
          "name": "The Royal Platinum Halo Ring",
          "slug": "royal-platinum-halo-ring",
          "diamond_type": "Natural",
          "price": 14200.00,
          "stock_qty": 3,
          "image_url": "/images/royal_platinum_halo.jpg"
        }
      ]
    }
    ```

### Endpoint 3: Create Custom Inquiry
`POST /inquiries`

*   **Request Body (Multipart Form Data)**:
    *   `title`: "Oval Engagement Ring Customization"
    *   `description`: "I would like a custom split shank platinum oval engagement ring with melee stones on the band."
    *   `jewelry_category`: "Rings"
    *   `diamond_type_id`: 2  (Lab-Grown)
    *   `metal_preference`: "Platinum"
    *   `quantity`: 1
    *   `budget_range`: "$8,000 - $10,000"
    *   `customer_name`: "Sophia Smith"
    *   `customer_email`: "sophia.smith@example.com"
    *   `customer_phone`: "+1 555-829-3012"
    *   `images`: (Binary file attachment)
*   **Response Payload (201 Created)**:
    ```json
    {
      "status": "success",
      "message": "Custom jewelry inquiry submitted successfully.",
      "data": {
        "inquiry_id": "c1f7a01d-5b32-4217-bc22-a9b814a7e930",
        "inquiry_number": "INQ-2026-000034",
        "status": "Pending Review",
        "created_at": "2026-07-10T14:40:00Z"
      }
    }
    ```

---

## 3. Excel Sheet Synchronizer System Specifications

To allow automatic logging of inquiries directly to local or cloud-based Excel sheets, the backend implements automated sync routines.

### A. Local Excel File Append Flow (Node.js using `exceljs`)

When the endpoint `POST /inquiries` is executed, the server appends a row to the master spreadsheets:

```javascript
const ExcelJS = require('exceljs');
const path = require('path');

async function appendInquiryToExcel(inquiryData) {
  const filePath = path.join(__dirname, '../data/customer_inquiries_ledger.xlsx');
  const workbook = new ExcelJS.Workbook();
  
  // Read existing file or construct headers if missing
  try {
    await workbook.xlsx.readFile(filePath);
  } catch (err) {
    const sheet = workbook.addWorksheet('Inquiries Ledger');
    sheet.columns = [
      { header: 'Inquiry Number', key: 'inquiryNumber', width: 20 },
      { header: 'Customer Name', key: 'customerName', width: 25 },
      { header: 'Email', key: 'customerEmail', width: 30 },
      { header: 'Phone', key: 'customerPhone', width: 20 },
      { header: 'Company Name', key: 'companyName', width: 25 },
      { header: 'Country', key: 'country', width: 15 },
      { header: 'Inquiry Title', key: 'title', width: 30 },
      { header: 'Category', key: 'jewelryCategory', width: 15 },
      { header: 'Diamond Type', key: 'diamondType', width: 15 },
      { header: 'Metal Preference', key: 'metalPreference', width: 20 },
      { header: 'Quantity', key: 'quantity', width: 10 },
      { header: 'Budget Range', key: 'budgetRange', width: 15 },
      { header: 'Target Delivery', key: 'deliveryDate', width: 15 },
      { header: 'Status', key: 'status', width: 15 },
      { header: 'Submitted At', key: 'createdAt', width: 25 }
    ];
  }

  const sheet = workbook.getWorksheet('Inquiries Ledger');
  
  // Append new row mapping
  sheet.addRow({
    inquiryNumber: inquiryData.inquiryNumber,
    customerName: inquiryData.customerName,
    customerEmail: inquiryData.customerEmail,
    customerPhone: inquiryData.customerPhone || '',
    companyName: inquiryData.companyName || '',
    country: inquiryData.country || '',
    title: inquiryData.title,
    jewelryCategory: inquiryData.jewelryCategory,
    diamondType: inquiryData.diamondType,
    metalPreference: inquiryData.metalPreference,
    quantity: inquiryData.quantity,
    budgetRange: inquiryData.budgetRange || '',
    deliveryDate: inquiryData.deliveryDate || '',
    status: inquiryData.status,
    createdAt: new Date().toISOString()
  });

  // Write file back to disk
  await workbook.xlsx.writeFile(filePath);
}
```

### B. Google Sheets API Integration (Cloud Syncing)

For B2B teams utilizing cloud spreadsheet environments, the backend dispatches updates directly to Google Sheets using service account keys:

```javascript
const { google } = require('googleapis');

async function appendToGoogleSheets(inquiryData) {
  const auth = new google.auth.GoogleAuth({
    scopes: ['https://www.googleapis.com/auth/spreadsheets'],
  });
  
  const sheets = google.sheets({ version: 'v4', auth });
  const spreadsheetId = process.env.GOOGLE_SPREADSHEET_ID;
  
  const values = [[
    inquiryData.inquiryNumber,
    inquiryData.customerName,
    inquiryData.customerEmail,
    inquiryData.customerPhone || '',
    inquiryData.companyName || '',
    inquiryData.country || '',
    inquiryData.title,
    inquiryData.jewelryCategory,
    inquiryData.diamondType,
    inquiryData.metalPreference,
    inquiryData.quantity,
    inquiryData.budgetRange || '',
    inquiryData.deliveryDate || '',
    inquiryData.status,
    new Date().toISOString()
  ]];
  
  await sheets.spreadsheets.values.append({
    spreadsheetId,
    range: 'Inquiries!A:O',
    valueInputOption: 'RAW',
    resource: { values },
  });
}
```
