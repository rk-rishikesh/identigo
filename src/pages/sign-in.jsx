import { Link } from "react-router-dom";
import { React, Fragment, useState } from "react";
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
import {QRCodeSVG} from 'qrcode.react';

export function SignIn() {

  const [Qr, setQR] = useState("");

  var base_url = "http://localhost:9000/";

    const handleGmailQRGenerator = () => {
        console.log("Hello");
        console.log(base_url);
        fetch(base_url+'api/gmail')
            .then(r => Promise.all([Promise.resolve(r.headers.get('x-id')), r.json()]))
            .then(([id, data]) => {
                console.log(data)
                console.log("Generayting QR based on Data")
                setQR(data)
            })
            .catch(err => console.log(err));
    };

    const handlePolygonQRGenerator = () => {
      console.log("Hello");
      console.log(base_url);
      fetch(base_url+'api/flipkart')
          .then(r => Promise.all([Promise.resolve(r.headers.get('x-id')), r.json()]))
          .then(([id, data]) => {
              console.log(data)
              console.log("Generayting QR based on Data")
              setQR(data)
          })
          .catch(err => console.log(err));
  };

  const handleLensQRGenerator = () => {
    console.log("Hello");
    console.log(base_url);
    fetch(base_url+'api/lens')
        .then(r => Promise.all([Promise.resolve(r.headers.get('x-id')), r.json()]))
        .then(([id, data]) => {
            console.log(data)
            console.log("Generayting QR based on Data")
            setQR(data)
        })
        .catch(err => console.log(err));
};
const handleAgeQRGenerator = () => {
  console.log("Hello");
  console.log(base_url);
  fetch(base_url+'api/sign-in')
      .then(r => Promise.all([Promise.resolve(r.headers.get('x-id')), r.json()]))
      .then(([id, data]) => {
          console.log(data)
          console.log("Generayting QR based on Data")
          setQR(data)
      })
      .catch(err => console.log(err));
};


  return (
    <>
      <img
        src="https://crypto.jobs/storage/event-banners/EjN81A40PRU1Hp6JzYAd0gXTSf66AezioSYs9cI3.png"
        className="absolute inset-0 z-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 z-0 h-full w-full bg-black/50" />
      <div className="container mx-auto p-8">
        <Card className="absolute top-2/4 left-2/4 w-full max-w-[36rem] -translate-y-2/4 -translate-x-2/4">
          <CardHeader
            variant="gradient"
            color="blue"
            className="mb-8 grid h-28 place-items-center"
          >
            <Typography variant="h3" color="white">
              Skip the Queue
            </Typography>
          </CardHeader>
          <CardBody className="flex flex-col gap-4">
          <QRCodeSVG
            style={{ width: "100%" }}
            value={JSON.stringify(Qr)}
          />
          <Typography variant="small" className="mt-6 flex justify-center">
            You should have the below claims to get direct entry to ETHIndia
          </Typography>
          
          </CardBody>
          <CardFooter className="pt-0">
              <Button onClick={handleGmailQRGenerator} variant="gradient" fullWidth>
              Authorize Gmail Claim
            </Button>
            <br/>
            <Button onClick={handlePolygonQRGenerator} variant="gradient" fullWidth>
              Authorize Polygon Account Holder Claim
            </Button>
            <br/>
            <Button onClick={handleLensQRGenerator} variant="gradient" fullWidth>
              Authorize Lens handel claim
            </Button>
            <br/>
            <Button onClick={handleAgeQRGenerator} variant="gradient" fullWidth>
              Authorize Your Age (> 22)
            </Button>


            <Typography variant="small" className="mt-6 flex justify-center">
              Don't have any of these claim? Get Now.
              <Link to="/home">
                <Typography
                  as="span"
                  variant="small"
                  color="blue"
                  className="ml-1 font-bold"
                >
                  Claim Now 
                </Typography>
              </Link>
            </Typography>
          </CardFooter>
        </Card>
      </div>
      <div className="container absolute bottom-6 left-2/4 z-10 mx-auto -translate-x-2/4 text-white">
        <SimpleFooter />
      </div>
    </>
  );
}

export default SignIn;
