"use client";

import { Appbar } from "@/components/Appbar";
import { PrimaryButton } from "@/components/buttons/PrimaryButton";
import { CheckFeacture } from "@/components/CheckFeacture";
import { Input } from "@/components/Input";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { BACKEND_URL } from "../config";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  return (
    <div>
      <Appbar />
      <div className="flex justify-center">
        <div className="flex pt-8 max-w-4xl">
          <div className="flex-1 pt-20 px-4">
            <div className="font-semibold text-3xl pb-4">
              Join Millions worldwide who automate their work using zapier.
            </div>
            <div className="pb-6 pt-4">
              <CheckFeacture label={"Easy setup , no coding required"} />
            </div>
            <div className="pb-6">
              <CheckFeacture label={"Free forever for core features"} />
            </div>
            <CheckFeacture label={"14-day trail of premium features & apps"} />
          </div>
          <div className="flex-1 pt-6 pb-6 mt-12 px-4  rounded">
            <Input
              onChange={(e) => setEmail(e.target.value)}
              label={"Email"}
              type="text"
              placeholder="Your Email"
            ></Input>
            <Input
              onChange={(e) => setPassword(e.target.value)}
              label={"Password"}
              type="password"
              placeholder="Password"
            ></Input>
            <div className="pt-4">
              <PrimaryButton
                onClick={async () => {
                  const res = await axios.post(
                    `${BACKEND_URL}/api/v1/user/login`,
                    {
                      username: email,
                      password,
                    }
                  );
                  localStorage.setItem("token", res.data.token);
                  router.push("/dashboard");
                }}
                size="big"
              >
                Login
              </PrimaryButton>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
