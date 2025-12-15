export const metadata = {
  title: "HannsFree",
  description: "Autonomous Brand Engine"
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body style={{ margin: 0, background: "#0a0a0a", color: "#ffffff" }}>
        {children}
      </body>
    </html>
  );
}
