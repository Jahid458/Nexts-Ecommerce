"use client";

import { Card, CardContent } from "@/components/ui/card";
import axios from "axios";
import React, { use, useEffect, useState } from "react";
import verfiedImg from "@/public/assets/images/verified.gif";
import verficationFailedImage from "@/public/assets/images/verification-failed.gif";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { WEBSITE_HOME } from "@/routes/WebsiteRoute";
import { useParams } from "next/navigation";

const EmailVerification = () => {
  const params = useParams();
  const token = params?.token;

  const [isVerified, setIsVerified] = useState(false);

  useEffect(() => {
    const verify = async () => {
      const { data: verificationResponse } = await axios.post(
        "/api/auth/verify-email",
        { token },
      );

      if (verificationResponse.success) {
        setIsVerified(true);
      }
    };

    if (token) verify();
  }, [token]);

  return (
    <Card className="w-100">
      <CardContent>
        {isVerified ? 
          <div className="flex  justify-center items-center">
            <Image
              src={verfiedImg.src}
              height={verfiedImg.height}
              width={verfiedImg.width}
              className="h-25 w-auto"
              alt="verification Success"
            />
            <div className="test-center">
              <h1 className="text-2xl font-bold text-green-500 my-5">
                Email verification Success!
              </h1>
              <Button asChild>
                <Link href={WEBSITE_HOME}>Continue Shopping</Link>
              </Button>
            </div>
          </div>
         : 
          <div className="flex flex-col justify-center items-center text-center">
            <Image
              src={verficationFailedImage.src}
              height={verficationFailedImage.height}
              width={verficationFailedImage.width}
              className="h-25 w-auto"
              alt="verification Failed"
            />
            <div className="test-center">
              <h1 className="text-2xl font-bold text-red-500 my-5">
                Email verification Failed!
              </h1>
              <Button asChild>
                <Link href={WEBSITE_HOME}>Continue Shopping</Link>
              </Button>
            </div>
          </div>
        }
      </CardContent>
    </Card>
  );
};

export default EmailVerification;
