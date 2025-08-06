import { AuthNavigation } from "@/components/navigation/AuthNavigation";
import { cn } from "@/lib/utils";
import { Link, type LinkComponent } from "@tanstack/react-router";
import { MedalIcon, type LucideProps } from "lucide-react";
import type {
  ComponentProps,
  ForwardRefExoticComponent,
  PropsWithChildren,
  RefAttributes,
} from "react";

type NavigationItemProps = ComponentProps<LinkComponent<"a">> & {
  Icon: ForwardRefExoticComponent<
    Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>
  >;
};

const NavigationItem = ({
  Icon,
  className,
  children,
  ...props
}: PropsWithChildren<NavigationItemProps>) => {
  return (
    <li className={cn("", className)}>
      <Link {...props} className={cn("px-3 py-1.5 flex text-white")}>
        <div className={"flex justify-center items-center"}>
          <Icon className={"mr-1.5"} size={16} />
        </div>
        <span>{children}</span>
      </Link>
    </li>
  );
};

export const Navigation = () => {
  return (
    <nav className={"flex px-3 justify-center items-center h-full"}>
      <header>
        <Link to={"/"}>
          <h1
            className={
              "text-3xl font-sans font-bold text-white flex gap-1.5 items-center"
            }
          >
            <MedalIcon />
            ChampionMastery.lol
          </h1>
        </Link>
      </header>
      <ul className={"flex gap-2.5 font-mono ml-auto text-white"}>
        <AuthNavigation />
      </ul>
    </nav>
  );
};
