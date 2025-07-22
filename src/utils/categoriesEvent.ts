export const categorizeEvent = (
    title: string,
    notes?: string
): "Work" | "Personal" | "Other" => {
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

    const content = `${title} ${notes ?? ""}`.toLowerCase();

    if (workKeywords.some((word) => content.includes(word))) return "Work";
    if (personalKeywords.some((word) => content.includes(word)))
        return "Personal";

    return "Other";
};
