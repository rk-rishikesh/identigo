import React,{ Fragment, useCallback, useState } from 'react';
import { Link } from "react-router-dom";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Input,
  Checkbox,
  Button,
  Typography,
} from "@material-tailwind/react";
import { SimpleFooter } from "@/widgets/layout";
import Web3 from "web3";

export function SignUp() {

  const [i, setImg] = useState("data:image/jpeg;base64,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");

  const connectWallet = async () => {
    // Modern dapp browsers...
    if (window.ethereum) {
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
    setImg("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRSvJY3wMUPb2f1cU7-6KMHhJEGhC0VdGWsD_kT8hR1RYbGNvtbaxjPry7fvI6OhTEJCnU&usqp=CAU")
  };

  return (
    <>
      <img
        src="https://www.callcentrehelper.com/images/stories/2015/12/judges-scores-10x5-70.png"
        className="absolute inset-0 z-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 z-0 h-full w-full bg-black/50" />
      <div className="container mx-auto p-4">
        <Card className="absolute top-2/4 left-2/4 w-full max-w-[24rem] -translate-y-2/4 -translate-x-2/4">
          <CardHeader
            variant="gradient"
            color="blue"
            className="mb-4 grid h-28 place-items-center"
          >
            <Typography variant="h3" color="white">
              Degen Reputation Score
            </Typography>
          </CardHeader>
          <CardBody className="flex flex-col gap-4">
          <Typography variant="h0" color="black">
              <img style={{marginLeft:"20%"}} src={i}/>
          </Typography>
          </CardBody>
          <CardFooter className="pt-0">
            <Button onClick={connectWallet} variant="gradient" fullWidth>
              Refresh
            </Button>
      
          </CardFooter>
        </Card>
      </div>
      <div className="container absolute bottom-6 left-2/4 z-10 mx-auto -translate-x-2/4 text-white">
        <SimpleFooter />
      </div>
    </>
  );
}

export default SignUp;
