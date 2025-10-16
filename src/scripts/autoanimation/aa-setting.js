export default class AASettings {
    static addCritAnimation() {
        if (game.modules.get('autoanimations')?.active) {
            game.settings.register('impmal-mini-qol', 'criticalAnimation', {
                name: 'Critical Effect',
                hint: 'This will play an effect on the token that gets hit by a critical',
                scope: 'world',
                config: true,
                type: String
            });
        }
    }
}
