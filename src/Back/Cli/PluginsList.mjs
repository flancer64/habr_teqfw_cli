/**
 * Get list of installed plugins.
 *
 * @namespace Fl64_Habr_Back_Cli_PluginsList
 */
// MODULE'S IMPORT
import {join} from 'path';

// DEFINE WORKING VARS
const NS = 'Fl64_Habr_Back_Cli_PluginsList';
const OPT_SHORT = 'short';
const OPT_FULL = 'full';

// DEFINE MODULE'S FUNCTIONS
/**
 * Factory to create CLI command.
 *
 * @param {TeqFw_Di_Shared_SpecProxy} spec
 * @returns {TeqFw_Core_Back_Api_Dto_Command}
 * @memberOf Fl64_Habr_Back_Cli_PluginsList
 */
function Factory(spec) {
    // EXTRACT DEPS
    /** @type {Fl64_Habr_Back_Defaults} */
    const DEF = spec['Fl64_Habr_Back_Defaults$'];
    /** @type {TeqFw_Core_Back_Scan_Plugin_Registry} */
    const registry = spec['TeqFw_Core_Back_Scan_Plugin_Registry$'];
    /** @type {Function|TeqFw_Core_Back_Api_Dto_Command.Factory} */
    const fCommand = spec['TeqFw_Core_Back_Api_Dto_Command#Factory$'];
    /** @type {TeqFw_Core_Back_Api_Dto_Command_Option.Factory} */
    const fOpt = spec['TeqFw_Core_Back_Api_Dto_Command_Option#Factory$'];
    /** @type {TeqFw_Di_Back_Api_Dto_Plugin_Desc.Factory} */
    const fDesc = spec['TeqFw_Di_Back_Api_Dto_Plugin_Desc#Factory$'];

    // DEFINE INNER FUNCTIONS
    /**
     * Command action.
     * @param {Object} opts typed options
     * @returns {Promise<void>}
     * @memberOf Fl64_Habr_Back_Cli_PluginsList
     */
    const action = async function (opts) {
        const items = registry.items();
        for (const item of items) {
            const name = item.name;
            const desc = fDesc.create(item.teqfw[DEF.MOD_DI.DESC_NODE]);
            const ns = desc.autoload.ns;
            const src = desc.autoload.path;
            const path = join(item.path, src);
            if (opts[OPT_SHORT]) {
                console.log(`${name}: ${ns}`);
            } else if (opts[OPT_FULL]) {
                console.log(`${name}: ${ns} => ${path}`);
            } else {
                console.log(name);
            }
        }
        console.log(`\nTotal: ${items.length} teq-plugins.`);
    };
    Object.defineProperty(action, 'name', {value: `${NS}.${action.name}`});

    // COMPOSE RESULT
    const res = fCommand.create();
    res.realm = DEF.CLI_PREFIX;
    res.name = 'plugins-list';
    res.desc = 'Get list of teq-plugins.';
    res.action = action;
    // add option --short
    const optShort = fOpt.create();
    optShort.flags = `-s, --${OPT_SHORT}`;
    optShort.description = 'get plugins names and namespaces';
    res.opts.push(optShort);
    // add option --full
    const optFull = fOpt.create();
    optFull.flags = `-f, --${OPT_FULL}`;
    optFull.description = 'get plugins names, namespaces and path to the sources directory';
    res.opts.push(optFull);
    return res;
}

// MODULE'S EXPORT
Object.defineProperty(Factory, 'name', {value: `${NS}.${Factory.constructor.name}`});
export default Factory;
