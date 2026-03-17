# Aniverse Mobile Application

A native mobile application built with Expo and React Native that delivers a seamless mobile experience for the Aniverse platform. This app focuses exclusively on content browsing and binge consumption, optimized for touch interfaces and mobile hardware.

## Overview

The Aniverse Mobile Application provides a native mobile experience for iOS and Android devices, allowing users to discover and consume anime, manga, manhwa, and light novel content on-the-go. The app prioritizes performance, offline capabilities, and intuitive touch-based interactions.

## 🚀 Features

### Core Functionality

- **Native Mobile Experience**: Optimized for iOS and Android with platform-specific UI patterns
- **Touch-Optimized Interface**: Gesture-based navigation and controls designed for mobile screens
- **Offline Content Access**: Download chapters and episodes for offline viewing and reading
- **Cross-Device Sync**: Seamless experience across mobile devices (content preferences sync)
- **Battery Optimization**: Efficient background processing and power management
- **Push Notifications**: Real-time alerts for new content releases (when implemented)

### User Experience

- **Intuitive Navigation**: Bottom tab navigation with swipe gestures
- **Responsive Design**: Adapts to different screen sizes and orientations
- **Fast Performance**: Optimized for mobile hardware with smooth animations
- **Accessibility**: Voice-over support and high contrast modes
- **Dark/Light Themes**: System-aware theming with user customization

### Content Features

- **Mobile-Optimized Player**: Touch controls for video playback with gesture scrubbing
- **Advanced Reader**: Swipe navigation for manga/manhwa with zoom and fit options
- **Reading Progress**: Automatic bookmarking and progress tracking
- **Content Library**: Organized collections and reading history
- **Search & Discovery**: Fast content discovery with filters and recommendations

## 🛠 Technology Stack

- **Framework**: Expo (React Native)
- **Language**: TypeScript
- **Navigation**: Expo Router (file-based routing)
- **Styling**: NativeWind (Tailwind CSS for React Native)
- **State Management**: Zustand
- **API Integration**: React Query for data fetching
- **Storage**: AsyncStorage with encryption
- **Notifications**: Expo Notifications
- **Camera**: Expo Camera (future features)
- **Build**: Expo Application Services (EAS)
- **Testing**: Jest, React Native Testing Library

## 📁 Project Structure

```
app/
├── _layout.tsx            # Root layout with navigation
├── index.tsx              # Home screen
├── LoadingScreen.tsx      # Loading component
├── results.tsx            # Search results
├── watch.tsx              # Video player screen
├── (tabs)/                # Tab-based navigation
│   ├── _layout.tsx        # Tab layout
│   ├── index.tsx          # Main tab
│   ├── leaderboards.tsx   # Leaderboards tab
│   ├── lightnovels.tsx    # Light novels tab
│   ├── manhwas.tsx        # Manhwas tab
│   └── updates.tsx        # Updates tab
├── lightnovels/           # Light novel screens
├── manhwas/               # Manhwa screens
└── globals.css            # Global styles
```

## 🔧 Installation & Setup

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- Expo CLI (`npm install -g @expo/cli`)
- For iOS: Xcode (macOS only)
- For Android: Android Studio or Expo Go app

