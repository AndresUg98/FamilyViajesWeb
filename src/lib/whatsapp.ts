const phone = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER?.replace(/\D/g, "");

export function getWhatsAppUrl(
  message = "Hola, Family Viajes. Quiero planear mi próximo viaje.",
) {
  if (!phone || phone.length < 8 || phone.length > 15) return "https://wa.me/";
  return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
}
