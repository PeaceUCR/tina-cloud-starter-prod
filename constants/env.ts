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
                  "id_token": "eyJraWQiOiI5YlN2a0JiUjlGWWxmaU02b2I5c2FGMElva2NXczh2S29SY0lCbnl6M1VvPSIsImFsZyI6IlJTMjU2In0.eyJzdWIiOiJiMjlmYWI2NS1jODUwLTRmOWEtYjY3Zi0wYWI3ODc4MGQ3NTQiLCJhdWQiOiI1YjhmbWh2MWczNWtidWg4M3ZkYmF1ZHJuaCIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJldmVudF9pZCI6IjE1NmQzMGU1LTk5YjUtNGY4MS05MGVkLTRiYjc2NDRlYTIzMCIsInRva2VuX3VzZSI6ImlkIiwiYXV0aF90aW1lIjoxNzM5NDYwMDUxLCJpc3MiOiJodHRwczpcL1wvY29nbml0by1pZHAudXMtZWFzdC0xLmFtYXpvbmF3cy5jb21cL3VzLWVhc3QtMV82YWhpU2hTVWMiLCJjb2duaXRvOnVzZXJuYW1lIjoiYjI5ZmFiNjUtYzg1MC00ZjlhLWI2N2YtMGFiNzg3ODBkNzU0IiwiZXhwIjoxNzQyMDE0NTA4LCJpYXQiOjE3NDIwMTA5MDgsImVtYWlsIjoicGluZ0B0cnlidXlzb2NpYWwuY29tIn0.TUiearQc4k7M6h2D5aPebOaDbImuWEFBC_ZRwG5ozChX1-W0IuaVryUx1Q99-yN5Pui3vhKd82cIXd1R5aR80V7fdLN3oz1t5muSppS2ucDZSGS4fapEgdr0_jdMAS8Gerwq9Xj6g32CT-SVYyedgMQin7uZP6cyeIfQHpFwH-KB3TOD7CF0NYfOGEPDmykMgYHIVhda4RGwR6b8w_yI0VW6IV8UP1z6KcGtr9WdYnh0cnew28bgVv5hRj-NY-eKeBJY39yz_pi9b60KquZVSMR9_oUYolcEoH3ESu8Z3yUTFDQ7z3j9uzzglW5S-n5iAe9qqmM1J_SqVazVC0AuPg",
                  "access_token": "eyJraWQiOiJ1dGVYWlBUOTJnYmNaWDQwY3Rhbk1MUUJ3WTVcLzlMT0pnWEI0d1FVRzg3TT0iLCJhbGciOiJSUzI1NiJ9.eyJzdWIiOiJiMjlmYWI2NS1jODUwLTRmOWEtYjY3Zi0wYWI3ODc4MGQ3NTQiLCJldmVudF9pZCI6IjE1NmQzMGU1LTk5YjUtNGY4MS05MGVkLTRiYjc2NDRlYTIzMCIsInRva2VuX3VzZSI6ImFjY2VzcyIsInNjb3BlIjoiYXdzLmNvZ25pdG8uc2lnbmluLnVzZXIuYWRtaW4iLCJhdXRoX3RpbWUiOjE3Mzk0NjAwNTEsImlzcyI6Imh0dHBzOlwvXC9jb2duaXRvLWlkcC51cy1lYXN0LTEuYW1hem9uYXdzLmNvbVwvdXMtZWFzdC0xXzZhaGlTaFNVYyIsImV4cCI6MTc0MjAxNDUwOCwiaWF0IjoxNzQyMDEwOTA4LCJqdGkiOiI2NjU0ZTQxOC04NGNhLTRmZTItOGJlMy01MmY0ZDI4ZWIyMWEiLCJjbGllbnRfaWQiOiI1YjhmbWh2MWczNWtidWg4M3ZkYmF1ZHJuaCIsInVzZXJuYW1lIjoiYjI5ZmFiNjUtYzg1MC00ZjlhLWI2N2YtMGFiNzg3ODBkNzU0In0.0OuRUvnlMqFp7sgWyWCq2L38YUP9840gMVfUhfAav3MnXkW-08qr-m-RGpMtxCidauKAAXlCT2uX08Q1IghAYW-NIwHoVbT6mpAzzO6nexddnL4L6N-NPUQ49gdFLkkShcP2zpYCUZb_ZQEt-H3V2-BF8PqJ76n-h7fwYKwCCCooY8vwgsff2WYIGdh2zNDcxLx9bKPOYrgPONTieHTW3S0TMdHxKQDjTBwCRId5TgUmHma4s-qSDzkhf849L3DJ-6Sc9f9O28IWYhoaVaPXAk-0EVv4-bHBndUnktxvUuHv0S6vTAvftDv8zTRYMosueQrsSYy3BsLO4VTfn6B-lw",
                  "refresh_token": "eyJjdHkiOiJKV1QiLCJlbmMiOiJBMjU2R0NNIiwiYWxnIjoiUlNBLU9BRVAifQ.O-oskanlFRerMzqR6oBgnzigVtD4ylit-SfYzDFDBmUt1870XP9qV7uX7jF-Dz3oNarXUHgQk8FQQ-FCp1J_-brsV8rB9OJshHVA0JKKvjswMV4ANByjJEd3PfGR87neDJ3QqYPCD71AMRBUCCSCoPf_QdeBWcKrFtYrlab3FRNTwhY8vUNhZuseWezIZobHpbInHRri5Ksc2DQXjzZgRTCUbYU9xGsu54JqHXynVsMhrpkabotrWHrAh8GlHsNct_w8BWsXTNIcr6tMYaVUtbwq8O2c7__l9n5gK1eGG_dcCzirLv2ASlDxivdcoVPBm5pZgRrCrnsnk7-rw9X7hg.YSBFecXPJ3cFV4kT.AFv7PnO26KTyruDO7USTKnHSf7vjRTwtEWcI8SN24Ltw-0GtpsMScv-8C_lW-zYdWswI9u_YlbYx-X10YNzD4ftEeH2IVKADzvGntTmNyWi3UiWkq0XugqUS2sJ-pmlMzP2nEKdjGIIXS6Ybu4HRBvZcbjYQfZvTJ8FXqwnsB_k0c74aCA7Tlqtx6bmr4RBZa0jQRhkselBYXdTweqZe6JHnQMoy5Jde4UuRu7qztKp-AgEH-qlQqK-ZkL6OJv5lg9jH4MSKdkTIdYLvoVSuzLjK6sa1aiiea4k7DeGU97ni9D_OzW9YUjszkJfcy7xFi_VXIG1enTql4ehvr5zXyyVvLmx9_AV2V7jS17w_eGevop5-pryOBHkhc4BiVprWmoaqm1YE9mdyH3dqNvT2sFWRSr-foUs05wX7hBF1XRQ4sVoVmK2PmAtLkIAd2aX_SkVK0lPavmuq2uDMx35Ro1F9T5Ws_NQa7dya9k_-fmtbFiAbfrsBi6eRZSoCrHpHAyzkjFVOp405X0MRM_vnHxkCWmwBg7WJGjpEQg0cG6D9PCTnZ8Hu_c7yJAF7YueSKdWTY8NS2bIL1hmH5qdKrKdB4RHXNd874f0avVm17601sA0yk04ctszz_2YVpobGlXukWom1eU_EG9dAaj40P4xR2RwO2v00zI9MYNY2K-cKkBBcml66AS6L3XpLCud8KqJXVmdTxCTrm_T1PX8CD-KWnxT29_ZiVoRydCHHwfVAUAnbG-z5CSVdhWOf2tw42omDK2BhuDHkyEdg1yz8eQ1vMZs5qZAbdlL585Dtnu8BjKIjCZ-DMe-Ym3o1zfbLe4md3AUC7SRoZw4G1jMuiu43ZosEssJtwSi0UP63n-nnbRKwPzUrnE5yhWma6lQmSDmVD03CGRFrjGJrXa8UQGRL--FwK91tzdaByBhbbCjagOSLrUJAEPx-EEF7JVm7lWG_-CdFVD9VcC9ilt-F19-fn19AYHHtdQJ0Y7t7GKZxoMWcTSMflqYfWjVzwKIQywIZVpI70yU_ywemufsX_npZbWhIZcTkYD_Uk0VB2SjJbay7oGJpjqN8KmH3ttnlJ0X_b2SmU-RaVze4_SihSf58dy9xEjYm2kp0HGRmEVQoydn_afyjHm-8-bzpN0pMAB8EzdfrWyXDNzgjnb0cdVRqahClWQrAW5iDjJCHHvhe1ZCf9_XCfqI1srRbWyH4UY6yGHuX5US4wIAEptp8HOUT4Puy8lBc8EoLiqSGffoxLQjzDuZbI6-kAfsM0AOzV2cpdIxO5gLVUcsNK28D-_gvErGLJdCTZTiqmUH-qEcgkP1QWu3plKhv-kroRg.MuPltDO1HCwZfBfVvcQsBg"
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


