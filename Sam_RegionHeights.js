"use strict";
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
//       added some parameters: FallSpeed, AutoFall
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
//       added ladder grounds (RegionG = 9)
//
// 1.8 - 07/08/2018
//       player can now dash
//       added DashSpeed parameter
//       added AutoClimb parameter
//       added some plugin commands
//
// 1.9 - 08/08/2018
//       it's now possible to change animations
//       (walking, jumping, falling, dashing)
//
// 2.0 - 08/08/2018
//       better way of handling ground change common events
//       you can show an animation during the dash
//
// 2.1 - 11/08/2018
//       player can't Jump/Dash while jumping/dashing/climbing/falling
// =============================================================================
//

var Imported = Imported || {};
Imported.Sam_RegionHeights = true;

var Sam = Sam || {};
Sam.RH = Sam.RH || {};
Sam.RH.version = 2.0;

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
 * @type number
 *
 * @param FallSpeed
 * @desc Define how fast the player must fall
 * Définit la vitesse de chute
 * @default 6
 * @type number
 *
 * @param DashSpeed
 * @desc Define how fast the player must fall
 * Définit la vitesse de chute
 * @default 8
 * @type number
 *
 * @param AutoFall
 * @desc Player will fall automatically when going into lower regions
 * Le joueur tombe quand il se rend dans des niveaux plus bas
 * @default false
 * @type boolean
 *
 * @param AutoClimb
 * @desc Player will automatically climb when going into higher regions
 * Le joueur escalade quand il se rend dans des niveaux plus hauts
 * @default false
 * @type boolean
 *
 * @param OverWrite
 * @desc OverWrite "Game_Player.prototype.canPass" ?
 * @default true
 * @type boolean
 *
 * @param Dash Animation
 * @desc 
 * @default 0
 * @type number
 *
 * =============================================================================
 * @param ==========================
 * @default ========================== 
 * =============================================================================
 *
 * @param Animations
 * @default
 * @type file
 * @dir img/characters
 * 
 * @param Dash
 * @parent Animations
 * @desc Walking animation
 * @default 0
 * @type number
 * @min 0
 * @max 7
 * @decimals 0
 * 
 * @param Down
 * @parent Animations
 * @desc Walking animation
 * @default 1
 * @type number
 * @min 0
 * @max 7
 * @decimals 0
 * 
 * @param Fall
 * @parent Animations
 * @desc Walking animation
 * @default 2
 * @type number
 * @min 0
 * @max 7
 * @decimals 0
 * 
 * @param Jump
 * @parent Animations
 * @desc Walking animation
 * @default 3
 * @type number
 * @min 0
 * @max 7
 * @decimals 0
 * 
 * @param Run
 * @parent Animations
 * @desc Walking animation
 * @default 4
 * @type number
 * @min 0
 * @max 7
 * @decimals 0
 * 
 * @param Spec
 * @parent Animations
 * @desc Walking animation
 * @default 5
 * @type number
 * @min 0
 * @max 7
 * @decimals 0
 * 
 * @param Idle
 * @parent Animations
 * @desc Walking animation
 * @default 6
 * @type number
 * @min 0
 * @max 7
 * @decimals 0
 * 
 * @param Walk
 * @parent Animations
 * @desc Walking animation
 * @default 7
 * @type number
 * @min 0
 * @max 7
 * @decimals 0
 *
 * =============================================================================
 * @param ==========================
 * @default ==========================
 * =============================================================================
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
 * script :         $gamePlayer.Sam_RH_FallDown();
 * plugin command : Sam_RH_FallDown
 *
 * 
 * /// CLIMB UP ///
 *
 * desc :           Character will try to climb a cliff if possible
 *
 * script :         $gamePlayer.Sam_RH_ClimbUp();
 * plugin command : Sam_RH_ClimbUp
 *
 *
 * /// REGION Z ///
 *
 * desc :           Get the height of the region
 *
 * script :         $gamePlayer.Sam_RH_RegionZ(x, y);
 * plugin command : Sam_RH_RegionZ x y
 *
 *
 * /// REGION G ///
 *
 * desc :           Get the height of the region
 *
 * script :         $gamePlayer.Sam_RH_RegionG(x, y);
 * plugin command : Sam_RH_RegionG x y
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

	Sam.RH.parameters = PluginManager.parameters("Sam_RegionHeights");

	Sam.RH.NormalSpeed = Number(Sam.RH.parameters["NormalSpeed"]);
	Sam.RH.FallSpeed = Number(Sam.RH.parameters["FallSpeed"]);
	Sam.RH.DashSpeed = Number(Sam.RH.parameters["DashSpeed"]);

	Sam.RH.AutoFall = Sam.RH.parameters["AutoFall"] == "true";
	Sam.RH.AutoClimb = Sam.RH.parameters["AutoClimb"] == "true";

	Sam.RH.OverWrite = Sam.RH.parameters["OverWrite"] == "true";

	Sam.RH.DashAnimation = Number(Sam.RH.parameters["Dash Animation"]);

	Sam.RH.Anim_Dash = Sam.RH.parameters["Dash"];
	Sam.RH.Anim_Down = Sam.RH.parameters["Down"];
	Sam.RH.Anim_Fall = Sam.RH.parameters["Fall"];
	Sam.RH.Anim_Jump = Sam.RH.parameters["Jump"];
	Sam.RH.Anim_Run = Sam.RH.parameters["Run"];
	Sam.RH.Anim_Spec = Sam.RH.parameters["Spec"];
	Sam.RH.Anim_Idle = Sam.RH.parameters["Idle"];
	Sam.RH.Anim_Walk = Sam.RH.parameters["Walk"];

	// =============================================================================
	// Direction
	// =============================================================================

	const directionXY = d => {
		return {
			x: ((d - 1) % 3) - 1,
			y: 1 - Math.trunc((d - 1) / 3)
		};
	};

	const playerDirection = () => {
		return directionXY($gamePlayer.direction());
	};

	// =============================================================================
	// Class
	// =============================================================================

	class Tile {
		constructor(pos) {
			this.pos;
			this.region = new Region(pos);
			// this.eventz =
			this.id = this.region.id;
			this.z = this.region.z; // TO be changed (add eventz)
			this.g = this.region.g;
		}
	}

	class Region {
		constructor(pos) {
			this.id = $gameMap.regionId(pos.x, pos.y);
			this.z = Math.floor(this.id / 10);
			this.g = this.id - this.z * 10;
		}
	}

	// =============================================================================
	// Position
	// =============================================================================

	const Position = (x, y) => {
		return {
			x: x,
			y: y
		};
	};

	const PlayerPos = () => {
		return Position($gamePlayer.x, $gamePlayer.y);
	};

	const NearbyPos = (pos, d) => {
		var dx = directionXY(d).x;
		var dy = directionXY(d).y;
		return Position(pos.x + dx, pos.y + dy);
	};

	const NearbyPlayerPos = d => {
		return NearbyPos(PlayerPos(), d);
	};

	const LookingPlayerPos = () => {
		return NearbyPlayerPos($gamePlayer.direction());
	};

	const JumpingPos = (pos, d) => {
		switch (d) {
			case 2:
				return Position(pos.x, pos.y + 2);
				break;
			case 4:
				return Position(pos.x - 2, pos.y);
				break;
			case 6:
				return Position(pos.x + 2, pos.y);
				break;
			case 8:
				return Position(pos.x, pos.y - 2);
				break;
		}
	};

	const JumpingPlayerPos = () => {
		return JumpingPos(PlayerPos(), $gamePlayer.direction());
	};

	const ClimbingPos = (pos, d) => {
		switch (d) {
			case 2:
				return NearbyPos(Position(pos.x, pos.y, 2));
				break;
			case 4:
				return NearbyPos(Position(pos.x, pos.y, 7));
				break;
			case 6:
				return NearbyPos(Position(pos.x, pos.y, 9));
				break;
			case 8:
				return JumpingPos(Position(pos.x, pos.y, 8));
				break;
		}
	};

	const ClimbingPlayerPos = () => {
		return ClimbingPos(PlayerPos(), $gamePlayer.direction());
	};

	const FallingPos = (pos, d) => {
		switch (d) {
			case 2:
				return NearbyPos(Position(pos.x, pos.y, 2));
				break;
			case 4:
				return NearbyPos(Position(pos.x, pos.y, 1));
				break;
			case 6:
				return NearbyPos(Position(pos.x, pos.y, 3));
				break;
			case 8:
				return NearbyPos(Position(pos.x, pos.y, 8));
				break;
		}
	};

	const FallingPlayerPos = () => {
		return FallingPos(PlayerPos(), $gamePlayer.direction());
	};

	// =============================================================================
	// Tile
	// =============================================================================

	const setTile = function(pos) {
		var regionId = $gameMap.regionId(pos.x, pos.y);
		return regionId ? regionId : 0;
	};

	const NearbyTile = function(pos, d) {
		return new Tile(NearbyPos(pos, d));
	};

	const NearbyPlayerTile = function(d) {
		return new Tile(NearbyPlayerPos(d));
	};

	const PlayerTile = function() {
		return new Tile(PlayerPos());
	};

	const LookingPlayerTile = function() {
		return new Tile(LookingPlayerPos());
	};

	const JumpingTile = function(pos, d) {
		return new Tile(JumpingPos(pos, d));
	};

	const JumpingPlayerTile = function() {
		return new Tile(JumpingPlayerPos());
	};

	const ClimbingTile = function(pos, d) {
		return new Tile(ClimbingPos());
	};

	const ClimbingPlayerTile = function() {
		return new Tile(ClimbingPlayerPos());
	};

	const FallingTile = function(pos, d) {
		return new Tile(FallingPos(pos, d));
	};

	const FallingPlayerTile = function() {
		return new Tile(FallingPlayerPos());
	};

	// =============================================================================
	// Event Id/IdZ/PosZ
	// =============================================================================

	// Sam.RH.eventId = function(pos) {
	// 	return $gameMap.eventIdXy(pos.x, pos.y);
	// };

	// Sam.RH.eventIdZ = function(eventId) {
	// 	return eventId ? Number($dataMap.events[eventId].meta.height) : 0;
	// };

	// Sam.RH.eventPosZ = function(pos) {
	// 	return this.eventIdZ(this.eventId(pos));
	// };

	// =============================================================================
	// Region Z
	// =============================================================================

	// Sam.RH.TileZ = function(pos) {
	// 	return Math.floor(this.RegionId(pos) / 10);
	// };

	// Sam.RH.RegionZ = function(pos) {
	// 	for (var i = 1; i <= 3; i++) {
	// 		var eventPos = this.Tile(pos.x, pos.y + i);
	// 		var eventId = this.eventId(eventPos);
	// 		if (eventId) {
	// 			var eventZ = this.eventIdZ(eventId);
	// 			if (
	// 				eventZ > 0 &&
	// 				eventZ <= i &&
	// 				$dataMap.events[eventId].meta.pillar
	// 			) {
	// 				var posZ = {
	// 					x: pos.x,
	// 					y: pos.y + eventZ
	// 				};
	// 				return eventZ + this.TileZ(posZ);
	// 			}
	// 		}
	// 	}
	// 	var eventPos = this.Tile(pos.x, pos.y);
	// 	var eventId = this.eventId(eventPos);
	// 	if (eventId) {
	// 		var eventZ = this.eventIdZ(eventId);
	// 		if (eventZ > 0 && $dataMap.events[eventId].meta.platform) {
	// 			return eventZ;
	// 		}
	// 	}
	// 	return this.TileZ(pos);
	// };

	// Sam.RH.PlayerRegionZ = function() {
	// 	return this.RegionZ(this.PlayerTile());
	// };

	// Sam.RH.NearbyRegionZ = function(pos, d) {
	// 	return this.RegionZ(this.NearbyTile(pos, d));
	// };

	// Sam.RH.NearbyPlayerRegionZ = function(d) {
	// 	return this.RegionZ(this.NearbyPlayerTile(d));
	// };

	// Sam.RH.LookingPlayerRegionZ = function() {
	// 	return this.RegionZ(this.LookingPlayerTile());
	// };

	// Sam.RH.JumpingRegionZ = function(pos, d) {
	// 	return this.RegionZ(this.JumpingTile(pos, d));
	// };

	// Sam.RH.JumpingPlayerRegionZ = function() {
	// 	return this.RegionZ(this.JumpingPlayerTile());
	// };

	// Sam.RH.ClimbingRegionZ = function(pos, d) {
	// 	return this.RegionZ(this.ClimbingTile(pos, d));
	// };

	// Sam.RH.ClimbingPlayerRegionZ = function() {
	// 	return this.RegionZ(this.ClimbingPlayerTile());
	// };

	// Sam.RH.FallingRegionZ = function(pos, d) {
	// 	return this.RegionZ(this.FallingTile(pos, d));
	// };

	// Sam.RH.FallingPlayerRegionZ = function() {
	// 	return this.RegionZ(this.FallingPlayerTile());
	// };

	// =============================================================================
	// Region Ground (RegionG)
	// =============================================================================

	// Sam.RH.RegionG = function(pos) {
	// 	return this.RegionId(pos) - this.TileZ(pos) * 10;
	// };

	// =============================================================================
	// Ground Change
	// =============================================================================

	Sam.RH.GroundChange = function(pos1, pos2) {
		var RegionG1 = new Tile(pos1).g;
		var RegionG2 = new Tile(pos2).g;

		if (RegionG1 != RegionG2) {
			console.log("ground changed from " + RegionG1 + " To " + RegionG2);

			var CommonEventId1 = Number(
				Sam.RH.parameters["Ground Change From " + RegionG1]
			);
			if (CommonEventId1 != 0) {
				console.log("call", CommonEventId1);
				$gameTemp.reserveCommonEvent(CommonEventId1);
			}

			var CommonEventId2 = Number(
				Sam.RH.parameters["Ground Change To " + RegionG2]
			);
			if (CommonEventId2 != 0) {
				console.log("call", CommonEventId2);
				$gameTemp.reserveCommonEvent(CommonEventId2);
			}
		}
	};

	// =============================================================================
	// canPass
	// =============================================================================

	// OVERWRITE
	if (Sam.RH.OverWrite) {
		Game_Player.prototype.canPass = function(x, y, d) {
			return this.Sam_RH_canPass(x, y, d);
		};
	}

	Game_Player.prototype.canPassTile = function(x, y) {
		return this.Sam_RH_canPass(this._direction);
	};

	Game_Player.prototype.Sam_RH_canPass = function(x, y, d) {
		var pos1 = Position(x, y);
		var pos2 = Position(
			$gameMap.roundXWithDirection(x, d),
			$gameMap.roundYWithDirection(y, d)
		);

		var Tile1 = new Tile(pos1);
		var Tile2 = new Tile(pos2);

		var RegionId1 = Tile1.region.id;
		var RegionId2 = Tile2.region.id;

		var RegionZ1 = Tile1.region.z;
		var RegionZ2 = Tile2.region.z;

		var RegionG1 = Tile1.region.g;
		var RegionG2 = Tile2.region.g;

		// Calculate height (z) difference
		var dZ = RegionZ2 - RegionZ1;
		var adId = Math.abs(RegionId2 - RegionId1);
		// dZ = 0 : same height
		// adZ = .5 : stairs

		// AutoClimb
		if (RegionZ2 != RegionZ1) {
			if (adId != 5 && (RegionG1 != 9 && RegionG2 != 9)) {
				if (RegionId1 != 0) {
					if (Sam.RH.AutoClimb) {
						$gamePlayer.setDirection(d);
						$gamePlayer.Sam_RH_ClimbUp();
					}
				}
			}
		}

		// Platforms - To be finished
		// var eventId = Sam.RH.eventId(pos2);
		// if ($dataMap.events[eventId]) {
		// 	if ($dataMap.events[eventId].meta.platform) {
		// 		var eventZ = Sam.RH.eventPosZ(pos2);
		// 		if (RegionZ1 < eventZ) {
		// 			$gameMap.event(eventId).setPriorityType(2);
		// 			return true;
		// 		} else {
		// 			$gameMap.event(eventId).setPriorityType(0);
		// 			return true;
		// 		}
		// 	}
		// }

		if (!$gameMap.isValid(pos2.x, pos2.y)) {
			return false;
		}

		if (this.isThrough() || this.isDebugThrough()) {
			Sam.RH.GroundChange(pos1, pos2);
			return true;
		}

		if (RegionId2 == 255) {
			return false;
		}
		if (this.isCollidedWithCharacters(pos2.x, pos2.y)) {
			return false;
		}

		if (RegionZ2 == 0 && d != 2) {
			return false;
		}

		if (adId != 5 && (RegionG1 != 9 && RegionG2 != 9)) {
			if (dZ != 0) {
				if (dZ < 0) {
					if (Sam.RH.AutoFall) {
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

	Sam.RH.moveRouteJump = function(jumpx, jumpy, fall = true) {
		var beforeJumpPos = PlayerPos();
		var afterJumpPos = Position(
			beforeJumpPos.x + jumpx,
			beforeJumpPos.y + jumpy
		);
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
			{ code: Game_Character.ROUTE_THROUGH_ON },
			{ code: Game_Character.ROUTE_WALK_ANIME_OFF },
			{ code: Game_Character.ROUTE_DIR_FIX_ON }
		]);

		// Add moveCommand Jump
		moveRoute.list = moveRoute.list.concat([
			{
				code: Game_Character.ROUTE_CHANGE_IMAGE,
				parameters: [$gamePlayer.characterName(), Sam.RH.Anim_Jump]
			},
			{
				code: Game_Character.ROUTE_JUMP,
				parameters: [jumpx, jumpy]
			}
		]);

		// Add moveCommand Fall
		moveRoute.list = moveRoute.list.concat([
			{
				code: Game_Character.ROUTE_CHANGE_SPEED,
				parameters: [Sam.RH.FallSpeed]
			},
			{
				code: Game_Character.ROUTE_CHANGE_IMAGE,
				parameters: [$gamePlayer.characterName(), Sam.RH.Anim_Fall]
			}
		]);

		if (fall) {
			var playerZ = PlayerTile().z;

			if ($gamePlayer.direction() == 8) {
				if (playerZ > NearbyTile(afterFallPos, 2).z) {
					moveRoute.list = moveRoute.list.concat([
						{ code: Game_Character.ROUTE_MOVE_DOWN }
					]);
				}
			} else {
				while (
					setTile(afterFallPos).id == 0 ||
					(playerZ > NearbyTile(afterFallPos, 2).z &&
						playerZ > setTile(afterFallPos).z)
				) {
					moveRoute.list = moveRoute.list.concat([
						{ code: Game_Character.ROUTE_MOVE_DOWN }
					]);
					afterFallPos.y += 1;
					playerZ -= 1;

					if (playerZ < 0) break;
				}
			}
		}

		// End moveCommands
		moveRoute.list = moveRoute.list.concat([
			{
				code: Game_Character.ROUTE_CHANGE_IMAGE,
				parameters: [$gamePlayer.characterName(), Sam.RH.Anim_Walk]
			},
			{ code: Game_Character.ROUTE_THROUGH_OFF },
			{ code: Game_Character.ROUTE_WALK_ANIME_ON },
			{ code: Game_Character.ROUTE_DIR_FIX_OFF },
			{
				code: Game_Character.ROUTE_CHANGE_SPEED,
				parameters: [Sam.RH.NormalSpeed]
			}
		]);

		// Change Ground Common Events
		var RegionG1 = setTile(beforeJumpPos).g;
		var RegionG2 = setTile(afterFallPos).g;

		if (RegionG1 != RegionG2) {
			console.log("ground changed from " + RegionG1 + " To " + RegionG2);

			var CommonEventId1 = Number(
				Sam.RH.parameters["Ground Change From " + RegionG1]
			);
			if (CommonEventId1 != 0) {
				moveRoute.list = moveRoute.list.concat([
					{
						code: Game_Character.ROUTE_SCRIPT,
						parameters: [
							"$gameTemp.reserveCommonEvent(" +
								CommonEventId1 +
								");"
						]
					}
				]);
			}

			var CommonEventId2 = Number(
				Sam.RH.parameters["Ground Change To " + RegionG2]
			);
			if (CommonEventId2 != 0) {
				moveRoute.list = moveRoute.list.concat([
					{
						code: Game_Character.ROUTE_SCRIPT,
						parameters: [
							"$gameTemp.reserveCommonEvent(" +
								CommonEventId2 +
								");"
						]
					}
				]);
			}
		}

		// End moveCommands
		moveRoute.list = moveRoute.list.concat([
			{ code: Game_Character.ROUTE_END }
		]);

		// set moveRoute
		if (!$gamePlayer.isMoveRouteForcing())
			$gamePlayer.forceMoveRoute(moveRoute);
	};

	// =============================================================================
	// MoveRoute Dashing & Falling
	// =============================================================================

	Sam.RH.moveRouteDash = function(dash) {
		console.log(dash);

		var beforeDashPos = PlayerPos();
		var afterDashPos = beforeDashPos;
		if (dash == 1) {
			afterDashPos = LookingPlayerPos();
		} else if (dash == 2) {
			afterDashPos = JumpingPlayerPos();
		}
		var afterFallPos = afterDashPos;

		// Create moveRoute
		var moveRoute = {
			list: [],
			skippable: true,
			repeat: false,
			wait: true
		};

		// Start moveCommands
		moveRoute.list = moveRoute.list.concat([
			{ code: Game_Character.ROUTE_THROUGH_ON },
			{ code: Game_Character.ROUTE_WALK_ANIME_OFF },
			{ code: Game_Character.ROUTE_DIR_FIX_ON },
			{
				code: Game_Character.ROUTE_CHANGE_SPEED,
				parameters: [Sam.RH.DashSpeed]
			},
			{
				code: Game_Character.ROUTE_CHANGE_IMAGE,
				parameters: [$gamePlayer.characterName(), Sam.RH.Anim_Dash]
			}
		]);

		// Show Dash Animation
		if (Sam.RH.DashAnimation) {
			moveRoute.list = moveRoute.list.concat([
				{
					code: Game_Character.ROUTE_SCRIPT,
					parameters: [
						"$gamePlayer.requestAnimation(" +
							Sam.RH.DashAnimation +
							");"
					]
				}
			]);
		}

		// Add moveCommand Dash
		if (dash >= 1) {
			moveRoute.list = moveRoute.list.concat([
				{ code: Game_Character.ROUTE_MOVE_FORWARD }
			]);
		}
		if (dash >= 2) {
			moveRoute.list = moveRoute.list.concat([
				{ code: Game_Character.ROUTE_MOVE_FORWARD }
			]);
		}

		// Set FallSpeed
		moveRoute.list = moveRoute.list.concat([
			{
				code: Game_Character.ROUTE_CHANGE_SPEED,
				parameters: [Sam.RH.FallSpeed]
			},
			{
				code: Game_Character.ROUTE_CHANGE_IMAGE,
				parameters: [$gamePlayer.characterName(), Sam.RH.Anim_Fall]
			}
		]);

		// Add moveCommand Fall
		var playerZ = PlayerTile().z;

		if ($gamePlayer.direction() == 8) {
			if (playerZ > NearbyTile(afterFallPos, 2).z) {
				moveRoute.list = moveRoute.list.concat([
					{ code: Game_Character.ROUTE_MOVE_DOWN }
				]);
			}
		} else {
			while (
				setTile(afterFallPos).id == 0 ||
				(playerZ > NearbyTile(afterFallPos, 2).z &&
					playerZ > setTile(afterFallPos).z)
			) {
				moveRoute.list = moveRoute.list.concat([
					{ code: Game_Character.ROUTE_MOVE_DOWN }
				]);
				afterFallPos.y += 1;
				playerZ -= 1;

				if (playerZ < 0) break;
			}
		}

		// End moveCommands
		moveRoute.list = moveRoute.list.concat([
			{
				code: Game_Character.ROUTE_CHANGE_IMAGE,
				parameters: [$gamePlayer.characterName(), Sam.RH.Anim_Walk]
			},
			{ code: Game_Character.ROUTE_THROUGH_OFF },
			{ code: Game_Character.ROUTE_WALK_ANIME_ON },
			{ code: Game_Character.ROUTE_DIR_FIX_OFF },
			{
				code: Game_Character.ROUTE_CHANGE_SPEED,
				parameters: [Sam.RH.NormalSpeed]
			}
		]);

		// Change Ground Common Events
		var RegionG1 = this.RegionG(beforeDashPos);
		var RegionG2 = this.RegionG(afterFallPos);

		if (RegionG1 != RegionG2) {
			console.log("ground changed from " + RegionG1 + " To " + RegionG2);

			var CommonEventId1 = Number(
				Sam.RH.parameters["Ground Change From " + RegionG1]
			);
			if (CommonEventId1 != 0) {
				moveRoute.list = moveRoute.list.concat([
					{
						code: Game_Character.ROUTE_SCRIPT,
						parameters: [
							"$gameTemp.reserveCommonEvent(" +
								CommonEventId1 +
								");"
						]
					}
				]);
			}

			var CommonEventId2 = Number(
				Sam.RH.parameters["Ground Change To " + RegionG2]
			);
			if (CommonEventId2 != 0) {
				moveRoute.list = moveRoute.list.concat([
					{
						code: Game_Character.ROUTE_SCRIPT,
						parameters: [
							"$gameTemp.reserveCommonEvent(" +
								CommonEventId2 +
								");"
						]
					}
				]);
			}
		}

		// End moveCommands
		moveRoute.list = moveRoute.list.concat([
			{ code: Game_Character.ROUTE_END }
		]);

		// set moveRoute
		if (!$gamePlayer.isMoveRouteForcing())
			$gamePlayer.forceMoveRoute(moveRoute);
	};

	// =============================================================================
	// Game_CharacterBase
	// =============================================================================

	Game_CharacterBase.prototype.Sam_RH_Jump = function() {
		var PlayerZ = PlayerTile().z;
		var LookingPlayerTileZ = LookingPlayerTile().z;
		var ClimbingPlayerTileZ = ClimbingPlayerTile().z;
		var JumpingPlayerTileZ = JumpingPlayerTile().z;
		console.log(JumpingPlayerTileZ);

		if (this._direction == 2) {
			if (
				PlayerZ >= JumpingPlayerTileZ &&
				PlayerZ + 1 >= ClimbingPlayerTileZ
			) {
				Sam.RH.moveRouteJump(0, 2);
			} else if (PlayerZ + 1 == ClimbingPlayerTileZ) {
				this.Sam_RH_ClimbUp();
			} else if (PlayerZ >= LookingPlayerTileZ) {
				Sam.RH.moveRouteJump(0, 1);
			} else {
				Sam.RH.moveRouteJump(0, 0);
			}
		} else if (
			PlayerZ + 0.5 >= JumpingPlayerTileZ &&
			JumpingPlayerTile().id != 0
		) {
			switch (this._direction) {
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
		} else if (PlayerZ + 1 == ClimbingPlayerTileZ) {
			this.Sam_RH_ClimbUp();
		} else if (
			PlayerZ >= LookingPlayerTileZ &&
			LookingPlayerTile().id != 0
		) {
			switch (this._direction) {
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
		} else {
			Sam.RH.moveRouteJump(0, 0);
		}
	};

	// Climb Up
	Game_CharacterBase.prototype.Sam_RH_ClimbUp = function() {
		var PlayerZ = PlayerTile().z;
		var dZ = LookingPlayerTile().z - PlayerZ;
		var adZ = Math.abs(dZ);

		if (PlayerZ + 1 == ClimbingPlayerTile().z && (adZ != 0 || adZ != 0.5)) {
			switch (this._direction) {
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
	};

	// Fall Down
	Game_CharacterBase.prototype.Sam_RH_FallDown = function() {
		console.log("Sam_RH_FallDown");

		var PlayerZ = Sam.RH.PlayerTileZ();
		var LookingPlayerTileZ = LookingPlayerTile().z;
		var FallingPlayerTileZ = FallingPlayerTile().z;

		if (PlayerZ > LookingPlayerTileZ) {
			switch (this._direction) {
				case 2:
					Sam.RH.moveRouteJump(0, 1);
					break;
				case 8:
					Sam.RH.moveRouteJump(0, -1, false);
					break;
			}
			if (PlayerZ > FallingPlayerTileZ) {
				switch (this._direction) {
					case 4:
						Sam.RH.moveRouteJump(-1, 0);
						break;
					case 6:
						Sam.RH.moveRouteJump(1, 0);
						break;
				}
			}
		}
	};

	// Dash
	Game_CharacterBase.prototype.Sam_RH_Dash = function() {
		var PlayerZ = PlayerTile().z;
		var LookingPlayerTileZ = LookingPlayerTileZ().z;
		var ClimbingPlayerTileZ = ClimbingPlayerTileZ().z;
		var JumpingPlayerTileZ = JumpingPlayerTileZ().z;

		if (
			PlayerZ + 0.5 >= LookingPlayerTileZ &&
			(LookingPlayerTile().id != 0 || this._direction == 2)
		) {
			if (
				PlayerZ + 0.5 >= JumpingPlayerTileZ &&
				(JumpingPlayerTile().id != 0 || this._direction == 2)
			) {
				Sam.RH.moveRouteDash(2);
			} else {
				Sam.RH.moveRouteDash(1);
			}
		} else {
			Sam.RH.moveRouteDash(0);
		}
	};

	// RegionZ
	Game_CharacterBase.prototype.Sam_RH_RegionZ = function(x, y) {
		var pos = {
			x: x,
			y: y
		};
		return new Tile(pos).z;
	};

	// RegionG
	Game_CharacterBase.prototype.Sam_RH_RegionG = function(x, y) {
		var pos = {
			x: x,
			y: y
		};
		return new Tile(pos).g;
	};

	// GET INFO
	Game_CharacterBase.prototype.Sam_RH_getInfo = function() {
		console.log(
			"PlayerTile: (" +
				String(PlayerTile().pos.x) +
				", " +
				String(PlayerTile().pos.y) +
				") " +
				"d: " +
				String($gamePlayer.direction()) +
				", " +
				String(PlayerTile().id) +
				", " +
				String(PlayerTile().z)
		);
		console.log(
			"LookingPlayerTile: " +
				String(LookingPlayerTile().pos.x) +
				", " +
				String(LookingPlayerTile().pos.y) +
				", " +
				String(LookingPlayerTile().id) +
				", " +
				String(LookingPlayerTile().z)
		);
		console.log(
			"JumpingPlayerTile: " +
				String(JumpingPlayerTile().pos.x) +
				", " +
				String(JumpingPlayerTile().pos.y) +
				", " +
				String(JumpingPlayerTile().id) +
				", " +
				String(JumpingPlayerTile().z)
		);
		console.log(
			"ClimbingPlayerTile: " +
				String(ClimbingPlayerTile().pos.x) +
				", " +
				String(ClimbingPlayerTile().pos.y) +
				", " +
				String(ClimbingPlayerTile().id) +
				", " +
				String(ClimbingPlayerTile().z)
		);
		console.log(
			"FallingPlayerTile: " +
				String(FallingPlayerTile().pos.x) +
				", " +
				String(FallingPlayerTile().pos.y) +
				", " +
				String(FallingPlayerTile().id) +
				", " +
				String(FallingPlayerTile().z)
		);
	};

	// =============================================================================
	// UPDATE
	// =============================================================================

	// Sam.RH.Game_Character_update = Game_Character.prototype.update;
	// Game_Character.prototype.update = function(sceneActive) {
	// 	Sam.RH.Game_Character_update.call(this,sceneActive);
	// 	if (this._isDashing){
	// 		$gameActors.actor(1).setCharacterImage($gamePlayer.characterName(), Sam.RH.Anim_Dash);
	// 		$gamePlayer.refresh();
	// 	}
	// };

	// =============================================================================
	// Plugin Command
	// =============================================================================

	Sam.RH.Game_Interpreter_pluginCommand =
		Game_Interpreter.prototype.pluginCommand;
	Game_Interpreter.prototype.pluginCommand = function(command, args) {
		Sam.RH.Game_Interpreter_pluginCommand.call(this, command, args);

		if (command == "Sam_RH_Jump") {
			$gamePlayer.Sam_RH_Jump();
		}

		if (command == "Sam_RH_FallDown") {
			$gamePlayer.Sam_RH_FallDown();
		}

		if (command == "Sam_RH_ClimbUp") {
			$gamePlayer.Sam_RH_ClimbUp();
		}

		if (command == "Sam_RH_Dash") {
			$gamePlayer.Sam_RH_Dash();
		}

		if (command == "Sam_RH_RegionZ") {
			$gamePlayer.Sam_RH_RegionZ(args[0], args[1]);
		}

		if (command == "Sam_RH_RegionG") {
			$gamePlayer.Sam_RH_RegionG(args[0], args[1]);
		}

		if (command == "Sam_RH_getInfo") {
			$gamePlayer.Sam_RH_getInfo();
		}
	};
})();

// =============================================================================
// END OF FILE - Sam_RegionHeights.js
// =============================================================================
