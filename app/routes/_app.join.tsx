import { zodResolver } from "@hookform/resolvers/zod";
import type { MetaFunction } from "@remix-run/cloudflare";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "~/components/ui/button";
import { Card, CardContent, CardTitle } from "~/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
import { Input } from "~/components/ui/input";
import { Textarea } from "~/components/ui/textarea";

export const meta: MetaFunction = () => {
  return [
    { title: "Saga Farmann - Join" },
    { name: "description", content: "Join Saga Farmann and follow the Vikings." },
  ];
};

const joinSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Invalid email address." }),
  message: z.string().min(10, { message: "Message must be at least 10 characters." }),
});

export default function JoinUs() {
  const joinForm = useForm<z.infer<typeof joinSchema>>({
    resolver: zodResolver(joinSchema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
  });

  function onSubmit(values: z.infer<typeof joinSchema>) {
    console.log(values);
  }

  return (
    <div className="reltive flex items-center justify-center min-h-screen p-4">
      <div className="relative w-full max-w-lg">
        <Card>
          <CardTitle>
            <h1 className="text-3xl font-bold my-6 text-center">Join Us</h1>
          </CardTitle>
          <CardContent>
            <Form {...joinForm}>
              <form
                onSubmit={joinForm.handleSubmit(onSubmit)}
                className="space-y-4"
              >
                <FormField
                  control={joinForm.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Your Name"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={joinForm.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input
                          type="email"
                          placeholder="Your Email"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
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
                <Button
                  type="submit"
                  className="w-full h-11"
                >
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
