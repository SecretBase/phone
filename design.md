# format



# validation
  no + sign & no country === invalid

```javascript
type Country = {
  alpha2: string,
  alpha3: string,
  countryName: string,
  mobileBeginWith: Array<string>,
  phoneNumberLengths: Array[number],
  countryCallingCodes: Array<string>,
}
const validate = (phoneNumber: string, countries: Array<Country>) => boolean;
```


# phone

```javascript

type Phone = {
  valid: boolean,
  e164: string,
  inferredCountry: ?{
    alpha2: string,
    alpha3: string,
    name: string,
  }
}

const phone = (countries: Array<Country>) => (phone: string, alpha3) => Phone
```
