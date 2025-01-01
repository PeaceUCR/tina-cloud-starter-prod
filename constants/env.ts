// @ts-ignore
export const ENV: 'LOCAL' | 'DEV' | 'QA' | 'STAGING' = process.env.NEXT_PUBLIC_ENV || 'DEV';
console.log({ENV});

const isServer = typeof window === 'undefined';
if (!isServer) {
    console.log('NOT isServer');
    if (!localStorage.getItem("tinacms-auth")) {
        console.log('SET tinacms-auth');
        localStorage.setItem("tinacms-auth", JSON.stringify(
          {
              "id_token": "eyJraWQiOiI5YlN2a0JiUjlGWWxmaU02b2I5c2FGMElva2NXczh2S29SY0lCbnl6M1VvPSIsImFsZyI6IlJTMjU2In0.eyJzdWIiOiJiMjlmYWI2NS1jODUwLTRmOWEtYjY3Zi0wYWI3ODc4MGQ3NTQiLCJhdWQiOiI1YjhmbWh2MWczNWtidWg4M3ZkYmF1ZHJuaCIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJldmVudF9pZCI6IjA0NWMwYjJhLWNlMTItNGQzYS1iMjc5LTI5OTVkZjE3YTZiNSIsInRva2VuX3VzZSI6ImlkIiwiYXV0aF90aW1lIjoxNzI4MDUzMDMxLCJpc3MiOiJodHRwczpcL1wvY29nbml0by1pZHAudXMtZWFzdC0xLmFtYXpvbmF3cy5jb21cL3VzLWVhc3QtMV82YWhpU2hTVWMiLCJjb2duaXRvOnVzZXJuYW1lIjoiYjI5ZmFiNjUtYzg1MC00ZjlhLWI2N2YtMGFiNzg3ODBkNzU0IiwiZXhwIjoxNzI4MDU2NjMxLCJpYXQiOjE3MjgwNTMwMzEsImVtYWlsIjoicGluZ0B0cnlidXlzb2NpYWwuY29tIn0.jx3_gwVZ6LLK5kAsKjzDrIU0R0_c9cHvJFiYCotg1lplC3jdzy6y3jL7KNVhD4q76beV1ltYBLOjFqTmylMwW3lBAsOXTRwzms6EkKbJqmch-exogrKFLCQAQJZDeUM4Dqu8dF7-rXgVl2nqk73KR4ZVpF0FeCPotT0RoTFjf7JqbDV-moiRSxavMQoDz2TcMsXbzmw92v0T-5VmN5CR52P45hJyU6TIH0jtFiRdBDljq8ChAelgXNDZ59a3KaP2eqgl4YAHGh70zvCG3SGKZh_GQ1w8g-d1lAcj0stYqwdG61zzBy30m8IZo1NOGM01lyv9KM3UZD4XnLE8f9reMw",
              "access_token": "eyJraWQiOiJ1dGVYWlBUOTJnYmNaWDQwY3Rhbk1MUUJ3WTVcLzlMT0pnWEI0d1FVRzg3TT0iLCJhbGciOiJSUzI1NiJ9.eyJzdWIiOiJiMjlmYWI2NS1jODUwLTRmOWEtYjY3Zi0wYWI3ODc4MGQ3NTQiLCJldmVudF9pZCI6IjA0NWMwYjJhLWNlMTItNGQzYS1iMjc5LTI5OTVkZjE3YTZiNSIsInRva2VuX3VzZSI6ImFjY2VzcyIsInNjb3BlIjoiYXdzLmNvZ25pdG8uc2lnbmluLnVzZXIuYWRtaW4iLCJhdXRoX3RpbWUiOjE3MjgwNTMwMzEsImlzcyI6Imh0dHBzOlwvXC9jb2duaXRvLWlkcC51cy1lYXN0LTEuYW1hem9uYXdzLmNvbVwvdXMtZWFzdC0xXzZhaGlTaFNVYyIsImV4cCI6MTcyODA1NjYzMSwiaWF0IjoxNzI4MDUzMDMxLCJqdGkiOiI3NTQ4NGQ4ZS00YTliLTQ4MDEtYjlkYy1kZDg5M2Y2MjJmYWMiLCJjbGllbnRfaWQiOiI1YjhmbWh2MWczNWtidWg4M3ZkYmF1ZHJuaCIsInVzZXJuYW1lIjoiYjI5ZmFiNjUtYzg1MC00ZjlhLWI2N2YtMGFiNzg3ODBkNzU0In0.lFUiSsinSrqs-bX6-okbX6xzrNbrHlF_4WQAFMigeGI_aUCCMmoRAh7btDpzajxGVuQs9D38DL9lso217vLEgsSiP0VZQG9bUMTvRFYsPRbeGC807IJBuiIP1EJA7GYRFlmTUHjHgAN2FVgMgNYzUYmqT08RjQxJg7Pv1hv0Q6Pi_1OHplzZT2EypqN1syxFh5E0edHxjX8dEz6cE48R2_rHeF1MAP9XOTwaLrJBPKJgMwKIxj2V_9KJneDVERyfGhtKfZT1lhbn832_p6Ka4HnxTqQPHwIrbcPpf2q6jkTCdFopI52r-tZh_n4UOyEOkkVmaKZjE41Htx9rT2jphA",
              "refresh_token": "eyJjdHkiOiJKV1QiLCJlbmMiOiJBMjU2R0NNIiwiYWxnIjoiUlNBLU9BRVAifQ.Kb0d9-R4uHLGZzIiI8dLsFVK0rgMSaxSYRdGdlkO2gkwaMALNiaEIx-8dWRJku4JbBohNliwe4kJc5LtqxOBIz0FmcOA3leo41WuGx1XuB_Wp3ANRNooPwci2_IX_gd6UObiKHCmYEzmgd4mJcUmgJQGBeu0ETVzZ4ghPi6ReuNcOXlXIIOrcGM8CTqV4MIDcMgVaoqur93aTkglxTYyukegaZULi2B0Ryx4dWjw5yVLEOiKnEItFMwRyt5pzPal1Xabksyz8RMH86ZkpP1nkXfLArTl6JiqbT-Ns8PC5556zARpOG3-lztVmJ_2vkhbWjuItswQ0anR4emZ5ppa2A.CPFadOdgKEf6oRvm.ey1sCW0FDiwtnRTb9wlJlWnjPSsliWRI7OvIEXqNSTs9nOPBk8xyZQht9DvnWxEcJc2yMBtfQ31iLA7xA7dEUgkOoffB5e5H9IOymyOONBXbPsZmdA7V9gHizk7vfBF25Kr1y2GbeMxW40dVorkt1v1yLIWpSfuxNkNOn8z92ZdaFrTyXZXkfRSkyqOakQRVuSCQuQIjRa0x4LpCGxjWmST5ddXYwdQmNPL38xYnOywTfZRJe1EGGEGckIbKNAdy_KKU9vNC-gggiFGKoV9nLLz17whuS7funkoEz0h48aHBYvQuVV8eBeBFxlRjDBDbi2AkKTKTzcyZ3O1PznXbkWWZyz552VqFR2bnUyocub6DLR0K0tWQwjh2i47EG7ztLcFSbOyWsJvysDjAygW8mnTHqqdzaYRs78nQopKoVAGpI3kjbjY4SYTq1yHtMdcxuJYWXLLwCFLf7o4a2g0knKINy6f7FvrePnxnmz00RlHh_UIDYsQ-Irdw4ZFxPqI5YU2BnlvK6vlXn7Ny1N5P5qKCOeMVOZYypmOBnanmovM4donBzOVHOwokhw_6wFz8-NZhhBTTobNRcXjXHzWnWfqOAcpza1aeachT9MNWiUA6rvfv15tKqBwlndu-ybkU8c-7jQpogXax27LTWu1ITM-H4YlKuaJaE2u11ewYjS6cuy_mrP3ZtW96bly0vpX77O1fV_7T03G5rqipuJRpsjXZ5QTRFjdBcjsarol8sviujM4YshztoDv-xXv3xDPD2oQO6AdvJwUSELvcQ9H6C5NPK7kA9TRgZAplGhRac0zphapw-v8VG-v-iJkbqPhteLFlByruyVNy6MAwKw70vcE9Hlp1DfGRlFLL9ClnErwGneK4neVcLEyAk44bHNogtbIZYN8swEZ1EBva1em_xn5BNwHipbHoCqumF-FRRGtaJ1B2S5pJexrHRFtOvZ3--VLCK9HaFpDPyBaWuPjLFcTrUzc5qaghUmp0ABCCIrlFx_F23Lg8laE3MnxRX70U64Ez1bH6HiC3Okf-SSe7_17EsytemfC5FqIyu7gjMPADV2JV982waubde7whtqziw32QJKwUFitkOJrcorWI2ujFUGmKr_9o1qG4KxTGpFcYAvtWhDVlyRKM5mvDbxvJLXSeGdEmxerA2ZD6hRTrhckST0G4yk--rb9NhYT8WH8uj9zbO6C_oB44F9Cepv9L77fJfD0cBjq7OHwazY6Yb5MZVr4skaYFIu7Exz2ghVUOmIPLGi6KtIemzaZt4PxiFD9L6_tWAVDF2KhKnzijcyD241EGx1iZSnjmlAe0bfper-4rX_0HMqqflQXMxw.7Wi85tYcOpWZ1Xf-5gGy6Q"
          }
        ))
    }
}

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
    STAGING: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdG9yZUlkIjoibW9oYW4tc3RvcmUtY2UyaHgiLCJpYXQiOjE3MDY2MTcyMDF9.tPycbpgBM_IFOZr5M2JHM7RcUvbtPNFzBkVjJoX6mQM'
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


