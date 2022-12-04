
import { PageTitle } from "@/widgets/layout";
import React,{ Fragment, useCallback, useState } from 'react';
import {
  MapPinIcon,
  BriefcaseIcon,
  BuildingLibraryIcon,
} from "@heroicons/react/24/solid";
import { Footer } from "@/widgets/layout";
import {QRCodeSVG} from 'qrcode.react';
import { featuresData, teamData, teamDataBlack, contactData } from "@/data";
import { FeatureCard, TeamCard } from "@/widgets/cards";
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
import { SelectContextProvider } from "@material-tailwind/react/components/Select/SelectContext";

export function Profile() {

  const [black, setBlack] = useState(false);
  const [show, setShow] = useState(false);
  const [Qr, setQR] = useState("");

  var base_url = "http://localhost:9000/";

    const handleQRGenerator = async () => {
        console.log("Hello");
        console.log(base_url);
        fetch(base_url+'api/flipkart')
            .then(r => Promise.all([Promise.resolve(r), r.json()]))
            .then(([id, data]) => {
                console.log(data)
                console.log("Generayting QR based on Data")
                setQR(data)
            })
            .catch(err => console.log(err));
    };

    const delay = ms => new Promise(res => setTimeout(res, ms));

  const handleAuth = async () => {
    console.log("Authenticating");
    setShow(true);
    await handleQRGenerator();
    await delay(15000);
    setBlack(true);
    setShow(false)
  };

  return (
    <>
      <section className="relative block h-[50vh]">
        <div className="bg-profile-background absolute top-0 h-full w-full bg-[url('https://media.istockphoto.com/id/1033753562/photo/black-paper-shopping-bags-on-black-background.jpg?s=170667a&w=0&k=20&c=MDAqo97m5G6neZFHD0lMEQCDfU6AkM-ZsKMavgQAVXQ=')] bg-cover bg-center" />
        <div className="absolute top-0 h-full w-full bg-black/75 bg-cover bg-center" />
      </section>
      <section className="relative bg-blue-gray-50/50 py-16 px-4">
        <div className="container mx-auto">
          <div className="relative mb-6 -mt-65 flex w-full min-w-0 flex-col break-words rounded-3xl bg-white shadow-xl shadow-gray-500/5">
            <div className="px-6">
             
            <div className="mt-32 flex flex-wrap items-center">
            <div className="mx-auto -mt-8 w-full px-4 md:w-5/12">
              <div className="mb-6 inline-flex h-16 w-16 items-center justify-center rounded-full bg-white p-3 text-center shadow-lg">
              <img src="https://images.dealsmagnet.com/file/dealsmagnet/root/FlipkartSale/big-billion-days-logo.png"/>
              </div>
              <Typography
                variant="h3"
                className="mb-3 font-bold"
                color="blue-gray"
              >
                Flipkart Polygon Partnership Bonaza
              </Typography>
              <Typography className="mb-8 font-normal text-blue-gray-500">
              Flipkart,is cemented its commitment to blockchain technology by announcing a strategic partnership with Polygon.
                <br />
                <br />
              On this eve Big Billion Days are back with special offers for Polygon users. 
              </Typography>
              <Button variant="outlined" onClick={handleAuth} >Enter Now</Button>
            </div>
            <div className="mx-auto mt-24 flex w-full justify-center px-4 md:w-4/12 lg:mt-0">
              <Card className="shadow-lg shadow-gray-500/10">
                {
                    !show && 
                    <div>
                    <CardHeader className="relative h-56">
                        <img
                          alt="Card Image"
                          src="https://blog.polygon.technology/wp-content/uploads/2022/12/polygon_flipkart_blockchain_ecommerce_partnership_news.png"
                          className="h-full w-full"
                        />
                      </CardHeader>
                      <CardBody>
                        <Typography
                          variant="h5"
                          color="blue-gray"
                          className="mb-3 font-bold"
                        >
                          Early Access to Big Billion Days
                        </Typography>
                        <Typography className="font-normal text-blue-gray-500">
                          We don't store your wallet address 😉
                          Get your claims on IdentiGo and avail huge offers
                        </Typography>
                    </CardBody>
                </div>
                }
                {
                  show && 
                  <QRCodeSVG
                  style={{ width: "100%" }}
                  value={JSON.stringify(Qr)}
                />
                }
                
              </Card>
            </div>
          </div>
              <div className="my-8 text-center">
              <section className="px-4 pt-20 pb-48">
                <div className="container mx-auto">
                  <PageTitle heading="Shop Acrosss Category">
                    Get Discounts and Early Access with IndentiGo Claims
                  </PageTitle>
                  {black &&
                    <div className="mt-28 grid grid-cols-2 gap-24 gap-x-24 md:grid-cols-2 xl:grid-cols-2">
                    {teamDataBlack.map(({ img, name }) => (
                      <TeamCard
                        key={name}
                        img={img}
                        name={name}
                      />
                    ))}
                  </div>
                  }
                  {!black &&
                    <div className="mt-28 grid grid-cols-2 gap-24 gap-x-24 md:grid-cols-2 xl:grid-cols-2">
                    {teamData.map(({ img, name }) => (
                      <TeamCard
                        key={name}
                        img={img}
                        name={name}
                      />
                    ))}
                  </div>
                  }
                </div>
              </section>
              </div>
            </div>
          </div>
        </div>
      </section>
      <div className="bg-blue-gray-50/50">
        <Footer />
      </div>
    </>
  );
}

export default Profile;
