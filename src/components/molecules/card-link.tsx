import { Card, CardContent, CardDescription, CardHeader } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { ComponentProps } from "react";
import { Link } from "react-router-dom";

interface CardLinkProps extends ComponentProps<"div"> {
  to: string;
  icon: JSX.Element;
  titulo: string;
  descricao: string;
}

export function CardLink(props: CardLinkProps) {
  return (
    <Link to={props.to} className={cn("w-full cursor-pointer", props.className)}>
      <Card className="flex flex-col h-full hover:bg-sidebar">
        <CardHeader>{props.icon}</CardHeader>
        <CardContent>
          <span className="text-gray-200">{props.titulo}</span>
          <CardDescription>{props.descricao}</CardDescription>
        </CardContent>
      </Card>
    </Link>
  );
}
