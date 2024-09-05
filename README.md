# Car Dealer

This project is a Next.js application designed to allow users to select a vehicle type and year to view available vehicle models.

## Menu

- [Features](#features)
- [Technologies](#technologies)
- [Setup and Installation](#setup)
- [License](#license)

## Features

- Select a vehicle type.
- Choose a year.
- View available vehicle models for the selected type and year.

## Technologies

- **Next.js**: ^14.2.7
- **TypeScript**: ^5
- **React**: ^18
- **Tailwind CSS**: ^3.4.1
- **Lucide React**: ^0.438.0
- **Shadcn/ui**

## Setup and Installation

Follow the steps below to configure and install the project in your local environment:

1. **Clone the repository and access the directory**

   ```bash
   git clone git@github.com:brunohnsouza/next-car-dealer.git
   cd next-car-dealer
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Start the development server**

   ```bash
   npm run dev
   ```

   Visit `http://localhost:3000` in your browser to see the application in action.

## Available Scripts

- `npm run dev` - Starts the development server with hot reloading.
- `npm run build` - Builds the project for production.
- `npm run start` - Starts the application in production mode.
- `npm run lint` - Runs ESLint to check for code quality issues.

## Configuration

- **Environment Variables**: Configure environment variables in the `.env.local` file. Example:

  ```env
  NEXT_PUBLIC_API_URL=https://vpic.nhtsa.dot.gov/api
  ```

- **ESLint & Prettier**: Configuration files are provided to ensure code quality and consistency.

## Contributing

We welcome contributions to the project. To contribute:

1. **Fork the Repository** - Create your own fork of the repository.
2. **Create a Feature Branch** - Create a branch for your feature or bug fix (`git checkout -b feature/new-feature`).
3. **Commit Your Changes** - Commit your changes with descriptive messages (`git commit -am 'Add new feature'`).
4. **Push to Your Fork** - Push your changes to your fork (`git push origin feature/new-feature`).
5. **Open a Pull Request** - Open a pull request to the main repository from your feature branch.

## License

This project is licensed under the MIT License. See the [LICENSE](https://choosealicense.com/licenses/mit/) file for details.
