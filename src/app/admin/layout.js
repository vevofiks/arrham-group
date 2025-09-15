import Sidebar from "./component/Sidebar";

export const metadata = {
  title: "Admin Dashboard",
};

export default function Layout({ children }) {
  return (
    <body className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      {/* <Sidebar /> */}

      {/* Main Content */}
        <main className="">{children}</main>
    </body>
  );
}
