import { getRepositoryDetails } from '../../utils';

export interface Project {
	name: string;
	demoLink: string;
	tags?: string[];
	description?: string;
	postLink?: string;
	demoLinkRel?: string;
	[key: string]: any;
}

export const projects: Project[] = [
	{
		name: 'Un Dev Más',
		description: 'Antiguo blog en donde compartía recursos y tutoriales sobre desarrollo',
		demoLink: 'https://blog-un-dev-mas-7f0869.gitlab.io/',
		tags: ['Blog', 'Hobby']
	},
	{
		name: 'Neo Iptv',
		description: 'App para ver contenido de iptv.',
		demoLink: 'https://github.com/raksodiano/neo-iptv',
		tags: ['Iptv', 'App', 'Hobby']
	},
	{
		name: 'Tienda de Instituto Pacífico',
		description: 'Tienda de la empresa de Instituto Pacífico.',
		demoLink: 'https://tienda.institutopacifico.pe/',
		tags: ['Ecommerce', 'Trabajo']
	},
	{
		name: 'Einlima',
		description: 'Tienda de la Eescuela de Investigación y Negocios de Lima.',
		demoLink: 'https://einlima.pe/',
		tags: ['Ecommerce', 'Trabajo']
	},
	{
		name: 'Actualidad Civil',
		description: 'Actualidad Civil es una revista digital que muestra noticias y articulos sobre derechos civiles.',
		demoLink: 'https://actualidadcivil.pe/',
		tags: ['Vue', 'Laravel', 'Trabajo']
	},
	{
		name: 'Actualidad Gubernamental',
		description: 'Actualidad Gubernamental es una revista digital que muestra noticias y articulos sobre derecho gubernamental.',
		demoLink: 'https://actualidadgubernamental.pe/',
		tags: ['Vue', 'Laravel', 'Trabajo']
	},
	{
		name: 'Actualidad Empresarial',
		description: 'Actualidad Empresarial es una revista digital que muestra noticias y articulos sobre derecho empresarial.',
		demoLink: 'https://actualidadempresarial.pe/',
		tags: ['Vue', 'Laravel', 'Trabajo']
	},
	{
		name: 'Actualidad Penal',
		description: 'Actualidad Penal es una revista digital que muestra noticias y articulos sobre derecho penal.',
		demoLink: 'https://actualidadpenal.pe/',
		tags: ['Vue', 'Laravel', 'Trabajo']
	}
];
