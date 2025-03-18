import { jwtDecode } from "jwt-decode";
// @ts-ignore
export const ENV: 'LOCAL' | 'DEV' | 'QA' | 'STAGING' = process.env.NEXT_PUBLIC_ENV || 'DEV';
console.log({ENV});

const setupAuthToken = () => {
    const isServer = typeof window === 'undefined';
    if (!isServer) {
        const urlParams = new URLSearchParams(window.location.search);
        const urlToken = urlParams.get('token');
        console.log('NOT isServer token', urlToken);
        if (urlToken) {
            // TODO clear token if refresh request failed status not 200!
            // TODO during the browser refresh operation, refresh_token NOT change!
            const localAuthString = localStorage.getItem("tinacms-auth");
            const AUTH_TOKEN = JSON.stringify(
              {
                  "id_token": "eyJraWQiOiI5YlN2a0JiUjlGWWxmaU02b2I5c2FGMElva2NXczh2S29SY0lCbnl6M1VvPSIsImFsZyI6IlJTMjU2In0.eyJzdWIiOiJiMjlmYWI2NS1jODUwLTRmOWEtYjY3Zi0wYWI3ODc4MGQ3NTQiLCJhdWQiOiI1YjhmbWh2MWczNWtidWg4M3ZkYmF1ZHJuaCIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJldmVudF9pZCI6IjhlZGM2YWZkLWZmMDYtNGNhZi1iMzUwLTk5NTZhYjE0YzQ5MCIsInRva2VuX3VzZSI6ImlkIiwiYXV0aF90aW1lIjoxNzQyMjY5MDYwLCJpc3MiOiJodHRwczpcL1wvY29nbml0by1pZHAudXMtZWFzdC0xLmFtYXpvbmF3cy5jb21cL3VzLWVhc3QtMV82YWhpU2hTVWMiLCJjb2duaXRvOnVzZXJuYW1lIjoiYjI5ZmFiNjUtYzg1MC00ZjlhLWI2N2YtMGFiNzg3ODBkNzU0IiwiZXhwIjoxNzQyMjcyNjYwLCJpYXQiOjE3NDIyNjkwNjAsImVtYWlsIjoicGluZ0B0cnlidXlzb2NpYWwuY29tIn0.RCdrOAzaHowxZVRd5rI-RUD6KUE0WaH14b_2Rv2Hj-Rt1xEL11px-Av52cCbgiYkFaC2MVeXYfe-R6al6iC3Jyo53sh4zriBa1wv2-52edwrj8na4S-38FH6_rRl3uBeuo2LL2bHEBmpAOSmgjs7LxGUxO-XaaEyt6pkFnMGbA_vbiGXGrhJLPQXujMLYDNz0WT2yNUz5C7q3WZZv0iRnunt9YLwnqQrXP8JaIbY214KpepWc48Zd89hPcvrrJT6z9M_DbIRY_hGlURXDiUrZhVYIYwKBPQfdxmj_00fCde67zbHjRqPWchXyuYM6zPPrbK9SNvzQk1LXjKvsv5zng",
                  "access_token": "eyJraWQiOiJ1dGVYWlBUOTJnYmNaWDQwY3Rhbk1MUUJ3WTVcLzlMT0pnWEI0d1FVRzg3TT0iLCJhbGciOiJSUzI1NiJ9.eyJzdWIiOiJiMjlmYWI2NS1jODUwLTRmOWEtYjY3Zi0wYWI3ODc4MGQ3NTQiLCJldmVudF9pZCI6IjhlZGM2YWZkLWZmMDYtNGNhZi1iMzUwLTk5NTZhYjE0YzQ5MCIsInRva2VuX3VzZSI6ImFjY2VzcyIsInNjb3BlIjoiYXdzLmNvZ25pdG8uc2lnbmluLnVzZXIuYWRtaW4iLCJhdXRoX3RpbWUiOjE3NDIyNjkwNjAsImlzcyI6Imh0dHBzOlwvXC9jb2duaXRvLWlkcC51cy1lYXN0LTEuYW1hem9uYXdzLmNvbVwvdXMtZWFzdC0xXzZhaGlTaFNVYyIsImV4cCI6MTc0MjI3MjY2MCwiaWF0IjoxNzQyMjY5MDYwLCJqdGkiOiIzZjUzNTMzOC0wMTBiLTQxNTEtODdkMi0zMDg4ODliZTY0MWIiLCJjbGllbnRfaWQiOiI1YjhmbWh2MWczNWtidWg4M3ZkYmF1ZHJuaCIsInVzZXJuYW1lIjoiYjI5ZmFiNjUtYzg1MC00ZjlhLWI2N2YtMGFiNzg3ODBkNzU0In0.UtObvVT1uFuRucM5XJ9ZIMjlnBAu28KoNeAUo8SykZoGrldAb_IZrK3TNCnwT8NgLwMMCjax4vBgB8Jix0hCh9wC2Hf_MZU399K2b6hDFN6h4fbWQBxHvMkirwNiTN_gqHOYcNVC4Gm8-hwf-aAt6WUFOw13WaTuSt4GnoP6rUbRSckhKWVEFuMjpUdondXiRv2tWsZzpou2IwmVji0AlbpzInRxrFS4M08jEtoOpKOkJ87gEENX1b4a1NZaKxUncsh3LCFeu05__R4IbxVQvUkLjwks99GRF2d7fYxX7vCzEmn64Zs_CPkC0PFA2ZxKoqB_dnoSJxk3sIoXpUvTnQ",
                  "refresh_token": "eyJjdHkiOiJKV1QiLCJlbmMiOiJBMjU2R0NNIiwiYWxnIjoiUlNBLU9BRVAifQ.vADX-eH1U-L6z2Wskt2GvZWuU2n8gSH3rXEanTgCe3zof6LakrPZYT4XEhGoT9WmpwhzJ0wVnyaPXFnILBgujRyc0e0oVLHdBMxQyIZzYGwtaPFKtAF_UPhudq3XfGxlbO5jT5aF49lojogDRFGmy1ZgK2QMcshk97d5SdwGobffF0QKikaHnvO7x9-wOgJzUPSbviCrMUa9APUeMuuZGz67u-g_ACvNtCb051WHjeZOVLrELQ9fjbYL5OJQn4bJO8GkYOax0EvyCLrAIeEi0fraZepJHLcf7o8kD987P9GUuWNC80EynuX-BW4CSxNRLM_h0NThMIdd-IoDdZ146Q.ZTxJ5PgrWb8WjhB1.c6nw3yhhS2Iwrk2hMnDdvyMtw-ALNb0NMhyo__NcLBOBPYVGgbVbZqzhrsnkeawNCNezBhEBXSZjodU1mDQZpXjO0UsdRUk2vMBaMsQrRdz1wBJlotkBIoK_kt6a0pV42QLuId-uAIIn1r1kt4ZMaAp8MOSckTjKZPQYwFTAyz_SXI8XC1S_UCJfdXw7fnSiey2YQ1VYOotPlU3znKtRrpddE6IhHz6_gUu6yQYPRKySgWDDDEtdzP1tG4M79HmHZssjB33c_omE4VGaCAuu3-SioqE2H1FyP32ZDBOZBdrW4lrYY6u9Q_y6_xXJSXMsw4vRDtvnWQpqNEX1MJMNWn5K-Bhcv8-4dvGPsdHKwDdp_XJu8WdeN875oPmqLcSGVdP5B_PQg8tMMkECB-hVjYgKwI2Sa_qi3wj8HM1xHirnm5_6C_B-lPqfmK9Yhm2p6bMQr9rIi--p4NqxMMVU6DFadnwSsfH_6SFmV912qNlkM4wejG8GIrXYnOylEXe7hqFX91vJhrVUGONJQSkxK7TKqbErwaXtiT7OqtkKloH55eRwlXo2rvNzZX3RIfKemD1GZdFRARrpWugnTTgN3xc_JqP31yMb-ZNE6AyiwRcFfKB8m1fd19SObJ9i7k3GSchO9OwFM2tMDMe3duUoM72O23xqFYPDReNd5qujA1X2jIGUJtqKhdwQQTNkpdSK_uuFFkuloEpU88xSZejxsEKSMZNpxKmWJekZY9U1Xp5u_Fe6_tb9CGK_4uiU1ZEYjj6AFbcmWefBATaCkswMPoIuuzNAQ4RuCVkZWhYoOCRRv3uy36szbcX4oJbExcLc5fg16cdKwv5SP_LJJgGNUr9cCtR5PRmpuKZAHHRnP-aNkuT_yOHOK3vG-cXtbwci1QDO8BwX8pgqq-PhEm6ZfL3fzp8jFempSd3U2ofh5QYaVKUrdxYkMI4iypz47Oi7_y3IAjOKGCCEFF-oxe8JxCWFmrvD3OEcPpgPOgofqgjNM_fAT9QnwUDDME1smRiH-4jVOpp9vqMAzmIY9FY_g6GsibrW9LoNO8lrKPHYHx9JOtIeOErNlF3qvRU9sRfFO2zKvaANEdnfHlZoETig9hIIrxFbAmodLM-7gpj5c9CXenLtpchrk4rGGbgOQdLGnyoZecqH_YYZNQnjZynZFve4vDqxGyWqi9RHIq039HxwroM1xVkFiSsVBIVklweQ2LS4X9Qso8M7gLifN7O8-uU1jpV3XP0oI4vZ0ZHJnJR-AV6nWdtDUk8d_kGkqZO50ECbbF6m1UHyQFGFDEFxF43epE6s5QifwjEJWAChiEbXtYfFdjzfPnLkSscfYw.vB5f1a7k0P0559dHR1wQjw"
              }
            );
            if (localAuthString) {
                const parsed = JSON.parse(localAuthString);
                if (parsed && parsed['access_token']) {
                    const decoded = jwtDecode(parsed['access_token']);
                    console.log('decoded', decoded);
                    const currentTime = Math.floor(Date.now() / 1000); // Current time in seconds

                    // Get the expiration time from the decoded token
                    const expirationTime = decoded.exp;
                    console.log('expired hrs:', Math.floor((currentTime - expirationTime) / (60 * 60)));

                    // Check if the token has expired more than one week ago
                    const oneWeekInSeconds = 7 * 24 * 60 * 60; // 1 week in seconds
                    const isExpiredMoreThanOneWeek = currentTime - expirationTime > oneWeekInSeconds;

                    if (isExpiredMoreThanOneWeek) {
                        console.log('isExpiredMoreThanOneWeek SET tinacms-auth');
                        localStorage.setItem("tinacms-auth", AUTH_TOKEN);
                    }
                }
            } else {
                console.log('SET tinacms-auth');
                localStorage.setItem("tinacms-auth", AUTH_TOKEN);
            }
        }
    }
}

