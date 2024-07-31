"use client";

import createFormSchema from "@/schemas/createFormSchema";
import { useForm, useFieldArray, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { AppwriteConfig } from "@/constants/appwrite_config";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { ImageInput } from "./imageInput";
import { Button } from "@/components/ui/button";

export const EventForm = () => {
  const router = useRouter();
  const appwriteConfig = new AppwriteConfig();

  const [step, setStep] = useState(1); // State to manage the current step

  const form = useForm<z.infer<typeof createFormSchema>>({
    resolver: zodResolver(createFormSchema),
    defaultValues: {
      type: "In Person",
      tech: "Yes",
      attendees: 0,
      price: 0,
      eventname: "",
      description: "",
      banner: null,
      hostname: "",
      eventdate: "",
      email: "",
      country: "",
      address: "",
      city: "",
      state: "",
      postal: "",
      audience: "",
      agenda: "",
      approval: "",
      twitter: "",
      website: "",
      linkedin: "",
      instagram: "",
      sponsors: [{ id: 1, name: "", url: "" }],
    }
  });

  // Handling dynamic sponsor fields
  const { fields: sponsors, append, remove, update } = useFieldArray<z.infer<typeof createFormSchema>, "sponsors", "id">({
    control: form.control,
    name: "sponsors",
  });

  const handleSponsorChange = (id: number, fieldName: string, value: string) => {
    const index = sponsors.findIndex((field) => field.id === id);
    if (index !== -1) {
      update(index, { ...sponsors[index], [fieldName]: value });
    }
  };

  const handleAddSponsor = () => {
    append({ id: sponsors.length + 1, name: "", url: "" });
  };

  const handleRemoveSponsor = (index: number) => {
    remove(index);
  };

  const onNextStep = () => {
    setStep(step + 1);
  };

  const onPrevStep = () => {
    setStep(step - 1);
  };

  function onSubmit(values: z.infer<typeof createFormSchema>) {
    const {
      eventname,
      description,
      banner,
      hostname,
      eventdate,
      email,
      country,
      address,
      city,
      state,
      postal,
      audience,
      type,
      attendees,
      price,
      tech,
      agenda,
      sponsors,
      approval,
      twitter = "",
      website = "",
      linkedin = "",
      instagram = ""
    } = values;

    appwriteConfig
      .createEvent(
        eventname,
        description,
        banner || new File([], ""),
        hostname,
        eventdate,
        email,
        country,
        address,
        city,
        state,
        postal,
        audience,
        type,
        attendees,
        price,
        tech,
        agenda,
        sponsors,
        approval,
        twitter,
        website,
        linkedin,
        instagram
      )
      .then((res) => {
        if (res == "success") {
          router.push("/events");
        } else {
          // Handle error
        }
      });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        {/* Step 1: Basic Information */}
        {step === 1 && (
          <>
          <h3 className="font-semibold text-xl text-gray-500">Step 1 of 4</h3>
            <FormField
              control={form.control}
              name="eventname"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Event Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Ragnarock" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Event Details</FormLabel>
                  <FormControl>
                    <Textarea {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="banner"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Banner Photo</FormLabel>
                  <FormControl>
                    <ImageInput />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="button" onClick={onNextStep}>Next</Button>
          </>
        )}

        {/* Step 2: Event Details */}
        {step === 2 && (
          <>
            <FormField
              control={form.control}
              name="hostname"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Host Name</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="eventdate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Event Date</FormLabel>
                  <FormControl>
                    <Input type="date" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* Add more fields for this step as needed */}
            <div className="flex justify-between">
              <Button type="button" onClick={onPrevStep}>Previous</Button>
              <Button type="button" onClick={onNextStep}>Next</Button>
            </div>
          </>
        )}

        {/* Step 3: Additional Details */}
        {step === 3 && (
          <>
            <FormField
              control={form.control}
              name="country"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Country</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="city"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>City</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* Add more fields for this step as needed */}
            <div className="flex justify-between">
              <Button type="button" onClick={onPrevStep}>Previous</Button>
              <Button type="submit">Submit</Button>
            </div>
          </>
        )}
      </form>
    </Form>
  );
};
