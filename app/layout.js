import "./globals.css";

export const metadata = {
  title: "HannsFree",
  description: "Autonomous Brand Engine",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-[#0a0a0a] text-white antialiased">
        <main className="mx-auto min-h-screen max-w-5xl px-6 py-10">
          {children}
        </main>
      </body>
    </html>
  );
}
