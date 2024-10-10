/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import * as React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"; 
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { GithubIcon, FacebookIcon } from "lucide-react";
export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true)
  const router= useRouter();
  

  const toggleMode = () => setIsLogin(!isLogin)
  const handleAuth = (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would typically handle the authentication process
    // For this example, we'll just show the chat interface
    router.push("/Home")
  }

  return (
    <div className="flex items-center justify-center min-h-screen">
      <Card className="w-full max-w-[400px] bg-gray-900 border-gray-800">
        <CardHeader>
          <CardTitle className="text-white text-2xl">{isLogin ? "Login" : "Sign Up"}</CardTitle>
          <CardDescription className="text-gray-400">
            {isLogin
              ? "Enter your credentials to access your account."
              : "Create an account to get started."}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="email" className="text-gray-300">Email</Label>
                <Input 
                  id="email" 
                  type="email" 
                  placeholder="m@example.com" 
                  className="bg-gray-800 border-gray-700 text-white placeholder-gray-500
                  hover:bg-gray-900 
                  focus:bg-white"
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="password" className="text-gray-300">Password</Label>
                <Input 
                  id="password" 
                  type="password"
                  className="bg-gray-800 border-gray-700 text-black
                  hover:bg-gray-900 
                  focus:bg-white"
                />
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex flex-col">
          <Button 
          onClick={handleAuth}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white">
            {isLogin ? "Login" : "Sign Up"}
          </Button>
          <div className="mt-4 text-center text-sm text-gray-500">
            Or continue with
          </div>
          <div className="mt-4 grid grid-cols-3 gap-3 w-full">
            <Button variant="outline" className="w-full bg-gray-800 border-gray-700 text-gray-300 hover:bg-gray-700 hover:text-white">
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path
                  fill="currentColor"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="currentColor"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="currentColor"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                />
                <path
                  fill="currentColor"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
                <path fill="none" d="M1 1h22v22H1z" />
              </svg>
              <span className="sr-only">Google</span>
            </Button>
            <Button variant="outline" className="w-full bg-gray-800 border-gray-700 text-gray-300 hover:bg-gray-700 hover:text-white">
              <FacebookIcon className="w-5 h-5" />
              <span className="sr-only">Facebook</span>
            </Button>
            <Button variant="outline" className="w-full bg-gray-800 border-gray-700 text-gray-300 hover:bg-gray-700 hover:text-white">
              <GithubIcon className="w-5 h-5" />
              <span className="sr-only">GitHub</span>
            </Button>
          </div>
          <div className="mt-6 text-center text-sm">
            <span className="text-gray-500">
              {isLogin ? "Don't have an account?" : "Already have an account?"}
            </span>{" "}
            <button
              onClick={toggleMode}
              className="text-blue-400 hover:underline focus:outline-none"
            >
              {isLogin ? "Sign up" : "Login"}
            </button>
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}