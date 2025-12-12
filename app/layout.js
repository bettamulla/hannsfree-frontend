import "./globals.css";

export const metadata = {
  title: "HannsFree",
  description: "Autonomous Brand Engine",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-black text-white min-h-screen">
        <main className="mx-auto max-w-3xl px-4 py-12">
          {children}
        </main>
      </body>
    </html>
  );
}
