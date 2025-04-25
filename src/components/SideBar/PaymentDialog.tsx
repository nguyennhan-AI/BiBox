import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Plus } from "lucide-react";
import Image from "next/image";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import MemoryPicker from "./MemoryPicker";
import { useState } from "react";
import PaymentMethodPicker from "./PaymentMethodPicker";

import "./Adjust.css"
export function PaymentDialog() {
  const [memoryValue,setMemoryValue] = useState("");
  const [paymentMethod,setPaymentMethod] = useState("");


  return (
    <Dialog onOpenChange={() => {setMemoryValue("");setPaymentMethod("");}}>
      <DialogTrigger asChild>
        <button><Plus size={16} color="white" /></button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[80%] h-[90%] p-0">
        <DialogHeader className="hidden">
          <DialogTitle className="hidden"></DialogTitle>
        </DialogHeader>
        <div className="flex">
          <div className="flex-[5] bg-[#f0e9da]">
            <div className=" w-full h-full flex flex-col gap-10 px-5 py-20">
              <div className="flex gap-5 items-center">
                <Image src="/home-avatar.png" height={50} width={50} alt="avt" className="rounded-full"></Image>
                <div className="text-3xl font-semibold font-serif">BiBox</div>
              </div>
              {/* <div className="font-semibold">
                <div className="text-black text-3xl flex">
                  <div className="text-[#d7c1a5]">The best files st</div>
                  <div>orage platform</div>
                </div>
                <div className="text-black text-3xl flex">
                  <div className="text-[#d7c1a5]">The most co</div>
                  <div>mfortable experience for</div>
                </div>
                <div className="text-3xl text-[#d7c1a5]">customers</div>
              </div> */}
              <div className="w-full h-full px-8 flex-col flex gap-5 justify-end">
                <div className="flex items-center gap-5">
                  <Image src="/temp-avatar/person1.jpg" height={50} width={50} alt="avt" className="rounded-full"></Image>
                  <div className="text-gray-500">&quot;BiBox makes file storage feel effortless — the clean interface and smooth navigation make uploading, organizing, and accessing files a total breeze.&quot;</div>
                </div>
                <div className="flex items-center gap-5">
                  <Image src="/temp-avatar/person2.jpg" height={50} width={50} alt="avt" className="rounded-full"></Image>
                  <div className="text-gray-500">&quot;I love how fast and intuitive BiBox is — no clutter, just a beautiful experience that lets me focus on what matters: my files.&quot;</div>
                </div>
              </div>
            </div>

          </div>
          <div className="flex-[5] py-10 px-10 flex-col gap-5 flex">
            <div className="flex-[2] flex-col justify-between">
              <div className="text-xl rounded-md bg-[#d7c1a5] flex items-center p-1 justify-center font-serif">You have used ... out of ...Gb</div>
            </div>
            <div className="flex-[8] ">
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-1">
                  <AccordionTrigger className="text-xl font-extralight text-[#936f3f]">Afford more memory</AccordionTrigger>
                  <AccordionContent>
                    <div className="w-full h-full px-3 flex-col flex gap-4 ">
                      <div className="payment">How much do you need ?</div>
                      <MemoryPicker selected={memoryValue} onChange={setMemoryValue}></MemoryPicker>
                      <div className="payment">How would you like to pay ?</div>
                      <PaymentMethodPicker selected={paymentMethod} onChange={setPaymentMethod}></PaymentMethodPicker>
                      <div className="flex justify-end">
                        <button className="px-2 py-2 border bg-[#d7c1a5] w-[40%] rounded-xl hover:text-white">Complete my Payment</button>
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
