export default class AutoCritHandling {
    static handleCrit(message) {
        if (message.system.class != 'WeaponTest') return;
        if (!message.system.result.critical) return;

        this.killOnCrit(message);
        this.addCrit(message);
    }

    static killOnCrit(message) {
        message.system.context.targetSpeakers.map(speaker => {
            let actor = ChatMessage.getSpeakerActor(speaker);

            if (actor.type != 'npc' || actor.statuses.has('dead')) return;

            let currentCriticals = actor.system.combat.criticals.value;
            let maxCriticals = actor.system.combat.criticals.max;

            if (currentCriticals + 1 >= maxCriticals) {
                actor.toggleStatusEffect('dead');
                return;
            }
        });
    }

    static async addCrit(message) {
        var dom = document.createElement('div');
        dom.innerHTML = message.content;
        let element = dom.querySelector('.critical');

        if (!element) return;

        let key = element.dataset.table;
        let formula = element.dataset.formula;

        let crit = await ImpMalTables.rollTable(key, formula, {
            showRoll: false,
            showResult: game.settings.get('impmal', 'impmal-miniqol-showNpcCrit')
        });

        let item = await game.impmal.utility.findId(crit.documentId);

        message.system.context.targetSpeakers.map(speaker => {
            let actor = ChatMessage.getSpeakerActor(speaker);
            actor.createEmbeddedDocuments('Item', [item]);
        });
    }
}
