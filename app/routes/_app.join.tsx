import { zodResolver } from "@hookform/resolvers/zod";
import { redirect, type ActionFunctionArgs, type MetaFunction } from "@remix-run/cloudflare";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "~/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import { Input } from "~/components/ui/input";
import { Textarea } from "~/components/ui/textarea";

export const meta: MetaFunction = () => {
  return [
    { title: "Saga Farmann - Join" },
    { name: "description", content: "Join Saga Farmann and follow the Vikings." },
  ];
};


const joinSchema = z.object({
  firstName: z.string().min(2, { message: "First name must be at least 2 characters." }),
  lastName: z.string().min(2, { message: "Last name must be at least 2 characters." }),
  email: z.string().email({ message: "Invalid email address." }),
  gender: z.enum(["Male", "Female", "Non-Binary", "Other"], {
    errorMap: () => ({ message: "Please select a gender." }),
  }),
  message: z.string().min(10, { message: "Message must be at least 10 characters." }),
});

export const action = async (/* { request, context }: ActionFunctionArgs */) => {
  try {
    /* const formData = await request.formData(); */
    /* const values = joinSchema.parse(Object.fromEntries(formData)); */

    // Need capcha before sending to database

    /* const apiResponse = await fetch(`${context.cloudflare.env.API_URL}/join`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${context.cloudflare.env.API_TOKEN}`,
      },
      body: JSON.stringify(values),
    });

    if (!apiResponse.ok) {
      const errorData = await apiResponse.json();
      return [{ error: "Failed to submit form", details: errorData }, { status: 400 }];
    } */

    return redirect('/thanks');
  } catch (error) {
    console.error(error);
    return [{ error: "An unexpected error occurred" }, { status: 500 }];
  }
};

export default function JoinUs() {
  const joinForm = useForm<z.infer<typeof joinSchema>>({
    resolver: zodResolver(joinSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      gender: undefined,
      message: "",
    },
  });

  function handleClientSubmit(values: z.infer<typeof joinSchema>) {
    const form = document.querySelector("form");
    if (form) {
      const hiddenGenderInput = form.querySelector("#gender-input") as HTMLInputElement;
      hiddenGenderInput.value = values.gender;

      form.submit();
    }
  }

  return (
    <div className="relative flex items-center justify-center min-h-screen p-4">
      <div className="relative w-full max-w-lg">
        <Card>
          <CardHeader>
            <CardTitle>
              <h1 className="text-3xl font-bold text-center">Join Us</h1>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Form {...joinForm}>
              <form
                method="post"
                onSubmit={joinForm.handleSubmit(handleClientSubmit)}
                className="space-y-4"
              >
                {/* First Name and Last Name */}
                <div className="flex space-x-4">
                  <FormField
                    control={joinForm.control}
                    name="firstName"
                    render={({ field }) => (
                      <FormItem className="flex-1">
                        <FormLabel>First Name</FormLabel>
                        <FormControl>
                          <Input placeholder="First Name" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={joinForm.control}
                    name="lastName"
                    render={({ field }) => (
                      <FormItem className="flex-1">
                        <FormLabel>Last Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Last Name" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {/* Email */}
                <FormField
                  control={joinForm.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input type="email" placeholder="Your Email" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Gender Select */}
                <FormField
                  control={joinForm.control}
                  name="gender"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Gender</FormLabel>
                      <Select
                        onValueChange={(value) => field.onChange(value)}
                        value={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select Gender" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="Male">Male</SelectItem>
                          <SelectItem value="Female">Female</SelectItem>
                          <SelectItem value="Non-Binary">Non-Binary</SelectItem>
                          <SelectItem value="Other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                      <input
                        type="hidden"
                        id="gender-input"
                        name="gender"
                        className="sr-only"
                        value={field.value || ""}
                      />
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Message */}
                <FormField
                  control={joinForm.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Message</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Why do you want to join?"
                          {...field}
                          rows={5}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button type="submit" className="w-full h-11">
                  Join Us
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}