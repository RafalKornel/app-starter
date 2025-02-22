import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LoginForm } from "./components/LoginForm";
import { RegisterForm } from "./components/RegisterForm";
import { authApi } from "@/services/auth.api";

export function LoginPage() {
  return (
    <div className="h-full max-w-screen-xl m-0 sm:m-10 shadow flex justify-center pb-[20%]">
      <div className="lg:w-1/2 xl:w-5/12 p-6 sm:p-12 h-full flex flex-col gap-8">
        <h1 className="text-2xl xl:text-3xl font-extrabold">Welcome</h1>
        <div className="w-full flex-1">
          <Tabs defaultValue="login" className="min-w-[400px]">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="login">Login</TabsTrigger>
              <TabsTrigger value="register">Register</TabsTrigger>
            </TabsList>

            <TabsContent value="login">
              <Card>
                <CardHeader>
                  <CardTitle>Log in</CardTitle>
                </CardHeader>
                <CardContent>
                  <LoginForm />
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="register">
              <Card>
                <CardHeader>
                  <CardTitle>Register</CardTitle>
                </CardHeader>
                <CardContent>
                  <RegisterForm />
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
          <Button onClick={() => authApi.getProfile()}>Fetch profile</Button>
        </div>
      </div>
      <div className="flex- text-center hidden lg:flex">
        <img
          src="login-splash.jpg"
          className="h-full w-full rounded-md object-cover blur-xs brightness-50"
        />
      </div>
    </div>
  );
}
