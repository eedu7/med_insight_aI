"use client";

import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useLogin } from "../hooks/use-auth";

const formSchema = z.object({
    email: z.email(),
    password: z.string().min(1, "Passsword is required")
})

type FormSchema = z.infer<typeof formSchema>;

export const LoginForm = () => {
    const router = useRouter()
    const { mutate, isPending } = useLogin()
    const form = useForm<FormSchema>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            password: ""
        }
    })


    const onSubmit = (values: FormSchema) => {
        mutate(values, {
            onSuccess: () => {
                router.push("/chat")
            }
        })
    }

    return (
        <Form
            {...form}
        >
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-8"
            >

                <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                                <Input {...field} type="email" />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Password</FormLabel>
                            <FormControl>
                                <Input {...field}
                                    type="password"
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button disabled={isPending}>
                    {
                        isPending ? (
                            <>
                                <Spinner className="mr-2" />
                                Loging...
                            </>
                        ) : "Log In"
                    }
                </Button>
            </form>

        </Form>
    )
}