setupAuthToken()

const bsApiEndpoint = {
    LOCAL: 'http://192.168.0.103:3001/graphql/',
    DEV: 'https://53oxz4hn7vhmlc7jqkvsqsyefa.appsync-api.ap-south-1.amazonaws.com/graphql',
    QA: 'https://xkza57wopjavnb54dz6zjfl4oe.appsync-api.ap-south-1.amazonaws.com/graphql',
    STAGING: 'https://shopper.staging.buysocial.app/graphql',
};
const bsApiKey = {
    LOCAL: 'da2-fakeApiId123456',
    DEV: 'da2-dfyacewaunco7cjqkdkvfuqm74',
    QA: 'da2-rexxbxjz3zhwvlbmsxprxgzkti',
    STAGING: 'da2-q3bwofr6vfc2hhzaoe4iklveyq',
};

const passwordEncryptionKeyClient = {
    LOCAL: 'WeNeedSomeSecureKeyToEncryptPass',
    DEV: 'WeNeedSomeSecureKeyToEncryptPass',
    QA: 'WeNeedSomeSecureKeyToEncryptPass',
    STAGING: 'Fe(w}Xg2,EdkQ]Vcaf-CqYHKN2Fd',
};

const awsRegion = {
    LOCAL: 'ap-south-1',
    DEV: 'ap-south-1',
    QA: 'ap-south-1',
    STAGING: 'us-east-1',
};

