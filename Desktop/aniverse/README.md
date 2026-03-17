# Aniverse Desktop Application

A native desktop application built with Electron that provides a rich, desktop-optimized experience for the Aniverse platform. This application allows users to browse, discover, and consume anime, manga, manhwa, and light novel content directly on their computers without the need for web browsers.

## Overview

The Aniverse Desktop Application leverages Electron to deliver a native desktop experience while maintaining the flexibility of web technologies. It focuses exclusively on content browsing and consumption, providing users with an immersive experience optimized for larger screens and desktop hardware.

## 🚀 Features

### Core Functionality

- **Native Desktop Experience**: Runs as a standalone application with native window management
- **Offline Content Access**: Download and store content locally for offline viewing
- **Hardware Acceleration**: Optimized video playback and rendering using desktop GPU
- **System Integration**: Desktop notifications, keyboard shortcuts, and system tray support
- **Multi-Window Interface**: Browse multiple content pieces simultaneously
- **File Management**: Local content organization and library management

### User Experience

- **Responsive Layout**: Adapts to different window sizes and screen resolutions
- **Keyboard Shortcuts**: Extensive shortcut support for power users
- **Context Menus**: Right-click menus for quick actions
- **Drag & Drop**: Intuitive file and content management
- **Window Management**: Minimize to tray, always-on-top, and multi-monitor support

### Content Features

- **High-Quality Video Player**: Desktop-optimized video playback with advanced controls
- **Advanced Reader**: Smooth manga/manhwa reading with zoom and navigation options
- **Content Library**: Local organization of downloaded content
- **Search & Discovery**: Fast local and remote content searching
- **Progress Sync**: Cross-device progress synchronization (when connected)

## 🛠 Technology Stack

- **Framework**: Electron
- **Build Tool**: Vite
- **Frontend**: React with TypeScript
- **Styling**: Tailwind CSS
- **State Management**: Zustand
- **Video Playback**: Custom video player with HTML5 and WebGL
- **File System**: Node.js fs API for local file management
- **Packaging**: Electron Builder
- **Testing**: Jest, Spectron (E2E)
- **Linting**: ESLint

## 📁 Project Structure

```
src/
├── main/                  # Electron main process
│   ├── index.ts          # Main entry point
│   ├── window.ts         # Window management
│   ├── menu.ts           # Application menu
│   └── tray.ts           # System tray
├── preload/              # Electron preload scripts
│   ├── index.d.ts        # Type definitions
│   └── index.ts          # Secure API exposure
├── renderer/             # React application
│   ├── index.html        # Main HTML file
│   └── src/
│       ├── App.tsx       # Main React component
│       ├── components/   # UI components
│       ├── hooks/        # Custom hooks
│       ├── lib/          # Utilities
│       ├── store/        # State management
│       └── types/        # TypeScript types
├── shared/               # Shared utilities
│   ├── constants.ts      # Application constants
│   └── types.ts          # Shared type definitions
└── resources/            # Application resources
    ├── icons/            # Application icons
    └── assets/           # Static assets
```

## 🔧 Installation & Setup

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- For Windows: Windows 10+ with Visual Studio Build Tools (optional)
- For macOS: Xcode Command Line Tools
- For Linux: GCC and development libraries

### Development Setup

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd aniverse/Desktop/aniverse
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Start development**

   ```bash
   npm run dev
   ```

   This will start the Vite dev server and launch the Electron application.

## 🚀 Running the Application

### Development Mode

```bash
npm run dev
```

Launches the application in development mode with hot-reload enabled.

### Production Build

#### Windows

```bash
npm run build:win
```

#### macOS

```bash
npm run build:mac
```

#### Linux

```bash
npm run build:linux
```

### Preview Build

```bash
npm run build
npm run preview
```

## 📦 Distribution

### Building Installers

The application uses Electron Builder for creating distributable packages:

```bash
# Windows
npm run build:win

# macOS
npm run build:mac

# Linux
npm run build:linux

# All platforms
npm run build:all
```

### Distribution Options

- **NSIS Installer** (Windows): Creates a standard Windows installer
- **DMG** (macOS): Creates a macOS disk image
- **AppImage/deb/rpm** (Linux): Creates Linux packages
- **Auto-updater**: Built-in update mechanism using electron-updater

