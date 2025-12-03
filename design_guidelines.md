# Design Guidelines for Appice Alternative Dashboard

## Design Approach
**Reference-Based Approach**: This is an enterprise analytics and customer engagement platform. The design will draw from modern SaaS dashboard patterns similar to Appice, Mixpanel, Amplitude, and Segment - prioritizing data clarity, functional hierarchy, and professional aesthetics.

## Core Design Principles

### 1. Layout System
**Spacing Units**: Use Tailwind units of 2, 4, 6, and 8 for consistent spacing (p-2, p-4, p-6, p-8, gap-4, space-y-6)

**Grid Structure**:
- Sidebar: Fixed width 256px (w-64) on desktop, collapsible on mobile
- Main content area: Full remaining width with max-w-7xl container and px-6 py-8 padding
- Card grid: grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 for metric cards
- Chart sections: 2-column layouts on desktop (grid-cols-1 lg:grid-cols-2)

### 2. Typography Hierarchy

**Font Stack**: Inter or System UI fonts via Google Fonts CDN

**Text Styles**:
- Page Titles: text-2xl font-semibold
- Section Headers: text-lg font-semibold
- Card Titles: text-sm font-medium uppercase tracking-wide
- Metrics/Numbers: text-3xl font-bold
- Body Text: text-sm
- Labels: text-xs font-medium uppercase tracking-wide
- Table Headers: text-xs font-semibold uppercase

### 3. Component Library

**Navigation Sidebar**:
- Collapsible sections with chevron icons
- Active state highlighting for current page
- Icon + text layout (24px icons, Font Awesome or Heroicons)
- Nested menu items with indentation (pl-8 for sub-items)
- Sections: Home, Dashboard, Setup, Users, Analytics, Engagement, Campaigns, Reports, Settings

**Metric Cards**:
- Rounded corners (rounded-lg)
- Shadow elevation (shadow-sm)
- Padding p-6
- Icon in corner (32px size)
- Large number display with trend indicator (up/down arrow with percentage)
- Subtitle text below metric

**Data Tables**:
- Striped rows for readability
- Fixed header with sorting icons
- Actions column with icon buttons
- Pagination controls at bottom
- Search and filter controls above table
- Checkbox selection column

**Charts & Visualizations**:
- Use Chart.js or similar library
- Card container with title and date range selector
- Legend positioned appropriately
- Responsive sizing
- Types: Line charts (trends), Bar charts (comparisons), Pie charts (distributions), Heatmaps (cohorts)

**Form Elements**:
- Input fields with labels above (text-sm font-medium mb-2)
- Rounded inputs (rounded-md)
- Border states for focus/hover
- Dropdowns with chevron icons
- Toggle switches for boolean options
- Date range pickers with calendar popup
- Multi-select dropdowns with tags

**Modals & Dialogs**:
- Overlay background with blur
- Centered modal with max-w-2xl to max-w-4xl depending on content
- Close button in top-right
- Footer with action buttons (Cancel/Save pattern)
- Rounded corners (rounded-lg)

**Campaign Builder Interface**:
- Multi-step wizard layout
- Progress indicator at top
- Live preview panel (split screen for mobile/desktop previews)
- Form sections with collapsible panels
- Template selector with thumbnail previews
- Platform tabs (Android/iOS/Web)

**Buttons**:
- Primary: Solid fill, rounded-md, px-4 py-2, font-medium
- Secondary: Bordered outline, same sizing
- Icon buttons: Square/circle with icon only (w-8 h-8)
- Button groups with border separation

### 4. Specific Page Layouts

**Dashboard Page**:
- Header with platform selector and date range picker
- 4-column metric card row
- Chart section with 2 columns (bar chart left, line chart right)
- Events table below charts
- All sections use card containers with consistent padding

**User/Customer 360 Page**:
- Search bar and filters at top
- Data table with user list
- Clicking row opens detailed side panel or modal
- Side panel shows user profile, timeline, events, segments

**Segment Builder**:
- Query builder interface with AND/OR logic
- Drag-and-drop condition blocks
- Preview count of matching users
- Save/Cancel buttons in header

**Campaign Creation Flow**:
- Step-by-step wizard (1. Channel, 2. Audience, 3. Content, 4. Schedule, 5. Review)
- Left panel: Form inputs and settings
- Right panel: Live preview of notification/message
- Mobile phone mockup for push notifications
- Browser mockup for web notifications

**Funnel Analytics**:
- Funnel visualization with conversion rates between steps
- Dropdown to select funnel steps
- Metrics table below visualization
- Date comparison toggle

**Settings Pages**:
- Tab navigation for sub-sections
- Form layouts with clear section separators
- Two-column layouts where appropriate (label left, input right)
- Save button fixed at bottom or top-right

### 5. Icons
Use **Font Awesome** (CDN link) for all icons:
- Navigation: fa-home, fa-chart-bar, fa-users, fa-bell, fa-cog
- Actions: fa-plus, fa-edit, fa-trash, fa-download, fa-search
- Indicators: fa-chevron-down, fa-arrow-up, fa-arrow-down
- Data: fa-calendar, fa-filter, fa-sort

### 6. Interactive States
- Hover: Subtle opacity change (opacity-90) or slight shadow increase
- Active: Pressed appearance with slight scale or brightness change
- Loading: Spinner icons or skeleton screens for data loading
- Disabled: Reduced opacity (opacity-50) and cursor-not-allowed

### 7. Data Display Patterns
- Empty states: Icon + message for no data
- Loading states: Skeleton cards/tables while fetching
- Error states: Alert banner with retry action
- Success feedback: Toast notifications in top-right corner

### 8. Responsive Behavior
- Mobile: Sidebar becomes drawer, stacks cards vertically, horizontal scroll for wide tables
- Tablet: 2-column card grids, condensed sidebar
- Desktop: Full multi-column layouts, expanded sidebar

## Images
No hero images needed - this is a dashboard application focused on data and functionality. Use icons and data visualizations instead of decorative imagery. Include:
- User avatar placeholders in tables and profiles
- Empty state illustrations for "no data" scenarios
- Chart/graph visualizations throughout