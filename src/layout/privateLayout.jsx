import Navbar from "@/components/template/navbar.jsx";
import Footer from "@/components/landing/footer.jsx";

export default function PrivateLayout({ children }) {
  return (
    <>
      <Navbar />
      <main>{ children }</main>
    </>
  );
}