export default defineEventHandler(async (event) => {
    return process.env.NUXT_AUTH_TOKEN_SALT;
});
