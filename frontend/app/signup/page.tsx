"use client";

import { Appbar } from "@/components/Appbar";
import { PrimaryButton } from "@/components/buttons/PrimaryButton";
import { CheckFeacture } from "@/components/CheckFeacture";
import { Input } from "@/components/Input";
import axios from "axios";
import React, { useState } from "react";
import { BACKEND_URL } from "../config";

function SignUp() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  return (
    <div>
      <Appbar />
      <div className="flex justify-center">
        <div className="flex pt-8 max-w-4xl">
          <div className="flex-1 pt-20 px-4">
            {/*  */}
            <div className="font-semibold text-3xl pb-4">
              Join millions worldwide who automate their work.
            </div>
            <div className="pb-6 pt-4">
              <CheckFeacture label={"Easy setup , no coding required"} />
            </div>
            <div className="pb-6">
              <CheckFeacture label={"Free forever for core features"} />
            </div>
            <CheckFeacture label={"14-day trial of premium features & apps"} />
          </div>
          <div>
            <Input
              label={"Name"}
              onChange={(e) => {
                setName(e.target.value);
              }}
              type="text"
              placeholder="Your Name"
            ></Input>
            <Input
              label={"Email"}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              type="text"
              placeholder="Your Email"
            ></Input>
            <Input
              label={"Password"}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              type="password"
              placeholder="Your Password"
            ></Input>

            <div className="pt-4">
              <PrimaryButton
                onClick={async () => {
                  const res = await axios.post(
                    `${BACKEND_URL}/api/v1/user/signup`,
                    {
                      username: email,
                      password,
                      name,
                    }
                  );
                }}
                size="big"
              >
                Get Started free
              </PrimaryButton>
            </div>
          </div>
          {/*  */}
        </div>
      </div>
    </div>
  );
}

export default SignUp;
