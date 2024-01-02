import "@styles/globals.css";
import Header from "@components/Header";
import Footer from "@components/Footer";

export const metadata = {
  title: "Delivery Jobs",
  description: "A way to find delivery related jobs",
};

const RootLayout = ({ children }) => {
  return (
    <html lang="en">
      <body>
        <div className="main"></div>
        <main className="app">
          <Header />
          {children}
          <Footer />
        </main>
      </body>
    </html>
  );
};

export default RootLayout;
