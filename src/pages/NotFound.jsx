import Header from "@components/common/Header";
import Footer from "@components/common/Footer";
import { Link } from "react-router-dom";

const NotFound = () => {
        return (
      <>
        <Header />
        <main className="flex-1 flex items-center justify-center overflow-hidden py-12">
          <div className="flex flex-col items-center h-full justify-center gap-4">
            <h1 className="text-3xl">404: Page Not Found</h1>
            <p className="text-center">You took a leap and landed on a page that doesn't exist. <br></br>That's okay, we have plenty of movies for you to discover!</p>
            <Link to="/" className="px-6 h-12 flex flex-col align-center justify-center bg-secondary-500 text-white rounded-full hover:opacity-75">Discover Movies</Link>
          </div>
        </main>
        <Footer />
      </>
    );
}

export default NotFound;