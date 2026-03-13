import Navbar from "@/components/template/navbar.jsx";
import Footer from "@/components/landing/footer.jsx";

export default function PublicLayout ({ children }) {
  return (
    <>
      <Navbar />
      <main className="px-4 py-4 mt-12 items-center justify-center">
        { children }
      </main>
      <Footer />
    </>
  );
}