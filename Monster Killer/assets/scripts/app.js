const ATTACK_VALUE=10;
const MONSTER_ATTACK_VALUE = 13;
const STRONG_ATTACK_VALUE = 15;
const HEAL_VALUE = 20;

const MODE_ATTACK='ATTACK';
const MODE_STRONG_ATTACK='STRONG_ATTACK';
const LOG_EVENT_PLAYER_ATTACK = 'PLAYER_ATTACK';
const LOG_EVENT_PLAYER_STRONG_ATTACK = 'PLAYER_STRONG_ATTACK';
const LOG_EVENT_MONSTER_ATTACK = 'MONSTER_ATTACK';
const LOG_EVENT_PLAYER_HEAL = 'PLAYER_HEAL';
const LOG_EVENT_GAME_OVER = 'GAMR_OVER';

const enteredValue = prompt('Enter maximum Life for you and the Monster','100');

let chosenMaxLife = parseInt(enteredValue);
if(isNaN(chosenMaxLife) || chosenMaxLife<=0){
    chosenMaxLife=100;
}

let currentMonsterHealth = chosenMaxLife;
let currentPlayerHealth = chosenMaxLife;
let hasBonusLife=true;
let battleLog=[];

adjustHealthBars(chosenMaxLife);

function writeToLog(ev, val, monsterHealth, playerHealth){
    let logEntry;
    if(ev === LOG_EVENT_PLAYER_ATTACK){
        logEntry = {
            event:ev,
            value: val,
            target: 'MONSTER',
            finalMonsterHealth: monsterHealth,
            finalPlayerHealth: playerHealth
        };
    }
        else if(ev===LOG_EVENT_PLAYER_STRONG_ATTACK){
            logEntry = {
                event:ev,
                value: val,
                target: 'MONSTER',
                finalMonsterHealth: monsterHealth,
                finalPlayerHealth: playerHealth
            };
        }
        else if(ev===LOG_EVENT_MONSTER_ATTACK){
            logEntry = {
                event:ev,
                value: val,
                target: 'PLAYER',
                finalMonsterHealth: monsterHealth,
                finalPlayerHealth: playerHealth
            };
        }
        else if(ev===LOG_EVENT_PLAYER_HEAL){
            logEntry = {
                event:ev,
                value: val,
                target: 'PLAYER',
                finalMonsterHealth: monsterHealth,
                finalPlayerHealth: playerHealth
            };
        }
        else if(ev===LOG_EVENT_GAME_OVER){
            logEntry = {
                event:ev,
                value: val,
                finalMonsterHealth: monsterHealth,
                finalPlayerHealth: playerHealth
            };
        }
    battleLog.push(logEntry);

}
function printLogHandler(){
    console.log(battleLog);
}

function reset(){
    currentPlayerHealth = chosenMaxLife;
    currentMonsterHealth = chosenMaxLife;
    resetGame(chosenMaxLife);
}



function endRound(){

    const initialPlayerHealth = currentPlayerHealth;
    const playerDamage = dealPlayerDamage(MONSTER_ATTACK_VALUE);
    currentPlayerHealth -= playerDamage;
    writeToLog(
        LOG_EVENT_MONSTER_ATTACK,
        playerDamage,
        currentMonsterHealth,
        currentPlayerHealth
    )

    if(currentPlayerHealth<=0 && hasBonusLife){
        hasBonusLife=false;
        removeBonusLife();
        currentPlayerHealth = initialPlayerHealth;
        setPlayerHealth(initialPlayerHealth);
        alert('you would have died but you had the bonus life');
    }

    if(currentMonsterHealth<=0 && currentPlayerHealth>0){
        alert('YOU WON!!!!');
        writeToLog(LOG_EVENT_GAME_OVER,
            'PLAYER WON',
            currentMonsterHealth,
            currentPlayerHealth);
    }
    else if(currentPlayerHealth<=0 && currentMonsterHealth>0){
        alert('YOU LOST');
        writeToLog(LOG_EVENT_GAME_OVER,
            'MONSTER WON',
            currentMonsterHealth,
            currentPlayerHealth);
    }
    else if(currentPlayerHealth<=0 && currentMonsterHealth<=0){
        alert('We Have a DRAW!!!!');
        writeToLog(LOG_EVENT_GAME_OVER,
            'DRAW',
            currentMonsterHealth,
            currentPlayerHealth);
    }

    if(currentPlayerHealth<=0 || currentMonsterHealth<=0){
        reset();
    }
}

function attackMonster(mode){
    let maxdamage;
    let logEvent;
    if(mode===MODE_ATTACK){
        maxdamage=ATTACK_VALUE;
        logEvent= LOG_EVENT_PLAYER_ATTACK
    }
    else{
        maxdamage=STRONG_ATTACK_VALUE;
        logEvent=LOG_EVENT_PLAYER_STRONG_ATTACK;
    }

    const damage = dealMonsterDamage(maxdamage);
    currentMonsterHealth -= damage;
    writeToLog(logEvent,
        damage,
        currentMonsterHealth,
        currentPlayerHealth);

    endRound();
}

function attackHandler(){
    attackMonster(MODE_ATTACK);
}

function strongAttackHandler (){
    attackMonster(MODE_STRONG_ATTACK);
}

function healPlayerHandler(){
    let healValue;
    if(currentPlayerHealth>chosenMaxLife-HEAL_VALUE){
        alert("you can't heal more than max life");
        healValue = chosenMaxLife - currentPlayerHealth;
    }
    else {
        healValue = HEAL_VALUE;
    }
    increasePlayerHealth(healValue);
    currentPlayerHealth+=healValue;
    writeToLog(LOG_EVENT_PLAYER_HEAL,
        healValue,
        currentMonsterHealth,
        currentPlayerHealth);
    
    endRound();
}

logBtn.addEventListener('click', printLogHandler);
healBtn.addEventListener('click', healPlayerHandler );
attackBtn.addEventListener('click', attackHandler);
strongAttackBtn.addEventListener('click', strongAttackHandler);