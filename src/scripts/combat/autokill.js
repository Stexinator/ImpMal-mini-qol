export default class AutoCritHandling {
    static moduleName = 'impmal-mini-qol';
    static critComputed = 'critComputed';

    static handleCrit(message) {
        if (actor.type != 'npc') {
            return;
        }

        if (message.system.result?.critical && !message.getFlag(this.moduleName, this.critComputed)) {
            this.addAttackCrit(message);
        }

        if (message.system.applied?.critical && !message.getFlag(this.moduleName, this.critComputed)) {
            this.addOpposedCrit(message);
        }
    }

    static killOnCrit(actor) {
        if (actor.type != 'npc' || actor.statuses.has('dead')) return;

        let currentCriticals = actor.system.combat.criticals.value;
        let maxCriticals = actor.system.combat.criticals.max;

        if (currentCriticals + 1 >= maxCriticals) {
            actor.toggleStatusEffect('dead', { overlay: true });
            return;
        }
    }

    static async addAttackCrit(message) {
        var dom = document.createElement('div');
        dom.innerHTML = message.content;
        let critSection = dom.querySelector('.critical');

        if (!critSection) return;

        let key = critSection.dataset.table;
        let formula = critSection.dataset.formula;

        let crit = await ImpMalTables.rollTable(key, formula, {
            showRoll: false,
            showResult: game.settings.get('impmal', 'impmal-miniqol-showNpcCrit')
        });

        let item = await game.impmal.utility.findId(crit.documentId);

        message.system.context.targetSpeakers.map(async speaker => {
            let actor = ChatMessage.getSpeakerActor(speaker);
            await actor.createEmbeddedDocuments('Item', [item]);
        });
        message.setFlag(this.moduleName, this.critComputed, true);

        message.system.context.targetSpeakers.map(speaker => {
            let actor = ChatMessage.getSpeakerActor(speaker);

            this.killOnCrit(actor);
        });
    }

    static async addOpposedCrit(message) {
        var dom = document.createElement('div');
        dom.innerHTML = message.content;
        let critSection = dom.querySelector('.critical')?.querySelector('.table-roll');

        if (!critSection) return;

        let key = critSection.dataset.table;
        let formula = critSection.dataset.formula;

        let crit = await ImpMalTables.rollTable(key, formula, {
            showRoll: false,
            showResult: game.settings.get('impmal', 'impmal-miniqol-showNpcCrit')
        });

        let item = await game.impmal.utility.findId(crit.documentId);

        let actor = fromUuidSync(message.system.targetTokenUuid).actor;
        await actor.createEmbeddedDocuments('Item', [item]);
        message.setFlag(this.moduleName, this.critComputed, true);

        this.killOnCrit(actor);
    }
}
