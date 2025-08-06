import { cn } from "@/lib/utils";
import { Link, type LinkComponent } from "@tanstack/react-router";
import { ScrollText, ListChecks, type LucideProps } from "lucide-react";
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
      <Link {...props} className={cn("px-3 py-1.5 flex")}>
        <div className={"flex justify-center items-center"}>
          <Icon className={"mr-1.5"} size={16} />
        </div>
        <span>{children}</span>
      </Link>
    </li>
  );
};

export const Footer = () => {
  return (
    <footer
      className={
        "flex px-5 justify-between items-center h-full  text-slate-400"
      }
    >
      <div>
        <div>ChampionMastery.lol © {new Date().getFullYear()}</div>
      </div>
      <div>
        <div className={"font-mono italic"}>
          <a href="mailto:olivierdeschenes9@gmail.com">
            olivierdeschenes9@gmail.com
          </a>
        </div>
      </div>
      <ul className={"flex gap-2.5 font-mono "}>
        <NavigationItem Icon={ScrollText} to={"/privacy"}>
          Privacy Policy
        </NavigationItem>
        <NavigationItem Icon={ListChecks} to={"/terms"}>
          Terms of Service
        </NavigationItem>
      </ul>
    </footer>
  );
};
