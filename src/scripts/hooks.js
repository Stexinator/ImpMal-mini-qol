import AASettings from './autoanimation/aa-setting.js';
import AutoCritHandling from './combat/autokill.js';
import CombatSettings from './combat/combatSettings.js';

Hooks.once('ready', function () {
    if (game.users.activeGM !== game.user) return;
    AASettings.addCritAnimation();
    CombatSettings.addCombatSetting();
});

Hooks.on('createChatMessage', async function (message) {
    if (game.users.activeGM !== game.user) return;
    AutoCritHandling.handleCrit(message);
});

Hooks.on('updateChatMessage', async function (message) {
    if (game.users.activeGM !== game.user) return;
    AutoCritHandling.handleCrit(message);
});
