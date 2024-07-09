import { Context } from "hono";
import { verify } from "hono/jwt";

export const authMiddleware = async (c: Context, next: () => Promise<void>) => {
   const authHeader = c.req.header("Authorization") || "";

    if(!authHeader || !authHeader.startsWith("Bearer")) {
        c.status(403)
        return c.json({
            message: "Invalid bearer"
        })
    }

    const token = authHeader.split(" ")[1];
    try {
        const user = await verify(token, c.env.JWT_SECRET);
        if (user) {
            c.set("userId", user.id);
            await next();
        } else {
            c.status(403);
            return c.json({
                message: "you are not logged in"
            });
        }
    } catch (error) {
        c.status(403);
        return c.json({
            message: "Invalid token"
        });
    }
};
