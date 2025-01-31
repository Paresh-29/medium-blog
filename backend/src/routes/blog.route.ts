import { createPostInput, updatePostInput } from "@par3sh/medium-common";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { Hono } from "hono";


import { authMiddleware } from "../middleware/auth.middleware";

export const blogRouter = new Hono<{
    Bindings: {
        DATABASE_URL: string,
        JWT_SECRET: string
    },
    Variables: {
        userId: string
    }
}>();


blogRouter.use("/*", authMiddleware);


blogRouter.post('/', async (c) => {
    const authorId = c.get("userId");
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    try {
        const body = await c.req.json();
        const { success } = createPostInput.safeParse(body);
        if (!success) {
            c.status(400);
            return c.json({ error: "Invalid input"});
        }
        const newPost = await prisma.post.create({
          data: {
            title: body.title,
            content: body.content,
            authorId: authorId
          },
        });

        return c.json({ id: newPost.id });
    } catch (error) {
        console.error('Error creating post:', error);
        c.status(400);
        return c.json({ message: 'Error creating post'});
    } finally {
        await prisma.$disconnect();
    }
});

blogRouter.put('/', async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    try {
        const body = await c.req.json();
        const { success } = updatePostInput.safeParse(body);
        if (!success) {
            c.status(400);
            return c.json({ error: "Invalid input" });
        }
        const blog = await prisma.post.update({
            where: { id: body.id },
            data: {
                title: body.title,
                content: body.content,
            }
        });

        return c.json({ id: blog.id });
    } catch (error) {
        console.error('Error updating post:', error);
        c.status(400);
        return c.json({ message: 'Error updating post' });
    } finally {
        await prisma.$disconnect();
    }
});

// TODO: Add pagination
blogRouter.get('/bulk', async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    try {
        const blogs = await prisma.post.findMany({
            select: {
                content: true,
                title: true,
                id: true,
                author: {
                    select: {
                        name: true
                    }
                }

            }
        });
        return c.json({ blogs });
    } catch (error) {
        console.error('Error fetching blog posts:', error);
        c.status(400);
        return c.json({ message: 'Error fetching blog posts' });
    } finally {
        await prisma.$disconnect();
    }
});

blogRouter.get('/:id', async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    try {
        const id = c.req.param("id");
        const blog = await prisma.post.findFirst({
            where: { id: id },
            select : {
                id: true,
                title:true,
                content:true,
                author: {
                    select: {
                        name: true
                    }
                }
            }
        });

        return c.json({ blog });
    } catch (error) {
        console.error('Error fetching blog post:', error);
        c.status(400);
        return c.json({ message: 'Error fetching blog post' });
    } finally {
        await prisma.$disconnect();
    }
});


