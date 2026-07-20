# Salon Scheduler (React Native)

A React Native application built as part of a Senior Frontend Assessment. The application demonstrates a salon scheduling system with Role-Based Access Control (RBAC), appointment management, offline queue handling, optimistic UI updates, and performance optimization.

---

## Features

- Vertical Scheduler using SectionList
- 30-minute time slot generation
- Stylist-wise grouped schedule
- Appointment cards
- Empty slot placeholders
- Generic Permission Gate (RBAC)
- Long press to move appointments
- Move/Edit Appointment using Modal
- Conflict detection for overlapping appointments
- Offline Mode simulation
- Optimistic UI updates
- Pending Actions Queue
- Sync pending actions when back online
- Redux Toolkit state management
- Performance optimization using React.memo, useMemo and useCallback

---

## Project Structure

```
src
│
├── components
│   ├── AppointmentCard
│   ├── EmptySlot
│   ├── EmptyState
│   ├── LoadingView
│   ├── MoveAppointmentModal
│   ├── PermissionGate
│   ├── SchedulerHeader
│   └── StylistSection
│
├── data
│
├── hooks
│
├── navigation
│
├── redux
│
├── screens
│
├── types
│
└── utils
```

---

## RBAC Approach

The application uses a generic permission system instead of checking user roles directly inside UI components.

A custom hook (`usePermission`) reads the current user's permissions from Redux.

A reusable `PermissionGate` component controls feature visibility.

Example:

```tsx
<PermissionGate permission="appt.move">
    <MoveButton />
</PermissionGate>
```

This keeps the UI clean and makes permission updates reactive.

---

## Appointment Flow

1. Display appointments grouped by stylist.
2. Long press an appointment.
3. Open Move Appointment modal.
4. Select new stylist and time.
5. Check for conflicts.
6. Update appointment if no conflict exists.

---

## Conflict Detection

Before updating an appointment, the application checks whether another appointment already exists for the selected stylist and time slot.

If a conflict is found:

```
Conflict Detected
Slot already booked.
```

The appointment is not updated.

---

## Offline Queue

The application includes an offline simulation.

When Offline Mode is enabled:

- UI updates immediately (Optimistic UI)
- Action is stored inside Pending Actions Queue
- Backend update is delayed

When switching back Online:

- Pending actions are processed
- Queue is cleared

---

## Performance Optimizations

The scheduler contains multiple time slots, so unnecessary re-renders were minimized using:

- React.memo
- useMemo
- useCallback
- Redux Toolkit
- Optimized SectionList rendering

SectionList optimizations:

- initialNumToRender
- windowSize
- removeClippedSubviews
- stickySectionHeadersEnabled

---

## Tech Stack

- React Native 0.80.1
- TypeScript
- Redux Toolkit
- React Navigation
- React Native Safe Area Context

---

## Mock Data

The application uses local JSON mock data provided in the assessment.

Data includes:

- Current User
- Configuration
- Stylists
- Appointments

---

## How to Run

Clone the repository

```bash
git clone <repository-url>
```

Install dependencies

```bash
npm install
```

Run Metro

```bash
npm start
```

Run Android

```bash
npm run android
```

---

## Assessment Requirements Covered

- Vertical Scheduler
- 30-minute slot generation
- Stylist-wise grouped schedule
- Appointment cards
- Empty slot placeholders
- Generic Permission Gate (RBAC)
- Long press interaction
- Move appointment modal
- Conflict detection
- Offline Mode
- Optimistic UI
- Pending Actions Queue
- Queue synchronization
- Redux Toolkit
- Performance optimization

---

## Author

**Divya Navlakhe**

React Native Developer