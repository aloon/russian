export const JoinWordsStatus = {
    Unchecked: 0,
    Pre: 1,
    Ok: 2,
    Ko: 3
}

const isProduction = process.env.NODE_ENV === 'production';

export const url_site = isProduction ? "https://russian.fly.dev" : "http://localhost:3000";
