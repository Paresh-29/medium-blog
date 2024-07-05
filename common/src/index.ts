import z from "zod"
//for variables need for backend
export const signupInput = z.object({
    email: z.string().email(),
    password: z.string().min(8),
    name: z.string().optional(),
});


export const signinInput = z.object({
    email: z.string().email(),
    password: z.string().min(8),
});


export const createPostInput = z.object({
    title: z.string(),
    content: z.string(),
});


export const updatePostInput = z.object({
    title: z.string().optional(),
    content: z.string().optional(),
    id: z.string()
})

//this types need for frontend 
export type signupType = z.infer<typeof signupInput>;
export type signinType = z.infer<typeof signinInput>;
export type createPostType = z.infer<typeof createPostInput>;
export type updatePostType = z.infer<typeof updatePostInput>;

