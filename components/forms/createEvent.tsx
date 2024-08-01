"use client";

import createFormSchema from "@/schemas/createFormSchema";
import { useForm, useFieldArray, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { AppwriteConfig } from "@/constants/appwrite_config";
import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { ImageInput } from "./imageInput";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { XIcon } from "lucide-react";

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
    },
  });

  // Handling dynamic sponsor fields

  const [sponsors, setSponsors] = useState([{ id: 1, name: "", url: "" }]);
  const { control, handleSubmit } = useForm();

  const handleSponsorChange = (id: number, field: string, value: string) => {
    setSponsors((prevSponsors) =>
      prevSponsors.map((sponsor) =>
        sponsor.id === id ? { ...sponsor, [field]: value } : sponsor
      )
    );
  };

  const handleAddSponsor = () => {
    setSponsors((prevSponsors) => [
      ...prevSponsors,
      { id: Date.now(), name: "", url: "" },
    ]);
  };

  const handleRemoveSponsor = (id: number) => {
    setSponsors((prevSponsors) =>
      prevSponsors.filter((sponsor) => sponsor.id !== id)
    );
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
      instagram = "",
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
            <Button type="button" onClick={onNextStep} className="text-gray-50">
              Next
            </Button>
          </>
        )}

        {/* Step 2: Event Details */}
        {step === 2 && (
          <>
            <h3 className="font-semibold text-xl text-gray-500">Step 2 of 4</h3>
            <div className="flex flex-col space-y-4">
              <div className="flex flex-row gap-6">
                <FormField
                  control={form.control}
                  name="audience"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Target audience</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="type"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Event type</FormLabel>
                      <FormControl>
                        <Select {...field}>
                          <SelectTrigger className="w-[218px]">
                            <SelectValue placeholder="Choose" />
                          </SelectTrigger>
                          <SelectContent className="block bg-gradient-to-tr from-pink-300 via-inherit to-pink-200">
                            <SelectItem
                              value="In Person"
                              className="cursor-pointer"
                            >
                              In Person
                            </SelectItem>
                            <SelectItem
                              value="Virtual"
                              className="cursor-pointer"
                            >
                              Virtual
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="flex flex-row gap-6">
                <FormField
                  control={form.control}
                  name="attendees"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Expected no. of audience</FormLabel>
                      <FormControl>
                        <Input {...field} type="integer" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="price"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Ticket price</FormLabel>
                      <FormControl>
                        <Input {...field} type="integer" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="flex flex-row gap-6">
                <FormField
                  control={form.control}
                  name="tech"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Tech focused</FormLabel>
                      <FormControl>
                        <Select {...field}>
                          <SelectTrigger className="w-[218px]">
                            <SelectValue placeholder="Choose" />
                          </SelectTrigger>
                          <SelectContent className="block bg-gradient-to-tr from-pink-300 via-inherit to-pink-200">
                            <SelectItem value="Yes" className="cursor-pointer">
                              Yes
                            </SelectItem>
                            <SelectItem value="No" className="cursor-pointer">
                              No
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="agenda"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Agenda</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={control}
                name="sponsors"
                render={() => (
                  <FormItem>
                    <div className="flex flex-col space-y-2">
                      <FormLabel className="text-gray-900">
                        Enter sponsor details
                      </FormLabel>
                      <FormLabel className="text-gray-400">
                        (Enter Link including https://)
                      </FormLabel>
                    </div>
                    <FormControl>
                      <Card className="w-full max-w-md">
                        <CardHeader>
                          <CardTitle>Sponsors</CardTitle>
                          <CardDescription>
                            Add and manage your sponsors.
                          </CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-4">
                            {sponsors.map((sponsor) => (
                              <div
                                key={sponsor.id}
                                className="flex items-center gap-4"
                              >
                                <Controller
                                  name={`sponsor-name-${sponsor.id}`}
                                  control={control}
                                  defaultValue={sponsor.name}
                                  render={({ field }) => (
                                    <Input
                                      {...field}
                                      placeholder="Sponsor name"
                                      onChange={(e) => {
                                        field.onChange(e);
                                        handleSponsorChange(
                                          sponsor.id,
                                          "name",
                                          e.target.value
                                        );
                                      }}
                                    />
                                  )}
                                />
                                <Controller
                                  name={`sponsor-url-${sponsor.id}`}
                                  control={control}
                                  defaultValue={sponsor.url}
                                  render={({ field }) => (
                                    <Input
                                      {...field}
                                      placeholder="Sponsor URL"
                                      onChange={(e) => {
                                        field.onChange(e);
                                        handleSponsorChange(
                                          sponsor.id,
                                          "url",
                                          e.target.value
                                        );
                                      }}
                                    />
                                  )}
                                />
                                <Button
                                  variant="ghost"
                                  onClick={() =>
                                    handleRemoveSponsor(sponsor.id)
                                  }
                                  className="ml-auto"
                                >
                                  <XIcon className="h-4 w-4" />
                                </Button>
                              </div>
                            ))}
                          </div>
                        </CardContent>
                        <CardFooter>
                          <Button onClick={handleAddSponsor} className="bg-blue-500 text-gray-50">
                            Add Sponsor
                          </Button>
                        </CardFooter>
                      </Card>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            {/* Add more fields for this step as needed */}
            <div className="flex justify-between">
              <Button type="button" onClick={onPrevStep} className="text-gray-50">
                Previous
              </Button>
              <Button type="button" onClick={onNextStep} className="text-gray-50">
                Next
              </Button>
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
              <Button type="button" onClick={onPrevStep}>
                Previous
              </Button>
              <Button type="submit">Submit</Button>
            </div>
          </>
        )}
      </form>
    </Form>
  );
};
