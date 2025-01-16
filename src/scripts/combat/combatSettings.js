export default class CombatSettings {
    static addCombatSetting() {
        game.settings.register('impmal', 'impmal-miniqol-showNpcCrit', {
            name: 'Show NPC Critical in Chat',
            hint: 'If checked the critical will be posted to chat and added to the npc. Else it will silently add it to the npc',
            scope: 'world',
            config: true,
            type: Boolean
        });
    }
}
