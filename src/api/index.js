const express = require('express');
var router = express.Router();
const {auth, resolver, loaders} = require('@iden3/js-iden3-auth')
const getRawBody = require('raw-body')
var cors = require("cors");
const app = express();
const port = 9000;

app.use(cors());

app.use(express.static('static'));

app.get("/api/sign-in", (req, res) => {
    console.log('get Auth Request');
    GetAuthRequest(req,res);
});

app.get("/api/lens", (req, res) => {
    console.log('get Lens Request');
    GetLensRequest(req,res);
});

app.get("/api/gmail", (req, res) => {
    console.log('get Gmail Request');
    GetGmailRequest(req,res);
});

app.get("/api/flipkart", (req, res) => {
    console.log("Flipkart");
    GetFlipkartRequest(req, res);
})

app.post("/api/callback", (req, res) => {
    console.log('callback');
    Callback(req,res);
});

app.listen(port, () => {
    console.log('server running on port 9000');
});

// Create a map to store the auth requests and their session IDs
const requestMap = new Map();

        async function GetLensRequest(req,res) {

            // Audience is verifier id
            const hostUrl = "http://127.0.0.1:5173/";
            const sessionId = 1;
            const callbackURL = "/api/callback"
            const audience = "1125GJqgw6YEsKFwj63GY87MMxPL9kwDKxPUiwMLNZ"

            const uri = `${hostUrl}${callbackURL}?sessionId=${sessionId}`;

            // Generate request for basic authentication
            const request = auth.createAuthorizationRequestWithMessage(
                'test flow',
                'message to sign',
                audience,
                uri,
            );
            
            request.id = '7f38a193-0918-4a48-9fac-36adfdb8b542';
            request.thid = '7f38a193-0918-4a48-9fac-36adfdb8b542';

            // Add request for a specific proof
            const proofRequest = {
                id: 1,
                circuit_id: 'credentialAtomicQuerySig',
                rules: {
                    query: {
                    allowedIssuers: ['*'],
                    schema: {
                        type: 'Lens',
                        url: 'https://platform-test.polygonid.com/claim-link/966dca79-5b13-4611-8c7e-0fbe93c73cd6',
                    },
                    req: {
                        LensHolder: {
                            $eq: 1,
                        },
                    },
                    },
                },
                };

            const scope = request.body.scope ?? [];
            request.body.scope = [...scope, proofRequest];

            // Store auth request in map associated with session ID
            requestMap.set(`${sessionId}`, request);

            return res.status(200).set('Content-Type', 'application/json').send(request);
        }


        async function GetGmailRequest(req,res) {

            // Audience is verifier id
            const hostUrl = "http://127.0.0.1:5173/";
            const sessionId = 1;
            const callbackURL = "/api/callback"
            const audience = "1125GJqgw6YEsKFwj63GY87MMxPL9kwDKxPUiwMLNZ"

            const uri = `${hostUrl}${callbackURL}?sessionId=${sessionId}`;

            // Generate request for basic authentication
            const request = auth.createAuthorizationRequestWithMessage(
                'test flow',
                'message to sign',
                audience,
                uri,
            );
            
            request.id = '7f38a193-0918-4a48-9fac-36adfdb8b542';
            request.thid = '7f38a193-0918-4a48-9fac-36adfdb8b542';

            // Add request for a specific proof
            const proofRequest = {
                id: 1,
                circuit_id: 'credentialAtomicQuerySig',
                rules: {
                    query: {
                    allowedIssuers: ['*'],
                    schema: {
                        type: 'Google',
                        url: 'https://s3.eu-west-1.amazonaws.com/polygonid-schemas/57c48006-b6bd-453f-8480-33964e69f53f.json-ld',
                    },
                    req: {
                        GoogleAccountPossession: {
                            $eq: 1,
                        },
                    },
                    },
                },
                };

            const scope = request.body.scope ?? [];
            request.body.scope = [...scope, proofRequest];

            // Store auth request in map associated with session ID
            requestMap.set(`${sessionId}`, request);

            return res.status(200).set('Content-Type', 'application/json').send(request);
        }

        // returns flipkart request
        async function GetFlipkartRequest(req,res) {

			// Audience is verifier id
			const hostUrl = "http://127.0.0.1:5173/";
			const sessionId = 1;
			const callbackURL = "/api/callback"
			const audience = "1125GJqgw6YEsKFwj63GY87MMxPL9kwDKxPUiwMLNZ"

			const uri = `${hostUrl}${callbackURL}?sessionId=${sessionId}`;

			// Generate request for basic authentication
			const request = auth.createAuthorizationRequestWithMessage(
				'test flow',
				'message to sign',
				audience,
				uri,
			);
			
			request.id = '7f38a193-0918-4a48-9fac-36adfdb8b542';
			request.thid = '7f38a193-0918-4a48-9fac-36adfdb8b542';

			// Add request for a specific proof
			const proofRequest = {
				id: 1,
				circuit_id: 'credentialAtomicQuerySig',
				rules: {
					query: {
					allowedIssuers: ['*'],
					schema: {
						type: 'MaticPossession',
						url: 'https://platform-test.polygonid.com/claim-link/fedcef7e-6dd7-4e61-b8d9-039fa1af7288',
					},
					req: {
						MaticAccountHolder: {
                            $eq: 1,
						},
					},
					},
				},
				};

			const scope = request.body.scope ?? [];
			request.body.scope = [...scope, proofRequest];

			// Store auth request in map associated with session ID
			requestMap.set(`${sessionId}`, request);

			return res.status(200).set('Content-Type', 'application/json').send(request);
        }

		// GetQR returns auth request
		async function GetAuthRequest(req,res) {

			// Audience is verifier id
			const hostUrl = "http://127.0.0.1:5173/";
			const sessionId = 1;
			const callbackURL = "/api/callback"
			const audience = "1125GJqgw6YEsKFwj63GY87MMxPL9kwDKxPUiwMLNZ"

			const uri = `${hostUrl}${callbackURL}?sessionId=${sessionId}`;

			// Generate request for basic authentication
			const request = auth.createAuthorizationRequestWithMessage(
				'test flow',
				'message to sign',
				audience,
				uri,
			);
			
			request.id = '7f38a193-0918-4a48-9fac-36adfdb8b542';
			request.thid = '7f38a193-0918-4a48-9fac-36adfdb8b542';

			// Add request for a specific proof
			const proofRequest = {
				id: 1,
				circuit_id: 'credentialAtomicQuerySig',
				rules: {
					query: {
					allowedIssuers: ['*'],
					schema: {
						type: 'AgeCredential',
						url: 'https://s3.eu-west-1.amazonaws.com/polygonid-schemas/9b1c05f4-7fb6-4792-abe3-d1ddbd9a9609.json-ld',
					},
					req: {
						dateOfBirth: {
						$lt: 20000101, // bithDay field less then 2000/01/01
						},
					},
					},
				},
				};

			const scope = request.body.scope ?? [];
			request.body.scope = [...scope, proofRequest];

			// Store auth request in map associated with session ID
			requestMap.set(`${sessionId}`, request);

			return res.status(200).set('Content-Type', 'application/json').send(request);
        }

        // Callback verifies the proof after sign-in callbacks
		async function Callback(req,res) {

			// Get session ID from request
			const sessionId = req.query.sessionId;

			// get JWZ token params from the post request
			const raw = await getRawBody(req);
			const tokenStr = raw.toString().trim();

			// fetch authRequest from sessionID
			const authRequest = requestMap.get(`${sessionId}`);
				
			// Locate the directory that contains circuit's verification keys
			const verificationKeyloader = new loaders.FSKeyLoader('../keys');
			const sLoader = new loaders.UniversalSchemaLoader('ipfs.io');

			// Add Polygon Mumbai RPC node endpoint - needed to read on-chain state and identity state contract address
			const ethStateResolver = new resolver.EthStateResolver('<Polygon Mumbai RPC NODE>', '0x46Fd04eEa588a3EA7e9F055dd691C688c4148ab3');

			// EXECUTE VERIFICATION
			const verifier = new auth.Verifier(
			verificationKeyloader,
			sLoader, ethStateResolver,
		);


		try {
			authResponse = await verifier.fullVerify(tokenStr, authRequest);
		} catch (error) {
		return res.status(500).send(error);
		}
		return res.status(200).set('Content-Type', 'application/json').send("user with ID: " + authResponse.from + " Succesfully authenticated");
		}

module.exports = router;