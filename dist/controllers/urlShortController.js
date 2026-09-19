"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ShortURL = exports.URLShortener = void 0;
const nanoid_1 = require("nanoid");
const db_js_1 = require("../config/db.js");
var BASE_URL = "www.short_url/";
const URLShortener = async (req, res) => {
    const { url } = req.body;
    const loggedUser = req.user;
    console.log(loggedUser, "fd3etyd3gftyd3edygeydg3edyg3eydg3eyug");
    if (!url) {
        res.status(400).json({
            Message: "Please Input a URL to be Shortened"
        });
    }
    const shortCode = (0, nanoid_1.nanoid)(7);
    if (loggedUser) {
        const newUrlForLoggedUser = await db_js_1.prisma.url.create({
            data: {
                originalUrl: url,
                shortUrl: shortCode,
                clicks: 0,
                userId: loggedUser.id,
            }
        });
        return res.json({
            message: "this shortens the Original url for a Logged User",
            shortURL: `${BASE_URL}${shortCode}`,
            newUrlForLoggedUser
        });
    }
    else {
        const newUrl = await db_js_1.prisma.url.create({
            data: {
                originalUrl: url,
                shortUrl: shortCode,
                clicks: 0
            }
        });
        return res.json({
            message: "this shortens the Original url for all",
            shortURL: `${BASE_URL}${shortCode}`,
            newUrl
        });
    }
};
exports.URLShortener = URLShortener;
const ShortURL = async (req, res) => {
    const { shortcode } = req.params;
    if (!shortcode) {
        res.status(404).json({
            Message: "a shortcode needs to be sent"
        });
    }
    const entry = await db_js_1.prisma.url.findUnique({
        where: {
            shortUrl: shortcode
        }
    });
    if (!entry) {
        res.status(404).json({
            Message: "This URL Does not exist or is Obsolete"
        });
    }
    return res.redirect(entry?.originalUrl);
};
exports.ShortURL = ShortURL;
//# sourceMappingURL=urlShortController.js.map