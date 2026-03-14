# Kadai Modifiers Implementation Plan (Resto Only)

This document outlines the end-to-end strategy for implementing product modifiers in the KadaiPOS ecosystem, focusing on accurate cost tracking (HPP), inventory integration, and high-quality UX for both staff and customers.

---

## 🚀 Objectives
*   Allow Resto businesses to add customizations (e.g., Level Pedas, Extra Toppings, Option Sides).
*   Automate HPP and "Laba Bersih" (Net Profit) calculations based on ingredient usage.
*   Provide a seamless, interactive modifier selection UI in the Ordering app.
*   Ensure full visibility across Dashboard Analytics, Reports, and Cash Flow.

---

## 1. 🏗️ Database Schema (Supabase)

### New Tables
*   **`modifier_groups`**: Container for options.
    *   `id`, `restaurant_id`, `name` (e.g., "Extra Toppings"), `min_selection`, `max_selection`, `is_required` (boolean).
*   **`modifiers`**: Individual choices within a group.
    *   `id`, `group_id`, `name`, `additional_price`, `ingredient_id` (nullable), `ingredient_quantity` (float).
*   **`menu_item_modifiers`**: Mapping table.
    *   `menu_item_id`, `modifier_group_id`.

### Schema Updates
*   **`order_items`**: 
    *   `modifiers_json` (JSONB): Store snapshot of selected options.
    *   `base_price` & `base_hpp`: Explicitly store base values vs totals.
    *   `unit_hpp`: Total HPP (Base + Modifiers) for accurate margin tracking.
*   **`orders`**: Ensure `total_hpp` and `total_price` include modifier values.

---

## 2. 🖥️ Dashboard: Menu Management (Next.js)

### Item Creation Flow
*   **Resto-Only Toggle**: In `Add Item` form, show "Enable Modifiers" switch only if `business_type === 'resto'`.
*   **Modifier Builder UI**:
    *   Dynamic fields to add/remove Modifier Groups.
    *   For each Modifier: Input name, price, and **Link to Ingredient**.
    *   **Auto-HPP Display**: Show the calculated HPP of each modifier based on the linked ingredient cost.

### Ingredient & Recipe Integration
*   **Modifier-specific Stock Deduction**: When a modifier is selected, it must deduct from the batch (FIFO) just like a base recipe.
*   **HPP Calculation Logic**: The dashboard `Items` view will show "Base HPP" and "Potential Max HPP" (Base + all required modifiers).

---

## 3. 📱 Ordering UX & Cart Logic (Mobile & Tablet/Web)

### Cart Identity (CRITICAL)
*   **Unique Line Items**: The `CartContext` must identify items not just by `menu_item_id`, but by the **unique combination of selected modifiers**. 
    *   *Example*: 1x Nasi Goreng (Pedas) and 1x Nasi Goreng (Tidak Pedas) must remain as two separate lines in the cart.
*   **`CartItem` Schema Update**:
    ```typescript
    selectedModifiers: {
      modifier_id: string;
      name: string;
      price: number;
      hpp: number;
    }[]
    ```

### Selection Logic
1.  **Selection Trigger**: When clicking a "Resto" item in `menu-order`.
2.  **Validator**: If item has `modifier_groups`, intercept the `addItem` logic and open the selection UI.
3.  **Edit Flow**: Allow users to click a cart item to re-open the modifier modal and update choices.

---

## 4. 🧮 Calculation & Analytics Engine

### Real-time Math
*   **Total Order Price**: `Base Price + Σ(Modifier Prices)`.
*   **Total Order HPP**: `Base Item HPP + Σ(Modifier Ingredient Costs)`.
*   **Laba Bersih (Net Profit)**: `(Final Price - Final HPP) - (Tax + Fees)`.

### Dashboard Response
*   **Business Health**: Profitability metrics will include margins generated specifically from modifiers.
*   **Analytics**: "Top Performing Modifiers" report (Which upsells are most/least profitable).
*   **Arus Kas (Cash Flow)**: Every transaction record will store the full price breakdown.
*   **Stock (Stok)**: Automatic deduction of ingredients linked to modifiers upon order completion.
*   **Availability Auto-Sync**: If an ingredient linked to a modifier runs out in the `inventory`, the associated modifier must automatically show as "Unavailable" in `menu-order`.

---

## 5. 🖨️ KDS, Receipt & Multi-Channel

### Kitchen Display System (KDS)
*   **Modifier Highlighting**: Red or Bold text for negative modifiers (e.g., "**NO ONIONS!**") and Green for additions.
*   **Batching by Modifier**: If two items are identical, group them in KDS. If they have different modifiers, split them clearly.

### Bluetooth/Cloud Printing
*   **Hierarchy**: Sub-items/Modifiers must be indented under the parent.
*   **Shortcodes**: (Optional) Allow managers to define shorter names for modifiers to save space on narrow (58mm) receipts.

### Delivery Apps Integration (Optional/Future)
*   Ensure the `modifiers_json` is compatible with incoming orders from GoFood/GrabFood (if integrated) so costs are tracked the same way.

---

## 6. 🛠️ Critical Dependencies & Safeguards

*   **Stock Availability**: If an ingredient (e.g., "Beef Pattie") is out of stock, the specific modifier should show as "SOLD OUT" in the ordering app.
*   **Staff Commissions**: Update calculation to include modifier prices if the restaurant pays % of sales to waiters.
*   **KDS & Printing**: 
    *   KDS (Kitchen Display) must highlight deletions (e.g., "**NO ONIONS!**").
    *   Bluetooth Printing: Order labels must list modifiers clearly indented under the parent item.
*   **Offline Support**: Sync `modifier_groups` and `modifiers` to WatermelonDB/Local Storage for low-connectivity environments.

---

## 📅 Roadmap Phase 1
1.  Apply SQL Migrations for Modifiers.
2.  Build the Modifier UI in Dashboard (Menu Management).
3.  Inject the "Interception Logic" in the Ordering Apps (Mobile/Web).
4.  Update the "Order Processing" Cloud Function to handle Modifier-to-Stock deductions.
5.  Refactor Analytics to sum up modifier costs.
