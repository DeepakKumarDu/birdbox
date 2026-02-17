# Birdbox — Front-End Take-Home Assignment

A pixel-perfect implementation of the Birdbox dashboard built with **React + Redux Toolkit + TypeScript + Ant Design**, matching the provided Figma designs.

---

## 🚀 How to Run

### Prerequisites
- **Node.js** v18+ 
- **npm** v9+

### Steps

```bash
# 1. Navigate to the project folder
cd birdbox-app

# 2. Install dependencies
npm install

# 3. Start the development server
npm run dev
```

The app will open at **http://localhost:5173**

### Build for production
```bash
npm run build
npm run preview   # preview the production build locally
```

---

## 📂 Project Structure

```
birdbox-app/
├── index.html
├── vite.config.ts
├── tsconfig.json
├── src/
│   ├── main.tsx                      # Entry point
│   ├── App.tsx                       # Router + AntD ConfigProvider
│   ├── types/
│   │   └── index.ts                  # All shared TypeScript types
│   ├── data/
│   │   └── mockData.ts               # All mock data & filter option lists
│   ├── store/
│   │   ├── index.ts                  # Redux store
│   │   └── slices/
│   │       ├── productsSlice.ts      # Page A: product list, filters, modal state
│   │       └── sendItemsSlice.ts     # Page B: send flow, filters, recipient state
│   ├── hooks/
│   │   └── redux.ts                  # Typed useAppDispatch / useAppSelector
│   ├── components/
│   │   ├── Sidebar.tsx               # Shared sidebar with nav + dark mode toggle
│   │   └── modals/
│   │       ├── AddProductModal.tsx   # Add Product form + success modal
│   │       ├── ItemDetailsModal.tsx  # Item Details (Step 1 of send flow)
│   │       └── SendConnectModal.tsx  # Recipient form (Step 2) + success modal
│   ├── pages/
│   │   ├── ProductListPage.tsx       # Page A: Product List
│   │   └── SendItemsPage.tsx         # Page B: Send Items
│   └── styles/
│       └── global.css                # All component styles (pixel-perfect)
```

---

## ✅ Features Implemented

### Page A — Product List (`/`)

| Feature | Status |
|---|---|
| Sidebar with nav links | ✅ |
| Green "Add Product" banner | ✅ |
| Product table (AntD Table) with pagination | ✅ |
| Status filter tabs (All / Active / Inactive) with counts | ✅ |
| Search by product name or ID | ✅ |
| Sort dropdown (alphabetical, price) | ✅ |
| Category filter dropdown | ✅ |
| Bulk Action select (UI only) | ✅ |
| Row actions (Edit, View, Delete via ellipsis) | ✅ |
| Add Product modal with form validation | ✅ |
| Product Media drag-and-drop upload area | ✅ |
| Success modal on product creation | ✅ |
| All state in Redux | ✅ |

### Page B — Send Items (`/send-items`, linked from "Order List")

| Feature | Status |
|---|---|
| Green "Send Product" banner | ✅ |
| Filters sidebar (Categories, Price Range, Vendors) | ✅ |
| "Clear All" resets all filters in Redux | ✅ |
| Product grid with cards and multi-image dots | ✅ |
| Search + sort above grid | ✅ |
| Item Details modal (Step 1) | ✅ |
| Color + Size selectors in modal | ✅ |
| Image thumbnails with click-to-activate | ✅ |
| Send Connect modal (Step 2) with "Back" preserving state | ✅ |
| Recipient form with validation (email format, required fields) | ✅ |
| Address form (country, city, state, zip, lines) | ✅ |
| Order created in Redux on confirmation | ✅ |
| Success modal on order confirmation | ✅ |

---

## 🏗 Architectural Decisions

### State Management
- **Two slices**: `productsSlice` (Page A) and `sendItemsSlice` (Page B). Each slice owns all state for its domain — filters, modal visibility, form selection — making them self-contained and easy to reason about.
- **Filters computed in the page component** via `useMemo`, not pre-stored in Redux, keeping Redux state minimal and avoiding derived-state bugs.
- **Modal flow state** (Step 1 → Step 2 → success) is encoded as boolean flags in Redux so the "Back" button can return to Step 1 with color/size selections preserved.
- **Recipient form** is kept as a Redux field so navigation between Step 1 and Step 2 doesn't lose entered values.
- **Dark Mode**: Implemented via a global `ThemeContext` that manages a `dark` class on the `html` element, triggering CSS variable overrides in `global.css`.

### Component Design
- **Modals** are separated into their own files under `components/modals/` for clarity and reusability.
- **Sidebar** is shared across both pages via the `AppLayout` wrapper in `App.tsx`.
- **No prop drilling** — every component dispatches actions and reads from the store directly via typed hooks.

### Build Tooling
- **Vite** chosen over CRA for faster dev server startup and modern ESM output.

---

## ⚠️ Known Issues / Limitations

- Product images and item images use inline SVG placeholders (no real images in mock data).
- The "Edit" action in the product table is non-functional (as specified).
- "Dashboard" and "Notifications" sidebar items are placeholders.
- The `Export` button in the product toolbar is a UI placeholder.

---

## 🔮 What I Would Improve with More Time

1. **Real image upload** — integrate file preview in the Add Product modal using `URL.createObjectURL`.
2. **Edit product flow** — open the Add Product modal pre-filled with existing product data.
3. **Persisted state** — add `redux-persist` to survive page refreshes.
4. **Unit tests** — Jest + Testing Library for Redux slices and key components.
5. **Error boundaries** — catch unexpected render errors gracefully.
6. **Accessibility** — ARIA labels on icon-only buttons and modal close buttons.
7. **Skeleton loaders** — show placeholder rows while simulated async operations complete.
