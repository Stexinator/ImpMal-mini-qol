import AutoCritHandling from './combat/autoCrit.js';
import CombatSettings from './combat/combatSettings.js';
import InitativeHandling from './combat/deleteIni.js';

Hooks.once('ready', async function () {
    if (game.users.activeGM !== game.user) return;
    CombatSettings.addCombatSetting();

    foundry.applications.api.DialogV2.prompt({
        window: { title: 'ImpMal QoL Deprecated' },
        content:
            '<p>ImpMal Mini QoL is deprecated. The functionality was added to https://foundryvtt.com/packages/impmal-community</p>'
    });
});

Hooks.on('preCreateChatMessage', function (message) {
    if (game.users.activeGM !== game.user) return;
    return InitativeHandling.handleIniRoll(message);
});

Hooks.on('createChatMessage', async function (message) {
    if (game.users.activeGM !== game.user) return;
    AutoCritHandling.handleCrit(message);
});

Hooks.on('updateChatMessage', async function (message) {
    if (game.users.activeGM !== game.user) return;
    AutoCritHandling.handleCrit(message);
});
