import Header from "@components/common/Header";
import Footer from "@components/common/Footer";
import WatchListGrid from "@components/WatchListGrid";

const WatchList = () => {
  return (
    <>
      <Header />
      <main className="flex-1 overflow-hidden py-12">
        <h1 className="text-3xl font-bold">Your Watchlist</h1>
        <WatchListGrid />
      </main>
      <Footer />
    </>
  );
};

export default WatchList;
