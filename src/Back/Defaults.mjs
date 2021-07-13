/**
 * Plugin level constants (hardcoded configuration).
 */
export default class Fl64_Habr_Back_Defaults {
    CLI_PREFIX = 'demo';
    /** @type {TeqFw_Di_Back_Defaults} */
    MOD_DI;

    constructor(spec) {
        this.MOD_DI = spec['TeqFw_Di_Back_Defaults$'];
        Object.freeze(this);
    }
}
