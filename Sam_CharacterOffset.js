/*:
 *
 * @plugindesc Character Offset
 * 
 *
 * @author Sam
 *
 * @param charOffsetY
 * @desc Change this value to move the character sprites.
 * Larger values move the character up and vice-versa.
 * @default 6
 *
 * @help
 * default offset value : 6
 * character on bottom of tile : 0
 * character on middle of tile : 14
 */

var charOffsetY = 14;

// -- Game_CharacterBase Alias -- : Needed to ensure compatability.

var _GameCharacterBase_shiftY_ = Game_CharacterBase.prototype.shiftY;

// Redefinition of Game_CharacterBase.shiftY function.

Game_CharacterBase.prototype.shiftY = function() {
	var v = _GameCharacterBase_shiftY_.call(this);
	return v > 0 ? charOffsetY : 0;
};