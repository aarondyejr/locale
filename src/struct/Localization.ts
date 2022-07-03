import {Dirent, readdir} from "fs";
import { resolve } from "path";

export class Localization {
	public locales: Map<string, any> = new Map();
	private options: { lng: string };
	constructor(options: { lng: string }) {
		this.options = options
	}

	public t<T>(key: string, locale?: string): T | string {
		const contents = this.locales.get(locale ?? this.options.lng);

		const data = contents[key]

		return data === undefined ? `${key} was not found. Check your spelling/make sure you are looking in the right localization.` : data;
	}

	public async addMultipleIn(directory: string, options: { subdirectories?: boolean } = {}) {
		options = Object.assign({subdirectories: true}, options)

		const files: Array<string> = await this._getFiles(directory, options.subdirectories)

		for (let file of files) {
			if(!file.endsWith('json'))  continue;

			const filepath = resolve(directory, file)
			try {
				let importedLocale = require(filepath)

				if(typeof importedLocale === 'object') {
					this.locales.set(file.split('.')[0], importedLocale)
				}
			} catch (error: any) {
				throw new Error(error)
			}
		}

	}

	private async _getFiles(directory: string, subdirectories?: boolean): Promise<Array<string>> {
		if(subdirectories) {
			const dirents: Array<Dirent> = await new Promise((resolve, reject) => {
				readdir(directory, { withFileTypes: true }, (err: Error | null, files: Array<Dirent>) => {
					if(err) reject(err)
					else resolve(files)
				});
			});

			const names: Array<string> = [];
			for (let folder of dirents.filter((dirent) => dirent.isDirectory())) {
				const files = await this._getFiles(`${directory}/${folder.name}`, subdirectories)
				for(let name of files) {
					names.push(`${folder.name}/${name}`)
				}
			}

			for(let file of dirents.filter((dirent) => dirent.isFile())) {
				names.push(file.name)
			}
			return names;
		} else {
			const names: Array<string> = await new Promise((resolve, reject) => {
				readdir(directory, (err: Error | null, files: Array<string>) => {
					if(err) reject(err)
					else resolve(files)
				})
			})

			return names;
		}
	}
}