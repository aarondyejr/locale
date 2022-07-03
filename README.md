# Locale, the only localization package you will need.
> Locale is a basic localization package that takes the location of your locales and loads them into a map for easy looking up.

# Examples
> Let us say you have a localization for English, it would look something like this:
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

	/**
	* When using Locale, you wanna make sure you make an instance of the Localization class.
	* The class takes in only a single paramater which are the options. 
	* 
	* As of right now there is only one option with is lng. lng is what you set as the default
	* language, the package will use lng if you don't supply anything else in the 't' translate
	* method as shown below.
	* 
	* Locale uses the standard formatting of i18n localizations of "KEY:NAME": "VALUE" so you
	* have to look up those translations following the same pattern.
	*/
	const locale = new Localization({ lng: 'en' })
    await locale.addMultipleIn("locales")
  
    console.log(locale.t('WELCOME:MAIN_MESSAGE')) // Welcome to x Server
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
