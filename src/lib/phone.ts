import {
  parsePhoneNumberFromString,
  type CountryCode,
} from "libphonenumber-js/min";
import countryOptions from "@/data/phone-countries.json";

// Use one checked-in label order so different ICU versions cannot cause
// the server and browser to render different country names or options.
export const phoneCountries = countryOptions as {
  country: CountryCode;
  name: string;
  callingCode: string;
}[];

export function formatContactPhone(value: string, country: CountryCode) {
  const input = value.trim();
  if (!input) return "";
  const phone = parsePhoneNumberFromString(input, {
    defaultCountry: country,
    extract: false,
  });
  return phone?.isPossible() ? phone.number : null;
}
