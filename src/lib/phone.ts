import {
  getCountries,
  getCountryCallingCode,
  parsePhoneNumberFromString,
  type CountryCode,
} from "libphonenumber-js/min";

const countryNames = new Intl.DisplayNames(["en"], { type: "region" });

export const phoneCountries = getCountries()
  .map((country) => ({
    country,
    name: countryNames.of(country) || country,
    callingCode: getCountryCallingCode(country),
  }))
  .sort((a, b) => a.name.localeCompare(b.name, "en"));

export function formatContactPhone(value: string, country: CountryCode) {
  const input = value.trim();
  if (!input) return "";
  const phone = parsePhoneNumberFromString(input, {
    defaultCountry: country,
    extract: false,
  });
  return phone?.isPossible() ? phone.number : null;
}
