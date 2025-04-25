
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

export function AlertSignUp() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" >Sign Up</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
            <img src="/home-avatar.png" alt="" />
          <DialogTitle className="flex items-center justify-center">Registration Success!</DialogTitle>
        </DialogHeader>
        <div className="flex items-center justify-center text-gray-600 p-2 border border-gray-600 rounded-2xl">
            please check your mail...
        </div>
        <DialogFooter className="sm:justify-start">
          <DialogClose asChild>
            <Button type="button" variant="secondary">
              Close
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
