"use strict"
// =============================================================================
// REGION HEIGHTS
// =============================================================================
//
// =============================================================================
// Software: RPG MAKER MV
// FileName: Sam_RegionHeights.js
// Author: Sam
// =============================================================================
//
// =============================================================================
// Versions:
// 1.0 - 24/07/2018
// 		 beta
//
// 1.1 - 25/07/2018
//       added some usefull functions
//
// 1.2 - 25/07/2018
//       player will automatically fall when going into lower heights
//
// 1.3 - 26/07/2018
//       added some parameters: JumpSpeed, AutoFall
//
// 1.4 - 27/07/2019
//       added OverWrite parameter
//
// 1.5 - 30/07/2018
//       brand new way of handling movements using moveRoutes !
//
// 1.6 - 03/08/2018
//       added Ground Change Common Events
//       ability to call a common event when going into or leaving a ground
// 
// 1.7 - 03/08/2018
//       added ladder grounds (9)
// =============================================================================
//

var Imported = Imported || {};
Imported.Sam_RegionHeights = true;

var Sam = Sam || {};
Sam.RH = Sam.RH || {};
Sam.RH.version = 1.7;

//
// =============================================================================
/*:
 *
 * @plugindesc Region Heights - Use regions to define map's different heights
 * Altitudes des régions - Définit les niveaux de la maps avec les régions
 *
 * @author Sam
 *
 * @param NormalSpeed
 * @desc Define how fast the player walks
 * Définit la vitesse de marche
 * @default 4
 *
 * @param FallSpeed
 * @desc Define how fast the player must fall
 * Définit la vitesse de chute
 * @default 6
 *
 * @param AutoFall
 * @desc Player will fall automatically when going into lower regions
 * Le joueur tombe quand il se rend dans des niveaux plus bas
 * @default false
 *
 * @param AutoClimb
 * @desc Player will automatically climb when going into higher regions
 * Le joueur escalade quand il se rend dans des niveaux plus hauts
 * @default false
 *
 * @param OverWrite
 * @desc OverWrite "Game_Player.prototype.canPass" ?
 * @default true
 *
 * @param Ground Change Events
 * @default
 *
 * @param Ground Change To 0
 * @parent Ground Change Events
 * @type common_event 
 * @desc The common event to call when going to this ground.
 * Set to 0 if you don't wish for a common event to call.
 * @default 0
 *
 * @param Ground Change From 0
 * @parent Ground Change Events
 * @type common_event
 * @desc The common event to call when leaving this ground.
 * Set to 0 if you don't wish for a common event to call.
 * @default 0
 *
 * @param Ground Change To 1
 * @parent Ground Change Events
 * @type common_event 
 * @desc The common event to call when going to this ground.
 * Set to 0 if you don't wish for a common event to call.
 * @default 0
 *
 * @param Ground Change From 1
 * @parent Ground Change Events
 * @type common_event
 * @desc The common event to call when leaving this ground.
 * Set to 0 if you don't wish for a common event to call.
 * @default 0
 *
 * @param Ground Change To 2
 * @parent Ground Change Events
 * @type common_event 
 * @desc The common event to call when going to this ground.
 * Set to 0 if you don't wish for a common event to call.
 * @default 0
 *
 * @param Ground Change From 2
 * @parent Ground Change Events
 * @type common_event
 * @desc The common event to call when leaving this ground.
 * Set to 0 if you don't wish for a common event to call.
 * @default 0
 *
 * @param Ground Change To 3
 * @parent Ground Change Events
 * @type common_event 
 * @desc The common event to call when going to this ground.
 * Set to 0 if you don't wish for a common event to call.
 * @default 0
 *
 * @param Ground Change From 3
 * @parent Ground Change Events
 * @type common_event
 * @desc The common event to call when leaving this ground.
 * Set to 0 if you don't wish for a common event to call.
 * @default 0
 *
 * @param Ground Change To 4
 * @parent Ground Change Events
 * @type common_event 
 * @desc The common event to call when going to this ground.
 * Set to 0 if you don't wish for a common event to call.
 * @default 0
 *
 * @param Ground Change From 4
 * @parent Ground Change Events
 * @type common_event
 * @desc The common event to call when leaving this ground.
 * Set to 0 if you don't wish for a common event to call.
 * @default 0
 *
 * @param Ground Change To 5
 * @parent Ground Change Events
 * @type common_event 
 * @desc The common event to call when going to this ground.
 * Set to 0 if you don't wish for a common event to call.
 * @default 0
 *
 * @param Ground Change From 5
 * @parent Ground Change Events
 * @type common_event
 * @desc The common event to call when leaving this ground.
 * Set to 0 if you don't wish for a common event to call.
 * @default 0
 *
 * @param Ground Change To 6
 * @parent Ground Change Events
 * @type common_event 
 * @desc The common event to call when going to this ground.
 * Set to 0 if you don't wish for a common event to call.
 * @default 0
 *
 * @param Ground Change From 6
 * @parent Ground Change Events
 * @type common_event
 * @desc The common event to call when leaving this ground.
 * Set to 0 if you don't wish for a common event to call.
 * @default 0
 *
 * @param Ground Change To 7
 * @parent Ground Change Events
 * @type common_event 
 * @desc The common event to call when going to this ground.
 * Set to 0 if you don't wish for a common event to call.
 * @default 0
 *
 * @param Ground Change From 7
 * @parent Ground Change Events
 * @type common_event
 * @desc The common event to call when leaving this ground.
 * Set to 0 if you don't wish for a common event to call.
 * @default 0
 *
 * @param Ground Change To 8
 * @parent Ground Change Events
 * @type common_event 
 * @desc The common event to call when going to this ground.
 * Set to 0 if you don't wish for a common event to call.
 * @default 0
 *
 * @param Ground Change From 8
 * @parent Ground Change Events
 * @type common_event
 * @desc The common event to call when leaving this ground.
 * Set to 0 if you don't wish for a common event to call.
 * @default 0
 *
 * @param Ground Change To 9
 * @parent Ground Change Events
 * @type common_event 
 * @desc The common event to call when going to this ground.
 * Set to 0 if you don't wish for a common event to call.
 * @default 0
 *
 * @param Ground Change From 9
 * @parent Ground Change Events
 * @type common_event
 * @desc The common event to call when leaving this ground.
 * Set to 0 if you don't wish for a common event to call.
 * @default 0
 *
 * @help
 * =============================================================================
 *                         Region Heights (EN)
 * =============================================================================
 *
 * This plugin will allow you to use regions to define the different heights 
 * of your maps.
 *
 * HOW DOES IT WORK ?
 *
 * The first digits of each region defines the elevation of the region.
 * We will call this the Region Height or RegionZ.
 *
 * The last digit defines the type of ground of the region.
 * We will call this the Region Ground or RegionG.
 *
 * Region Grounds can be used at you convenience, 
 * Nevertheless, note that :
 *  - Region Ground 5 is used for half heights : the elevation between 
 *    2 altitudes (for exaple stairs, ramps, ...)
 *  - Region Ground 9 is used for ladders, cords, ...
 *
 * For example I could decide to use RegionG 0 for normal grounds 
 * (by default),
 * And RegionG 1 for water regions.
 * Regions 10, 20, 30, ... will be normal grounds at heights 1, 2, 3, ...
 * And regions 11, 21, 31, ... will be water grounds at same heights 
 * (1, 2, 3, ...)
 *
 * /!\ IMPORTANT /!\
 * Region 0 MUST ONLY be used for walls
 * Note that you can also use no regions in that case.
 *
 * 
 * To get the height of a region you can use this function :
 * Sam.RH.RegionZ(regionId)
 * Which basically does this :
 * Math.floor(regionId / 10.);
 * 
 * To get the last digit you can use this function :
 * Sam.RH.RegionG(RegionId)
 * Which basically does this :
 * RegionId - Math.floor(regionId / 10.) * 10
 *
 *
 * =============================================================================
 *                     Altitudes des régions (FR)
 * =============================================================================
 * 
 * Ce module a pour but d'associer chaque régions à différentes altitudes, 
 * afin de donner un semblant de relief à votre map.
 * Le fonctionnement est le suivant :
 * Les premiers chiffres de chaque région définissent la hauteur du terrain.
 * Le dernier chiffre peut être utiliser comme bon vous semble, 
 * Avec pour exception le chiffre 5, utilisé pour définir le niveau entre 
 * 2 altitudes (par exemple des escaliers, une rampe, ...)
 * Par example la région 25 est utilisée pour des escaliers entre 
 * la région 10 et la région 20.
 * 
 * Par exmple, par défaut le dernier chiffre est utilisé pour 
 * les terrains "normaux"
 * Je peux décider d'utiliser le chiffre 1 pour les terrains aquatiques. 
 * Ce qui me donnerait :
 * Les régions 10, 20, 30, ... pour les terrains basiques 
 * d'altitudes 1, 2, 3, ...
 * Et les régions 11, 21, 31, ... pour les terrains aquatiques 
 * de mêmes altitudes (1, 2, 3, ...)
 *
 *
 *=============================================================================
 *                         How to use commands (EN) 
 * =============================================================================
 * 
 * To use the different commands, I advocate that you use some plugin 
 * to bind common events to buttons
 * For example YEP_ButtonCommonEvents suits really well
 * All those commands can be uses inside scripts or plugin commands 
 * as following :
 *
 * 
 * =============================================================================
 *                   Comment utiliser les commandes (FR) 
 * =============================================================================
 * 
 * Pour utiliser les différentes commandes, je vous conseile d'utiliser 
 * un module pour lier vos évènements communs à des boutons.
 * Toutes ces commandes peuvent être utilisées en tant que scripts
 * ou commandes de modules de cette manière :
 *
 *
 * =============================================================================
 *                                COMMANDS
 * =============================================================================
 *
 * /// JUMP ///
 *
 * desc :           Character will make a smart jump of 0, 1 or 2 tiles 
 *                  and fall down if he has to.
 *
 * script :         $gamePlayer.Sam_RH_Jump();
 * plugin command : Sam_RH_Jump
 *
 *
 * /// FALL DOWN ///
 * 
 * desc :           Character will try to fall down a cliff if possible
 *
 * script :         $gamePlayer.Sam_RH_FallDown();S
 * plugin command : Sam_RH_FallDown
 * 
 * /// CLIMB UP ///
 *
 * desc :           Character will try to climb a cliff if possible
 *
 * script :         $gamePlayer.Sam_RH_ClimbUp();
 * plugin command : Sam_RH_ClimbUp
 *
 *
 * /// GET INFO ///
 *
 * desc :           Will give you some informations about the character
 *
 * script :         $gamePlayer.Sam_RH_getInfo();
 * plugin command : Sam_RH_getInfo
 *
 *
 * =============================================================================
 *                   PLUGIN REGION HEIGHTS BY SAM 
 * =============================================================================
 */


