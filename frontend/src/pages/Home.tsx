import { Link } from "react-router-dom";

const Home: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#f5f5f5]">
      <header className="flex items-center justify-between px-6 py-4 border-b">
        <div className="text-2xl font-bold">Medium</div>
        <nav className="flex items-center space-x-6">
          <Link to="/signin" className="text-sm font-medium text-gray-700">
            Write
          </Link>
          <Link to="/signin" className="text-sm font-medium text-gray-700">
            Sign in
          </Link>
          <Link
            to="/signin"
            className="px-4 py-2 text-sm font-medium text-white bg-black rounded-full"
          >
            Get started
          </Link>
        </nav>
      </header>
      <div className="bg-yellow-200 text-center py-2">
        Be part of a better internet.{" "}
        <Link to="/signin" className="font-semibold text-yellow-700">
        </Link>
      </div>
      <main className="flex flex-col items-center justify-center flex-1 py-20 text-center">
        <h1 className="text-6xl font-bold leading-tight">
          Human <br /> stories & ideas
        </h1>
        <p className="mt-4 text-lg text-gray-600">
          A place to read, write, and deepen your understanding
        </p>
        <Link
          to="/signin"
          className="mt-8 px-6 py-3 text-lg font-medium text-white bg-black rounded-full"
        >
          Start reading
        </Link>
      </main>
    </div>
  );
};

export default Home;
