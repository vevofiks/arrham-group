import Header from "./components/Header";
import "../globals.css"


export const metadata = {
  title: "Admin Dashboard",
};

export default function Layout({ children }) {
  return (
    <html lang="en">
      <body>
        <Header />

        <main className="flex-1 p-6">{children}</main>
      </body>
    </html>
  );
}
