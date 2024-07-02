// pages/index.tsx
import { Toggle } from "./components/theme/Toggle";

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 p-6 text-white dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <nav className="w-full max-w-6xl flex justify-between items-center py-4">
        <div className="text-2xl font-bold">E-Commerce</div>
        <Toggle />
      </nav>
      <section className="text-center mt-20">
        <h1 className="text-5xl font-extrabold mb-6">Welcome to E-Commerce</h1>
        <p className="text-xl mb-12">
          Discover the best products at the best prices. Join our community and start shopping now!
        </p>
        <div className="flex justify-center space-x-4">
          <a href="#shop" className="bg-white text-black px-6 py-3 rounded-full text-lg font-semibold hover:bg-gray-200 transition duration-300">Shop Now</a>
          <a href="#about" className="bg-transparent border-2 border-white px-6 py-3 rounded-full text-lg font-semibold hover:bg-white hover:text-black transition duration-300">Learn More</a>
        </div>
      </section>
      <footer className="mt-auto py-6 w-full text-center text-sm bg-black bg-opacity-50">
        © 2024 E-Commerce. All rights reserved.
      </footer>
    </main>
  );
}