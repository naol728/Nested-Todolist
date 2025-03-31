export const getCapitalizedFirstName = (fullName) => {
  if (!fullName) return "";

  const firstName = fullName.split(" ")[0];
  return firstName.charAt(0).toUpperCase() + firstName.slice(1);
};
