資工三 403410002 陳威澄 403410053 林宏濱  
Team name: 隊名取啥?WTF?好 

This README file is written by 陳威澄

URL of this website: http://dmplus.cs.ccu.edu.tw:49432/project/main.html  
URL of repository of this website: https://github.com/Acaki/WWW_project/tree/build    
**Please head to github repository to get better view of this document**

Description
====================
This website is a shoot'em up game currently contains a full level include 10 waves of enemies and a boss fight.  
For playing this game, head to the website and hit 'Enter' to start the game, for other game rules and controls  
please refer to the section down below.

Game rule and controls
=========
### Player controls
* Press up, down, left, right arrow keys to move to the corresponding direction.  
* Press 'space bar' to shoot.  
* Press and hold 'shift' to slow down the moving speed of the player plane.  

### Game rules
* A player has 50 lifes in a game, player plane will explode when it hit any bullets on the screen and the number of player  
lifes will be substracted by 1.
* There are 3 types of weapon, each has individual damage value, bullet speed and fire angle/pattern.
* There are weapon power-ups that will be dropped from the top of the screen at some designed timings, when the player  
get a power-up that has different color with player's current weapon, the weapon will be switched to the one that the
player obtained, but the power level remains the same. When the player get a power-up that has the same color with current
one, the weapon will be upgraded which lead to more damage value and range.

System requirements
===================
* **Important !!!** Your desktop resolution should be at least 800 pixels tall to display the game correctly, otherwise, you  
can adjust browser's zoom-in scale (ctrl + mouse wheel up/down for chrome) to adjust the game display, or press F11 to enter fullscreen mode

* Please note that this game contains very large amount of moving bullet objects and may slow down your computer, this should not
be an issue for modern computers since the game is already heavily optimized by myself (The computer used in our project demo is an ancient
one, unfortunately).
If you by any chance encounter any performance issue, 
feel free to report your basic hardware info for me to further optimize the game.

Other notes
===========
This game is programmed using Phaser framework (https://phaser.io/), there are 1300+ lines of javascript code which contains 100+
hours of work to complete, it may seems to be an easy one but it really is not. There are more improvements for the game to be made
such like more levels, more weapons, more friendly power-ups mechanism, bomb weapons for the player ... etc, due to my very limited
time those features will be implement in some future that I have some free time.  
This game is inspired by the good old Raiden series and Touhou Project series. The free materials used in the game is made by Kenney (https://opengameart.org/users/kenney)
