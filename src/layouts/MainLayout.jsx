import Navbar from "../components/Navbar";

export default function MainLayout({
  children,
}) {
  return (
    <div
      className="
      min-h-screen
      transition-all
      duration-300
      "
      style={{
        background:
          "var(--bg)",
        color:
          "var(--text)",
      }}
    >
      <Navbar />

      <main>
        {children}
      </main>
    </div>
  );
}