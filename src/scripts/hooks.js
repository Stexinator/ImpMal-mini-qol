import AASettings from './autoanimation/aa-setting.js';
import AutoCritHandling from './combat/autoCrit.js';
import CombatSettings from './combat/combatSettings.js';
import InitativeHandling from './combat/deleteIni.js';

Hooks.once('ready', function () {
    if (game.users.activeGM !== game.user) return;
    AASettings.addCritAnimation();
    CombatSettings.addCombatSetting();
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
