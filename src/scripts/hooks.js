Hooks.once("init", function() {

if (game.modules.get("autoanimations")?.active) {
        game.settings.register("autoanimations", "criticalAnimation", {
            name: "Critical Effect",
            hint: "This will play an effect on the token that gets hit by a critical",
            scope: "world",
            config: true,
            type: String
        });
    }
});