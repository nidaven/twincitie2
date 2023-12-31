import Link from "next/link"
import { ModeToggle } from "./ui/themeModeToggle"
import { Button } from "./ui/button"
import { GitHubLogoIcon } from "@radix-ui/react-icons"

export default function Navigation() {
  return (
    <nav className="flex w-full items-center justify-between py-4">
      <div />
      <div className="flex w-full gap-2 sm:w-fit">
        {/* <CommandDialogDemo /> */}
        <ModeToggle />
        <Link
          passHref
          prefetch={false}
          aria-label="Support project"
          href={"https://github.com/nidaven/twincitie2"}
          className="shrink-0"
        >
          <Button variant={"default"} className="h-9">
            <GitHubLogoIcon className="h-4 w-4 md:mr-1" />
            <span className="hidden md:block">Github Repo</span>
          </Button>
        </Link>
      </div>
    </nav>
  )
}