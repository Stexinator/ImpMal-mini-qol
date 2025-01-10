import AASettings from './autoanimation/aa-setting.js';
import AutoCritHandling from './npcs/autokill.js';

Hooks.once('ready', function () {
    if (game.users.activeGM !== game.user) return;
    AASettings.addCritAnimation();
});

Hooks.on('createChatMessage', async function (message) {
    if (game.users.activeGM !== game.user) return;
    AutoCritHandling.handleCrit(message);
});

Hooks.on('updateChatMessage', async function (message) {
    if (game.users.activeGM !== game.user) return;
    AutoCritHandling.handleCrit(message);
});