### Development Setup

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd aniverse/Mobile/aniverse
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npx expo start
   ```

4. **Run on device/emulator**
   - **iOS Simulator**: Press `i` in terminal
   - **Android Emulator**: Press `a` in terminal
   - **Physical Device**: Scan QR code with Expo Go app

## 🚀 Running the Application

### Development Mode
```bash
npx expo start
```
Starts the Expo development server with options to run on different platforms.

### Production Build

#### iOS
```bash
npx expo run:ios
```

#### Android
```bash
npx expo run:android
```

### Expo Go (Quick Testing)
```bash
npx expo start --tunnel
```
Use Expo Go app to test without full native build.

## 📦 Building for Distribution

### Expo Application Services (EAS)

1. **Install EAS CLI**
   ```bash
   npm install -g @expo/eas-cli
   ```

2. **Login to EAS**
   ```bash
   eas login
   ```

3. **Configure build**
   ```bash
   eas build:configure
   ```

4. **Build for platforms**
   ```bash
   # iOS
   eas build --platform ios

   # Android
   eas build --platform android

   # Both
   eas build --platform all
   ```

### App Store Submission

#### iOS (App Store)
1. Build with EAS
2. Download build artifacts
3. Upload to App Store Connect using Transporter
4. Submit for review

#### Android (Google Play)
1. Build with EAS (AAB format)
2. Upload to Google Play Console
3. Configure store listing
4. Publish to production

## 🧪 Testing

### Unit Tests
```bash
npm run test
```

### Integration Tests
```bash
npm run test:integration
```

### Device Testing
- Use Expo Go for quick testing
- Test on physical devices regularly
- Use TestFlight (iOS) and Internal Testing (Android) for beta testing

## 🎨 UI/UX Design

### Mobile-First Design
- Touch-friendly button sizes (44pt minimum)
- Swipe gestures for navigation
- Pull-to-refresh functionality
- Optimized typography for mobile screens

### Platform-Specific Features
- **iOS**: Native iOS design patterns, haptic feedback
- **Android**: Material Design 3, system theming
- **Cross-Platform**: Consistent experience with platform adaptations

## 📱 Device Features

### Offline Capabilities
- Download content for offline access
- Background download management
- Storage optimization and cleanup

### Hardware Integration
- **Camera**: QR code scanning for content sharing (future)
- **Biometrics**: Fingerprint/Face ID for quick access (future)
- **Haptics**: Vibration feedback for interactions
- **Orientation**: Adaptive layouts for portrait/landscape

### Performance Optimization
- Image optimization for mobile networks
- Lazy loading of content
- Memory management for large libraries
- Battery-efficient background tasks

## 🔐 Security & Privacy

### Data Protection
- Secure token storage with Keychain (iOS) / Keystore (Android)
- Encrypted local storage for sensitive data
- Certificate pinning for API calls
- Privacy-focused data collection

### App Permissions
- Storage: For offline content downloads
- Network: For content streaming and API calls
- Notifications: For content update alerts (optional)

## 🚀 Deployment

### Expo Updates
- Over-the-air updates without app store approval
- Instant bug fixes and feature deployment
- Version management and rollback capabilities

### App Store Guidelines
- Compliance with platform policies
- Age ratings and content warnings
- Privacy policy and terms of service
- Regular updates and maintenance

## 🔧 Development Scripts

- `npx expo start` - Start Expo development server
- `npx expo run:ios` - Run on iOS simulator
- `npx expo run:android` - Run on Android emulator
- `npm run test` - Run unit tests
- `npm run lint` - Run ESLint
- `npm run type-check` - TypeScript type checking
- `eas build` - Build with EAS

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/mobile-improvement`)
3. Commit changes (`git commit -m 'Add mobile improvement'`)
4. Push to branch (`git push origin feature/mobile-improvement`)
5. Open a Pull Request

### Development Guidelines
- Follow React Native and Expo best practices
- Test on both iOS and Android regularly
- Optimize for performance and battery life
- Maintain accessibility standards
- Update documentation for new features

## 📊 Performance Monitoring

### App Performance
- Startup time optimization
- Memory usage monitoring
- Network request efficiency
- Battery consumption tracking

### User Analytics
- Crash reporting with Sentry
- User engagement metrics
- Performance profiling
- Error boundary implementation

## 🔧 Troubleshooting

### Common Issues

**Build Failures**
- Clear Metro cache: `npx expo start --clear`
- Reset project: `npm run reset-project`
- Check Expo SDK compatibility

**Runtime Issues**
- Check device logs in Expo CLI
- Verify API endpoints accessibility
- Test on physical devices

**Performance Issues**
- Profile with Flipper or React DevTools
- Check bundle size and optimize imports
- Monitor memory usage

## 📱 Platform-Specific Considerations

### iOS Development
- Requires macOS with Xcode
- TestFlight for beta distribution
- App Store Connect for submissions
- iOS-specific design guidelines

### Android Development
- Android Studio for advanced debugging
- Google Play Console for distribution
- Android-specific permissions and features
- Material Design compliance

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 📞 Support & Contact

For technical support, bug reports, or feature requests:
- Create an issue in the GitHub repository
- Check Expo documentation for common solutions
- Contact the development team

---

**Built with ❤️ for the anime community - Aniverse in your pocket**
