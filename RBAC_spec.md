# PRODUCT & TECHNICAL SPECIFICATION: USER ACCESS CONTROL DASHBOARD

## 1. Feature Overview
* **Objective:** Implement a centralized Admin UI within the ERP platform to manage User Role-Based Access Control (RBAC).
* **Target Users:** System Administrators.
* **Tech Stack Context:** React 18+, Vite, Tailwind CSS, Lucide Icons.

---

## 2. UI Components & Layout Design

### A. Core Layout
* **Structure:** Responsive split-panel layout (`1/3` Left Panel, `2/3` Right Panel) occupying full viewport height (`h-screen`).
* **Responsiveness:** Switches to a single-column stacked layout on small screens (`md` breakpoint).

### B. Left Panel: User Selection Directory
* **Sticky Search Header:** Contains a text input with an inline magnifying glass icon. Supports real-time text-filtering by Name, Email, or ID.
* **Scrollable User Registry:** An `overflow-y-auto` container rendering user list rows.
  * **Row Items:** Avatar thumbnail, Full Name, Email, Status Badge (Active/Inactive), Current Role Badge.
  * **Interactivity:** Clicking a row sets it to an active state using a distinct background highlight (e.g., `bg-blue-50`).

### C. Right Panel: Access Configurator
* **Empty Default State:** Shows a centered visual placeholder with the text: *"Select a user from the left directory to configure platform access privileges."*
* **Selected Identity Summary:** Displays the active user's avatar, name, email, and metadata block (e.g., User ID, Department).
* **Role Options Selection (Form Control):**
  * Implemented via a custom Radio Card Group.
  * **Roles & Text Specs:**
    * **System Admin:** "Full system bypass with complete access to financial configurations, data audits, and security settings."
    * **Operational Manager:** "Full write access across production, inventory, and procurement modules. Cannot view root financial sheets."
    * **Standard Editor:** "Standard data modification and entry within assigned operational queues. No deletion privileges."
    * **Read-Only Viewer:** "Strictly audit and viewing access across all generic dashboard modules."
* **Permissions Matrix Blueprint (Visual Accordion):**
  * Displays a nested read-only list of core ERP system features (Inventory, Billing, Settings).
  * Checkboxes dynamically update to checked/unchecked states based on the active selection in the Role Radio Group.
* **Persistent Action Bar:**
  * **Cancel Button:** Reverts any unsaved role selections back to the user's current baseline database role.
  * **Save Changes Button:** Triggers backend update logic. Must be disabled (`disabled={!isDirty}`) if no changes have been applied.

---

## 3. Core Functional Logic & State Management

```typescript
interface AccessControlState {
  usersList: UserMetadata[];        // Baseline data collection
  selectedUserId: string | null;    // Tracks active user focus
  pendingRoleId: string | null;     // Tracks choice before clicking Save
  isLoading: boolean;               // API network state tracker
  isDirty: boolean;                 // true if pendingRoleId !== user.currentRole
}
```

* **Data Syncing Execution:** Clicking a user card sets `selectedUserId` and populates `pendingRoleId` with that user's existing database role tier.
* **Form Submissions Lifecycle:** 
  1. Trigger submission state toggle (`isLoading = true`).
  2. Wait for a simulated network timeout delay of 1000ms.
  3. Execute global success confirmation (via Toast context or browser alert banner).
  4. Force state reset (`isDirty = false`).

---

## 4. Operational Boundaries & Security Fail-Safes

* **Prevent Self-Lockout:** 
  * Ensure the context can target the currently logged-in administrator profile ID (e.g., Mock Admin ID: `"usr-001"`).
  * **Logic Constraint:** If `selectedUserId === currentLoggedInAdminId`, disable the role assignment radio controls and Save button entirely. Render an inline banner message: `"Security policy restriction: You are not authorized to modify your own root administrative privilege boundaries."`
* **Route Privilege Gatekeeping:** Enforce strict middleware page routing. If the active authenticated session does not possess the `"admin"` role descriptor string, render a full-screen `403 Access Forbidden` warning layout.
* **Audit Footprint Pipelines:** Backend target request interceptors must log the following JSON tracking payload context on all mutations:
  ```json
  {
    "target_user_id": "string",
    "updated_by_admin_id": "string",
    "previous_role_assignment": "string",
    "new_role_assignment": "string",
    "timestamp_utc": "string"
  }
  ```