const websocketUrl = {
    LOCAL: 'wss://pyhp1numnb.execute-api.ap-south-1.amazonaws.com/dev',
    DEV: 'wss://pyhp1numnb.execute-api.ap-south-1.amazonaws.com/dev',
    QA: 'wss://nuh5jb154b.execute-api.ap-south-1.amazonaws.com/qa',
    STAGING: 'wss://ws.staging.buysocial.app/shopper',
};

// Stripe publisher key will be from Buysocial Stripe account
const stripePublisherKey = {
    LOCAL: 'pk_test_51JXoYQIZnooBqdf7EcdVWmGiLJWYq59MfOxM8DEygQehZ9KgdWCxWddKeoPLLInphdNvvTYWQflWx4FcgBlDEPul00sLSYS2q9',
    DEV: 'pk_test_51JXoYQIZnooBqdf7EcdVWmGiLJWYq59MfOxM8DEygQehZ9KgdWCxWddKeoPLLInphdNvvTYWQflWx4FcgBlDEPul00sLSYS2q9',
    QA: 'pk_test_51JXoYQIZnooBqdf7EcdVWmGiLJWYq59MfOxM8DEygQehZ9KgdWCxWddKeoPLLInphdNvvTYWQflWx4FcgBlDEPul00sLSYS2q9',
    STAGING: 'pk_test_51ObkGKL416NfJ4bKhtFipjVmXkYcuhZkvA2iFeAqn9mnaVUOEYRmEypd41x7cs9Byicaf7eDsCwyiV80jLYEk5Af00enB0n5qG',
};

export const GOOGLE_TENENT_ID = process.env.NEXT_PUBLIC_GOOGLE_TENENT_ID;
export const GOOGLE_WEB_CLIENT_ID = process.env.NEXT_PUBLIC_GOOGLE_WEBCLIENT_ID;
export const ONESIGNAL_APP_ID = process.env.NEXT_PUBLIC_ONESIGNAL_APP_ID;

