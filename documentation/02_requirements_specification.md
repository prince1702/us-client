# Business & Functional Requirements Specification (BRD/FRD/SRS)

This document contains detailed functional, user interface, and system requirements for the Diamond & Jewelry Platform.

---

## 1. User Roles & Access
*   **B2C Guests**: Browse website, view basic retail pricing, submit custom inquiries, add items to cart, and checkout as guest.
*   **B2B / Registered B2C Customers**: Access saved wishlists, view order histories, track inquiries, and save shipping/billing profiles. B2B accounts may see specialized trade pricing (if enabled by admin).
*   **Store Administrators**: Manage products, adjust inventory, view analytics, reply to custom inquiries, update order tracking, and assign staff permissions.

---

## 2. Navigation & User Interface Requirements

### Global Header Selector
*   **Requirement**: A persistent, elegant switch must be visible in the header on all pages (Desktop and Mobile) toggling between `Lab-Grown` and `Natural` modes.
*   **Behavior**: When selected, the global UI state shifts. All API calls for products, filters, and searches must append the active filter parameter. Transitioning between modes should feel instantaneous (leveraging client-side state caching).

### Main Navigation Menu
*   **Home**: Luxurious landing page highlighting premium collections, custom jewelry path, and live feeds.
*   **Jewelry**: Dropdown containing Rings, Earrings, Bracelets, Necklaces, Pendants.
*   **Melee Diamonds**: Access to the pointers filter.
*   **Layouts**: Matching stone pairs and custom layouts filter.
*   **Certified Diamonds**: GIA/IGI certified loose diamonds search engine.
*   **Custom Inquiry**: Direct access to the multi-step custom jewelry form.
*   **About Us & Contact Us**: Storytelling, showroom locations, contact form.

---

## 3. Module Specifications

### A. Jewelry Module
*   **Filters**: Metal Type (18K White Gold, 18K Yellow Gold, 14K Gold, Platinum), Price Range, Category, Style.
*   **Sorting**: Price Low-to-High, Price High-to-Low, Newest, Best Selling.
*   **Visuals**: High-resolution image hovering (displays alternate view/on-model shot), Grid/List toggle, and Quick View modal showing basic details without reloading the page.

### B. Melee Diamonds Module
*   **Pointers Filter**: Melee diamonds represent small, loose diamonds sold in packages. Users filter by:
    *   *Shape*: Round, Princess, Pear, Marquise, etc.
    *   *Pointer Size*: 0.01ct to 0.20ct pointers.
    *   *Sieve/MM Size*: Precise sieve sizes (e.g. 1.0mm - 2.5mm).
    *   *Color*: D-F, G-H, I-J.
    *   *Clarity*: VVS1-VVS2, VS1-VS2, SI1-SI2.
    *   *Cut/Polish/Symmetry*: Excellent, Very Good, Good.
    *   *Price*: Per carat pricing.
*   **UX**: Standard tabular grid view where wholesalers can buy in parcel weight.

### C. Layouts Module
*   **Layouts Filter**: Layouts are groups of matched stones used for eternity bands, bracelets, or multi-stone rings.
    *   *Shape*: Round, Baguette, Emerald, Pear, etc.
    *   *Layout Type*: Side stones, matching pairs, eternity chains.
    *   *Stone Count*: 3-stone, 5-stone, 7-stone, Full Eternity.
    *   *Price & Availability*: Live status check.

### D. Certified Diamonds (Advanced Search Engine)
*   **Slider & Facet Filters**:
    *   *Carat*: Multi-slider (e.g., 0.30ct to 10.00ct).
    *   *Color / Clarity / Cut / Polish / Symmetry / Fluorescence*: Clickable buttons for each grade.
    *   *Lab*: GIA, IGI, HRD.
    *   *Proportions*: Table % (50%-70%), Depth % (50%-75%), Ratio (Length/Width).
    *   *Pricing*: Real-time price slider.
*   **Compare Tool**: Allow users to select up to 4 diamonds and view their specifications side-by-side.

### E. Custom Inquiry Module
*   **Wizard Steps**:
    1.  *Inquiry Details*: Title, category selection (Ring, Bracelet, etc.), diamond type preference, metal.
    2.  *Description & Reference Uploads*: Rich description box and multi-file drag-and-drop uploader for reference photos/render drawings.
    3.  *Inquiry Parameters*: Quantity, budget range, target delivery date.
    4.  *Customer Details*: Name, email, phone number, company (for B2B), country.
*   **Automation on Submission**:
    *   Generates Unique Key: `INQ-[YEAR]-[6-DIGIT-INCREMENTAL-COUNTER]` (e.g. `INQ-2026-000001`).
    *   Triggers transactional emails (via SendGrid/AWS SES integration) to Customer and Store Administrator.
    *   Inserts row into backend relational database under status `Pending Review`.

---

## 4. Shopping Cart & Checkout Flow
*   **Cart Features**: Item details, thumbnail, metal customization selection, price, and coupon entry field.
*   **Checkout Stages**:
    1.  *Customer Info*: Email, sign-in option, address lookup.
    2.  *Shipping Options*: Insured delivery, showroom pickup.
    3.  *Payment Selection*:
        *   Stripe Checkout: For credit cards, Apple Pay, Google Pay.
        *   PayPal Gateway: Fast redirect checkout.
        *   Bank Transfer: Displays bank details (IBAN/SWIFT) and instructs the user to submit payment manually, creating an order in `Awaiting Payment` status.
    4.  *Success Page*: Displays Order ID, summary of charges, and automated email confirmation.
