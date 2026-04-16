# FindPhysio 🏥

A cross-platform mobile app built with **React Native + Expo** that helps users find physiotherapy and rehabilitation clinics in **Brampton, Ontario**.

## Features

- 📍 **Location-based clinic finder** — Uses device GPS to show nearby physio clinics
- 🗺️ **Interactive map view** — Map with clinic pins (teal for regular, gold for featured)
- 📋 **List view** — Scrollable list of clinics sorted by distance
- ⭐ **Featured clinics** — Highlighted/badged premium listings with carousel on home screen
- 📞 **One-tap calling** — Call a clinic directly from the app
- 🧭 **Directions** — Open directions in Apple Maps / Google Maps
- 🌐 **Website links** — Quick access to clinic websites
- 💼 **Get Featured** — Inquiry form for clinic owners to request premium placement
- ℹ️ **About screen** — App information and stats

## Pre-loaded Clinics (Brampton, ON)

The app comes pre-loaded with 10 real physiotherapy clinics in Brampton:

1. PhysioRehab Group ⭐ Featured
2. Brampton Physiotherapy + Wellness Institute ⭐ Featured
3. Regain Rehab Centre
4. CBI Health – Brampton Hurontario
5. Physio Village Clinic
6. Health Plus Rehab Centre
7. Complete Rehab Centre
8. Brampton Ortho Neuro Physiocare
9. Complete Physio & Sports Rehab
10. Physio Movement

## Tech Stack

| Technology | Purpose |
|---|---|
| Expo SDK 51 | Cross-platform app framework |
| Expo Router v3 | File-based navigation |
| React Native 0.74 | Core mobile framework |
| TypeScript | Type safety |
| react-native-maps | Map display with pins |
| expo-location | GPS & permissions |
| @expo/vector-icons | Ionicons icon set |
| EAS Build | Cloud build for iOS & Android |

## Project Structure

```
FindPhysio/
├── app/                    # Expo Router screens
│   ├── _layout.tsx         # Root navigation layout
│   ├── index.tsx           # Home/Map screen
│   ├── list.tsx            # Clinic list screen
│   ├── clinic/
│   │   └── [id].tsx        # Clinic detail screen
│   ├── featured.tsx        # Get Featured screen
│   └── about.tsx           # About screen
├── components/             # Reusable UI components
│   ├── ClinicCard.tsx      # Clinic card component
│   ├── FeaturedBadge.tsx   # Featured badge
│   └── FeaturedCarousel.tsx # Horizontal featured carousel
├── data/
│   └── clinics.ts          # Clinic data + distance helpers
├── constants/
│   └── Colors.ts           # Theme colors, spacing, fonts
├── assets/                 # App icons & splash screen
├── app.json                # Expo config
├── eas.json                # EAS Build profiles
└── package.json            # Dependencies
```

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) 18+
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)
- [Expo CLI](https://docs.expo.dev/get-started/installation/): `npm install -g expo-cli`
- [EAS CLI](https://docs.expo.dev/eas/) (for builds): `npm install -g eas-cli`

### Installation

```bash
# Clone the repository
git clone https://github.com/bhavyat81/FIndPhysio.git
cd FIndPhysio  # Repository name uses capital 'I' (FIndPhysio)

# Install dependencies
npm install
```

### Running with Expo Go

The easiest way to test on a real device:

```bash
npm start
```

Then scan the QR code with:
- **iOS**: The Camera app or Expo Go app
- **Android**: The Expo Go app

> **Note**: `react-native-maps` requires a custom development build on iOS (Expo Go uses Google Maps on Android by default). See the development build instructions below for full map functionality.

### Running on iOS Simulator (Xcode)

```bash
# Start on iOS simulator
npm run ios
```

Requires:
- macOS with [Xcode](https://developer.apple.com/xcode/) installed
- iOS Simulator set up

### Running on Android Emulator

```bash
# Start on Android emulator
npm run android
```

Requires:
- [Android Studio](https://developer.android.com/studio) with an AVD configured

---

## EAS Build (Cloud Builds)

### Setup

```bash
# Login to Expo account
eas login

# Configure EAS for your project
eas build:configure
```

### Build Profiles

| Profile | Purpose | Command |
|---|---|---|
| `development` | Dev client build for testing | `eas build --profile development` |
| `preview` | Internal testing (APK/Simulator) | `eas build --profile preview` |
| `production` | App Store / Play Store release | `eas build --profile production` |

### iOS Preview Build (Simulator)

```bash
eas build --platform ios --profile preview
```

### Android Preview Build (APK)

```bash
eas build --platform android --profile preview
```

### xCloud / EAS Build for iOS

```bash
# Full production build for App Store
eas build --platform ios --profile production
```

> Add your Apple Team ID, Apple ID, and ASC App ID to `eas.json` under `submit.production.ios` before submitting.

---

## Configuration

### App Config (`app.json`)

- **Name**: FindPhysio
- **Slug**: findphysio
- **iOS Bundle ID**: `com.findphysio.app`
- **Android Package**: `com.findphysio.app`
- Location permissions pre-configured for iOS and Android

### Adding Google Maps API Key (Android)

For Android, add your Google Maps API key in `app.json`:

```json
{
  "expo": {
    "android": {
      "config": {
        "googleMaps": {
          "apiKey": "YOUR_GOOGLE_MAPS_API_KEY"
        }
      }
    }
  }
}
```

---

## Theme

| Token | Value | Usage |
|---|---|---|
| Primary | `#0D9488` (Teal) | Buttons, icons, accents |
| Primary Dark | `#0F766E` | Header background |
| Primary Light | `#CCFBF1` | Icon backgrounds |
| Accent | `#F59E0B` (Gold) | Featured badges, ratings |
| Background | `#F8FAFC` | Screen backgrounds |

---

## Adding More Clinics

Edit `/data/clinics.ts` and add a new clinic object:

```typescript
{
  id: '11',
  name: 'Your Clinic Name',
  address: 'Address, Brampton, ON',
  phone: '905-555-0000',
  website: 'https://yourclinic.ca',
  latitude: 43.7315,   // Brampton coordinates
  longitude: -79.7624,
  rating: 4.5,
  featured: false,     // Set true for featured clinics
  description: 'Clinic description...',
  services: ['Physiotherapy', 'Massage'],
}
```

---

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/your-feature`
3. Commit your changes: `git commit -m 'Add some feature'`
4. Push to the branch: `git push origin feature/your-feature`
5. Open a Pull Request

---

## License

This project is private and proprietary. All rights reserved.

---

*Built with ❤️ for the Brampton community*
