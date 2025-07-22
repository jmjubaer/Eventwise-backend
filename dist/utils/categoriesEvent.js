"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.categorizeEvent = void 0;
const categorizeEvent = (title, notes) => {
    const workKeywords = [
        "meeting",
        "project",
        "client",
        "deadline",
        "presentation",
        "interview",
        "report",
        "team",
        "office",
        "call",
    ];
    const personalKeywords = [
        "birthday",
        "family",
        "anniversary",
        "wedding",
        "party",
        "vacation",
        "holiday",
        "friends",
        "gathering",
        "ceremony",
    ];
    const content = `${title} ${notes !== null && notes !== void 0 ? notes : ""}`.toLowerCase();
    if (workKeywords.some((word) => content.includes(word)))
        return "Work";
    if (personalKeywords.some((word) => content.includes(word)))
        return "Personal";
    return "Other";
};
exports.categorizeEvent = categorizeEvent;