// 

(function() {

	// =============================================================================
	// Parameters 
	// =============================================================================

	Sam.RH.parameters = PluginManager.parameters('Sam_RegionHeights');

	Sam.RH.NormalSpeed = Number(Sam.RH.parameters["NormalSpeed"]);
	Sam.RH.FallSpeed = Number(Sam.RH.parameters["FallSpeed"]);

	Sam.RH.AutoFall = (Sam.RH.parameters["AutoFall"] == 'true');
	Sam.RH.AutoClimb = (Sam.RH.parameters["AutoClimb"] == 'true');

	Sam.RH.OverWrite = (Sam.RH.parameters["OverWrite"] == 'true');


	// =============================================================================
	// Direction
	// =============================================================================

	Sam.RH.direction = function(d){
		return {
			x: ((d - 1) % 3) -1,
			y: 1 - Math.trunc((d - 1)/3.)
		}
	}

	Sam.RH.playerDirection = function(){
		return this.direction($gamePlayer.direction());
	}


	// =============================================================================
	// Region Position
	// =============================================================================

	Sam.RH.RegionPos = function(regionx, regiony){
		return {
			x: regionx,
			y: regiony
		}
	}

	Sam.RH.PlayerRegionPos = function(){
		return {
			x: $gamePlayer.x,
			y: $gamePlayer.y
		}
	}

	Sam.RH.NearbyRegionPos = function(pos, d){
		var direction = this.direction(d);
		return this.RegionPos(pos.x + direction.x, pos.y + direction.y);
	}

	Sam.RH.NearbyPlayerRegionPos = function(d){
		return this.NearbyRegionPos(this.PlayerRegionPos(), d);
	}

	Sam.RH.LookingPlayerRegionPos = function(){
		return this.NearbyPlayerRegionPos($gamePlayer.direction());
	}

	Sam.RH.JumpingRegionPos = function(pos, d){
		switch (d){
			case 2: 
				return this.RegionPos(pos.x, pos.y + 2);
				break;
			case 4: 
				return this.RegionPos(pos.x - 2, pos.y);
				break;
			case 6: 
				return this.RegionPos(pos.x + 2, pos.y);
				break;
			case 8: 
				return this.RegionPos(pos.x, pos.y - 2);
				break;

		}
	}

	Sam.RH.JumpingPlayerRegionPos = function(){
		return this.JumpingRegionPos(this.PlayerRegionPos(), $gamePlayer.direction());
	}

	Sam.RH.ClimbingRegionPos = function(pos, d){
		switch (d){
			case 2: 
				return this.NearbyRegionPos(pos, 2);
				break;
			case 4: 
				return this.NearbyRegionPos(pos, 7);
				break;
			case 6: 
				return this.NearbyRegionPos(pos, 9);
				break;
			case 8: 
				return this.JumpingRegionPos(pos, 8);
				break;

		}
	}

	Sam.RH.ClimbingPlayerRegionPos = function(){
		return this.ClimbingRegionPos(this.PlayerRegionPos(), $gamePlayer.direction());
	}

	Sam.RH.FallingRegionPos = function(pos, d){
		switch (d){
			case 2: 
				return this.NearbyRegionPos(pos, 2);
				break;
			case 4: 
				return this.NearbyRegionPos(pos, 1);
				break;
			case 6: 
				return this.NearbyRegionPos(pos, 3);
				break;
			case 8: 
				return this.NearbyRegionPos(pos, 8);
				break;

		}
	}

	Sam.RH.FallingPlayerRegionPos = function(){
		return this.FallingRegionPos(this.PlayerRegionPos(), $gamePlayer.direction());
	}

	
	// =============================================================================
	// Region Id
	// =============================================================================

	Sam.RH.RegionId = function(pos){
		var regionId = $gameMap.regionId(pos.x, pos.y);
		return (regionId) ? regionId : 0;
	}

	Sam.RH.NearbyRegionId = function(pos, d){
		return this.RegionId(this.NearbyRegionPos(pos, d));
	}

	Sam.RH.NearbyPlayerRegionId = function(d){
		return this.RegionId(this.NearbyPlayerRegionPos(d));
	}

	Sam.RH.PlayerRegionId = function(){
		return this.RegionId(this.PlayerRegionPos());
	}

	Sam.RH.LookingPlayerRegionId = function(){
		return this.RegionId(this.LookingPlayerRegionPos());
	}

	Sam.RH.JumpingRegionId = function(pos, d){
		return this.RegionId(this.JumpingRegionPos(pos, d));
	}

	Sam.RH.JumpingPlayerRegionId = function(){
		return this.RegionId(this.JumpingPlayerRegionPos());
	}

	Sam.RH.ClimbingRegionId = function(pos, d){
		return this.RegionId(this.ClimbingRegionPos());
	}

	Sam.RH.ClimbingPlayerRegionId = function(){
		return this.RegionId(this.ClimbingPlayerRegionPos());
	}

	Sam.RH.FallingRegionId = function(pos, d){
		return this.RegionId(this.FallingRegionPos(pos, d));
	}

	Sam.RH.FallingPlayerRegionId = function(){
		return this.RegionId(this.FallingPlayerRegionPos());
	}


	// =============================================================================
	// Event Id/IdZ/PosZ
	// =============================================================================

	Sam.RH.eventId = function(pos){
		return $gameMap.eventIdXy(pos.x, pos.y);
	}

	Sam.RH.eventIdZ = function(eventId){
		return eventId ? Number($dataMap.events[eventId].meta.height) : 0;
	}

	Sam.RH.eventPosZ = function(pos){
		return this.eventIdZ(this.eventId(pos));
	}


	// =============================================================================
	// Region Z
	// =============================================================================

	Sam.RH.TileZ = function(pos){
		return Math.floor(this.RegionId(pos) / 10.);
	}

	Sam.RH.RegionZ = function(pos){
		for (var i = 1; i <= 3; i++) {
			var eventPos = this.RegionPos(pos.x, pos.y + i);
			var eventId = this.eventId(eventPos);
			if (eventId){
				var eventZ = this.eventIdZ(eventId);
				if (eventZ > 0 && eventZ <= i  && $dataMap.events[eventId].meta.pillar){
					var posZ = {
						x : pos.x,
						y : pos.y + eventZ
					}
					return eventZ + this.TileZ(posZ);			
				}
			}
		}
		var eventPos = this.RegionPos(pos.x, pos.y);
		var eventId = this.eventId(eventPos);
			if (eventId){
			var eventZ = this.eventIdZ(eventId);
			if (eventZ > 0 && $dataMap.events[eventId].meta.platform){
				return eventZ;
			}
		}
		return this.TileZ(pos);
	}

	Sam.RH.PlayerRegionZ = function(){
		return this.RegionZ(this.PlayerRegionPos());
	}

	Sam.RH.NearbyRegionZ = function(pos, d){
		return this.RegionZ(this.NearbyRegionPos(pos, d));
	}

	Sam.RH.NearbyPlayerRegionZ = function(d){
		return this.RegionZ(this.NearbyPlayerRegionPos(d));
	}

	Sam.RH.LookingPlayerRegionZ = function(){
		return this.RegionZ(this.LookingPlayerRegionPos());
	}

	Sam.RH.JumpingRegionZ = function(pos, d){
		return this.RegionZ(this.JumpingRegionPos(pos, d));
	}

	Sam.RH.JumpingPlayerRegionZ = function(){
		return this.RegionZ(this.JumpingPlayerRegionPos());
	}

	Sam.RH.ClimbingRegionZ = function(pos, d){
		return this.RegionZ(this.ClimbingRegionPos(pos, d));
	}

	Sam.RH.ClimbingPlayerRegionZ = function(){
		return this.RegionZ(this.ClimbingPlayerRegionPos());
	}

	Sam.RH.FallingRegionZ = function(pos, d){
		return this.RegionZ(this.FallingRegionPos(pos, d));
	}

	Sam.RH.FallingPlayerRegionZ = function(){
		return this.RegionZ(this.FallingPlayerRegionPos());
	}


	// =============================================================================
	// Region Ground (RegionG)
	// =============================================================================

	Sam.RH.RegionG = function(RegionPos){
		var RegionId = this.RegionId(RegionPos);
		return RegionId - Math.floor(RegionId / 10.) * 10;
	}


	// =============================================================================
	// canPass 
	// =============================================================================

	Sam.RH.GroundChange = function(pos1, pos2) {
		var RegionG1 = this.RegionG(pos1);
		var RegionG2 = this.RegionG(pos2);

		if (RegionG1 != RegionG2){
			console.log('ground changed from ' + RegionG1 + ' To ' + RegionG2);

			var CommonEventId1 = Number(Sam.RH.parameters["Ground Change From " + RegionG1]);
			if (CommonEventId1 != 0){
				$gameTemp.reserveCommonEvent(CommonEventId1);
			}

			var CommonEventId2 = Number(Sam.RH.parameters["Ground Change To " + RegionG2]);
			if (CommonEventId2 != 0){
				$gameTemp.reserveCommonEvent(CommonEventId2);
			}
		}
	}


	// OVERWRITE
	if (Sam.RH.OverWrite) {
		Game_Player.prototype.canPass = function(x, y, d) {
			return this.Sam_RH_canPass(x, y, d)
		}
	}


	Game_Player.prototype.canPassTile = function(x, y) {
		return this.Sam_RH_canPass(this._direction);
	}

	Game_Player.prototype.Sam_RH_canPass = function(x, y, d) {
		var pos1 = Sam.RH.RegionPos(x, y);
		var pos2 = Sam.RH.RegionPos($gameMap.roundXWithDirection(x, d), $gameMap.roundYWithDirection(y, d));

		var RegionId1 = Sam.RH.RegionId(pos1);
		var RegionId2 = Sam.RH.RegionId(pos2);

		var RegionZ1 = Sam.RH.RegionZ(pos1);
		var RegionZ2 = Sam.RH.RegionZ(pos2);

		var RegionG1 = Sam.RH.RegionG(pos1);
		var RegionG2 = Sam.RH.RegionG(pos2);

		// Calculate height (z) difference
		var dZ = RegionZ2 - RegionZ1;
		var adId = Math.abs(RegionId2 - RegionId1);
		// dZ = 0 : same height
		// adZ = .5 : stairs

		var eventId = Sam.RH.eventId(pos2)
		if ($dataMap.events[eventId]){
			if ($dataMap.events[eventId].meta.platform){
				var eventZ = Sam.RH.eventPosZ(pos2);
				if (RegionZ1 < eventZ){
					$gameMap.event(eventId).setPriorityType(2);
					return true;
				}
				else {
					$gameMap.event(eventId).setPriorityType(0);
					return true;
				}
			}
		}

	    if (!$gameMap.isValid(pos2.x, pos2.y)) {
	        return false;
	    }

	    if (this.isThrough() || this.isDebugThrough()) {
	    	Sam.RH.GroundChange(pos1, pos2);
	        return true;
	    }

		if(RegionId2 == 255){
			return false;
		}
	    if (this.isCollidedWithCharacters(pos2.x, pos2.y)) {
	        return false;
	    }

		if (RegionZ2 == 0 && d != 2){
			return false;
		}

	    if (adId != 5 && (RegionG1 != 9 && RegionG2 != 9)) { // && (RegionG1 != 9 && RegionG2 != 9)
	    	if (dZ != 0) {
				if (dZ < 0){
					if (Sam.RH.AutoFall){
						$gamePlayer.setDirection(d);
						$gamePlayer.Sam_RH_FallDown();
					}
				}
		        return false;
		    }
	    }

		Sam.RH.GroundChange(pos1, pos2);
	    return true;
	};



	// =============================================================================
	// MoveRoute Jumping & Falling
	// =============================================================================

	Sam.RH.moveRouteJump = function(jumpx, jumpy, fall = true){
		var beforeJumpPos = Sam.RH.PlayerRegionPos()
		var afterJumpPos = Sam.RH.RegionPos(beforeJumpPos.x + jumpx, beforeJumpPos.y + jumpy)
		var afterFallPos = afterJumpPos;
		
		// Create moveRoute
		var moveRoute = {
		    list: [],
		    skippable: true, 
		    repeat: false, 
		    wait: true
		};

		// Start moveCommands
		moveRoute.list = moveRoute.list.concat([
			{code: Game_Character.ROUTE_THROUGH_ON},
			{code: Game_Character.ROUTE_WALK_ANIME_OFF},
			{code: Game_Character.ROUTE_DIR_FIX_ON},
			{code: Game_Character.ROUTE_CHANGE_SPEED, parameters:[6]}
		]);

		// Add moveCommand Jump
		moveRoute.list = moveRoute.list.concat([
			{code: Game_Character.ROUTE_JUMP, parameters: [jumpx, jumpy]}
		]);

		// Add moveCommand Fall
		if (fall) {
			var playerZ = this.PlayerRegionZ();

			if ($gamePlayer.direction() == 8){
				if (playerZ > Sam.RH.NearbyRegionZ(afterFallPos, 2)) {
					moveRoute.list = moveRoute.list.concat([
						{code: Game_Character.ROUTE_MOVE_DOWN}
					]);
				}
			}
			else {
				while (Sam.RH.RegionId(afterFallPos) == 0 || (playerZ > Sam.RH.NearbyRegionZ(afterFallPos, 2) && playerZ > Sam.RH.RegionZ(afterFallPos))) { 
					moveRoute.list = moveRoute.list.concat([
						{code: Game_Character.ROUTE_MOVE_DOWN}
					]);
				    afterFallPos.y += 1;
				    playerZ -= 1;

				    if (playerZ < 0) break;
				}
			}
		}

		// End moveCommands
		moveRoute.list = moveRoute.list.concat([
			{code: Game_Character.ROUTE_THROUGH_OFF},
			{code: Game_Character.ROUTE_WALK_ANIME_ON},
			{code: Game_Character.ROUTE_DIR_FIX_OFF},
			{code: Game_Character.ROUTE_CHANGE_SPEED, parameters:[4]},
			{code: Game_Character.ROUTE_END},
		]);

		// set moveRoute
		$gamePlayer.forceMoveRoute(moveRoute);

		Sam.RH.GroundChange(beforeJumpPos, afterFallPos);

		console.log('jump:' + jumpx + ', ' + jumpy);
		console.log('beforeJumpPos: ' + beforeJumpPos.x + ', ' + beforeJumpPos.y);
		console.log('afterJumpPos: ' + afterJumpPos.x + ', ' + afterJumpPos.y);
		console.log('afterFallPos: ' + afterFallPos.x + ', ' + afterFallPos.y);
	}


	// =============================================================================
	// Game_CharacterBase 
	// =============================================================================

	Game_CharacterBase.prototype.Sam_RH_Jump = function(){
		var PlayerZ = Sam.RH.PlayerRegionZ();
		var LookingPlayerRegionZ = Sam.RH.LookingPlayerRegionZ();
		var ClimbingPlayerRegionZ = Sam.RH.ClimbingPlayerRegionZ();
		var JumpingPlayerRegionZ = Sam.RH.JumpingPlayerRegionZ();
		console.log(JumpingPlayerRegionZ);

		if (this._direction == 2){
			if (PlayerZ >= JumpingPlayerRegionZ && PlayerZ + 1 >= ClimbingPlayerRegionZ){
				Sam.RH.moveRouteJump(0, 2);
			}
			else{
				if (PlayerZ +1 == ClimbingPlayerRegionZ){
					this.Sam_RH_ClimbUp();
				}
				else{
					if (PlayerZ >= LookingPlayerRegionZ){
						Sam.RH.moveRouteJump(0, 1);
					}
					else {
						Sam.RH.moveRouteJump(0, 0);
					}
				}
			}
		}
		else{
			if (PlayerZ + .5 >= JumpingPlayerRegionZ && Sam.RH.JumpingPlayerRegionId() != 0){
				switch(this._direction){
					case 4:
						Sam.RH.moveRouteJump(-2, 0);
						break;
					case 6:
						Sam.RH.moveRouteJump(2, 0);
						break;
					case 8:
						Sam.RH.moveRouteJump(0, -2);
						break;
				}
			}
			else{
				if (PlayerZ + 1 == ClimbingPlayerRegionZ){
					this.Sam_RH_ClimbUp();
				}
				else{
					if (PlayerZ >= LookingPlayerRegionZ && Sam.RH.LookingPlayerRegionId() != 0){
						switch(this._direction){
							case 4:
								Sam.RH.moveRouteJump(-1, 0);
								break;
							case 6:
								Sam.RH.moveRouteJump(1, 0);
								break;
							case 8:
								Sam.RH.moveRouteJump(0, -1);
								break;
						}
					}
					else{
						Sam.RH.moveRouteJump(0, 0);
					}
				}
			}
		}
	}


	// Climb Up
	Game_CharacterBase.prototype.Sam_RH_ClimbUp = function(){
		var PlayerZ = Sam.RH.PlayerRegionZ();
		var dZ = Sam.RH.LookingPlayerRegionZ() - PlayerZ;
		var adZ = Math.abs(dZ);

		if (PlayerZ + 1 == Sam.RH.ClimbingPlayerRegionZ() && (adZ != 0 || adZ != .5)){
			switch(this._direction){
				case 2:
					Sam.RH.moveRouteJump(0, 1, false);
					break;
				case 4:
					Sam.RH.moveRouteJump(-1, -1, false);
					break;
				case 6:
					Sam.RH.moveRouteJump(1, -1, false);
					break;
				case 8:
					Sam.RH.moveRouteJump(0, -2, false);
					break;
			}
		}
	}

	// Fall Down
	Game_CharacterBase.prototype.Sam_RH_FallDown = function(){
		console.log("Sam_RH_FallDown");

		var PlayerZ = Sam.RH.PlayerRegionZ();
		var LookingPlayerRegionZ = Sam.RH.LookingPlayerRegionZ();
		var FallingPlayerRegionZ = Sam.RH.FallingPlayerRegionZ();

		if (PlayerZ > LookingPlayerRegionZ) {
			switch(this._direction){
				case 2:
					Sam.RH.moveRouteJump(0, 1);
					break;
				case 8:
					Sam.RH.moveRouteJump(0, -1, 0);
					break;
			}
			if (PlayerZ > FallingPlayerRegionZ) {
				switch(this._direction){
					case 4:
						Sam.RH.moveRouteJump(-1, 0);
						break;
					case 6:
						Sam.RH.moveRouteJump(1, 0);
						break;
				}
			}
		}
	}

	// GET INFO
	Game_CharacterBase.prototype.Sam_RH_getInfo = function(){
		console.log("PlayerRegion: (" + String(Sam.RH.PlayerRegionPos().x) + ", " + String(Sam.RH.PlayerRegionPos().y) + ") " + "d: " + String($gamePlayer.direction()) + ", " + String(Sam.RH.PlayerRegionId()) + ", " + String(Sam.RH.PlayerRegionZ()));
		console.log("LookingPlayerRegion: " + String(Sam.RH.LookingPlayerRegionPos().x) + ", " + String(Sam.RH.LookingPlayerRegionPos().y) + ", " + String(Sam.RH.LookingPlayerRegionId()) + ", " + String(Sam.RH.LookingPlayerRegionZ()));
		console.log("JumpingPlayerRegion: " + String(Sam.RH.JumpingPlayerRegionPos().x) + ", " + String(Sam.RH.JumpingPlayerRegionPos().y) + ", " + String(Sam.RH.JumpingPlayerRegionId()) + ", " + String(Sam.RH.JumpingPlayerRegionZ()));
		console.log("ClimbingPlayerRegion: " + String(Sam.RH.ClimbingPlayerRegionPos().x) + ", " + String(Sam.RH.ClimbingPlayerRegionPos().y) + ", " + String(Sam.RH.ClimbingPlayerRegionId()) + ", " + String(Sam.RH.ClimbingPlayerRegionZ()));
		console.log("FallingPlayerRegion: " + String(Sam.RH.FallingPlayerRegionPos().x) + ", " + String(Sam.RH.FallingPlayerRegionPos().y) + ", " + String(Sam.RH.FallingPlayerRegionId()) + ", " + String(Sam.RH.FallingPlayerRegionZ()));

	}



	// =============================================================================
	// Plugin Command 
	// =============================================================================

	Sam.RH.Game_Interpreter_pluginCommand = Game_Interpreter.prototype.pluginCommand;
	Game_Interpreter.prototype.pluginCommand = function(command, args) {
	    Sam.RH.Game_Interpreter_pluginCommand.call(this, command, args);

	    if (command == "Sam_RH_Jump"){
	    	$gamePlayer.Sam_RH_Jump();
	    }

	    if (command == "Sam_RH_FallDown"){
	    	$gamePlayer.Sam_RH_FallDown();
	    }

	    if (command == "Sam_RH_ClimbUp"){
	    	$gamePlayer.Sam_RH_ClimbUp();
	    }

	    if (command == "Sam_RH_getInfo"){
	    	$gamePlayer.Sam_RH_getInfo();
	    }
	};

})();


// =============================================================================
// END OF FILE - Sam_RegionHeights.js
// =============================================================================