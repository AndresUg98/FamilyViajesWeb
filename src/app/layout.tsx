import type { Metadata } from "next";
import Header from "@/components/header";
import Footer from "@/components/footer";
import "./globals.css";
export const metadata: Metadata = {
  title: {
    default: "Family Viajes | Tu próxima gran historia",
    template: "%s | Family Viajes",
  },
  description:
    "Tu agencia de viajes online. Escapadas, vacaciones en familia y experiencias a tu medida con atención personal en cada paso.",
};
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body>
        <a className="skip" href="#contenido">
          Saltar al contenido
        </a>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
