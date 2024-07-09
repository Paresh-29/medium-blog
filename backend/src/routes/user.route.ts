// import { Hono } from "hono";
// import { PrismaClient } from "@prisma/client/edge";
// import { withAccelerate } from "@prisma/extension-accelerate";
// import { sign } from "hono/jwt";
// import { signinInput, signupInput } from "@par3sh/medium-common";

// export const userRouter = new Hono<{
//   Bindings: {
//     DATABASE_URL: string;
//     JWT_SECRET: string;
//   };
// }>();

// userRouter.post("/signup", async (c) => {
//   const prisma = new PrismaClient({
//     datasourceUrl: c.env.DATABASE_URL,
//   }).$extends(withAccelerate());

//   const body = await c.req.json();
//   const { success } = signupInput.safeParse(body);
//   if (!success) {
//     c.status(400);
//     return c.json({
//       error: "Invalid input",
//     });
//   }
//   try {
//     const user = await prisma.user.create({
//       data: {
//         email: body.email,
//         password: body.password,
//       },
//     });
//     console.log("user", user);
//     const jwt = await sign({ id: user.id }, c.env.JWT_SECRET);
//     return c.text(jwt);
//   } catch (e) {
//     c.status(403);
//     return c.json({
//       error: "error while signing up",
//     });
//   }
// });

// userRouter.post("/signin", async (c) => {
//   const prisma = new PrismaClient({
//     datasourceUrl: c.env.DATABASE_URL,
//   }).$extends(withAccelerate());

//   const body = await c.req.json();
//   const { success } = signinInput.safeParse(body);
//   if (!success) {
//     c.status(400);
//     return c.json({
//       error: "Invalid input",
//     });
//   }

//   try {
//     const user = await prisma.user.findUnique({
//       where: {
//         email: body.email,
//         password: body.password,
//       },
//     });
//     if (!user) {
//       c.status(403);
//       return c.json({
//         error: "User not found",
//       });
//     }
//     const jwt = await sign({ id: user.id }, c.env.JWT_SECRET);
//     return c.text(jwt);
//   } catch (error) {
//     c.status(403);
//     return c.json({
//       error: "Error while signing in",
//     });
//   }
// });



import { Hono } from "hono";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { sign } from "hono/jwt";
import { signinInput, signupInput } from "@par3sh/medium-common";
import bcrypt from "bcryptjs";
import { authMiddleware } from "../middleware/auth.middleware";


export const userRouter = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  };
  Variables: {
    userId: string;
  };
}>();

userRouter.post("/signup", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const body = await c.req.json();
  const { success } = signupInput.safeParse(body);
  if (!success) {
    c.status(400);
    return c.json({
      error: "Invalid input",
    });
  }

  try {
    const hashedPassword = await bcrypt.hash(body.password, 10);
    const user = await prisma.user.create({
      data: {
        email: body.email,
        password: hashedPassword,
      },
    });

    console.log("user", user);
    const jwt = await sign({ id: user.id }, c.env.JWT_SECRET);
    return c.text(jwt);
  } catch (e) {
    console.error("Signup error:", e);
    c.status(403);
    return c.json({
      error: "Error while signing up",
    });
  }
});

userRouter.post("/signin", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const body = await c.req.json();
  const { success } = signinInput.safeParse(body);
  if (!success) {
    c.status(400);
    return c.json({
      error: "Invalid input",
    });
  }

  try {
    const user = await prisma.user.findUnique({
      where: {
        email: body.email,
      },
    });

    if (!user || !(await bcrypt.compare(body.password, user.password))) {
      c.status(403);
      return c.json({
        error: "Invalid email or password",
      });
    }

    const jwt = await sign({ id: user.id }, c.env.JWT_SECRET);
    return c.text(jwt);
  } catch (error) {
    console.error("Signin error:", error);
    c.status(403);
    return c.json({
      error: "Error while signing in",
    });
  }
});



userRouter.get("/me", authMiddleware, async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const userId = c.get("userId");
  try {
    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
      select: {
        id: true,
        email: true,
        name: true
      }
    });
    if (!user) {
      c.status(404);
      return c.json({
        error: "User not found",
      });
    }
    return c.json({
      isLoggedIn: true,
      user,
    });
  } catch (error) {
    console.error("Status error:", error);
    c.status(500);
    return c.json({
      message: "Error fetching user status",
    });
  }
})
