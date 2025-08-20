# 📅 Mini Event Manager

A modern, responsive event management application built with Next.js, TypeScript, and TailwindCSS using the Next-Forge Turbo template.

## ✨ Features

- **Add Events**: Create new events with name and date
- **Event List**: View all events in a clean, organized format
- **Delete Events**: Remove events with a single click
- **Search Functionality**: Filter events by name in real-time
- **Persistent Storage**: Events are saved to localStorage and persist across browser sessions
- **Responsive Design**: Mobile-friendly interface that works on all devices
- **Modern UI**: Clean, professional design using TailwindCSS

## 🛠️ Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: TailwindCSS
- **State Management**: React useState with localStorage persistence
- **Build System**: Turborepo (monorepo)
- **Package Manager**: pnpm

## 🚀 How to Run

### Prerequisites

- Node.js 18+
- pnpm (recommended)

### Installation & Setup

1. Clone the repository:
```bash
git clone <repository-url>
cd PyCray
```

2. Install dependencies:
```bash
pnpm install
```

3. Start the development server:
```bash
pnpm dev
```

4. Open your browser and navigate to:
```
http://localhost:3000/events
```

### Path of the Page

The main events page is located at:
- **URL**: `http://localhost:3000/events`
- **File Path**: `app/events/page.tsx`
- **Additional Pages**:
  - Create Event: `http://localhost:3000/events/create`
  - Analytics: `http://localhost:3000/events/analytics`

## 📱 Usage

### Adding Events
1. Fill in the "Event Name" field with your event title
2. Select a date using the date picker
3. Click "Add Event" to save the event

### Managing Events
- **View Events**: All events are displayed in the events list with formatted dates
- **Search Events**: Use the search box to filter events by name
- **Delete Events**: Click the "Delete" button next to any event to remove it

### Data Persistence
- Events are automatically saved to your browser's localStorage
- Your events will remain even after closing and reopening the browser
- Clear your browser data to reset all events

## 🎯 Demo

For a quick demo without setting up the full Next.js environment, open `events-demo.html` in your browser. This standalone HTML file demonstrates all the features:

```bash
open events-demo.html
```

## 🏗️ Project Structure

```
PyCray/
├── app/                       # Next.js application (App Router)
│   ├── events/               # Events feature
│   │   ├── page.tsx         # Main events page
│   │   ├── layout.tsx       # Events layout
│   │   ├── create/          # Create event page
│   │   │   └── page.tsx
│   │   └── analytics/       # Analytics page
│   │       └── page.tsx
│   ├── layout.tsx           # Root layout
│   └── page.tsx             # Home page
├── packages/                 # Shared packages
│   ├── design-system/       # UI components
│   ├── next-config/         # Next.js configuration
│   ├── testing/             # Testing utilities
│   └── typescript-config/   # TypeScript configuration
├── events-demo.html         # Standalone demo
├── package.json             # Root package.json with scripts
├── turbo.json              # Turborepo configuration
└── README.md
```

## ✅ Feature Implementation Status

### Core Requirements
- ✅ **Next-Forge Turbo template**: Monorepo structure with Turborepo + pnpm
- ✅ **Next.js App Router**: Using Next.js 15 with App Router
- ✅ **TypeScript**: Full TypeScript implementation
- ✅ **TailwindCSS**: Responsive styling with TailwindCSS
- ✅ **Event Form**: Name (text, required) + Date (date, required) fields
- ✅ **Add Functionality**: Events added to in-memory list (client-side only)
- ✅ **Event List**: Display in "Event Name – Date" format
- ✅ **Delete Functionality**: Delete button for each event
- ✅ **Mobile-friendly**: Responsive design

### Bonus Features
- ✅ **localStorage Persistence**: Events persist across browser sessions
- ✅ **Search Functionality**: Real-time filtering by event name
- ✅ **Form Validation**: Client-side validation with error messages
- ✅ **Clean UI**: Professional design with hover effects and transitions

## 🔧 Development

### Available Scripts

```bash
# Start development server (runs all apps in the monorepo)
pnpm dev

# Build for production
pnpm build

# Run linting
pnpm lint

# Clean node_modules
pnpm clean
```

## 📝 Notes and Assumptions

### Technical Assumptions
- **Monorepo Structure**: Uses Turborepo for managing multiple packages and applications
- **Client-side Only**: No database or API routes - all data is stored in localStorage
- **No Authentication**: The events page is publicly accessible at `/events`
- **Browser Compatibility**: Modern browsers with localStorage support required
- **Data Limits**: localStorage has size limitations (typically 5-10MB per domain)

### Development Notes
- **Package Manager**: Project uses pnpm with workspace configuration
- **TypeScript**: Strict TypeScript configuration across all packages
- **Styling**: TailwindCSS v4 with modern configuration
- **Build System**: Turborepo handles building and development across the monorepo
- **Standalone Demo**: `events-demo.html` provides a working demo without Next.js setup

### Project Assumptions
- **Event Data**: Events only require name (string) and date (Date object)
- **Persistence**: Data persists only in browser localStorage (no server-side storage)
- **Routing**: Uses Next.js App Router with nested routes under `/events`
- **State Management**: Simple React state with localStorage synchronization

## 🎨 Design Decisions

- **Simplified Architecture**: Removed complex authentication to focus on core functionality
- **localStorage**: Chosen for persistence without requiring backend setup
- **Responsive Design**: Mobile-first approach with TailwindCSS
- **Form Validation**: Client-side validation for immediate feedback
- **Clean UI**: Minimalist design focusing on usability

## 🚀 Future Enhancements

- Export events to calendar formats (ICS)
- Event categories and tags
- Event reminders and notifications
- Bulk operations (select multiple events)
- Event templates for recurring events

## 📄 License

This project is open source and available under the [MIT License](LICENSE).