export const PRIMARY_COLOR = process.env.NEXT_PUBLIC_PRIMARY_COLOR;
export const SECONDARY_COLOR = process.env.NEXT_PUBLIC_SECONDARY_COLOR;
export const NEXT_PUBLIC_BG_COLOR = process.env.NEXT_PUBLIC_BG_COLOR;

export const BS_API_ENDPOINT = bsApiEndpoint[ENV];
export const BS_API_KEY = bsApiKey[ENV];
export const PASSWORD_ENCRYPTION_KEY_CLIENT = passwordEncryptionKeyClient[ENV];
export const AWS_REGION = awsRegion[ENV];
export const WEBSOCKET_URL = websocketUrl[ENV];

export const STRIPE_PUBLISHER_KEY = stripePublisherKey[ENV];


const firebaseKey = {
    LOCAL: 'AIzaSyBkA5bqCZevudt15YgJiY-emCYvwabovBw',
    DEV: 'AIzaSyBkA5bqCZevudt15YgJiY-emCYvwabovBw',
    QA: 'AIzaSyAe32DHR-Cndtn8OEUekGgGAQQ88rEENp8',
    STAGING: 'AIzaSyDea6V8sWzFyq7yzy1-ZSK2otf8rxaI-60',
};
export const FIREBASE_API_KEY = firebaseKey[ENV];

const firebaseAuthDomain = {
    LOCAL: 'stellar-operand-368804.firebaseapp.com',
    DEV: 'stellar-operand-368804.firebaseapp.com',
    QA: 'evident-post-377014.firebaseapp.com',
    STAGING: 'buysocial-staging.firebaseapp.com',
};

export const FIREBASE_AUTH_DOMAIN = firebaseAuthDomain[ENV];

const ssrToken = {
    LOCAL: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdG9yZUlkIjoic2hvcHBlci10ZXN0LW12a2k0IiwiaWF0IjoxNzAyMjYxNjQ5fQ.VOwTJmQeizD8dtZEg7nzfdl_2RaCNJwYSb6ABSxhiMw',
    DEV: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdG9yZUlkIjoic2hvcHBlci10ZXN0LW12a2k0IiwiaWF0IjoxNzAyMjYxNjQ5fQ.VOwTJmQeizD8dtZEg7nzfdl_2RaCNJwYSb6ABSxhiMw',
    QA: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdG9yZUlkIjoiYnV5c29jaWFsZGV2LWM1c29rIiwiaWF0IjoxNzA2NjE3MjgxfQ.eywu1fGO4MH8GnCQBaQzF-444HG-DWRX_sqOEnorprY',
    STAGING: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdG9yZUlkIjoiYnV5c29jaWFsLWNwMjc4IiwiaWF0IjoxNzA3NzI1MjM4fQ.kHKLaPYvmEnIBs10LBVOB7F17id_ksf8V9uFTdS_mB0'
}

export const SSR_TOKEN = ssrToken[ENV];


const algoliaApplicationId = {
    LOCAL: '0DI0MTK6CS',
    DEV: '0DI0MTK6CS',
    QA: '9ZMEZJ1NI0',
    STAGING: 'KSVDZ4S4GS',
};

const algoliaApiKey = {
    LOCAL: '9278c5e7be78303d6abc6132e3dd481e',
    DEV: '9278c5e7be78303d6abc6132e3dd481e',
    QA: '4a06a7d3d80256f14eb705b2ae9695f8',
    STAGING: 'd0c61ddf7ee85a30f2825ddae9b17a8e',
};

const algoliaDefaultIndex = {
    LOCAL: 'shopper-test-mvki4_products',
    DEV: 'shopper-test-mvki4_products',
    QA: 'buysocialdev-c5sok_products',
    STAGING: 'buysocial-cp278_products',
};

const algoliaIndexPriceAsc = {
    LOCAL: 'price_asc',
    DEV: 'price_asc',
    QA: 'buysocialdev-c5sok_products_price_asc',
    STAGING: 'buysocial-cp278_products_price_asc',
};

const algoliaIndexPriceDesc = {
    LOCAL: 'price_desc',
    DEV: 'price_desc',
    QA: 'buysocialdev-c5sok_products_price_desc',
    STAGING: 'buysocial-cp278_products_price_desc',
};

export const ALGOLIA_APPLICATION_ID = algoliaApplicationId[ENV];
export const ALGOLIA_API_KEY = algoliaApiKey[ENV];
export const ALGOLIA_DEFAULT_INDEX = algoliaDefaultIndex[ENV];
export const ALGOLIA_INDEX_PRICE_ASC = algoliaIndexPriceAsc[ENV];
export const ALGOLIA_INDEX_PRICE_DESC = algoliaIndexPriceDesc[ENV];


