const formatPhoneNumber = (phone) => {
  if (!phone) return "";

  const digits = phone.replace(/\D/g, "");

  const normalized = digits.startsWith("8")
    ? "7" + digits.slice(1)
    : digits.startsWith("7")
      ? digits
      : "7" + digits;

  const match = normalized.match(/^7(\d{3})(\d{3})(\d{2})(\d{2})$/);
  if (match) {
    return `+7 (${match[1]}) ${match[2]}-${match[3]}-${match[4]}`;
  }

  return `+${normalized}`;
};
export default formatPhoneNumber;
