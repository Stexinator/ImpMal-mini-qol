export default class CombatSettings {
    static moduleName = 'impmal-mini-qol';

    static addCombatSetting() {
        game.settings.register(this.moduleName, 'autoCritKillNpcs', {
            name: 'Automatically add crits to NPCs',
            hint: 'Additionally it kills NPCs that are over max critical wounds',
            scope: 'world',
            config: true,
            type: Boolean
        });

        game.settings.register(this.moduleName, 'showNpcCrit', {
            name: 'Show NPC Critical in Chat',
            hint: 'If checked the critical will be posted to chat and added to the npc. Else it will silently add it to the npc',
            scope: 'world',
            config: true,
            type: Boolean
        });

        game.settings.register(this.moduleName, 'deleteIniMessage', {
            name: 'Delete Initiative rolls in chat',
            scope: 'world',
            config: true,
            type: Boolean
        });
    }
}
