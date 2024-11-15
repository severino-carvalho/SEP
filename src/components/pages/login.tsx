import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/hooks/use-auth";
import { RotasEnum } from "@/types/enums/RotasEnum";
import { Navigate } from "react-router-dom";

export function Login() {
  const { isAuthenticated, login } = useAuth();

  if (isAuthenticated) {
    return <Navigate to={RotasEnum.HOME} />;
  }

  return (
    <div className="flex justify-center items-center w-full min-h-screen">
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle>Entrar</CardTitle>
          <CardDescription>Sistema de Encontros Paroquiais</CardDescription>
        </CardHeader>

        <CardContent>
          <form>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="Informe seu email" />
              </div>

              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="senha">Senha</Label>
                <Input id="senha" type="password" placeholder="Informe sua senha" />
              </div>
            </div>
          </form>
        </CardContent>

        <CardFooter className="flex justify-center">
          <Button onClick={login} className="w-full">Entrar</Button>
        </CardFooter>
      </Card>
    </div>
  )
}