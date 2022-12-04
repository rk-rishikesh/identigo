
import React,{ Fragment, useCallback, useState } from 'react';
import {
  Card,
  CardBody,
  CardHeader,
  Typography,
  Button,
  IconButton,
  Input,
  Textarea,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Switch,
} from "@material-tailwind/react";
import { Steps } from "antd";
import { UsersIcon } from "@heroicons/react/24/solid";
import { PageTitle, Footer } from "@/widgets/layout";
import { FeatureCard, TeamCard } from "@/widgets/cards";
import { featuresData, teamData, contactData } from "@/data";
import { googleQR, twitter, twitterWithHundredPlusFollowers, twitterWithThousandPlusFollowers, twitterWithTenThousandPlusFollowers, githubQR, instagramQR, linkedInQR, discordQR, lensQR, withHundredMatic, withThousandMatic, moreThanOneTransactionOnPolygon, unstoppableDomainQR, nftHolderQR } from "../data/constants";
import Web3 from "web3";
import {QRCodeSVG} from 'qrcode.react';
import { ethers } from "ethers";
import {
  LoginSocialGoogle,
  LoginSocialAmazon,
  LoginSocialFacebook,
  LoginSocialGithub,
  LoginSocialInstagram,
  LoginSocialLinkedin,
  LoginSocialMicrosoft,
  LoginSocialPinterest,
  LoginSocialTwitter,
  LoginSocialApple,
} from 'reactjs-social-login';

import {reputationScoreContractAddress, reputationScoreContractABI} from "../data/contract-data";
import {Link} from "react-router-dom";
import { useAccount } from 'wagmi'
import { Chat } from "@pushprotocol/uiweb";

const { Step } = Steps;