## 🧪 Testing

### Unit Tests

```bash
npm run test
```

### End-to-End Tests

```bash
npm run test:e2e
```

### Testing Electron Apps

- Uses Spectron for E2E testing
- Tests both main and renderer processes
- Includes window management and IPC testing

## 🎨 UI/UX Design

### Desktop-Specific Features

- **Window Controls**: Custom title bar with minimize/maximize/close
- **Context Menus**: Right-click menus throughout the application
- **Keyboard Shortcuts**: Extensive shortcut system for power users
- **System Integration**: Tray icon, notifications, and global shortcuts

### Responsive Design

- Adapts to window resizing
- Supports multiple monitor setups
- Maintains aspect ratios for content

## 🔧 Configuration

### Application Settings

- Window size and position persistence
- Theme preferences (dark/light)
- Download directory configuration
- Keyboard shortcut customization
- Notification preferences

### Development Configuration

```javascript
// electron.vite.config.ts
export default {
  main: {
    // Main process configuration
  },
  preload: {
    // Preload script configuration
  },
  renderer: {
    // Renderer process configuration
  }
}
```

## 📁 File Management

### Local Storage

- Content downloaded to user-specified directories
- Metadata stored in application data folder
- Automatic cleanup and organization

### Supported Formats

- **Video**: MP4, WebM, MKV
- **Images**: JPG, PNG, WebP
- **Documents**: PDF, EPUB (for light novels)

## 🔐 Security

### Electron Security

- Context isolation enabled
- Node integration disabled in renderer
- Secure preload scripts
- CSP (Content Security Policy) implementation

### Data Protection

- Local encryption for sensitive data
- Secure API key management
- Certificate pinning for API calls

## 🚀 Deployment & Updates

### Auto-Updater

- Built-in update mechanism using electron-updater
- Supports delta updates for faster downloads
- Automatic or manual update prompts

### Distribution Channels

- **Direct Download**: Host installers on your website
- **App Stores**: Submit to Microsoft Store, Mac App Store
- **Package Managers**: Chocolatey (Windows), Homebrew (macOS)

## 🔧 Development Scripts

- `npm run dev` - Start development with hot-reload
- `npm run build` - Build for current platform
- `npm run build:win` - Build Windows installer
- `npm run build:mac` - Build macOS installer
- `npm run build:linux` - Build Linux packages
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm run test` - Run unit tests
- `npm run test:e2e` - Run E2E tests

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/desktop-enhancement`)
3. Commit changes (`git commit -m 'Add desktop enhancement'`)
4. Push to branch (`git push origin feature/desktop-enhancement`)
5. Open a Pull Request

### Development Guidelines

- Follow Electron best practices for security
- Test on all target platforms
- Ensure proper error handling
- Maintain performance standards
- Update documentation for new features

## 📊 Performance Optimization

### Memory Management

- Efficient garbage collection
- Lazy loading of components
- Resource cleanup on window close

### Rendering Performance

- Hardware acceleration for video
- Optimized image loading
- Smooth scrolling and animations

## 🔧 Troubleshooting

### Common Issues

**Build Failures**

- Ensure all dependencies are installed
- Check Node.js version compatibility
- Verify system requirements for target platform

**Runtime Issues**

- Check console logs in development
- Verify API endpoints are accessible
- Ensure proper file permissions

**Packaging Issues**

- Clean node_modules and rebuild
- Check electron-builder configuration
- Verify code signing certificates

## 📱 Platform-Specific Notes

### Windows

- Requires Visual Studio Build Tools for native modules
- Supports Windows 10 and later
- NSIS installer for distribution

### macOS

- Requires Xcode Command Line Tools
- Supports macOS 10.13 and later
- Code signing required for App Store distribution

### Linux

- Supports most major distributions
- AppImage for universal compatibility
- deb/rpm packages for specific distributions

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 📞 Support & Contact

For technical support, bug reports, or feature requests:

- Create an issue in the GitHub repository
- Check platform-specific documentation
- Contact the development team

---

**Built with ❤️ for the anime community - bringing Aniverse to your desktop**
