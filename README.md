# MediCare - Mobile Application

mediCare is a comprehensive mobile application built with React Native and Expo, designed to streamline the process of finding and booking medical appointments. It offers a user-friendly interface for patients to connect with doctors, view their profiles, and manage their health journey.

## 📸 Screenshots

<p align="center">
  <img src="./assets/screenshots/home1.jpg" alt="Home Screen" width="250"/>
  <img src="./assets/screenshots/home2.jpg" alt="Home Screen 2" width="250"/>
  <img src="./assets/screenshots/doctors.jpg" alt="Doctors Screen" width="250"/>
</p>

## 🚀 Features

- **User Authentication:** Secure sign-up and login functionality for patients.
- **Doctor Discovery:** Browse a list of doctors and view detailed profiles, including their specialties.
- **Specialty-Based Search:** Filter doctors by their medical specialties.
- **Appointment Booking:** Easily book appointments with available doctors.
- **Appointment Management:** View and manage upcoming and past appointments.
- **Blog/Health Feed:** Stay informed with the latest health articles and blogs.
- **User Profiles:** Manage personal information and view appointment history.

## 🛠 Tech Stack

- **Framework:** React Native with Expo
- **Routing:** Expo Router
- **UI Components:** React Native components, Expo Blur, Expo Vector Icons
- **Authentication:** Expo Auth Session, Async Storage, Secure Store
- **HTTP Client:** Axios
- **Linting:** ESLint
- **Language:** TypeScript

## ⚙️ Getting Started

### Prerequisites

- Node.js (LTS version recommended)
- Expo CLI

### Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/emmamayne23/mediCare.git
   cd mediCare
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

### Running the Application

- **Start the development server:**

  ```bash
  npm start
  ```

  This will open the Expo Dev Tools in your browser. You can then run the app on:
  - An Android emulator or device by selecting "Run on Android device/emulator".
  - An iOS simulator or device by selecting "Run on iOS simulator".
  - In the web browser by selecting "Run in web browser".

## 📜 Available Scripts

In the project directory, you can run the following commands:

- `npm start`: Runs the app in development mode.
- `npm run android`: Runs the app on a connected Android device or emulator.
- `npm run ios`: Runs the app on the iOS simulator.
- `npm run web`: Runs the app in a web browser.
- `npm run lint`: Lints the project files using ESLint.

## 📁 File Structure

The project follows a feature-based directory structure, primarily organized within the `app` directory using Expo's file-based routing.

```
mediCare/
├── app/
│   ├── (auth)/               # Group for authentication-related screens
│   │   ├── login.tsx
│   │   └── signup.tsx
│   ├── appointments/         # Screens for managing appointments
│   │   ├── [id]/index.tsx    # View appointment details
│   │   ├── book/[id]/index.tsx # Book a new appointment
│   │   └── ...
│   ├── blogs/                # Screens for viewing blogs
│   ├── doctors/              # Screens for doctor listings and profiles
│   ├── profile/              # User profile screen
│   ├── specialties/          # Screens for browsing medical specialties
│   ├── _layout.tsx           # Root layout for the application
│   └── index.tsx             # Home screen of the app
├── assets/                   # Static assets like images and fonts
├── components/               # Reusable UI components
├── constants/                # Global constants
├── interfaces/               # TypeScript interfaces and type definitions
├── utils/                    # Utility functions, e.g., authentication logic
├── package.json              # Project dependencies and scripts
└── tsconfig.json             # TypeScript configuration
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a pull request.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the `LICENSE` file for details.
