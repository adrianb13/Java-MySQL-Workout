USE workout_db;
INSERT INTO Step(name, reps, description)
VALUES(
	"Push-ups", 25, "Normal"
), (
	"Pull-ups", 10, "Normal"
), (
	"Wide Push-ups", 25, "Hands/Arms wider than shoulder width apart"
), (
	"Wide Pull-ups", 10, "Hands wider than shoulder width apart"
), (
	"Military Push-ups", 25, "Hands/Arms placed close to the body"
), (
	"Close-grip Chin-ups", 10, "Hands placed next to each other. Hands open to you."
), (
	"Offset Push-ups", 25, "One hand normal-width forward, one hand military. Then repeat opposite hands"
), (
	"Neutral-grip Chin-ups", 10, "Hands facing each other."
);

USE workout_db;
SELECT * FROM Step;