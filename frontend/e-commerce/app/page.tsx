
import Link from "next/link";

export default function Home() {
  return (
    <section className="text-center mt-20">
      <h1 className="text-5xl font-extrabold mb-6">Welcome to E-Commerce</h1>
      <p className="text-xl mb-12">
        Discover the best products at the best prices. Join our community and
        start shopping now!
      </p>
      <div className="flex justify-center space-x-4">
        <Link
          href="/shop"
          className="px-6 py-3 rounded-full text-lg font-semibold hover:bg-gray-200 transition duration-300"
        >
          Shop Now
        </Link>
        <a
          href="/about"
          className="bg-transparent border-2 border-white px-6 py-3 rounded-full text-lg font-semibold hover:bg-white hover:text-black transition duration-300"
        >
          Learn More
        </a>
      </div>
    </section>
  );
}