export function Home() {

  // Reputation Score

  const updateGoogle = async () => {
    connectWallet();
    console.log("HOlA")
    const circuitId = "credentialAtomicQuerySig";
    const validatorAddress = "0xb1e86C4c687B85520eF4fd2a0d14e81970a15aFB";
    const id = 1;
    // Grab the schema hash from Polygon ID Platform
    const schemaHash = "e28a6809b2521f0c9991d3453aa55d07"
  
    const schemaEnd = fromLittleEndian(hexToBytes(schemaHash))
  
    const ageQuery = {
      schema: ethers.BigNumber.from(schemaEnd),
      slotIndex: 2,
      operator: 1,
      value: [1,...new Array(63).fill(0).map(i=>0)],
      circuitId,
      };
  
    const web3 = window.web3;
    console.log(web3)

    const reputation = new web3.eth.Contract(reputationScoreContractABI, reputationScoreContractAddress);
    console.log(reputation)
    await reputation.methods.setZKPRequest(
      id,
      validatorAddress,
      ageQuery
      ).send({from:address})
      .on("transactionHash", (hash) => {
        console.log(hash);
        console.log("Req sent")
      });
    
    function hexToBytes(hex) {
      for (var bytes = [], c = 0; c < hex.length; c += 2)
          bytes.push(parseInt(hex.substr(c, 2), 16));
      return bytes;
    }
  
    function fromLittleEndian(bytes) {
      const n256 = BigInt(256);
      let result = BigInt(0);
      let base = BigInt(1);
      bytes.forEach((byte) => {
        result += base * BigInt(byte);
        base = base * n256;
      });
      return result;
    }

  }

  const updateMatic = async () => {
    connectWallet();
    console.log("HOlA")
    const circuitId = "credentialAtomicQuerySig";
    const validatorAddress = "0xb1e86C4c687B85520eF4fd2a0d14e81970a15aFB";
    const id = 1;
    // Grab the schema hash from Polygon ID Platform
    const schemaHash = "c63cf2bae3579d35e59f1d4055c7950a"
  
    const schemaEnd = fromLittleEndian(hexToBytes(schemaHash))
  
    const ageQuery = {
      schema: ethers.BigNumber.from(schemaEnd),
      slotIndex: 2,
      operator: 1,
      value: [1,...new Array(63).fill(0).map(i=>0)],
      circuitId,
      };
  
    const web3 = window.web3;
    console.log(web3)

    const reputation = new web3.eth.Contract(reputationScoreContractABI, reputationScoreContractAddress);
    console.log(reputation)
    await reputation.methods.setZKPRequest(
      id,
      validatorAddress,
      ageQuery
      ).send({from:address})
      .on("transactionHash", (hash) => {
        console.log(hash);
        console.log("Req sent")
      });
    
    function hexToBytes(hex) {
      for (var bytes = [], c = 0; c < hex.length; c += 2)
          bytes.push(parseInt(hex.substr(c, 2), 16));
      return bytes;
    }
  
    function fromLittleEndian(bytes) {
      const n256 = BigInt(256);
      let result = BigInt(0);
      let base = BigInt(1);
      bytes.forEach((byte) => {
        result += base * BigInt(byte);
        base = base * n256;
      });
      return result;
    }

  }
  
  // Connect Wallet
  const [walletLoading, setWalletLoading] = useState();
  const [address, setUserAddress] = useState();
  const [connected, setConnected] = useState(false);
  const [avg, setAvg] = useState(false);

  const getUserBalance = async () => {
    //Using fetch
    const response = await fetch("https://api.covalenthq.com/v1/80001/address/0x38315E76CEB6Afe5D09D86766B42831613d06f1b/balances_v2/?key=ckey_cd0db4e4a1bc45dda37c29e7380")
    const data = await response.json()
    return data.data.items[0].balance;
  }

  function calculateAverage(array) {
    var total = 0;
    var count = 0;

    array.forEach(function(item, index) {
        total += parseInt(item);
        count++;
    });
    return total / count;
}

  const getHistoricalPortfolioValueOverTime = async () => {
    //Using fetch
    const response = await fetch("https://api.covalenthq.com/v1/80001/address/0x38315E76CEB6Afe5D09D86766B42831613d06f1b/portfolio_v2/?key=ckey_cd0db4e4a1bc45dda37c29e7380")
    const data = await response.json()
    console.log(data.data.items[0].holdings);
    const timelineArray = data.data.items[0].holdings;
    const balanceArray = []
    for(var i = 0; i < timelineArray.length; i++) {
      balanceArray.push(timelineArray[i].close.balance)
    }
    console.log(calculateAverage(balanceArray));
    return calculateAverage(balanceArray);
  }

  const connectWallet = async () => {
    // Modern dapp browsers...
    if (window.ethereum) {
      setWalletLoading(true)
      window.web3 = new Web3(window.ethereum);
      console.log(window.web3);
      await window.ethereum.enable();
      await accountChangeHandler();
    }
    // Legacy dapp browsers...
    else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider);
      await accountChangeHandler();
    }
    // Non-dapp browsers...
    else {
      window.alert(
        "Non-Ethereum browser detected. You should consider trying MetaMask!"
      );
    }
  };

  const accountChangeHandler = async () => {
    const web3 = window.web3;
    // Load account
    const accounts = await web3.eth.getAccounts();
    // Setting an address data
    setUserAddress(accounts[0]);
    console.log(accounts[0]);
    setConnected(true);
  };

  // Twitter
  const [twitterOpen, setTwitterOpen] = useState(false);
  const [twitterToggle, setTwitterToggle] = useState(false);
  const [twitterQr, setTwitterQR] = useState(false);

  const handleTwitterOpen = () => {
    console.log("Hello");
    setTwitterOpen(!twitterOpen);
  };

  const handleTwitterToggleSwitch = () => {
    console.log("Toggle");
    setTwitterToggle(!twitterToggle);
  };

  const handleTwitterQR = () => {
    console.log("Switch");
    setTwitterQR(!twitterQr);
  };

  // Google
  const [googleOpen, setGoogleOpen] = useState(false);
  const [googleToggle, setGoogleToggle] = useState(false);
  const [googleQr, setGoogleQR] = useState(false);
  const [googleScore, setGoogleScore] = useState(false);
  
  const handleScoreOn = () => {
    console.log("Hellou")
    updateGoogle()
    setGoogleScore(true);
  }
  const handleGoogleOpen = () => {
    console.log("Hello");
    setGoogleOpen(!googleOpen);
  };

  const handleGoogleToggleSwitch = () => {
    console.log("Toggle");
    setGoogleToggle(!googleToggle);
  };

  const handleGoogleQR = () => {
    console.log("Switch");
    setGoogleQR(!googleQr);
  };

  // Github

  const [githubOpen, setGithubOpen] = useState(false);
  const [githubToggle, setGithubToggle] = useState(false);
  const [githubQr, setGithubQR] = useState(false);

  const handleGithubOpen = () => {
    console.log("Hello");
    setGithubOpen(!githubOpen);
  };

  const handleGithubToggleSwitch = () => {
    console.log("Toggle");
    setGithubToggle(!githubToggle);
  };

  const handleGithubQR = () => {
    console.log("Switch");
    setGithubQR(!githubQr);
  };

  // Instagram
  const [instagramOpen, setInstagramOpen] = useState(false);
  const [instagramToggle, setInstagramToggle] = useState(false);
  const [instagramQr, setInstagramQR] = useState(false);

  const handleInstagramOpen = () => {
    console.log("Hello");
    setInstagramOpen(!instagramOpen);
  };

  const handleInstagramToggleSwitch = () => {
    console.log("Toggle");
    setInstagramToggle(!instagramToggle);
  };

  const handleInstagramQR = () => {
    console.log("Switch");
    setInstagramQR(!instagramQr);
  };

  // LinkedIn
  const [linkedInOpen, setLinkedInOpen] = useState(false);
  const [linkedInToggle, setLinkedInToggle] = useState(false);
  const [linkedInQr, setLinkedInQR] = useState(false);

  const handleLinkedInOpen = () => {
    console.log("Hello");
    setLinkedInOpen(!linkedInOpen);
  };

  const handleLinkedInToggleSwitch = () => {
    console.log("Toggle");
    setLinkedInToggle(!linkedInToggle);
  };

  const handleLinkedInQR = () => {
    console.log("Switch");
    setLinkedInQR(!linkedInQr);
  };

  // Discord
  const [discordOpen, setDiscordOpen] = useState(false);
  const [discordToggle, setDiscordToggle] = useState(false);
  const [discordQr, setDiscordQR] = useState(false);

  const handleDiscordOpen = () => {
    console.log("Hello");
    setDiscordOpen(!discordOpen);
  };

  const handleDiscordToggleSwitch = () => {
    console.log("Toggle");
    setDiscordToggle(!discordToggle);
  };

  const handleDiscordQR = () => {
    console.log("Switch");
    setDiscordQR(!discordQr);
  };

  // Lens
  const [lensOpen, setLensOpen] = useState(false);
  const [lensToggle, setLensToggle] = useState(false);
  const [lensQr, setLensQR] = useState(false);

  const handleLensOpen = () => {
    console.log("Hello");
    setLensOpen(!lensOpen);
  };

  const handleLensToggleSwitch = () => {
    console.log("Toggle");
    setLensToggle(!lensToggle);
  };

  const handleLensQR = () => {
    console.log("Switch");
    setLensQR(!lensQr);
  };
  
  // Matic
  const [maticOpen, setMaticOpen] = useState(false);
  const [maticAccountToggle, setMaticAccountToggle] = useState(false);
  const [maticBalanceToggle, setMaticBalanceToggle] = useState(false);
  const [maticAvgBalanceToggle, setMaticAvgBalanceToggle] = useState(false);
  const [maticQr, setMaticQR] = useState(false);
  const [maticBalance, setMaticBalance] = useState(0);
  const [maticLoading, setMaticLoading] = useState(false);

  const handleMaticOpen = async () => {
    setMaticLoading(true);
    console.log("Hello");
    const walletConnect = await connectWallet();
    console.log(walletConnect);
    setMaticBalance(getUserBalance())
    setAvg(getHistoricalPortfolioValueOverTime());
    setMaticOpen(!maticOpen);
    setMaticLoading(false);
  };

  const handleMaticAccountToggleSwitch = () => {
    console.log("A");
    setMaticAccountToggle(!maticAccountToggle);

  };

  const handleMaticBalanceToggleSwitch = () => {
    console.log("B");
    setMaticBalanceToggle(!maticBalanceToggle);

  };

  const handleMaticAvgBalanceToggleSwitch = () => {
    console.log("C");
    setMaticAvgBalanceToggle(!maticAvgBalanceToggle);
  };

  const handleMaticQR = () => {
    console.log("Switch");
    setMaticQR(!maticQr);
  };

  // Unstoppable Domain
  const [UDOpen, setUDOpen] = useState(false);
  const [UDToggle, setUDToggle] = useState(false);
  const [UDQr, setUDQR] = useState(false);

  const handleUnstoppableDomainOpen = () => {
    console.log("Hello");
    setUDOpen(!UDOpen);
  };

  const handleUnstoppableDomainToggleSwitch = () => {
    console.log("Toggle");
    setUDToggle(!UDToggle);
  };

  const handleUnstoppableDomainQR = () => {
    console.log("Switch");
    setUDQR(!UDQr);
  };

  // NFT Holder
  const [NFTOpen, setNFTOpen] = useState(false);
  const [NFTToggle, setNFTToggle] = useState(false);
  const [NFTQr, setNFTQR] = useState(false);

  const handleNFTHolderOpen = () => {
    console.log("Hello");
    setNFTOpen(!NFTOpen);
  };

  const handleNFTHolderToggleSwitch = () => {
    console.log("Toggle");
    setNFTToggle(!NFTToggle);
  };

  const handleNFTHolderQR = () => {
    console.log("Switch");
    setNFTQR(!NFTQr);
  };

  //steps
  const [one, setOne] = useState(false);
  const [two, setTwo] = useState(false);
  const [three, setThree] = useState(false);

  const getStep = () => {
    if (three) {
      return 3;
    } else if (two) {
      return 2;
    } else if (one) {
      return 1;
    }
    return 0;
  };


  const onLoginStart = useCallback(() => {
    console.log("Loggin in")
  }, []);

  const onLogoutSuccess = useCallback(() => {
    setProfile(null);
    setProvider('');
    alert('logout success');
  }, []);

  return (
    <>
      <div className="relative flex h-screen content-center items-center justify-center pt-16 pb-32">
        <div className="absolute top-0 h-full w-full bg-[url('https://d1sr9z1pdl3mb7.cloudfront.net/wp-content/uploads/2022/09/13062113/digital-identity-1024x539.jpg')] bg-cover bg-center" />
        <div className="absolute top-0 h-full w-full bg-black/75 bg-cover bg-center" />
        <div className="max-w-8xl container relative mx-auto">
          <div className="flex flex-wrap items-center">
            <div className="ml-auto mr-auto w-full px-4 text-center lg:w-8/12">
              <Typography
                variant="h1"
                color="white"
                className="mb-2 font-black"
              >
                Your identity is secure with us.
              </Typography>
              <br/>
              <br/>
              <Typography variant="lead" color="white" className="opacity-80">
              ###@#$^&Z^&%^$#EW$%^&^^$#%&%*### 
              </Typography>
            </div>
          </div>
        </div>
      </div>

      <section className="-mt-32 bg-gray-50 px-4 pb-20 pt-4">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {/* Twitter Section */}
            <div>
              <FeatureCard
                color="blue"
                title="Twitter"
                icon={
                  <div className="flex items-center gap-2">
                    <IconButton color={"white"} variant="text">
                      <i className={`fa-brands fa-twitter text-lg`} />
                    </IconButton>
                    <Dialog open={twitterOpen} handler={handleTwitterOpen}>
                      <DialogHeader>Hello Twitter</DialogHeader>
                      <DialogBody divider>
                        {/* <div>
                          <div>
                          Hello &nbsp; &nbsp;
                        <Switch
                          onClick={handleTwitterToggleSwitch}
                          color="blue"
                          defaultUnChecked
                        />
                        </div>
                        <div>
                          Hello &nbsp; &nbsp;
                        <Switch
                          onClick={handleTwitterToggleSwitch}
                          color="blue"
                          defaultUnChecked
                        />
                        </div>
                        <div>
                          Hello &nbsp; &nbsp;
                        <Switch
                          onClick={handleTwitterToggleSwitch}
                          color="blue"
                          defaultUnChecked
                        />
                        </div>
                        </div> */}
                        {/* <div style={{ paddingLeft: "20%"}}>
                          <div>
                            <Steps
                              className="standard-margin"
                              direction="vertical"
                              current={getStep()}
                            >
                              <Step
                                title="Waiting for authentication"
                                description="Authorize"
                              />
                              <Step
                                title=""
                                description="Enter Property Cost"
                              />
                              <Step
                                title="Property Image"
                                description="Upload Property Image"
                              />
                            </Steps>
                          </div> 
                        </div> */}
                        <img src="https://piunikaweb.com/wp-content/uploads/2022/11/Untitled-design-2022-11-10T163129.927.jpg"/>
                      </DialogBody>
                      <DialogFooter>
                        <Button
                          variant="gradient"
                          color="green"
                          onClick={handleTwitterQR}
                        >
                          <span>Generate QR</span>
                        </Button>
                      </DialogFooter>
                    </Dialog>
                    <Dialog style={{height: "50%"}} open={twitterQr} handler={handleTwitterQR}>
                      <DialogHeader>Scan and Claim</DialogHeader>
                      <DialogBody style={{marginTop:"8%"}}>
                      <QRCodeSVG
                        style={{ width: "100%" }}
                        value={JSON.stringify(// Corresponding QR Code
                        {  
                            "id":"c811849d-6bfb-4d85-936e-3d9759c7f105",
                            "typ":"application/iden3comm-plain-json",
                            "type":"https://iden3-communication.io/proofs/1.0/contract-invoke-request",
                            "body":{
                                "transaction_data":{
                                    "contract_address":"0x53baE2308366cd5799B2A95539Ec9E2F5d6f1e0c",  //replace it with your contract address
                                    "method_id":"b68967e2",
                                    "chain_id":80001,
                                    "network":"polygon-mumbai"
                                    },
                                "reason":"CUSTOM RE",
                                "scope":[{
                                    "id":1,
                                    "circuit_id":"credentialAtomicQuerySig",
                                    "rules":{
                                        "query":{
                                            "allowed_issuers":["*"],
                                            "req":{ 
                                                "GoogleAccountPossession":{
                                                    "$eq":1
                                                    }
                                                },
                                            "schema":{
                                                    "url":"https://s3.eu-west-1.amazonaws.com/polygonid-schemas/57c48006-b6bd-453f-8480-33964e69f53f.json-ld", 
                                                    "type":"Google" 
                                                    }
                                                }
                                            }
                                        }]
                                    }
                        }
                        
                   
                      )}
                      />
                      </DialogBody>
                      <DialogFooter></DialogFooter>
                    </Dialog>
                  </div>
                }
                description=""
              />
              <Button onClick={handleTwitterOpen} color={"gray"} className="-mt-32 px-4 pt-4">
                Claim Twitter Handle
              </Button>
            </div>

            {/* Google Section */}
            <div>
              <FeatureCard
                color="green"
                title="Google"
                icon={
                  <div className="flex items-center gap-2">
                    <IconButton color={"white"} variant="text">
                      <i className={`fa-brands fa-google text-lg`} />
                    </IconButton>
                    <Dialog open={googleOpen} handler={handleGoogleOpen}>
                      <DialogHeader>Hello Google</DialogHeader>
                      <DialogBody divider>
                        <div>
                          <img src="https://media.tenor.com/LnzwRacJmLMAAAAC/google-logo.gif"/>
                        </div>
                      </DialogBody>
                      <DialogFooter>
                        <Button
                          variant="gradient"
                          color="green"
                          onClick={handleGoogleQR}
                        >
                          <span>Generate QR</span>
                        </Button>
                      </DialogFooter>
                    </Dialog>
                    <Dialog style={{height: "50%"}} open={googleQr} handler={handleGoogleQR}>
                    {
                        !googleScore && 
                        <DialogHeader>Scan and Claim
                      </DialogHeader>
                      }
                      {
                        googleScore && 
                        <DialogHeader>
                          Update the reputation score
                      </DialogHeader>
                      }
                      
                      <DialogBody style={{marginTop:"8%"}}>
                      { googleScore && <QRCodeSVG
                        style={{ width: "100%" }}
                        value={JSON.stringify(// Corresponding QR Code
                        // Corresponding QR Code
                          {  
                            "id":"c811849d-6bfb-4d85-936e-3d9759c7f105",
                            "typ":"application/iden3comm-plain-json",
                            "type":"https://iden3-communication.io/proofs/1.0/contract-invoke-request",
                            "body":{
                                "transaction_data":{
                                    "contract_address":"0xfD93048f58384F4F4dcEE45234a05027AfB1dB2E",  //replace it with your contract address
                                    "method_id":"b68967e2",
                                    "chain_id":80001,
                                    "network":"polygon-mumbai"
                                    },
                                "reason":"Google Handle Possession Check",
                                "scope":[{
                                    "id":1,
                                    "circuit_id":"credentialAtomicQuerySig",
                                    "rules":{
                                        "query":{
                                            "allowed_issuers":["*"],
                                            "req":{ 
                                                "GoogleAccountPossession":{
                                                    "$eq":1
                                                    }
                                                },
                                            "schema":{
                                                    "url":"https://s3.eu-west-1.amazonaws.com/polygonid-schemas/57c48006-b6bd-453f-8480-33964e69f53f.json-ld", 
                                                    "type":"Google" 
                                                    }
                                                }
                                            }
                                        }]
                                    }
                          }
                   
                      )}
                      />}
                      {
                        !googleScore && 
                        <div>
                       <img src="https://bafkreic3mki5zirzoq5vqmcmfmotkysyl7vspkf6la5yc3vs5c3babxkue.ipfs.nftstorage.link/" style={{width:"25%", marginLeft:"37%"}}/>
                      </div>
                      }
                      </DialogBody>
                      <DialogFooter style={{marginRight :" 165px"}}>
                      <Button color="gray" onClick={handleScoreOn}>
                        Update Reputation Score
                      </Button> 
                      
                      </DialogFooter>
                    </Dialog>
                  </div>
                }
                description=""
              />
                <LoginSocialGoogle
                  client_id={'882849698859-k7kfd1ps29ef6suhe5qpjgak227v1qq5.apps.googleusercontent.com'}
                  onLoginStart={onLoginStart}
                  redirect_uri={'http://127.0.0.1:5173/home'}
                  scope="openid profile email"
                  discoveryDocs="claims_supported"
                  access_type="offline"
                  onResolve={({ provider, data }) => {
                    console.log(provider);
                    console.log(data);
                    handleGoogleOpen()
                  }}
                  onReject={err => {
                    console.log(err);
                  }}
                >
                  <Button color={"gray"} className="-mt-32 px-4 pt-4">
                    Claim Google Handle
                  </Button> 
                </LoginSocialGoogle>
            </div>

            {/* Github Section */}
            <div>
              <FeatureCard
                color="brown"
                title="Github"
                icon={
                  <div className="flex items-center gap-2">
                    <IconButton color={"white"} variant="text">
                      <i className={`fa-brands fa-github text-lg`} />
                    </IconButton>
                    <Dialog open={githubOpen} handler={handleGithubOpen}>
                      <DialogHeader>Hello Github</DialogHeader>
                      <DialogBody divider>
                        <Switch
                          onClick={handleGithubToggleSwitch}
                          color="blue"
                          defaultUnChecked
                        />
                        <div>
                          <div>
                            <Steps
                              className="standard-margin"
                              direction="vertical"
                              current={getStep()}
                            >
                              <Step
                                title="Property Name"
                                description="Enter Property Name"
                              />
                              <Step
                                title="Property Cost"
                                description="Enter Property Cost"
                              />
                              <Step
                                title="Property Image"
                                description="Upload Property Image"
                              />
                            </Steps>
                          </div>
                        </div>
                      </DialogBody>
                      <DialogFooter>
                        <Button
                          variant="gradient"
                          color="green"
                          onClick={handleGithubQR}
                        >
                          <span>Generate QR</span>
                        </Button>
                      </DialogFooter>
                    </Dialog>
                    <Dialog style={{height: "50%"}} open={githubQr} handler={handleGithubQR}>
                      <DialogHeader>Scan and Claim</DialogHeader>
                      <DialogBody style={{marginTop:"8%"}}>
                      <QRCodeSVG
                        style={{ width: "100%" }}
                        value={JSON.stringify(githubQR)}
                      />
                      </DialogBody>
                      <DialogFooter></DialogFooter>
                    </Dialog>
                  </div>
                }
                description=""
              />
              <Button
                onClick={handleGithubOpen}
                color={"gray"}
                className="-mt-32 px-4 pt-4"
              >
                Claim Github Handle
              </Button>
            </div>

             {/* Instagram Section */}
            <div>
              <FeatureCard
                color="pink"
                title="Instagram"
                icon={
                  <div className="flex items-center gap-2">
                    <IconButton color={"white"} variant="text">
                      <i className={`fa-brands fa-instagram text-lg`} />
                    </IconButton>
                    <Dialog open={instagramOpen} handler={handleInstagramOpen}>
                      <DialogHeader>Hello Instagram</DialogHeader>
                      <DialogBody divider>
                        <Switch
                          onClick={handleInstagramToggleSwitch}
                          color="blue"
                          defaultUnChecked
                        />
                        <div>
                          <div>
                            <Steps
                              className="standard-margin"
                              direction="vertical"
                              current={getStep()}
                            >
                              <Step
                                title="Property Name"
                                description="Enter Property Name"
                              />
                              <Step
                                title="Property Cost"
                                description="Enter Property Cost"
                              />
                              <Step
                                title="Property Image"
                                description="Upload Property Image"
                              />
                            </Steps>
                          </div>
                        </div>
                      </DialogBody>
                      <DialogFooter>
                        <Button
                          variant="gradient"
                          color="green"
                          onClick={handleInstagramQR}
                        >
                          <span>Generate QR</span>
                        </Button>
                      </DialogFooter>
                    </Dialog>
                    <Dialog  style={{height: "50%"}} open={instagramQr} handler={handleInstagramQR}>
                      <DialogHeader>Scan and Claim</DialogHeader>
                      <DialogBody style={{marginTop:"8%"}}>
                      <QRCodeSVG
                        style={{ width: "200%"}}
                        value={JSON.stringify(instagramQR)}
                      />
                      </DialogBody>
                      <DialogFooter></DialogFooter>
                    </Dialog>
                  </div>
                }
                description=""
              />
              <Button onClick={handleInstagramOpen} color={"gray"} className="-mt-32 px-4 pt-4">
                Claim Instagram Handle
              </Button>
            </div>

              {/* LinkedIn Section */}
            <div>
              <FeatureCard
                color="light-blue"
                title="LinkedIn"
                icon={
                  <div className="flex items-center gap-2">
                    <IconButton color={"white"} variant="text">
                      <i className={`fa-brands fa-linkedin text-lg`} />
                    </IconButton>
                    <Dialog open={linkedInOpen} handler={handleLinkedInOpen}>
                      <DialogHeader>Hello LinkedIn</DialogHeader>
                      <DialogBody divider>
                        <Switch
                          onClick={handleLinkedInToggleSwitch}
                          color="blue"
                          defaultUnChecked
                        />
                        <div>
                          <div>
                            <Steps
                              className="standard-margin"
                              direction="vertical"
                              current={getStep()}
                            >
                              <Step
                                title="Property Name"
                                description="Enter Property Name"
                              />
                              <Step
                                title="Property Cost"
                                description="Enter Property Cost"
                              />
                              <Step
                                title="Property Image"
                                description="Upload Property Image"
                              />
                            </Steps>
                          </div>
                        </div>
                      </DialogBody>
                      <DialogFooter>
                        <Button
                          variant="gradient"
                          color="green"
                          onClick={handleLinkedInQR}
                        >
                          <span>Generate QR</span>
                        </Button>
                      </DialogFooter>
                    </Dialog>
                    <Dialog style={{height: "50%"}} open={linkedInQr} handler={handleLinkedInQR}>
                      <DialogHeader>Scan and Claim</DialogHeader>
                      <DialogBody style={{marginTop:"8%"}}>
                      <QRCodeSVG
                        style={{ width: "100%" }}
                        value={JSON.stringify(linkedInQR)}
                      />
                     
                      </DialogBody>
                    </Dialog>
                  </div>
                }
                description=""
              />
              <Button onClick={handleLinkedInOpen} color={"gray"} className="-mt-32 px-4 pt-4">
                Claim LinkedIn Handle
              </Button>
            </div>

              {/* Discord Section */}
            <div>
              <FeatureCard
                color="purple"
                title="Discord"
                icon={
                  <div className="flex items-center gap-2">
                    <IconButton color={"white"} variant="text">
                      <i className={`fa-brands fa-discord text-lg`} />
                    </IconButton>
                    <Dialog open={discordOpen} handler={handleDiscordOpen}>
                      <DialogHeader>Hello Discord</DialogHeader>
                      <DialogBody divider>
                        <Switch
                          onClick={handleDiscordToggleSwitch}
                          color="blue"
                          defaultUnChecked
                        />
                        <div>
                          <div>
                            <Steps
                              className="standard-margin"
                              direction="vertical"
                              current={getStep()}
                            >
                              <Step
                                title="Property Name"
                                description="Enter Property Name"
                              />
                              <Step
                                title="Property Cost"
                                description="Enter Property Cost"
                              />
                              <Step
                                title="Property Image"
                                description="Upload Property Image"
                              />
                            </Steps>
                          </div>
                        </div>
                      </DialogBody>
                      <DialogFooter>
                        <Button
                          variant="gradient"
                          color="green"
                          onClick={handleDiscordQR}
                        >
                          <span>Generate QR</span>
                        </Button>
                      </DialogFooter>
                    </Dialog>
                    <Dialog style={{height: "50%"}} open={discordQr} handler={handleDiscordQR}>
                      <DialogHeader>Scan and Claim</DialogHeader>
                      <DialogBody style={{marginTop:"8%"}}>
                      <QRCodeSVG
                        style={{ width: "100%" }}
                        value={JSON.stringify(discordQR)}
                      />
                      </DialogBody>
                      <DialogFooter></DialogFooter>
                    </Dialog>
                  </div>
                }
                description=""
              />
              <Button onClick={handleDiscordOpen} color={"gray"} className="-mt-32 px-4 pt-4">
                Claim Discord Handle
              </Button>
            </div>

              {/* Lens Section */}

              {/* Reputation Score */}

              
            <div>
              <FeatureCard
                color="white"
                title="Lens"
                icon={
                  <div className="flex items-center">
                    <IconButton color={"white"} variant="text">
                      <img src="data:image/png;base64,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" />
                    </IconButton>
                    <Dialog open={lensOpen} handler={handleLensOpen}>
                      <DialogHeader>Hello Lens</DialogHeader>
                      <DialogBody divider>
                        <Switch
                          onClick={handleLensToggleSwitch}
                          color="blue"
                          defaultUnChecked
                        />
                        <div>
                          <div>
                            <Steps
                              className="standard-margin"
                              direction="vertical"
                              current={getStep()}
                            >
                              <Step
                                title="Property Name"
                                description="Enter Property Name"
                              />
                              <Step
                                title="Property Cost"
                                description="Enter Property Cost"
                              />
                              <Step
                                title="Property Image"
                                description="Upload Property Image"
                              />
                            </Steps>
                          </div>
                        </div>
                      </DialogBody>
                      <DialogFooter>
                        <Button
                          variant="gradient"
                          color="green"
                          onClick={handleLensQR}
                        >
                          <span>Generate QR</span>
                        </Button>
                      </DialogFooter>
                    </Dialog>
                    <Dialog style={{height: "50%"}} open={lensQr} handler={handleLensQR}>
                      <DialogHeader>Scan and Claim</DialogHeader>
                      <DialogBody style={{marginTop:"8%"}}>
                      <QRCodeSVG
                        style={{ width: "100%" }}
                        value={JSON.stringify(lensQR)}
                      />
                      </DialogBody>
                      <DialogFooter></DialogFooter>
                    </Dialog>
                  </div>
                }
                description="Lens Profile Verification"
              />
              <Button onClick={handleLensOpen} color={"blue-gray"} className="-mt-32 px-4 pt-4">
                Claim Lens Handle
              </Button>
            </div>

              {/* Matic Section */}
            <div>
              <FeatureCard
                color="white"
                title="Matic"
                icon={
                  <div className="flex items-center gap-2">
                    <IconButton color={"white"} variant="text">
                      <img src="https://cdn.icon-icons.com/icons2/2130/PNG/512/matic_cryptocurrency_logo_icon_131424.png" />
                    </IconButton>
                    <Dialog open={maticOpen} handler={handleMaticOpen}>
                      <DialogHeader>Hello Matic</DialogHeader>
                      <DialogBody divider>
                      {!maticLoading && 
                         <div>
                         <div>
                           <div
                             className="standard-margin"
                             direction="horizontal"
                           >
                             <Fragment>
                               <div>
                                 <Switch onClick = {handleMaticAccountToggleSwitch} id="ripple-on" label="Claim Polygon Account Possession" ripple={true} />
                                 </div>
                                 <br/>
                                 <div>
                                 <Switch onClick= {handleMaticBalanceToggleSwitch} id="ripple-off" label="Claim 1 Matic Possesion" ripple={false} />
                                 </div>
                                 <br/>
                                 <div>
                                 <Switch onClick= {handleMaticAvgBalanceToggleSwitch} id="ripple-avg-off" label="Claim 1 Matic Possesion over 1 Month" ripple={false} />
                                 </div>
                             </Fragment>
                           </div>
                         </div>
                       </div>
                      }
                      {maticLoading && 
                        <div>Loading </div>
                      }
                      
                      </DialogBody>
                      <DialogFooter>
                        <Button
                          variant="gradient"
                          color="green"
                          onClick={handleMaticQR}
                        >
                          <span>Generate QR</span>
                        </Button>
                      </DialogFooter>
                    </Dialog>
                    <Dialog style={{height: "50%"}} open={maticQr} handler={handleMaticQR}>
                      <DialogHeader>Scan and Claim</DialogHeader>
                      <DialogBody style={{marginTop:"8%"}}>
                      <QRCodeSVG
                        style={{ width: "100%" }}
                        value={JSON.stringify(withHundredMatic)}
                      />
                      
                      </DialogBody>
                      <DialogFooter style={{alignItems: "center"}}>
                      <Button
                          variant="gradient"
                          color="green"
                          onClick={updateMatic}
                        >
                          <span>Update Your Degen Reputation Badge</span>
                        </Button>
                      </DialogFooter>
                    </Dialog>
                  </div>
                }
                description="MATIC Possession and transaction verification"
              />
              <Button onClick={handleMaticOpen} color={"blue-gray"} className="-mt-32 px-4 pt-4">
                Claim Matic Possession
              </Button>
            </div>

              {/* Unstoppable Domain Section */}
            <div>
              <FeatureCard
                color="white"
                title="Unstoppable Domain"
                icon={
                  <div className="flex items-center gap-2">
                    <IconButton color={"white"} variant="text">
                      <img src="https://storage.googleapis.com/unstoppable-client-assets/images/logos/unstoppabledomains.png" />
                    </IconButton>
                    <Dialog open={UDOpen} handler={handleUnstoppableDomainOpen}>
                      <DialogHeader>Hello UD</DialogHeader>
                      <DialogBody divider>
                        <Switch
                          onClick={handleUnstoppableDomainToggleSwitch}
                          color="blue"
                          defaultUnChecked
                        />
                        <div>
                          <div>
                            <Steps
                              className="standard-margin"
                              direction="vertical"
                              current={getStep()}
                            >
                              <Step
                                title="Property Name"
                                description="Enter Property Name"
                              />
                              <Step
                                title="Property Cost"
                                description="Enter Property Cost"
                              />
                              <Step
                                title="Property Image"
                                description="Upload Property Image"
                              />
                            </Steps>
                          </div>
                        </div>
                      </DialogBody>
                      <DialogFooter>
                        <Button
                          variant="gradient"
                          color="green"
                          onClick={handleUnstoppableDomainQR}
                        >
                          <span>Generate QR</span>
                        </Button>
                      </DialogFooter>
                    </Dialog>
                    <Dialog style={{height: "50%"}} open={UDQr} handler={handleUnstoppableDomainQR}>
                      <DialogHeader>Scan and Claim</DialogHeader>
                      <DialogBody style={{marginTop:"8%"}}>
                      <QRCodeSVG
                        style={{ width: "100%" }}
                        value={JSON.stringify(unstoppableDomainQR)}
                      />
                      </DialogBody>
                      <DialogFooter></DialogFooter>
                    </Dialog>
                  </div>
                }
                description=""
              />
              <Button onClick={handleUnstoppableDomainOpen} color={"blue-gray"} className="-mt-32 px-4 pt-4">
                Claim Unstoppable Domain
              </Button>
            </div>

              {/* NFT Holder Section */}
            <div>
              <FeatureCard
                color="white"
                title="FireDrops NFT Holder"
                icon={
                  <div className="flex items-center gap-2">
                    <IconButton color={"white"} variant="text">
                      <img src="https://pbs.twimg.com/profile_images/1589870734951976961/WlFB-hrN_400x400.jpg"/>
                    </IconButton>
                    <Dialog open={NFTOpen} handler={handleNFTHolderOpen}>
                      <DialogHeader>Hello NFts</DialogHeader>
                      <DialogBody divider>
                        <Switch
                          onClick={handleNFTHolderToggleSwitch}
                          color="blue"
                          defaultUnChecked
                        />
                        <div>
                          <div>
                            <Steps
                              className="standard-margin"
                              direction="vertical"
                              current={getStep()}
                            >
                              <Step
                                title="Property Name"
                                description="Enter Property Name"
                              />
                              <Step
                                title="Property Cost"
                                description="Enter Property Cost"
                              />
                              <Step
                                title="Property Image"
                                description="Upload Property Image"
                              />
                            </Steps>
                          </div>
                        </div>
                      </DialogBody>
                      <DialogFooter>
                        <Button
                          variant="gradient"
                          color="green"
                          onClick={handleNFTHolderQR}
                        >
                          <span>Generate QR</span>
                        </Button>
                      </DialogFooter>
                    </Dialog>
                    <Dialog style={{height: "50%"}} open={NFTQr} handler={handleNFTHolderQR}>
                      <DialogHeader>Scan and Claim</DialogHeader>
                      <DialogBody style={{marginTop:"8%"}}>
                      <QRCodeSVG
                        style={{ width: "100%" }}
                        value={JSON.stringify(nftHolderQR)}
                      />
                      </DialogBody>
                      <DialogFooter></DialogFooter>
                    </Dialog>
                  </div>
                }
                description=""
              />
              <Button onClick={handleNFTHolderOpen} color={"blue-gray"} className="-mt-32 px-4 pt-4">
                Claim NFT Possession
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="px-4 pt-20 pb-48">
        <div className="container mx-auto">
          <PageTitle heading="Our Products">
            Give your imagination wings with IdentiGo
          </PageTitle>
          <div className="mt-24 grid grid-cols-1 gap-12 gap-x-24 md:grid-cols-2 xl:grid-cols-4">

          <Link to="/sign-in">
          <TeamCard
            img="https://pbs.twimg.com/profile_images/1506575392614023172/MpQnHp1P_400x400.png"
            name="ETHIndia"
          />
          </Link>
        
          <Link to="/sign-up">
          <TeamCard
            img="https://images.squarespace-cdn.com/content/v1/598823a89f74566cc7871c10/1550485808795-XOA7IQRIX05O1V17J5NS/level.png"
            name="Degen Score"
          />
          </Link>

          <Link to="/profile">
          <TeamCard
            img="https://play-lh.googleusercontent.com/EI64ta8xdO8cQQCQlq7T5hi6ilunxvzpUszc_fD9y60EQljOUPKsuPl1NZnmiGOg8A"
            name="Flipkart"
          />
          </Link>

          
          <TeamCard
            img="https://martech.org/wp-content/uploads/2015/11/idea_1920.jpg"
            name="Your Idea Here"
          />
          </div>
        </div>
      </section>
      <Chat
          account={address} //user address
          supportAddress="0xd9c1CCAcD4B8a745e191b62BA3fcaD87229CB26d" //support address
          apiKey="jVPMCRom1B.iDRMswdehJG7NpHDiECIHwYMMv6k2KzkPJscFIDyW8TtSnk4blYnGa8DIkfuacU0"
          env="staging"
        />
      <div className="bg-blue-gray-50/50">
        <Footer />
      </div>
    </>
  );
}

export default Home;
