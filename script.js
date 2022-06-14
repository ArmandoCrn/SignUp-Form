/*
Cosa scrivere quando si valida il form
Se premiamo il pulstante send e il campo è vuoto bisogna mostrare:
"Please complete this field"


altrimenti passiamo alla validazione mentre scriviamo, sempre col timer
dopo tipo 0.3/0.5 secondi che sia finito l'event input
se ci sono cose sbagliate nell'email, password e confirm pass
faremo comparire sotto ciò che è sbagliato:
i p saranne tutte rosse, avendo già in automatico la classe error

EMAIL: "Please enter a valid email address (min 6 caratteri)"; 

CONFIRM PASS: "Password mismatch"

PASSWORD:
Per la pass il discorso è diverso. Dovremo creare 3 p dove all'interno ci 
saranno rispettivamente
Minimum 8 characters
At least one number
At least one character

Man mano che le cose vengono rispettate aggiungeremo la class .correct,
facendo diventare verse il testo

OLTRE a far cambiare il testo, dovremo aggiungere agl'input sopracitati, tranne name
la classe .correct-input oppure .wrong-input

MI SA CHE L'ENTER NON DEVO METTERLO IO, C'è GIà IN AUTOMATICO.
*/
