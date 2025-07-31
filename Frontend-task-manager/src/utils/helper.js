
export const validateEmail = (email) => {
  const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email) return "Email is required";
  if (!pattern.test(email.toLowerCase())) return "Invalid email format";
  return ''
};

export const addThousandsSeparator = (num) => {
  if (num == null || isNaN(num)) return ""
  const [integerPart, fractionalPart] = num.toString().split(".");
  const formattedInteger = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
  return fractionalPart ? `${formattedInteger}.${fractionalPart}` : formattedInteger
}