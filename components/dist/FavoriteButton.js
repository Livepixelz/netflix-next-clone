"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var axios_1 = require("axios");
var react_1 = require("react");
var ai_1 = require("react-icons/ai");
var useCurrentUser_1 = require("@/hooks/useCurrentUser");
var useFavorites_1 = require("@/hooks/useFavorites");
var FavoriteButton = function (_a) {
    var movieId = _a.movieId;
    var mutateFavorites = useFavorites_1["default"]().mutate;
    var _b = useCurrentUser_1["default"](), currentUser = _b.data, mutate = _b.mutate;
    var isFavorite = react_1.useMemo(function () {
        var list = (currentUser === null || currentUser === void 0 ? void 0 : currentUser.favoriteIds) || [];
        return list.includes(movieId);
    }, [currentUser, movieId]);
    var Icon = isFavorite ? react_1["default"].createElement(ai_1.AiOutlineCheck, { className: "text-white", size: 25 }) : react_1["default"].createElement(ai_1.AiOutlinePlus, { className: "text-white", size: 25 });
    var toggleFavorite = react_1.useCallback(function () { return __awaiter(void 0, void 0, void 0, function () {
        var response, updateFavoriteIds;
        var _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    if (!isFavorite) return [3 /*break*/, 2];
                    return [4 /*yield*/, axios_1["default"]["delete"]('/api/favorite', { data: { movieId: movieId } })];
                case 1:
                    response = _b.sent();
                    return [3 /*break*/, 4];
                case 2: return [4 /*yield*/, axios_1["default"].post('/api/favorite', { movieId: movieId })];
                case 3:
                    response = _b.sent();
                    _b.label = 4;
                case 4:
                    updateFavoriteIds = (_a = response === null || response === void 0 ? void 0 : response.data) === null || _a === void 0 ? void 0 : _a.favoriteIds;
                    mutate(__assign(__assign({}, currentUser), { favoriteIds: updateFavoriteIds }));
                    mutateFavorites();
                    return [2 /*return*/];
            }
        });
    }); }, [movieId, isFavorite, currentUser, mutate, mutateFavorites]);
    return (react_1["default"].createElement("div", { onClick: toggleFavorite, className: "cursor-pointer group/item w-6 h-6 lg:w-10 lg:h-10 border-white border-2 rounded-full flex justify-center items-center transition hover:border-neutral-300" }, Icon));
};
exports["default"] = FavoriteButton;
