/**
 * Import Dependency
 */
import Vue from 'vue'
import VueI18n from 'vue-i18n'

/**
 * Import Language
 */
import es_template from '@/local/languages/en_US'

/**
 * Config
 */
Vue.use(VueI18n)

/**
 * Export
 */
const i18n  = new VueI18n({
	locale: 'es',
	messages: {
		es: es_template
		// , en: en_template
	}
});

export default i18n;