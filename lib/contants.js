const JoinWordsStatus = {
    Unchecked: 0,
    Pre: 1,
    Ok: 2,
    Ko: 3
}

export {JoinWordsStatus}

export const url_site = (process.env.NODE_ENV == "production") ? "https://russian.fly.dev" : "http://localhost:3000";
