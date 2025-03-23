"use client";

import * as React from "react";
import Link from "next/link";
import { cn } from "~/lib/utils";
import { Icons } from "./Icons";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { useState } from "react";

type UserAuthFormProps = React.HTMLAttributes<HTMLDivElement>;

export function UserAuthForm({ className, ...props }: UserAuthFormProps) {
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [errors, setErrors] = useState({ username: "", password: "" });

  const validateUsername = (username: string) => {
    const usernameRegex = /^[a-z0-9_\.]{6,16}$/;
    if (!usernameRegex.test(username)) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        username: "Username must be at least six character long and it contain lowercase letters, numbers, underscores, and periods.",
      }));
      return false;
    }
    return true;
  };

  const validatePassword = (password: string) => {
    const passwordRegex = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,30}$/;
    if (!passwordRegex.test(password)) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        password:
          "Password must be between 8 and 30 character, include uppercase, lowercase, a number, and a special character.",
      }));
      return false;
    }
    return true;
  };

  async function onSubmit(event: React.SyntheticEvent) {
    event.preventDefault();
    setIsLoading(true);

    // Validate form inputs
    const usernameValid = validateUsername(formData.username);
    const passwordValid = validatePassword(formData.password);

    if (!usernameValid || !passwordValid) {
      setIsLoading(false);
      return;
    }

    // Simulate an API call
    setTimeout(() => {
      setIsLoading(false);
    }, 3000);
  }

  const defaultValue = {
    username: "",
    password: "",
  };
  const [formData, setFormData] = useState(defaultValue);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData({
      ...formData,
      [id]: value,
    });

    // Clear validation errors on input change
    setErrors({ ...errors, [id]: "" });
  };

  return (
    <div className={cn("grid gap-6", className)} {...props}>
      <form onSubmit={onSubmit}>
        <div className="grid gap-2">
          <div className="grid gap-1">
            <Label className="sr-only" htmlFor="username">
              Username
            </Label>
            <Input
              id="username"
              placeholder="Username"
              type="text"
              value={formData.username}
              onChange={handleChange}
              autoCapitalize="none"
              autoComplete="username"
              autoCorrect="off"
              disabled={isLoading}
            />
             {errors.username && (
              <p className="text-red-500 text-sm">{errors.username}</p>
            )}

            <Label className="sr-only" htmlFor="password">
              Password
            </Label>
            <Input
              id="password"
              placeholder="Password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              autoComplete="current-password"
              disabled={isLoading}
            />
            {errors.password && (
              <p className="text-red-500 text-sm">{errors.password}</p>
            )}
          </div>

          <Button disabled={isLoading}>
            {isLoading && (
              <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
            )}
            <Link href="/home/dashboard">Sign In</Link>
          </Button>
        </div>
      </form>
      {/* <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">
            Or continue with
          </span>
        </div>
      </div> */}
      {/* <Button variant="outline" type="button" disabled={isLoading}>
        {isLoading ? (
          <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
        ) : (
          <Icons.gitHub className="mr-2 h-4 w-4" />
        )}{" "}
        GitHub
      </Button> */}
    </div>
  );
}
