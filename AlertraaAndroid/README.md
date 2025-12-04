# Alertraa - Android Health Monitoring App

A comprehensive health monitoring React Native application for Android, converted from the Next.js web app.

## Features

- 📊 **Health Metrics Tracking**: Monitor heart rate, blood pressure, blood oxygen, steps, sleep, and calories
- 📅 **Appointment Booking**: Schedule and manage doctor appointments
- 💊 **Medicine Management**: Browse, order, and manage prescriptions
- 👤 **User Profile**: View health conditions, medications, allergies, and emergency contacts
- 🌓 **Dark Mode Support**: Toggle between light and dark themes
- 🆘 **SOS Emergency Button**: Quick access to emergency features

## Prerequisites

Before you begin, ensure you have the following installed:

- Node.js (v18 or higher)
- npm or yarn
- Java Development Kit (JDK) 11 or higher
- Android Studio with Android SDK
- React Native CLI (`npm install -g react-native-cli`)

## Setup Instructions

### 1. Install Dependencies

```bash
cd AlertraaAndroid
npm install
```

### 2. Android Setup

Make sure you have Android Studio installed with the following:

- Android SDK Platform 33 (or higher)
- Android Build Tools
- Android Emulator (or a physical device with USB debugging enabled)

Set up your environment variables:

```bash
# Add to your ~/.bashrc, ~/.zshrc, or equivalent
export ANDROID_HOME=$HOME/Android/Sdk
export PATH=$PATH:$ANDROID_HOME/emulator
export PATH=$PATH:$ANDROID_HOME/tools
export PATH=$PATH:$ANDROID_HOME/tools/bin
export PATH=$PATH:$ANDROID_HOME/platform-tools
```

### 3. Run the App

#### Start Metro Bundler

```bash
npm start
```

#### Run on Android

In a new terminal:

```bash
npm run android
```

Or using React Native CLI:

```bash
react-native run-android
```

## Project Structure

```
AlertraaAndroid/
├── src/
│   ├── App.tsx                 # Main app component
│   ├── navigation/
│   │   └── MainTabNavigator.tsx # Bottom tab navigation
│   ├── screens/
│   │   ├── LoadingScreen.tsx
│   │   ├── LoginScreen.tsx
│   │   ├── HomeScreen.tsx
│   │   ├── BookingScreen.tsx
│   │   ├── MedicineScreen.tsx
│   │   └── ProfileScreen.tsx
│   ├── lib/
│   │   ├── mockData.ts         # Mock data for testing
│   │   └── theme.ts            # Theme colors and styles
│   └── types/
│       └── index.ts            # TypeScript type definitions
├── index.js                    # Entry point
├── app.json                    # App configuration
├── package.json
├── tsconfig.json
├── babel.config.js
└── metro.config.js
```

## Key Dependencies

- **React Native**: Core framework
- **React Navigation**: Navigation library
- **React Native Vector Icons**: Icon library (Feather icons)
- **React Native Linear Gradient**: Gradient backgrounds
- **React Native Maps**: Map integration
- **React Native Reanimated**: Smooth animations
- **React Native Gesture Handler**: Touch gesture handling

## Available Scripts

- `npm start`: Start Metro bundler
- `npm run android`: Run on Android device/emulator
- `npm run ios`: Run on iOS device/simulator (requires macOS)
- `npm test`: Run tests
- `npm run lint`: Lint code

## Features Implemented

### ✅ Completed
- Login screen with authentication
- Home screen with health metrics dashboard
- Booking screen for appointments
- Medicine screen with e-commerce functionality
- Profile screen with user information and settings
- Bottom tab navigation with SOS button
- Dark mode support
- Mock data integration

### 🚧 To Be Implemented
- Real-time health metrics tracking
- Map integration for live location
- Push notifications
- Backend API integration
- Payment gateway for medicine orders
- Emergency contact notification system
- Health report generation
- Biometric authentication

## Troubleshooting

### Common Issues

1. **Metro bundler cache issues**
   ```bash
   npm start -- --reset-cache
   ```

2. **Android build fails**
   ```bash
   cd android
   ./gradlew clean
   cd ..
   npm run android
   ```

3. **Missing vector icons**
   ```bash
   npx react-native link react-native-vector-icons
   ```

## Contributing

This is a converted version of the Alertraa web application. To contribute:

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

This project is part of the Alertraa health monitoring system.

## Contact

For questions or support, please contact the development team.
