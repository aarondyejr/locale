# Locale, the only localization package you will need.
> Locale is a basic localization package that takes the location of your locales and loads them into a map for easy looking up.

# Examples
> Let us say you have a localization for english, it would look something like this:
```json
{
  "WELCOME:MAIN_MESSAGE": "Welcome to x Server",
  "WELCOME:FOOTER_MESSAGE": "Enjoy your stay x user!"
}
```
> Now time for the coding. Here we are just going to load up the locales and fetch a translation.
```ts
import { Localization } from 'locale';

(async () => {
	// lng is what will be used as a default, so if you wanna always look up
  // so if you want to always look up english translations it will use lng instead
	const locale = new Localization({ lng: 'en' })

	// this will allow you to add all the locales into a map as maps of O(n) lookup
  await locale.addMultipleIn("locales")
  
  console.log(locale.t('WELCOME:MAIN_MESSAGE')) // Welcome to x Server
  // Now lets say you had another localization for spanish, 
  // you could specify you wanna look there
  console.log(locale.t('WELCOME:MAIN_MESSAGE', 'es')) // Bienvenido al servidor x
})()
```
# Contributing
1. Make a fork of this repo
2. Code up all your changes
3. Open a PR so I can review your changes and possibly merge.

# Credits
- [JWaffled](https://github.com/Jwaffled) for giving me a lot of support on the building of this package and making me follow i18n standards.
- [Dylan](https://github.com/Uhuh) for giving me a lot of help on the standards of i18n and making me follow them. Also helping with the general idea behind it as well.
