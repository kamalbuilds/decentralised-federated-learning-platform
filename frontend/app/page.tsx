import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import { ArrowRight, Code, Database, Lock, Server, Zap } from 'lucide-react'

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="px-4 lg:px-6 h-14 flex items-center">
        <Link className="flex items-center justify-center" href="#">
          <Zap className="h-6 w-6 text-primary" />
          <span className="sr-only">DFL Platform</span>
        </Link>
        <nav className="ml-auto flex gap-4 sm:gap-6">
          <Link className="text-sm font-medium hover:underline underline-offset-4" href="#features">
            Features
          </Link>
          <Link className="text-sm font-medium hover:underline underline-offset-4" href="#tech-stack">
            Tech Stack
          </Link>
          <Link className="text-sm font-medium hover:underline underline-offset-4" href="#how-it-works">
            How It Works
          </Link>
        </nav>
      </header>
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                  Decentralized Federated Learning Platform
                </h1>
                <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
                  A blockchain-based federated learning platform built on NEAR Protocol that enables decentralized machine
                  learning model training while preserving data privacy.
                </p>
              </div>
              <div className="space-x-4">
                <Button asChild>
                  <Link href="#features">Explore Features</Link>
                </Button>
                <Button variant="outline" asChild>
                  <Link href="https://github.com/kamalbuilds/decentralised-federated-learning-platform">
                    View on GitHub
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
        <section id="features" className="w-full py-12 md:py-24 lg:py-32 bg-gray-100 dark:bg-gray-800">
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12">Features</h2>
            <div className="grid gap-6 lg:grid-cols-3 lg:gap-12">
              <Card>
                <CardHeader>
                  <CardTitle>Decentralized Model Training</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>Use federated learning for distributed model training across multiple participants.</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Privacy-Preserving</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>Ensure data privacy by keeping sensitive information on local devices during training.</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Blockchain Integration</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>Leverage NEAR Protocol for transparency, incentives, and secure model updates.</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
        <section id="tech-stack" className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12">Tech Stack</h2>
            <div className="grid gap-6 lg:grid-cols-4 lg:gap-12">
              <div className="flex flex-col items-center space-y-2 border p-4 rounded-lg">
                <Code className="h-8 w-8 text-primary" />
                <h3 className="text-xl font-bold">Frontend</h3>
                <p className="text-sm text-center">Next.js, TypeScript, TailwindCSS</p>
              </div>
              <div className="flex flex-col items-center space-y-2 border p-4 rounded-lg">
                <Server className="h-8 w-8 text-primary" />
                <h3 className="text-xl font-bold">Smart Contract</h3>
                <p className="text-sm text-center">Rust, near-sdk</p>
              </div>
              <div className="flex flex-col items-center space-y-2 border p-4 rounded-lg">
                <Database className="h-8 w-8 text-primary" />
                <h3 className="text-xl font-bold">Blockchain</h3>
                <p className="text-sm text-center">NEAR Protocol</p>
              </div>
              <div className="flex flex-col items-center space-y-2 border p-4 rounded-lg">
                <Lock className="h-8 w-8 text-primary" />
                <h3 className="text-xl font-bold">Machine Learning</h3>
                <p className="text-sm text-center">TensorFlow.js</p>
              </div>
            </div>
          </div>
        </section>
        <section id="how-it-works" className="w-full py-12 md:py-24 lg:py-32 bg-gray-100 dark:bg-gray-800">
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12">How It Works</h2>
            <ol className="space-y-4 md:space-y-0 md:space-x-8 md:flex md:justify-center">
              <li className="flex flex-col items-center space-y-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground">
                  1
                </div>
                <h3 className="text-xl font-bold">Connect Wallet</h3>
                <p className="text-sm text-center">Link your NEAR account to participate</p>
              </li>
              <li className="flex flex-col items-center space-y-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground">
                  2
                </div>
                <h3 className="text-xl font-bold">Register</h3>
                <p className="text-sm text-center">Sign up as a participant in the federated learning process</p>
              </li>
              <li className="flex flex-col items-center space-y-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground">
                  3
                </div>
                <h3 className="text-xl font-bold">Train Model</h3>
                <p className="text-sm text-center">Contribute to model training using your local data</p>
              </li>
              <li className="flex flex-col items-center space-y-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground">
                  4
                </div>
                <h3 className="text-xl font-bold">Earn Rewards</h3>
                <p className="text-sm text-center">Receive incentives for successful contributions</p>
              </li>
            </ol>
          </div>
        </section>
      </main>
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
        <p className="text-xs text-gray-500 dark:text-gray-400">
          © 2023 Decentralized Federated Learning Platform. All rights reserved.
        </p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link className="text-xs hover:underline underline-offset-4" href="#">
            Terms of Service
          </Link>
          <Link className="text-xs hover:underline underline-offset-4" href="#">
            Privacy
          </Link>
        </nav>
      </footer>
    </div>
  )
}