import "@styles/globals.css";
import Header from "@components/Header";
import Footer from "@components/Footer";
import Provider from "@components/Provider";

export const metadata = {
  title: "Delivery Jobs",
  description: "A way to find delivery related jobs",
};

const RootLayout = ({ children }) => {
  return (
    <html lang="en">
      <body>
        <Provider>
          <div className="main"></div>
          <main className="app">
            <Header />
            {children}
            <footer className="footer_text">
              <Footer />
            </footer>
          </main>
        </Provider>
      </body>
    </html>
  );
};

export default RootLayout;
